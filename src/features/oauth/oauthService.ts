import { apiClient } from "@/lib/apiClient";
import type {
  AuthorizeConsentRequired,
  AuthorizeContext,
  ConsentResult,
  TokenExchangePayload,
  TokenResponse,
} from "@/types/oauth";

/**
 * GET /oauth/authorize. Requires the caller to already hold a valid access
 * token (this endpoint assumes the user is signed in to this site already —
 * it does not itself redirect to a login page).
 *
 * Returns JSON, never an HTTP redirect: either `requiresConsent: false` with
 * an authorization `code` ready to send back to the client's `redirect_uri`,
 * or `requiresConsent: true` with a `consentTicket` for /oauth/consent.
 */
export async function getAuthorizeContext(queryParams: string | URLSearchParams): Promise<AuthorizeContext> {
  const query = typeof queryParams === "string" ? queryParams : queryParams.toString();
  return apiClient.get<AuthorizeContext>(`/oauth/authorize?${query}`);
}

export function isConsentRequired(ctx: AuthorizeContext): ctx is AuthorizeConsentRequired {
  return ctx.requiresConsent === true;
}

/** POST /oauth/consent with decision "approve". */
export async function approveConsent(payload: { consentTicket: string }): Promise<ConsentResult> {
  return apiClient.post<ConsentResult>("/oauth/consent", {
    consentTicket: payload.consentTicket,
    decision: "approve",
  });
}

/** POST /oauth/consent with decision "deny". */
export async function denyConsent(payload: { consentTicket: string }): Promise<ConsentResult> {
  return apiClient.post<ConsentResult>("/oauth/consent", {
    consentTicket: payload.consentTicket,
    decision: "deny",
  });
}

/**
 * Both /oauth/authorize (auto-approved) and /oauth/consent return a bare
 * `redirectUri` plus `code`/`state`/`error` as separate fields — the caller
 * is responsible for assembling the final redirect URL. This does that.
 */
export function buildRedirectUrl(redirectUri: string, params: Record<string, string | undefined>): string {
  const url = new URL(redirectUri);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * POST /oauth/token (authorization_code grant). Only relevant for
 * public/PKCE clients exchanging a code directly from the browser —
 * confidential clients (with a client_secret) must never call this
 * client-side, since the secret would ship in the browser bundle.
 * Not part of the login/consent flow above; provided for web clients that
 * need to complete their own code exchange after /oauth/callback.
 */
export async function exchangeCallbackCode(queryParams: {
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier?: string;
}): Promise<TokenResponse> {
  const payload: TokenExchangePayload = {
    grant_type: "authorization_code",
    client_id: queryParams.clientId,
    code: queryParams.code,
    redirect_uri: queryParams.redirectUri,
    code_verifier: queryParams.codeVerifier,
  };
  return apiClient.post<TokenResponse>("/oauth/token", payload, { auth: false });
}

export const oauthService = {
  getAuthorizeContext,
  isConsentRequired,
  approveConsent,
  denyConsent,
  buildRedirectUrl,
  exchangeCallbackCode,
};
