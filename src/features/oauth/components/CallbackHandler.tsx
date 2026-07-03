"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { normalizeRedirectTo } from "@/lib/redirect";

/**
 * Landing point for identity-provider redirects that terminate on this auth
 * site itself (e.g. social login popups) rather than on a downstream client
 * app's redirect_uri. Surfaces provider errors, otherwise forwards on to the
 * account page or an explicit `next` path.
 */
export function CallbackHandler() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = normalizeRedirectTo(searchParams.get("next"));
  const hasRedirected = useRef(false);

  const [status] = useState<"redirecting" | "error">(error ? "error" : "redirecting");

  useEffect(() => {
    if (error || hasRedirected.current) return;
    hasRedirected.current = true;
    window.location.href = next;
  }, [error, next]);

  return (
    <AuthShell>
      <AuthCard title="Completing sign-in">
        {status === "error" ? (
          <AlertMessage variant="error">
            {errorDescription ?? error ?? "Sign-in could not be completed."}
          </AlertMessage>
        ) : (
          <AlertMessage variant="loading">Finishing up, please wait…</AlertMessage>
        )}
      </AuthCard>
    </AuthShell>
  );
}
