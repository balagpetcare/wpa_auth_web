import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildPublicPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Contact",
  description: "Contact WPA support, privacy, and security teams.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="Contact WPA Account"
          title="Reach the WPA team for account access, privacy, or security help."
          description="Use the contact paths below for sign-in issues, account recovery, privacy questions, or security concerns tied to WPA Account and connected WPA services."
          highlights={[
            "Account access and recovery",
            "Privacy and data questions",
            "Security and abuse reporting",
          ]}
          actions={null}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_.85fr]">
          <PublicContentSection
            eyebrow="Contact details"
            title="Public contact channels"
            description="These channels are intended for WPA users and partners who need help with the public account experience."
          >
            <ContactCard />
          </PublicContentSection>

          <PublicContentSection
            eyebrow="What to include"
            title="Help us route your request"
            description="A short message makes it easier to direct the request to the right team."
          >
            <div className="grid gap-3">
              <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                Include the email address associated with the account and the WPA platform you were using when the issue happened.
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                For privacy requests, mention whether you are asking about access, correction, export, or deletion.
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                For security concerns, describe the behavior you saw and when it occurred.
              </div>
            </div>
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
