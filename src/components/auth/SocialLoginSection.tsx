"use client";

import { useMemo } from "react";
import type { SocialLoginProvider, SocialLoginProvidersResponse } from "@/features/social-login/types";
import { MoreLoginOptions } from "./MoreLoginOptions";
import { SocialLoginButton } from "./SocialLoginButton";

function SkeletonButton() {
  return <div className="h-[56px] animate-pulse rounded-2xl bg-surface-muted" aria-hidden />;
}

const PRIORITY: Record<string, number> = {
  google: 0,
  facebook: 1,
  apple: 2,
  microsoft: 3,
  linkedin: 4,
  github: 5,
  tiktok: 6,
  x: 7,
  instagram: 8,
};

function sortProviders(list: SocialLoginProvider[]) {
  return [...list].sort((a, b) => {
    const aRank = PRIORITY[a.provider.toLowerCase()] ?? 999;
    const bRank = PRIORITY[b.provider.toLowerCase()] ?? 999;
    return aRank - bRank || a.displayName.localeCompare(b.displayName);
  });
}

export function SocialLoginSection({
  loading,
  error,
  providers,
  buildHref,
  label = "Continue with",
}: {
  loading: boolean;
  error?: string | null;
  providers: SocialLoginProvidersResponse;
  buildHref: (provider: SocialLoginProvider) => string;
  label?: string;
}) {
  const mainProviders = useMemo(() => sortProviders(providers.main ?? []), [providers.main]);
  const moreProviders = useMemo(() => sortProviders(providers.more ?? []), [providers.more]);
  const hasProviders = mainProviders.length > 0 || moreProviders.length > 0;

  if (!loading && !error && !hasProviders) return null;

  return (
    <section className="mt-6 border-t border-border/70 pt-6">
      <div className="relative mb-5 flex items-center">
        <div className="h-px flex-1 bg-border/70" />
        <span className="mx-3 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-muted">
          {label}
        </span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-warning/20 bg-warning-bg px-3.5 py-3 text-sm text-warning">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {mainProviders.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {mainProviders.map((provider) => (
                <SocialLoginButton
                  key={provider.provider}
                  provider={provider}
                  href={buildHref(provider)}
                />
              ))}
            </div>
          )}
          {moreProviders.length > 0 && (
            <div className="rounded-[24px] border border-border/70 bg-surface/70 p-3.5 sm:p-4">
              <MoreLoginOptions providers={moreProviders} buildHref={buildHref} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
