"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { Button } from "@/components/ui/Button";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ConsentAppCard } from "@/components/oauth/ConsentAppCard";
import { approveConsent, buildRedirectUrl, denyConsent } from "@/features/oauth/oauthService";
import { getErrorMessage } from "@/lib/errors";

export function ConsentForm() {
  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket") ?? "";
  const clientName = searchParams.get("client") || "This application";
  const redirectUri = searchParams.get("redirectUri") ?? undefined;
  const scopes = (searchParams.get("scopes") ?? "").split(" ").filter(Boolean);

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
      // result.redirectUri comes straight from the API's consent response —
      // it re-validates the ticket server-side, so this is not the frontend
      // deciding where it's safe to send the browser.
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

  return (
    <AuthShell>
      <AuthCard
        title="Authorize access"
        subtitle="Review what this app will be able to do with your account"
      >
        <div className="flex flex-col gap-4">
          {error && <AlertMessage variant="error">{error}</AlertMessage>}
          {!ticket && (
            <AlertMessage variant="error">
              Missing consent ticket. Please restart the sign-in flow.
            </AlertMessage>
          )}

          <ConsentAppCard appName={clientName} redirectUri={redirectUri} scopes={scopes} />

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" onClick={() => decide("deny")} disabled={isSubmitting}>
              Deny
            </Button>
            <PrimaryButton onClick={() => decide("allow")} isLoading={isSubmitting} disabled={!ticket}>
              Allow
            </PrimaryButton>
          </div>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
