import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildPublicPageMetadata } from "@/config/legal";
import { PublicDeletionPanel } from "@/features/deletion/components/PublicDeletionPanel";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Data Deletion",
  description: "Request deletion of social or account data without signing in.",
  pathname: "/data-deletion",
});

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="Data deletion"
          title="Request deletion without signing in."
          description="Use this page if you cannot access your account or need provider-specific social data deletion through a public request."
          highlights={[
            "Email-based request submission",
            "Provider-specific deletion support",
            "Confirmation code and public status page",
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <PublicDeletionPanel />
          <PublicContentSection
            eyebrow="Request options"
            title="Choose the path that matches your situation."
            description="The public flow supports both unable-to-log-in requests and provider-specific deletion requests."
          >
            <div className="space-y-3">
              {[
                {
                  title: "Unable to log in",
                  body: "Submit a public request with your email address so the review team can locate or verify the matching account.",
                },
                {
                  title: "Provider-specific deletion",
                  body: "Use this flow for linked social identities or provider-specific deletion requests, including Meta/Facebook callback requests.",
                },
                {
                  title: "Status and cancellation",
                  body: "Every approved request gets a confirmation code and a public status page. Requests can be cancelled while the grace period is active.",
                },
              ].map((option) => (
                <div key={option.title} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4">
                  <p className="text-sm font-semibold text-foreground">{option.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{option.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-900">
              Public requests are reviewed before processing. If you are already signed in, use the account-deletion page instead.
            </div>
          </PublicContentSection>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <PublicContentSection
            eyebrow="Provider notes"
            title="Social providers share the same review and status model."
            description="These notes keep the public flow accurate for the supported integrations."
          >
            <div className="grid gap-3">
              {[
                "Google, Facebook, Apple, Microsoft, LinkedIn, TikTok, X, GitHub, and Instagram-related requests can be tracked from the same public flow.",
                "Instagram personal-account login is not advertised as universally available unless the deployment actually supports it.",
                "Meta/Facebook callback requests use a signed request and then map to the same deletion lifecycle and status page.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                  {item}
                </div>
              ))}
            </div>
          </PublicContentSection>

          <PublicContentSection
            eyebrow="Need help?"
            title="Contact support"
            description="Use the public contact paths if the request form or status lookup does not fit your case."
          >
            <ContactCard />
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
