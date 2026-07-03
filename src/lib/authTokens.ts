/**
 * Access/refresh token storage.
 *
 * Contract: nothing in this module may console.log/console.error a token
 * value, and callers must not either — errors thrown elsewhere in the app
 * only ever carry API-provided messages, never raw token strings.
 */
const ACCESS_TOKEN_KEY = "wpa_auth_web_access_token";
const REFRESH_TOKEN_KEY = "wpa_auth_web_refresh_token";

export const UNAUTHORIZED_EVENT = "wpa_auth_web_unauthorized";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function hasSession(): boolean {
  return Boolean(getRefreshToken());
}

/** Notifies the app (e.g. AuthProvider) that the current session is no longer valid. */
export function emitUnauthorized() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
}
