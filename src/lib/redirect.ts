import { appConfig } from "@/config/app";

/**
 * True only for same-origin relative paths (e.g. "/account",
 * "/oauth/authorize?..."). False for absolute URLs, protocol-relative paths
 * ("//evil.com"), and backslash tricks some browsers still treat as
 * protocol-relative ("/\evil.com") — all of which are open-redirect vectors
 * if passed straight to router.push/window.location.
 */
export function isSafeInternalPath(path: string | null | undefined): path is string {
  if (!path) return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//") || path.startsWith("/\\")) return false;
  return true;
}

/**
 * Resolves an untrusted `next`/redirect query param to a safe internal path,
 * falling back to `fallback` (defaults to /account) for anything that isn't
 * a same-origin relative path. Decodes one level of URI-encoding first,
 * since `next` values usually arrive already encoded from a query string.
 */
export function normalizeRedirectTo(
  raw: string | null | undefined,
  fallback: string = appConfig.routes.account,
): string {
  if (!raw) return fallback;

  let candidate = raw;
  try {
    candidate = decodeURIComponent(raw);
  } catch {
    // Malformed percent-encoding — fall through and validate the raw value.
  }

  return isSafeInternalPath(candidate) ? candidate : fallback;
}

export function buildLoginRedirect(next: string): string {
  return `${appConfig.routes.login}?next=${encodeURIComponent(next)}`;
}

/**
 * Checks that a string is a well-formed absolute http(s) URL. Used before
 * ever navigating to an OAuth client's `redirect_uri` — this is a sanity
 * check against malformed input, not a trust boundary. The actual trust
 * boundary is the API: it only issues an authorization code after it has
 * validated `redirect_uri` against the client's registered redirect URIs,
 * so this frontend never decides on its own whether a redirect target is
 * legitimate.
 */
export function isValidHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * The OAuth/OIDC authorize params this app understands and is willing to
 * forward to the API and carry through the login redirect. Filtering to
 * this allowlist (rather than forwarding `searchParams.toString()`
 * verbatim) means an authorize URL can't be used to smuggle arbitrary extra
 * query params through to the API or into an internal `next` path.
 */
const OAUTH_PARAM_KEYS = [
  "client_id",
  "redirect_uri",
  "response_type",
  "scope",
  "state",
  "code_challenge",
  "code_challenge_method",
  "nonce",
] as const;

const SOCIAL_CONTEXT_KEYS = ["next", ...OAUTH_PARAM_KEYS] as const;

/**
 * Builds a query string containing only the known OAuth/OIDC authorize
 * params present in `searchParams`, in a stable order.
 */
export function preserveOAuthParams(searchParams: URLSearchParams): string {
  const preserved = new URLSearchParams();
  for (const key of OAUTH_PARAM_KEYS) {
    const value = searchParams.get(key);
    if (value !== null) preserved.set(key, value);
  }
  return preserved.toString();
}

export function preserveSocialLoginContext(searchParams: URLSearchParams): string {
  const preserved = new URLSearchParams();
  for (const key of SOCIAL_CONTEXT_KEYS) {
    const value = searchParams.get(key);
    if (value !== null) preserved.set(key, value);
  }
  return preserved.toString();
}
