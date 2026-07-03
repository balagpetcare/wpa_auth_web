"use client";

import { useMemo } from "react";
import type { SocialLoginProvider, SocialLoginProvidersResponse } from "@/features/social-login/types";
import { SocialLoginButton } from "./SocialLoginButton";
import { MoreLoginOptions } from "./MoreLoginOptions";

function SkeletonButton() {
  return <div className="h-[54px] animate-pulse rounded-lg bg-surface-muted" aria-hidden />;
}

export function SocialLoginSection({
  loading,
  error,
  providers,
  buildHref,
}: {
  loading: boolean;
  error?: string | null;
  providers: SocialLoginProvidersResponse;
  buildHref: (provider: SocialLoginProvider) => string;
}) {
  const mainProviders = useMemo(() => providers.main ?? [], [providers.main]);
  const moreProviders = useMemo(() => providers.more ?? [], [providers.more]);
  const hasProviders = mainProviders.length > 0 || moreProviders.length > 0;

  if (!loading && !error && !hasProviders) return null;

  return (
    <section className="mt-6 border-t border-border pt-6">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Social sign-in</h2>
        <p className="text-xs text-muted">Use a connected identity provider to continue.</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <SkeletonButton />
          <SkeletonButton />
          <SkeletonButton />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-warning/20 bg-warning-bg px-3.5 py-3 text-sm text-warning">
          {error}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {mainProviders.map((provider) => (
            <SocialLoginButton key={provider.provider} provider={provider} href={buildHref(provider)} />
          ))}
          <MoreLoginOptions providers={moreProviders} buildHref={buildHref} />
        </div>
      )}
    </section>
  );
}
