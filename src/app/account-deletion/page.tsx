import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildPublicPageMetadata } from "@/config/legal";
import { AccountDeletionPanel } from "@/features/deletion/components/AccountDeletionPanel";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Account Deletion",
  description: "Request deletion of your signed-in WPA Account.",
  pathname: "/account-deletion",
});

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="Account deletion"
          title="Request deletion from a signed-in WPA session."
          description="Use this page when you are already signed in and want the WPA team to delete your account after a short grace period."
          highlights={[
            "Grace-period warning before processing",
            "Current password confirmation when available",
            "Confirmation code for cancellation and status lookup",
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <AccountDeletionPanel />
          <PublicContentSection
            eyebrow="What gets removed"
            title="Deletion is broader than a logout."
            description="When the request is processed, WPA removes account access and disconnects linked identities where required."
          >
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Account profile data tied to the WPA account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Linked social identities and provider access tokens</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Active sessions, refresh tokens, API keys, and other user-scoped credentials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Avatar data and other profile fields that can be safely cleared</span>
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
              The request does not complete immediately. Keep the confirmation code if you need to cancel within the grace period.
            </div>
          </PublicContentSection>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <PublicContentSection
            eyebrow="How it works"
            title="A short, accountable deletion lifecycle."
          >
            <div className="grid gap-3">
              {[
                "Confirm the checkbox and submit the request from your signed-in account.",
                "The request enters a configurable grace period before processing starts.",
                "Use the confirmation code to cancel the request or check status later.",
              ].map((step, index) => (
                <div key={step} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-sm leading-6 text-muted">
                  <span className="mr-2 font-semibold text-foreground">{index + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </PublicContentSection>

          <PublicContentSection
            eyebrow="Need help?"
            title="Contact the WPA team"
            description="If you cannot complete the form or need a different deletion path, use the public support channels."
          >
            <ContactCard />
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
