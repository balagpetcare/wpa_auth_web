"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";
import { buildRedirectUrl, getAuthorizeContext, isConsentRequired } from "@/features/oauth/oauthService";
import { getErrorMessage } from "@/lib/errors";
import { buildLoginRedirect, isValidHttpUrl, preserveOAuthParams } from "@/lib/redirect";

export function AuthorizeHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasRequested = useRef(false);

  // Filtered to the known OAuth/OIDC authorize params (see
  // preserveOAuthParams) and forwarded to the API and, for unauthenticated
  // users, back to this page after login — this is what preserves
  // client_id, redirect_uri, scope, state, response_type, code_challenge,
  // code_challenge_method and nonce across the whole flow, while dropping
  // anything unexpected rather than forwarding it blindly.
  const query = preserveOAuthParams(searchParams);
  const redirectUriParam = searchParams.get("redirect_uri");

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const next = `${appConfig.routes.oauthAuthorize}${query ? `?${query}` : ""}`;
      router.replace(buildLoginRedirect(next));
      return;
    }

    if (!isValidHttpUrl(redirectUriParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronous validation failure, not a render loop
      setError("This sign-in request is missing a valid redirect_uri.");
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    getAuthorizeContext(query)
      .then((ctx) => {
        if (isConsentRequired(ctx)) {
          // ctx.redirectUri and ctx.client come from the API, which has
          // already validated redirect_uri against this client's registered
          // values — safe to carry forward and display as-is.
          const consentParams = new URLSearchParams({
            ticket: ctx.consentTicket,
            client: ctx.client.name,
            scopes: ctx.scopes.join(" "),
            redirectUri: ctx.redirectUri,
          });
          router.replace(`${appConfig.routes.oauthConsent}?${consentParams.toString()}`);
          return;
        }

        try {
          window.location.href = buildRedirectUrl(redirectUriParam, {
            code: ctx.code,
            state: ctx.state,
          });
        } catch {
          setError("Could not complete the redirect back to the requesting app.");
        }
      })
      .catch((err) => {
        setError(getErrorMessage(err, "Authorization failed."));
      });
  }, [isAuthenticated, isLoading, query, redirectUriParam, router]);

  return (
    <AuthShell>
      <AuthCard title="Authorize" subtitle="Confirming your session">
        {error ? (
          <AlertMessage variant="error">{error}</AlertMessage>
        ) : (
          <AlertMessage variant="loading">Redirecting…</AlertMessage>
        )}
      </AuthCard>
    </AuthShell>
  );
}
