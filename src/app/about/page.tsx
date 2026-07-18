import type { Metadata } from "next";
import { appConfig } from "@/config/app";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { buildPublicPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "About",
  description: "Learn what WPA Account is and how it supports connected WPA platforms.",
  pathname: "/about",
});

const ABOUT_POINTS = [
  "Central authentication for WPA platforms",
  "One account for connected experiences",
  "User-focused recovery and access flows",
  "Privacy and security as first-class requirements",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="About WPA Account"
          title="Built to give WPA users one secure identity across connected platforms."
          description="WPA Account is the central authentication layer for the World Pet Association ecosystem. It helps users sign in once and move between connected WPA experiences with a consistent recovery and support story."
          highlights={ABOUT_POINTS}
          actions={null}
        />

        <PublicContentSection
          eyebrow="What it is"
          title="Central authentication for connected WPA services"
          description="The public site presents WPA Account as a clear, user-facing identity service rather than a technical implementation surface."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {ABOUT_POINTS.map((point) => (
              <div key={point} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm text-foreground">
                {point}
              </div>
            ))}
          </div>
        </PublicContentSection>

        <PublicContentSection
          eyebrow="Who it serves"
          title="Designed for WPA members, users, and connected platform teams"
          description={`The ${appConfig.brandName} identity experience is intended to stay recognizable and consistent across WPA properties while keeping the public presentation simple and non-technical.`}
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
              Members can use one account instead of managing a separate login for each connected WPA platform.
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
              Support teams get a clear public landing page for account access, privacy, and security questions.
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
              WPA platform operators can route users to the same consistent login experience.
            </div>
          </div>
        </PublicContentSection>
      </main>
      <PublicFooter />
    </div>
  );
}
