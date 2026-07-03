"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { normalizeRedirectTo } from "@/lib/redirect";
import { OAuthErrorCard, OAuthLoadingIndicator, OAuthStatusCard } from "@/components/oauth/oauthUi";

export function CallbackHandler() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = normalizeRedirectTo(searchParams.get("next"));
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (error || hasRedirected.current) return;
    hasRedirected.current = true;
    window.location.href = next;
  }, [error, next]);

  if (error) {
    const safeMessage =
      error === "access_denied"
        ? "You denied access to the application."
        : "This sign-in could not be completed.";

    return (
      <AuthShell maxWidth="max-w-[540px]">
        <OAuthErrorCard
          title="OAuth callback failed"
          message={safeMessage}
          detail={errorDescription ?? undefined}
          actionHref={next}
          actionLabel="Return to WPA Account"
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell maxWidth="max-w-[540px]">
      <OAuthStatusCard
        title="Completing secure sign-in"
        description="We’re finalizing your session and sending you back to the application."
      >
        <div className="rounded-[24px] border border-border/80 bg-surface-muted/55 p-5">
          <OAuthLoadingIndicator />
        </div>
        <div className="mt-4">
          <AlertMessage variant="info">Redirecting you back to the application…</AlertMessage>
        </div>
      </OAuthStatusCard>
    </AuthShell>
  );
}
