import { getApiBaseUrl } from "@/config/env";
import {
  clearTokens,
  emitUnauthorized,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/authTokens";
import { ApiError, NetworkError, UnexpectedResponseError } from "@/lib/errors";
import type { ApiErrorBody } from "@/types/api";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Attach `Authorization: Bearer <accessToken>` when available. Default true. */
  auth?: boolean;
  /** Skip the automatic refresh-and-retry on 401 (used by /auth/refresh itself). */
  skipRefresh?: boolean;
}

interface RefreshedTokens {
  accessToken: string;
  refreshToken: string;
}

/** fetch() throws a plain TypeError for connection failures and CORS blocks. */
async function safeFetch(input: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (cause) {
    throw new NetworkError(cause);
  }
}

// Coalesces concurrent 401s into a single refresh call instead of a stampede.
let refreshPromise: Promise<RefreshedTokens | null> | null = null;

async function refreshAccessToken(): Promise<RefreshedTokens | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = safeFetch(`${getApiBaseUrl()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as { accessToken?: string; refreshToken?: string };
        if (!data.accessToken || !data.refreshToken) return null;
        setTokens(data.accessToken, data.refreshToken);
        return { accessToken: data.accessToken, refreshToken: data.refreshToken };
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

async function parseJsonBody(res: Response): Promise<{ json: unknown; rawText: string }> {
  const text = await res.text();
  if (!text) return { json: null, rawText: text };
  try {
    return { json: JSON.parse(text), rawText: text };
  } catch {
    return { json: null, rawText: text };
  }
}

/**
 * Core JSON request helper. All requests go to `NEXT_PUBLIC_API_BASE_URL`.
 * On a 401 (and only a 401 — 403 means "forbidden", not "expired", and is
 * never retried), attempts one refresh-and-retry; if that fails the local
 * session is cleared and `wpa_auth_web_unauthorized` is emitted so the auth
 * context can react. Never logs request/response bodies or tokens.
 *
 * Throws:
 * - `NetworkError` if the request never reached the API (wrong base URL,
 *   API down, or blocked by CORS) — see `safeFetch`.
 * - `UnexpectedResponseError` if a response came back but its body wasn't
 *   parseable JSON where JSON was expected.
 * - `ApiError` for any well-formed non-2xx API response.
 */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, skipRefresh = false, headers, ...rest } = options;

  const doFetch = async (): Promise<Response> => {
    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(headers as Record<string, string> | undefined),
    };

    if (auth) {
      const token = getAccessToken();
      if (token) finalHeaders.Authorization = `Bearer ${token}`;
    }

    return safeFetch(`${getApiBaseUrl()}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch();

  if (res.status === 401 && auth && !skipRefresh && getRefreshToken()) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await doFetch();
    } else {
      clearTokens();
      emitUnauthorized();
    }
  }

  if (res.status === 401 && auth) {
    clearTokens();
    emitUnauthorized();
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const { json, rawText } = await parseJsonBody(res);

  if (!res.ok) {
    throw new ApiError(res.status, json as ApiErrorBody | null);
  }

  if (rawText && json === null) {
    // Response was 2xx but the body wasn't valid JSON — a malformed or
    // unexpected response shape, not a normal "empty body" success case.
    throw new UnexpectedResponseError();
  }

  return json as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => apiFetch<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};
