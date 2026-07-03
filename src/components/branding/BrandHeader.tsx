import Link from "next/link";
import { AuthLogo } from "@/components/branding/AuthLogo";
import { appConfig } from "@/config/app";

function PawMark({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-brand text-white"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="currentColor">
        <circle cx="7" cy="7.5" r="2.1" />
        <circle cx="12" cy="5.2" r="2.1" />
        <circle cx="17" cy="7.5" r="2.1" />
        <circle cx="19" cy="12.5" r="2" />
        <path d="M12 12c-3.4 0-6.4 2.3-6.4 5.2 0 1.7 1.4 2.8 3 2.4 1.1-.3 2.1-.9 3.4-.9s2.3.6 3.4.9c1.6.4 3-.7 3-2.4 0-2.9-3-5.2-6.4-5.2Z" />
      </svg>
    </span>
  );
}

interface BrandHeaderProps {
  variant?: "full" | "compact";
  href?: string;
  showTagline?: boolean;
}

export function BrandHeader({ variant = "full", href = "/", showTagline = false }: BrandHeaderProps) {
  if (variant === "compact") {
    return (
      <Link href={href} className="flex items-center gap-2.5">
        <PawMark size={28} />
        <span className="text-sm font-semibold tracking-tight text-foreground">{appConfig.name}</span>
      </Link>
    );
  }

  return (
    <Link href={href} className="flex flex-col items-center gap-3 text-center">
      <AuthLogo />
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-subtle">
          Central Account
        </span>
        {showTagline && <span className="mt-1 max-w-xs text-xs text-muted">{appConfig.tagline}</span>}
      </div>
    </Link>
  );
}
