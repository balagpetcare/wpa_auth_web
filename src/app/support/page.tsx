import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildPublicPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Support",
  description: "Support resources for WPA Account sign-in and account recovery.",
  pathname: "/support",
});

const SUPPORT_TOPICS = [
  {
    title: "Can't sign in?",
    body: "Use password reset or the login options shown on the sign-in page if your WPA platform has social login enabled.",
  },
  {
    title: "Need account recovery?",
    body: "Contact support if you cannot complete the self-service recovery flow or need help regaining access.",
  },
  {
    title: "Privacy or security concern?",
    body: "Use the privacy or security email channels for data, safety, or suspicious activity questions.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="Support"
          title="Support for sign-in, recovery, and account protection."
          description="WPA Account support focuses on keeping access simple and secure for people using connected WPA platforms."
          highlights={[
            "Password reset and recovery paths",
            "Social sign-in guidance when enabled",
            "Privacy and security contact routes",
          ]}
          actions={null}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <PublicContentSection
            eyebrow="Common help topics"
            title="Start with the issue you are seeing"
            description="These are the most common WPA Account support requests."
          >
            <div className="grid gap-3">
              {SUPPORT_TOPICS.map((topic) => (
                <div key={topic.title} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4">
                  <p className="text-sm font-semibold text-foreground">{topic.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{topic.body}</p>
                </div>
              ))}
            </div>
          </PublicContentSection>

          <PublicContentSection
            eyebrow="Support contact"
            title="Talk to the WPA team"
            description="If self-service does not solve the issue, use the public contact channels."
          >
            <ContactCard />
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
