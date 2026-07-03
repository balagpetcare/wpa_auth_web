"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthLogo } from "@/components/branding/AuthLogo";
import { Button } from "@/components/ui/Button";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";
import { StatusBadge } from "./accountUi";

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

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
    <div className="min-h-screen bg-[#f7f5f1]">
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col px-4 py-6 sm:px-6 sm:py-8">
        <header className="rounded-[28px] border border-border/70 bg-surface px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <AuthLogo className="shrink-0" />
              <div className="hidden rounded-full border border-border/70 bg-surface-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-subtle sm:inline-flex">
                WPA / World Pet Association
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-subtle">Security</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Protect your account</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Keep only the essential recovery and session controls here.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={user.emailVerifiedAt ? "success" : "warning"}>
                Email {user.emailVerifiedAt ? "verified" : "not verified"}
              </StatusBadge>
            </div>
          </div>
        </header>

        <main className="mt-6 space-y-4">
          <section className="rounded-[28px] border border-border/80 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Password</h2>
            <p className="mt-1 text-sm text-muted">Send a secure reset link to your email address.</p>
            <div className="mt-4">
              <Link
                href={appConfig.routes.forgotPassword}
                className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Send reset link
              </Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-border/80 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Email verification</h2>
            <p className="mt-1 text-sm text-muted">
              {user.emailVerifiedAt
                ? `Verified on ${formatDate(user.emailVerifiedAt)}.`
                : "Verify your email to keep recovery working."}
            </p>
            <div className="mt-4">
              {user.emailVerifiedAt ? (
                <StatusBadge tone="success">Verified</StatusBadge>
              ) : (
                <Link
                  href={appConfig.routes.verifyOtp}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                >
                  Verify now
                </Link>
              )}
            </div>
          </section>

          <section className="rounded-[28px] border border-border/80 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Current session</h2>
            <p className="mt-1 text-sm text-muted">Sign out this device if needed.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" className="w-auto rounded-full px-4" onClick={handleLogout}>
                Sign out this device
              </Button>
            </div>
          </section>

          <div className="pt-2">
            <Button
              variant="ghost"
              className="w-auto px-0 text-sm"
              onClick={() => router.push(appConfig.routes.account)}
            >
              Back to account
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
