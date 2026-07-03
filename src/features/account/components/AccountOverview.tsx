"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { ComingSoonNote } from "@/components/layout/ComingSoonNote";
import { AccountShell } from "@/components/layout/AccountShell";
import { SectionCard } from "@/components/layout/SectionCard";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";

function VerifiedBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1.5 text-success">
        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Verified
      </span>
    );
  }
  return <span className="text-muted">Not verified</span>;
}

export function AccountOverview() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`${appConfig.routes.login}?next=${appConfig.routes.account}`);
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
    <AccountShell
      activeTab="account"
      actions={
        <Button variant="secondary" className="w-auto px-4" onClick={handleLogout}>
          Sign out
        </Button>
      }
    >
      {!user.emailVerifiedAt && (
        <AlertMessage variant="warning">
          Your email address isn&apos;t verified yet.{" "}
          <Link href={appConfig.routes.verifyOtp} className="font-medium underline">
            Verify now
          </Link>
        </AlertMessage>
      )}

      <SectionCard title="Account" description="Your profile and contact details.">
        <dl className="flex flex-col divide-y divide-border">
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Name</dt>
            <dd className="text-sm font-medium text-foreground">{user.displayName ?? "—"}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Email</dt>
            <dd className="text-sm font-medium text-foreground">{user.email ?? "—"}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Phone</dt>
            <dd className="text-sm font-medium text-foreground">{user.phone ?? "—"}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Username</dt>
            <dd className="text-sm font-medium text-foreground">{user.username ?? "—"}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Email verified</dt>
            <dd className="text-sm font-medium">
              <VerifiedBadge verified={Boolean(user.emailVerifiedAt)} />
            </dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm text-muted">Phone verified</dt>
            <dd className="text-sm font-medium">
              <VerifiedBadge verified={Boolean(user.phoneVerifiedAt)} />
            </dd>
          </div>
        </dl>
      </SectionCard>

      {/*
        TODO(api): no endpoint exists yet to list OAuth clients this user has
        granted consent to (e.g. GET /oauth/consents or similar) or to revoke
        one. The API currently only exposes POST /oauth/consent for granting
        a *new* ticket during an authorize flow. Wire this up once that
        listing/revocation endpoint exists — do not fabricate app entries.
      */}
      <SectionCard title="Connected apps" description="Third-party apps you've given access to your account.">
        <ComingSoonNote>
          Connected app management isn&apos;t available yet. You&apos;ll be able to review and revoke
          access here once it ships.
        </ComingSoonNote>
      </SectionCard>

      {/*
        TODO(api): GET /auth/me returns `lastLoginAt`, which we show below,
        but there is no endpoint yet for a fuller login/security event feed
        (IP, device, location, failed attempts, etc). Extend this once such
        an endpoint exists.
      */}
      <SectionCard title="Recent activity" description="Login and security activity on your account.">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-muted">Last sign-in</span>
            <span className="text-sm font-medium text-foreground">
              {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "—"}
            </span>
          </div>
          <ComingSoonNote>
            A full login and security history isn&apos;t available yet.
          </ComingSoonNote>
        </div>
      </SectionCard>

      <SectionCard title="Security" description="Manage your password and account access.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            type="button"
            className="sm:w-auto sm:px-5"
            onClick={() => router.push(appConfig.routes.accountSecurity)}
          >
            Manage security
          </PrimaryButton>
          <Button variant="secondary" className="sm:w-auto sm:px-5" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </SectionCard>
    </AccountShell>
  );
}
