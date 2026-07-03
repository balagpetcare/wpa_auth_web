import type { TokenPair } from "@/types/api";

export type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED" | "DELETED";

/** Mirrors `SafeUser` from wpa_auth_api's auth.service.ts. */
export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface LoginResponse extends TokenPair {
  success: true;
  expiresIn: number;
  user: AuthUser;
}

export interface RegisterResponse {
  success: true;
  user: AuthUser;
}

export interface RegisterPayload {
  email?: string;
  phone?: string;
  username?: string;
  password: string;
  displayName?: string;
  clientId?: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface VerifyOtpPayload {
  token: string;
}

export interface MessageResponse {
  success: true;
  message: string;
}

export interface MeResponse {
  success: true;
  user: AuthUser;
}

export interface RefreshResponse extends TokenPair {
  success: true;
  expiresIn: number;
  user: AuthUser;
}
