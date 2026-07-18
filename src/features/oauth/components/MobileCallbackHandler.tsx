"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { OAuthLoadingIndicator, OAuthStatusCard } from "@/components/oauth/oauthUi";

/**
 * Allowlist of mobile clients permitted to use this bridge page.
 *
 * This is the ONLY place that should need to change to support a new
 * mobile client: add an entry mapping the `app` query param value to the
 * app's registered custom URL scheme callback.
 */
const MOBILE_APP_SCHEMES: Record<string, string> = {
  furtail: "furtail://oauth/callback",
};

export function MobileCallbackHandler() {
  const searchParams = useSearchParams();

  const app = searchParams.get("app");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const scheme = app ? MOBILE_APP_SCHEMES[app] : undefined;

  const targetUrl = useMemo(() => {
    if (!scheme) return null;

    const params = new URLSearchParams();
    if (error) {
      params.set("error", error);
      if (errorDescription) params.set("error_description", errorDescription);
    } else {
      if (code) params.set("code", code);
      if (state) params.set("state", state);
    }

    const query = params.toString();
    return query ? `${scheme}?${query}` : scheme;
  }, [scheme, code, state, error, errorDescription]);

  useEffect(() => {
    if (!targetUrl) return;
    window.location.href = targetUrl;
  }, [targetUrl]);

  const unknownApp = !app || !scheme;

  return (
    <AuthShell maxWidth="max-w-[540px]">
      <OAuthStatusCard
        title="Returning to the app"
        description="You can close this window once you are redirected."
      >
        {unknownApp ? (
          <AlertMessage variant="error">
            {!app
              ? "This link is missing the app parameter and cannot continue."
              : "This app is not recognized. Please contact support if this keeps happening."}
          </AlertMessage>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] border border-border/80 bg-surface-muted/55 p-5">
              <OAuthLoadingIndicator />
            </div>
            <p className="text-center text-sm text-muted">
              Redirecting back to the app…{" "}
              {targetUrl && (
                <a href={targetUrl} className="font-medium text-brand underline underline-offset-2">
                  Tap here if nothing happens
                </a>
              )}
            </p>
          </div>
        )}
      </OAuthStatusCard>
    </AuthShell>
  );
}
