"use client";

import { Button } from "@/components/ui/Button";
import type { SocialLoginProvider } from "@/features/social-login/types";

function GenericIcon() {
  return <span className="inline-block h-4 w-4 rounded-full bg-current/20" aria-hidden />;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.95h5.6c-.24 1.2-1.45 3.52-5.6 3.52a6.5 6.5 0 1 1 0-13c1.86 0 3.1.8 3.81 1.49l2.6-2.5C16.91 1.96 14.72 1 12 1 6.48 1 2 5.48 2 11s4.48 10 10 10c5.72 0 9.52-4.02 9.52-9.7 0-.65-.07-1.14-.15-1.58H12Z" />
      <path fill="#FBBC05" d="M3.56 7.36 6.6 9.58A6.48 6.48 0 0 1 12 5c1.86 0 3.1.8 3.81 1.49l2.6-2.5C16.91 1.96 14.72 1 12 1 8.22 1 4.96 3.1 3.56 7.36Z" />
      <path fill="#34A853" d="m12 21c2.67 0 4.91-.88 6.55-2.39l-3.03-2.47c-.84.58-1.99.99-3.52.99a6.5 6.5 0 0 1-6.1-4.25L2.8 15.2C4.17 18.34 7.78 21 12 21Z" />
      <path fill="#4285F4" d="M21.52 11.3H12v3.95h5.6c-.42 2.1-2.09 3.27-3.51 3.27h-.01l3.03 2.47C18.57 19.35 22 16.46 22 11.7c0-.4-.04-.86-.48-1.1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.85v-8.32h-3.04V12h3.04V9.41c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.86V12h3.32l-.53 3.53h-2.79v8.32A12 12 0 0 0 24 12Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#0A66C2" d="M20.45 20.45h-3.56v-5.55c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.65H9.37V9h3.42v1.56h.05c.48-.9 1.66-1.84 3.41-1.84 3.65 0 4.32 2.4 4.32 5.52v6.21ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.09.68-.22.68-.5v-1.9c-2.78.62-3.37-1.38-3.37-1.38-.46-1.19-1.12-1.51-1.12-1.51-.92-.65.07-.64.07-.64 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.35 1.13 2.92.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.13-4.56-5.01 0-1.1.38-2 1.01-2.71-.1-.26-.44-1.31.1-2.74 0 0 .82-.27 2.69 1.03A9.17 9.17 0 0 1 12 6.95c.83 0 1.67.11 2.45.34 1.87-1.3 2.69-1.03 2.69-1.03.54 1.43.2 2.48.1 2.74.63.71 1 1.61 1 2.71 0 3.89-2.34 4.75-4.57 5.01.36.32.68.95.68 1.92v2.84c0 .28.18.59.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#25F4EE"
        d="M15.8 2c.5 2.7 2.1 4.7 4.7 5v3.2c-1.6.1-3.1-.4-4.4-1.2v5.7c0 4.1-3.3 7.3-7.4 7.3S1.3 18.8 1.3 14.7s3.3-7.3 7.4-7.3c.4 0 .8 0 1.2.1v3.5c-.4-.1-.8-.2-1.2-.2a3.9 3.9 0 1 0 3.9 3.9V2h3.2Z"
      />
      <path
        fill="#FE2C55"
        d="M16.4 2c.5 2.7 2.1 4.7 4.7 5v3.2c-1.6.1-3.1-.4-4.4-1.2v5.7c0 4.1-3.3 7.3-7.4 7.3-1.6 0-3.1-.5-4.4-1.3 1.5 1.6 3.6 2.6 5.9 2.6 4.1 0 7.4-3.3 7.4-7.3V9.1c1.3.8 2.8 1.3 4.4 1.2V7.1c-2.6-.3-4.2-2.3-4.7-5H16.4Z"
        opacity=".9"
      />
      <path
        fill="currentColor"
        d="M15.1 2c.5 2.7 2.1 4.7 4.7 5v3.2c-1.6.1-3.1-.4-4.4-1.2v5.7c0 4.1-3.3 7.3-7.4 7.3-2.3 0-4.4-1-5.9-2.6-.8-1.1-1.3-2.4-1.3-3.8 0-4.1 3.3-7.3 7.4-7.3.4 0 .8 0 1.2.1v3.5c-.4-.1-.8-.2-1.2-.2a3.9 3.9 0 1 0 3.9 3.9V2h3Z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M3 3h5.1l5.1 7.1L18.8 3H21l-7.9 9 8.3 12H16l-5.6-7.7L5.5 24H3.2l8.3-9.6L3 3Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="#E1306C" />
      <path fill="#F58529" d="M4.5 7.5c.4-1.9 1.5-3 3.5-3.5h8c1.9.5 3 1.6 3.5 3.5v1.5H4.5V7.5Z" />
      <path fill="#833AB4" d="M4.5 16.5V11h15v5.5c-.4 1.9-1.5 3-3.5 3.5H8c-1.9-.5-3-1.6-3.5-3.5Z" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="16.9" cy="7.2" r="1.1" fill="white" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M16.4 2.5c-1.1.1-2.5.8-3.2 1.7-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.5-.6 3.3-1.4.8-.9 1.3-2.2 1-3.6ZM19.6 17.2c-.6 1.4-.9 2-1.7 3.1-1.1 1.6-2.5 3.5-4.3 3.6-1.6.1-2.1-1-4.1-1s-2.5 1-4.1 1c-1.8-.1-3.1-1.8-4.2-3.4-2.3-3.3-2.5-7.1-1-9.5 1-1.7 2.7-2.8 4.6-2.8 1.8 0 3 1 4.6 1 1.5 0 2.5-1 4.6-1 1.6 0 3.2.9 4.2 2.4-3.5 1.9-3 6.7-.6 8.6Z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <span className="inline-grid h-4 w-4 grid-cols-2 gap-[1px]" aria-hidden>
      <span className="bg-[#F35325]" />
      <span className="bg-[#81BC06]" />
      <span className="bg-[#05A6F0]" />
      <span className="bg-[#FFBA08]" />
    </span>
  );
}

function iconFor(provider: string) {
  switch (provider.toLowerCase()) {
    case "google":
      return <GoogleIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "apple":
      return <AppleIcon />;
    case "microsoft":
      return <MicrosoftIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "github":
      return <GitHubIcon />;
    case "tiktok":
      return <TikTokIcon />;
    case "x":
      return <XIcon />;
    case "instagram":
      return <InstagramIcon />;
    default:
      return <GenericIcon />;
  }
}

export function SocialLoginButton({
  provider,
  href,
}: {
  provider: SocialLoginProvider;
  href: string;
}) {
  return (
    <Button
      variant="secondary"
      className="h-auto justify-start border-border/80 bg-surface px-4 py-3 text-left shadow-none hover:bg-surface-muted"
      onClick={() => {
        window.location.href = href;
      }}
    >
      <span className="flex w-full items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background text-foreground shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          {iconFor(provider.provider)}
        </span>
        <span className="flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground">{provider.displayName}</span>
          <span className="text-xs text-muted">Secure login</span>
        </span>
      </span>
    </Button>
  );
}
