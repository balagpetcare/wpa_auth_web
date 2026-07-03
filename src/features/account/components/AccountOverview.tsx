"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { AuthLogo } from "@/components/branding/AuthLogo";
import { Button } from "@/components/ui/Button";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";
import { StatusBadge } from "./accountUi";

function userInitials(name: string | null | undefined, email: string | null | undefined) {
  const source = (name ?? email ?? "W").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "W";
  const second = parts[1]?.[0] ?? source[1] ?? "";
  return (parts.length > 1 ? `${first}${second}` : source.slice(0, 2)).toUpperCase();
}

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

function Row({ label, value, badge }: { label: string; value: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-subtle">{label}</p>
        <div className="mt-1 text-sm text-foreground">{value}</div>
      </div>
      {badge}
    </div>
  );
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

  const profileName = user?.displayName ?? user?.username ?? user?.email ?? "WPA Account";
  const initials = useMemo(() => userInitials(user?.displayName, user?.email), [user?.displayName, user?.email]);

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
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <AuthLogo className="shrink-0" />
              <div className="hidden rounded-full border border-border/70 bg-surface-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-subtle sm:inline-flex">
                Central Identity
              </div>
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-hover text-lg font-semibold text-white shadow-lg shadow-brand/20">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-subtle">
                  WPA Central Account
                </p>
                <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-foreground">
                  {profileName}
                </h1>
                <p className="mt-1 truncate text-sm text-muted">{user.email ?? "No email on file"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge tone={user.emailVerifiedAt ? "success" : "warning"}>
                    Email {user.emailVerifiedAt ? "verified" : "not verified"}
                  </StatusBadge>
                  <StatusBadge tone={user.phoneVerifiedAt ? "success" : "neutral"}>
                    Phone {user.phoneVerifiedAt ? "verified" : "not verified"}
                  </StatusBadge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {!user.emailVerifiedAt && (
                <Link
                  href={appConfig.routes.verifyOtp}
                  className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  Verify email
                </Link>
              )}
              <Button
                variant="secondary"
                className="w-auto rounded-full px-4"
                onClick={() => router.push(appConfig.routes.accountSecurity)}
              >
                Manage security
              </Button>
              <Button variant="secondary" className="w-auto rounded-full px-4" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          </div>
        </header>

        <main className="mt-6 space-y-6">
          <section className="rounded-[28px] border border-border/80 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="mb-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Account</h2>
              <p className="text-sm text-muted">Essential identity details only.</p>
            </div>
            <div className="divide-y divide-border/70">
              <Row label="Name" value={user.displayName ?? <span className="text-muted-subtle">Not added</span>} />
              <Row
                label="Email"
                value={user.email ?? <span className="text-muted-subtle">Not added</span>}
                badge={
                  <StatusBadge tone={user.emailVerifiedAt ? "success" : "warning"}>
                    {user.emailVerifiedAt ? "Verified" : "Not verified"}
                  </StatusBadge>
                }
              />
              <Row
                label="Phone"
                value={user.phone ?? <span className="text-muted-subtle">Not added</span>}
                badge={
                  user.phone ? (
                    <StatusBadge tone={user.phoneVerifiedAt ? "success" : "neutral"}>
                      {user.phoneVerifiedAt ? "Verified" : "Not verified"}
                    </StatusBadge>
                  ) : null
                }
              />
              <Row label="Username" value={user.username ?? <span className="text-muted-subtle">Not added</span>} />
              {formatDate(user.createdAt) && <Row label="Member since" value={formatDate(user.createdAt)} />}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
