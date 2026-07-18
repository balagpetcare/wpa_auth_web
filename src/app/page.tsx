import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildPublicPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildPublicPageMetadata({
  title: appConfig.name,
  description: appConfig.tagline,
  pathname: "/",
});

const LOGIN_METHODS = [
  "Email and password",
  "Email verification and password reset",
  "Social login for enabled providers",
  "Account recovery and session management",
];

const PLATFORM_BENEFITS = [
  {
    title: "World Pet Association identity",
    body: "WPA Account is the central sign-in layer for connected WPA platforms and services.",
  },
  {
    title: "One account across WPA products",
    body: "Use one account to access participating WPA experiences without re-creating credentials for every platform.",
  },
  {
    title: "Privacy and security by design",
    body: "We keep access, recovery, and support flows focused on the minimum information needed to identify and protect your account.",
  },
];

const SECURITY_POINTS = [
  "Protected sign-in flows with secure token handling",
  "Account recovery and session controls for end users",
  "Social sign-in support for enabled providers",
  "Clear contact paths for privacy and security questions",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow={appConfig.brandName}
          title="WPA Account keeps connected WPA platforms in one secure place."
          description="World Pet Association members and platform users can sign in with one central account across connected WPA experiences, with recovery, privacy, and support tools built in."
          actions={
            <>
              <Link
                href={appConfig.routes.login}
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Sign in
              </Link>
              <Link
                href={appConfig.routes.support}
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
              >
                Get support
              </Link>
            </>
          }
          highlights={[
            "One account for connected WPA platforms",
            "Social and password-based sign-in options",
            "Privacy-conscious recovery and support access",
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {PLATFORM_BENEFITS.map((item) => (
            <PublicContentSection key={item.title} title={item.title}>
              <p className="text-sm leading-6 text-muted">{item.body}</p>
            </PublicContentSection>
          ))}
        </div>

        <PublicContentSection
          eyebrow="Supported login methods"
          title="Flexible sign-in for real-world WPA use cases."
          description="The login experience supports the account recovery paths already built into WPA Central Auth and the social providers that are enabled for a given deployment."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LOGIN_METHODS.map((method) => (
              <div key={method} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-foreground">
                {method}
              </div>
            ))}
          </div>
        </PublicContentSection>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <PublicContentSection
            eyebrow="Privacy and security"
            title="We keep the public story simple: secure access, clear recovery, and minimal disclosure."
            description="The public site explains how WPA Account works without exposing administrative, internal, or implementation details."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {SECURITY_POINTS.map((point) => (
                <div key={point} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                  {point}
                </div>
              ))}
            </div>
          </PublicContentSection>

          <PublicContentSection
            eyebrow="Contact and support"
            title="Need help?"
            description="Use the public contact paths below for account access, privacy questions, and security concerns."
          >
            <ContactCard />
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
