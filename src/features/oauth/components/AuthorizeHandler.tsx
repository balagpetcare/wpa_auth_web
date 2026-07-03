"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";
import { buildRedirectUrl, getAuthorizeContext, isConsentRequired } from "@/features/oauth/oauthService";
import { buildLoginRedirect, isValidHttpUrl, preserveOAuthParams } from "@/lib/redirect";
import { OAuthLoadingIndicator, OAuthStatusCard } from "@/components/oauth/oauthUi";

export function AuthorizeHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  const hasRequested = useRef(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);

  const query = preserveOAuthParams(searchParams);
  const redirectUriParam = searchParams.get("redirect_uri");

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      const next = `${appConfig.routes.oauthAuthorize}${query ? `?${query}` : ""}`;
      router.replace(buildLoginRedirect(next));
      return;
    }

    if (!isValidHttpUrl(redirectUriParam)) return;

    if (hasRequested.current) return;
    hasRequested.current = true;

    getAuthorizeContext(query)
      .then((ctx) => {
        if (isConsentRequired(ctx)) {
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
          setRedirectError("Could not complete the redirect back to the requesting app.");
        }
      })
      .catch(() => {});
  }, [isAuthenticated, isLoading, query, redirectUriParam, router]);

  const error = !isLoading && isAuthenticated && !isValidHttpUrl(redirectUriParam)
    ? "This sign-in request is missing a valid redirect_uri."
    : redirectError;

  return (
    <AuthShell maxWidth="max-w-[540px]">
      <OAuthStatusCard
        title="Preparing secure authorization"
        description="We are validating your session and the requesting application."
      >
        {error ? (
          <AlertMessage variant="error">{error}</AlertMessage>
        ) : (
          <div className="rounded-[24px] border border-border/80 bg-surface-muted/55 p-5">
            <OAuthLoadingIndicator />
          </div>
        )}
      </OAuthStatusCard>
    </AuthShell>
  );
}
