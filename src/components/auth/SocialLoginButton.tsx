"use client";

import { Button } from "@/components/ui/Button";
import { SocialLoginProvider } from "@/features/social-login/types";

const ICONS: Record<string, React.ReactNode> = {
  google: <GIcon />,
  facebook: <FBIcon />,
  apple: <AppleIcon />,
  microsoft: <MicrosoftIcon />,
  linkedin: <GenericIcon />,
  tiktok: <GenericIcon />,
  x: <GenericIcon />,
  github: <GenericIcon />,
  instagram: <GenericIcon />,
};

function GenericIcon() {
  return <span className="inline-block h-4 w-4 rounded-full bg-current/20" aria-hidden />;
}

function GIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current/20 text-[9px] font-bold" aria-hidden>G</span>;
}

function FBIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current/20 text-[9px] font-bold" aria-hidden>f</span>;
}

function AppleIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current/20 text-[9px] font-bold" aria-hidden></span>;
}

function MicrosoftIcon() {
  return <span className="inline-grid h-4 w-4 grid-cols-2 gap-[1px]" aria-hidden>
    <span className="bg-current/80" />
    <span className="bg-current/60" />
    <span className="bg-current/60" />
    <span className="bg-current/40" />
  </span>;
}

export function SocialLoginButton({
  provider,
  href,
}: {
  provider: SocialLoginProvider;
  href: string;
}) {
  const key = provider.provider.toLowerCase();
  return (
    <Button
      variant="secondary"
      className="justify-start border-border/80 bg-surface px-4 py-3 text-left shadow-none hover:bg-surface-muted"
      onClick={() => {
        window.location.href = href;
      }}
    >
      <span className="flex w-full items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground">
          {ICONS[key] ?? <GenericIcon />}
        </span>
        <span className="flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground">Continue with {provider.displayName}</span>
          <span className="text-xs text-muted">Secure external login</span>
        </span>
      </span>
    </Button>
  );
}
