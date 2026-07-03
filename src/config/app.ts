import { env, getApiBaseUrl, getAuthWebUrl, getDefaultRedirectUrl } from "@/config/env";

export const appConfig = {
  name: env.appName,
  brandName: env.brandName,
  tagline: env.tagline,
  supportEmail: env.supportEmail,
  environment: env.appEnv,
  urls: {
    self: getAuthWebUrl(),
    apiBase: getApiBaseUrl(),
    defaultRedirect: getDefaultRedirectUrl(),
  },
  routes: {
    login: "/auth/login",
    register: "/auth/register",
    verifyOtp: "/auth/verify-otp",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    oauthAuthorize: "/oauth/authorize",
    oauthConsent: "/oauth/consent",
    oauthCallback: "/oauth/callback",
    account: "/account",
    accountSecurity: "/account/security",
  },
} as const;
