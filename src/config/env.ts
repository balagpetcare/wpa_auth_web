export type AppEnvironment = "local" | "staging" | "production";

function resolveAppEnvironment(): AppEnvironment {
  const raw = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase();
  if (raw === "production" || raw === "staging" || raw === "local") return raw;
  return "local";
}

/**
 * Per-environment URL defaults, used only when the corresponding
 * `NEXT_PUBLIC_*` variable isn't explicitly set. Explicit env vars always
 * win - these exist so a misconfigured `NEXT_PUBLIC_APP_ENV=production`
 * deploy still points at real WPA domains instead of localhost.
 */
const ENVIRONMENT_DEFAULTS: Record<
  AppEnvironment,
  { authWebUrl: string; apiBaseUrl: string; defaultRedirectUrl: string }
> = {
  local: {
    authWebUrl: "http://localhost:5011",
    // wpa_auth_api's default local PORT is 5010 (see its .env/.env.example) -
    // keep this in sync with that repo's actual default.
    apiBaseUrl: "http://localhost:5010/api/v1",
    defaultRedirectUrl: "http://localhost:5011/account",
  },
  staging: {
    authWebUrl: "https://auth.staging.worldpetassociation.com",
    apiBaseUrl: "https://api.staging.worldpetassociation.com/api/v1",
    defaultRedirectUrl: "https://auth.staging.worldpetassociation.com/account",
  },
  production: {
    authWebUrl: "https://auth.worldpetassociation.com",
    apiBaseUrl: "https://api.worldpetassociation.com/api/v1",
    defaultRedirectUrl: "https://auth.worldpetassociation.com/account",
  },
};

function readEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const appEnv = resolveAppEnvironment();
const defaults = ENVIRONMENT_DEFAULTS[appEnv];

export const env = {
  appEnv,
  apiBaseUrl: readEnv("NEXT_PUBLIC_API_BASE_URL", defaults.apiBaseUrl),
  authWebUrl: readEnv("NEXT_PUBLIC_AUTH_WEB_URL", defaults.authWebUrl),
  publicWebsiteUrl: readEnv("NEXT_PUBLIC_PUBLIC_WEBSITE_URL", defaults.authWebUrl),
  defaultRedirectUrl: readEnv("NEXT_PUBLIC_DEFAULT_REDIRECT_URL", defaults.defaultRedirectUrl),
  appName: readEnv("NEXT_PUBLIC_APP_NAME", "WPA Account"),
  brandName: readEnv("NEXT_PUBLIC_BRAND_NAME", "World Pet Association"),
  legalEntityName: readEnv("NEXT_PUBLIC_LEGAL_ENTITY_NAME", "World Pet Association"),
  tagline: readEnv("NEXT_PUBLIC_APP_TAGLINE", "One account for all WPA pet platforms."),
  supportEmail: readEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "support@worldpetassociation.com"),
  privacyEmail: readEnv("NEXT_PUBLIC_PRIVACY_EMAIL", "privacy@worldpetassociation.com"),
  securityEmail: readEnv("NEXT_PUBLIC_SECURITY_EMAIL", "security@worldpetassociation.com"),
} as const;

/** This app's own public origin, trailing slash stripped. */
export function getAuthWebUrl(): string {
  return stripTrailingSlash(env.authWebUrl);
}

/** Public website origin used for public metadata and links. */
export function getPublicWebsiteUrl(): string {
  return stripTrailingSlash(env.publicWebsiteUrl);
}

/** WPA Auth API base URL (includes the `/api/v1` prefix), trailing slash stripped. */
export function getApiBaseUrl(): string {
  return stripTrailingSlash(env.apiBaseUrl);
}

/** Where to send an authenticated user with no explicit next/redirect target. */
export function getDefaultRedirectUrl(): string {
  return stripTrailingSlash(env.defaultRedirectUrl);
}
