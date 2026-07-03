"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { Button } from "@/components/ui/Button";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ConsentAppCard } from "@/components/oauth/ConsentAppCard";
import { OAuthBadge, OAuthStatusCard, oauthIcons } from "@/components/oauth/oauthUi";
import { approveConsent, buildRedirectUrl, denyConsent } from "@/features/oauth/oauthService";
import { useAuth } from "@/features/auth/context";
import { getErrorMessage } from "@/lib/errors";

function formatIdentity(name?: string | null, email?: string | null) {
  return [name, email].filter(Boolean).join(" · ");
}

const SCOPE_HINTS: Record<string, string> = {
  openid: "Sign you in with WPA Account",
  profile: "View your basic profile",
  email: "View your email address",
  phone: "View your phone number",
  offline_access: "Maintain access when you're not present",
};

export function ConsentForm() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const ticket = searchParams.get("ticket") ?? "";
  const clientName = searchParams.get("client") || "This application";
  const redirectUri = searchParams.get("redirectUri") ?? undefined;
  const scopes = useMemo(() => (searchParams.get("scopes") ?? "").split(" ").filter(Boolean), [searchParams]);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const decide = async (decision: "allow" | "deny") => {
    if (!ticket) {
      setError("Missing consent ticket. Please restart the sign-in flow.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const result =
        decision === "allow"
          ? await approveConsent({ consentTicket: ticket })
          : await denyConsent({ consentTicket: ticket });

      const finalUrl = result.approved
        ? buildRedirectUrl(result.redirectUri, { code: result.code, state: result.state })
        : buildRedirectUrl(result.redirectUri, { error: result.error, state: result.state });

      window.location.href = finalUrl;
    } catch (err) {
      setError(getErrorMessage(err, "Could not complete authorization."));
      setIsSubmitting(false);
    }
  };

  const initials = (user?.displayName ?? user?.email ?? "W").trim().slice(0, 2).toUpperCase();

  return (
    <AuthShell maxWidth="max-w-[720px]">
      <AuthCard
        title="Review app access"
        subtitle="This third-party app is requesting permission to use your WPA Central Account."
      >
        <div className="mb-6 rounded-[24px] border border-border/80 bg-surface-muted/55 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-lg font-semibold text-white shadow-lg shadow-brand/20">
                {initials}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">
                  Signed in as
                </p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {formatIdentity(user?.displayName, user?.email) || "WPA account"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <OAuthBadge tone="info">Secure consent</OAuthBadge>
                  <OAuthBadge tone="neutral">Third-party access</OAuthBadge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-border/70 bg-surface px-3 py-2 text-sm text-muted">
                {oauthIcons.shield}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Allowing access means {clientName} can request the permissions listed below using your WPA identity.
            You can deny safely if this does not look familiar.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {error && <AlertMessage variant="error">{error}</AlertMessage>}
          {!ticket && (
            <AlertMessage variant="error">
              Missing consent ticket. Please restart the sign-in flow.
            </AlertMessage>
          )}

          <OAuthStatusCard
            title={clientName}
            description="Review the requested permissions before continuing."
          >
            <ConsentAppCard appName={clientName} redirectUri={redirectUri} scopes={scopes} />
          </OAuthStatusCard>

          <OAuthStatusCard title="What these permissions mean" description="We only show the data categories requested by the app.">
            <div className="grid gap-2 sm:grid-cols-2">
              {scopes.length > 0 ? (
                scopes.map((scope) => (
                  <div key={scope} className="flex items-start gap-2 rounded-2xl border border-border/70 bg-surface-muted/50 px-3 py-2 text-sm text-foreground">
                    <span className="mt-0.5 text-success">{oauthIcons.check}</span>
                    <span>{SCOPE_HINTS[scope] ?? `Custom permission: ${scope}`}</span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border/70 bg-surface-muted/50 px-4 py-3 text-sm text-muted sm:col-span-2">
                  No scopes were provided. This app is requesting basic sign-in access only.
                </div>
              )}
            </div>
          </OAuthStatusCard>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" onClick={() => decide("deny")} disabled={isSubmitting}>
              Deny / Cancel
            </Button>
            <PrimaryButton onClick={() => decide("allow")} isLoading={isSubmitting} disabled={!ticket}>
              Allow and continue
            </PrimaryButton>
          </div>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
