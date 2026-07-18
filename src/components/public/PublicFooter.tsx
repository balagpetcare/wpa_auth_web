import Link from "next/link";
import { appConfig } from "@/config/app";

const primaryLinks = [
  { href: appConfig.routes.home, label: "Home" },
  { href: appConfig.routes.about, label: "About" },
  { href: appConfig.routes.support, label: "Support" },
  { href: appConfig.routes.contact, label: "Contact" },
] as const;

const policyLinks = [
  { href: appConfig.routes.privacyPolicy, label: "Privacy Policy" },
  { href: appConfig.routes.termsOfService, label: "Terms of Service" },
  { href: appConfig.routes.cookiePolicy, label: "Cookie Policy" },
  { href: appConfig.routes.socialLoginInformation, label: "Social Login Information" },
  { href: appConfig.routes.security, label: "Security" },
  { href: appConfig.routes.accountDeletion, label: "Account Deletion" },
  { href: appConfig.routes.dataDeletion, label: "Data Deletion" },
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="text-lg font-semibold tracking-tight text-foreground">{appConfig.brandName}</div>
            <p className="max-w-md text-sm leading-6 text-muted">
              {appConfig.name} provides the central identity layer for connected WPA platforms, with a focus on account recovery, privacy, and secure access.
            </p>
            <div className="space-y-1 text-sm text-muted">
              <p>
                Support:{" "}
                <a className="font-medium text-brand hover:underline" href={`mailto:${appConfig.emails.support}`}>
                  {appConfig.emails.support}
                </a>
              </p>
              <p>
                Privacy:{" "}
                <a className="font-medium text-brand hover:underline" href={`mailto:${appConfig.emails.privacy}`}>
                  {appConfig.emails.privacy}
                </a>
              </p>
              <p>
                Security:{" "}
                <a className="font-medium text-brand hover:underline" href={`mailto:${appConfig.emails.security}`}>
                  {appConfig.emails.security}
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Primary footer" className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Explore</p>
            <ul className="space-y-2">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal footer" className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Policies</p>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="pt-2 text-xs leading-5 text-muted">
              Deletion request status is shown after submission using the confirmation code provided in the request flow.
            </p>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-5 text-xs text-muted-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {appConfig.legalEntityName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a className="hover:text-brand" href={appConfig.urls.publicWebsite}>
              Public website
            </a>
            <a className="hover:text-brand" href={appConfig.urls.authWebsite}>
              Auth portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
