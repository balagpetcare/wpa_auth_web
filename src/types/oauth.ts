export interface AuthorizeQueryParams {
  client_id: string;
  redirect_uri: string;
  response_type: "code";
  scope?: string;
  state?: string;
  code_challenge?: string;
  code_challenge_method?: "S256" | "plain";
  nonce?: string;
}

/** Client type is FIRST_PARTY_APP/SERVICE — no user consent screen needed. */
export interface AuthorizeAutoApproved {
  success: true;
  requiresConsent: false;
  code: string;
  state?: string;
}

/** Client type is THIRD_PARTY_APP — user must approve/deny via /oauth/consent. */
export interface AuthorizeConsentRequired {
  success: true;
  requiresConsent: true;
  consentTicket: string;
  client: { name: string; slug: string };
  scopes: string[];
  redirectUri: string;
  state?: string;
}

export type AuthorizeContext = AuthorizeAutoApproved | AuthorizeConsentRequired;

export type ConsentDecision = "approve" | "deny";

export interface ConsentPayload {
  consentTicket: string;
}

export interface ConsentApproved {
  success: true;
  approved: true;
  redirectUri: string;
  code: string;
  state?: string;
}

export interface ConsentDenied {
  success: true;
  approved: false;
  redirectUri: string;
  state?: string;
  error: "access_denied";
}

export type ConsentResult = ConsentApproved | ConsentDenied;

export interface TokenExchangePayload {
  grant_type: "authorization_code";
  client_id: string;
  client_secret?: string;
  code: string;
  redirect_uri: string;
  code_verifier?: string;
}

export interface TokenResponseUser {
  id: string;
  email: string | null;
  username: string | null;
  displayName: string | null;
}

/**
 * POST /oauth/token is NOT wrapped in { success: true, ... } like /auth/*
 * and /oauth/authorize|consent are — it returns the raw OAuth2 token shape.
 */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
  scope: string;
  id_token?: string;
  user: TokenResponseUser;
}
