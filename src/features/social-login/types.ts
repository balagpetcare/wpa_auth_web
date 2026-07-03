export type SocialProviderKey =
  | "google"
  | "facebook"
  | "apple"
  | "microsoft"
  | "linkedin"
  | "tiktok"
  | "x"
  | "github"
  | "instagram";

export interface SocialLoginProvider {
  provider: SocialProviderKey;
  displayName: string;
  icon?: string;
  startUrl: string;
  readiness?: {
    directLoginSupported: boolean;
    emailMayBeMissing: boolean;
    requiresEmailCompletion: boolean;
    developerConsoleApprovalRequired: boolean;
  };
}

export interface SocialLoginProvidersResponse {
  main: SocialLoginProvider[];
  more: SocialLoginProvider[];
}
