"use client";

import type { SocialLoginProvider } from "@/features/social-login/types";
import { SocialLoginButton } from "./SocialLoginButton";

export function MoreLoginOptions({
  providers,
  buildHref,
}: {
  providers: SocialLoginProvider[];
  buildHref: (provider: SocialLoginProvider) => string;
}) {
  if (!providers.length) return null;

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Sign in with more options</p>
        <div className="h-px flex-1 bg-border/70" />
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {providers.map((provider) => (
          <SocialLoginButton key={provider.provider} provider={provider} href={buildHref(provider)} />
        ))}
      </div>
    </div>
  );
}
