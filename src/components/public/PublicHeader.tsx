import Link from "next/link";
import { AuthLogo } from "@/components/branding/AuthLogo";
import { appConfig } from "@/config/app";

const NAV_ITEMS = [
  { href: appConfig.routes.about, label: "About" },
  { href: appConfig.routes.support, label: "Support" },
  { href: appConfig.routes.contact, label: "Contact" },
] as const;

export function PublicHeader() {
  return (
    <header className="border-b border-border/60 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={appConfig.routes.home} aria-label={`${appConfig.brandName} home`} className="inline-flex items-center">
            <AuthLogo className="shrink-0" />
          </Link>
          <Link
            href={appConfig.routes.login}
            className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover lg:hidden"
          >
            Sign in
          </Link>
        </div>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-brand-soft hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={appConfig.routes.contact}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
          >
            Contact
          </Link>
          <Link
            href={appConfig.routes.login}
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
