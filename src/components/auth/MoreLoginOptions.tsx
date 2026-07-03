"use client";

import { useState } from "react";
import type { SocialLoginProvider } from "@/features/social-login/types";
import { SocialLoginButton } from "./SocialLoginButton";

export function MoreLoginOptions({
  providers,
  buildHref,
}: {
  providers: SocialLoginProvider[];
  buildHref: (provider: SocialLoginProvider) => string;
}) {
  const [open, setOpen] = useState(false);
  if (!providers.length) return null;

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground"
      >
        <span>More login options</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {providers.map((provider) => (
            <SocialLoginButton key={provider.provider} provider={provider} href={buildHref(provider)} />
          ))}
        </div>
      )}
    </div>
  );
}
