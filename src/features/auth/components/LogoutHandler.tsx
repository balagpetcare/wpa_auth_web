"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { useAuth } from "@/features/auth/context";
import { buildLoginRedirect, isValidHttpUrl, normalizeRedirectTo } from "@/lib/redirect";

export function LogoutHandler() {
  const searchParams = useSearchParams();
  const { logout } = useAuth();
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

  // Only ever redirect to a well-formed http(s) URL. Unlike the OAuth
  // authorize/consent flows, there is no backend validation of this value
  // here (logout doesn't call back into the API with it), so this frontend
  // check is the only guard — anything malformed or non-http(s) is dropped
  // rather than handed to window.location.
  const rawRedirectUri = searchParams.get("redirect_uri");
  const redirectUri = isValidHttpUrl(rawRedirectUri) ? rawRedirectUri : null;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    void logout().finally(() => {
      if (redirectUri) {
        window.location.href = redirectUri;
      } else {
        setDone(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginHref = buildLoginRedirect(normalizeRedirectTo(searchParams.get("next")));

  return (
    <AuthShell>
      <AuthCard title="Signed out">
        {done ? (
          <div className="flex flex-col gap-4">
            <AlertMessage variant="success">You have been signed out.</AlertMessage>
            <Link href={loginHref} className="text-sm font-medium text-brand hover:underline">
              Sign in again
            </Link>
          </div>
        ) : (
          <AlertMessage variant="loading">Signing you out…</AlertMessage>
        )}
      </AuthCard>
    </AuthShell>
  );
}
