"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ComingSoonNote } from "@/components/layout/ComingSoonNote";
import { AccountShell } from "@/components/layout/AccountShell";
import { SectionCard } from "@/components/layout/SectionCard";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";

export function AccountSecurity() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`${appConfig.routes.login}?next=${appConfig.routes.accountSecurity}`);
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push(appConfig.routes.login);
  };

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
      </div>
    );
  }

  return (
    <AccountShell activeTab="security">
      {/* Real: POST /auth/forgot-password + /auth/reset-password already exist and are wired up. */}
      <SectionCard title="Password" description="Change your password via a secure email link.">
        <Link href={appConfig.routes.forgotPassword} className="text-sm font-medium text-brand hover:underline">
          Send password reset link
        </Link>
      </SectionCard>

      {/* Real: POST /auth/verify-email/request + /confirm already exist and are wired up. */}
      <SectionCard title="Email verification" description="Confirm ownership of your email address.">
        {user.emailVerifiedAt ? (
          <p className="text-sm text-foreground">Your email is verified.</p>
        ) : (
          <Link href={appConfig.routes.verifyOtp} className="text-sm font-medium text-brand hover:underline">
            Verify your email
          </Link>
        )}
      </SectionCard>

      {/*
        TODO(api): no TOTP/SMS 2FA enrollment or challenge endpoints exist
        on the API yet. Build this once endpoints such as
        POST /auth/mfa/enroll, POST /auth/mfa/verify, POST /auth/mfa/disable
        (naming TBD by backend) are available.
      */}
      <SectionCard title="Two-factor authentication" description="Add an extra layer of protection to your account.">
        <ComingSoonNote>
          Two-factor authentication isn&apos;t available yet. This section will let you enroll a
          one-time-code app or SMS backup once it ships.
        </ComingSoonNote>
      </SectionCard>

      {/*
        TODO(api): no endpoint exists to list/revoke individual refresh-token
        sessions (e.g. GET /auth/sessions, DELETE /auth/sessions/:id). The
        only session control available today is signing out of *this*
        device via POST /auth/logout, exposed below as a real action.
      */}
      <SectionCard title="Active sessions" description="Devices and browsers currently signed in.">
        <div className="flex flex-col gap-3">
          <ComingSoonNote>
            A list of your active sessions across devices isn&apos;t available yet.
          </ComingSoonNote>
          <div className="flex items-center justify-between rounded-lg border border-border bg-surface-muted px-3.5 py-3">
            <span className="text-sm text-foreground">This device</span>
            <Button variant="secondary" className="w-auto px-3 py-1.5 text-xs" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </SectionCard>

      {/*
        TODO(api): no endpoint exists yet to list or remove trusted/remembered
        devices. Build this once a device-trust endpoint is available.
      */}
      <SectionCard title="Trusted devices" description="Devices you've marked as trusted for faster sign-in.">
        <ComingSoonNote>
          Trusted device management isn&apos;t available yet.
        </ComingSoonNote>
      </SectionCard>

      {/*
        TODO(api): GET /auth/me exposes `lastLoginAt` only. A full login
        history endpoint (timestamp, IP, device, location, outcome) does not
        exist yet — build this section once one is available.
      */}
      <SectionCard title="Login history" description="A record of recent sign-ins to your account.">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-muted">Last sign-in</span>
            <span className="text-sm font-medium text-foreground">
              {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}
            </span>
          </div>
          <ComingSoonNote>A full login history isn&apos;t available yet.</ComingSoonNote>
        </div>
      </SectionCard>

      <SectionCard title="Back to account" description="Return to your account overview.">
        <Link href={appConfig.routes.account} className="text-sm font-medium text-brand hover:underline">
          Go to account
        </Link>
      </SectionCard>
    </AccountShell>
  );
}
