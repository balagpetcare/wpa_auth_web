import { apiClient } from "@/lib/apiClient";
import { clearTokens, getRefreshToken, setTokens } from "@/lib/authTokens";
import type {
  AuthUser,
  LoginResponse,
  MeResponse,
  MessageResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "@/types/auth";

export interface LoginResult {
  user: AuthUser;
  /** Passed straight through from the caller for post-login navigation; never sent to the API. */
  redirectTo?: string;
}

/**
 * POST /auth/login. `identifier` maps to the API's `emailOrUsername` field —
 * it accepts either an email address or a username (no numeric-phone login
 * exists on the API today).
 */
export async function login(
  identifier: string,
  password: string,
  redirectTo?: string,
  clientId?: string,
): Promise<LoginResult> {
  const res = await apiClient.post<LoginResponse>(
    "/auth/login",
    { emailOrUsername: identifier, password, clientId },
    { auth: false },
  );
  setTokens(res.accessToken, res.refreshToken);
  return { user: res.user, redirectTo };
}

/**
 * POST /auth/register. Unlike login, the API does NOT return tokens here —
 * registration does not auto-authenticate. Callers must route the user to
 * /auth/login afterwards.
 */
export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const res = await apiClient.post<RegisterResponse>("/auth/register", payload, { auth: false });
  return res.user;
}

/** POST /auth/verify-email/confirm — the API's OTP is a single-use link token, not a numeric code. */
export async function verifyOtp(payload: VerifyOtpPayload): Promise<void> {
  await apiClient.post<MessageResponse>("/auth/verify-email/confirm", payload, { auth: false });
}

/** POST /auth/verify-email/request — requires an authenticated session. */
export async function requestOtp(email: string): Promise<void> {
  await apiClient.post<MessageResponse>("/auth/verify-email/request", { email });
}

/** POST /auth/forgot-password. `identifier` maps to the API's `email` field. */
export async function forgotPassword(identifier: string): Promise<void> {
  await apiClient.post<MessageResponse>("/auth/forgot-password", { email: identifier }, { auth: false });
}

/** POST /auth/reset-password. */
export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await apiClient.post<MessageResponse>("/auth/reset-password", payload, { auth: false });
}

/** POST /auth/logout, then clears local session regardless of API outcome. */
export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken() ?? undefined;
  try {
    await apiClient.post<MessageResponse>("/auth/logout", refreshToken ? { refreshToken } : {});
  } finally {
    clearTokens();
  }
}

/** GET /auth/me. */
export async function getCurrentUser(): Promise<AuthUser> {
  const res = await apiClient.get<MeResponse>("/auth/me");
  return res.user;
}

export const authService = {
  login,
  register,
  verifyOtp,
  requestOtp,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser,
};
