import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicContentSection } from "@/components/public/PublicContentSection";
import { ContactCard } from "@/components/public/ContactCard";
import { buildNoIndexPageMetadata } from "@/config/legal";
import { DeletionStatusPanel } from "@/features/deletion/components/DeletionStatusPanel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ confirmationCode: string }>;
}): Promise<Metadata> {
  const { confirmationCode } = await params;
  return buildNoIndexPageMetadata({
    title: "Deletion Status",
    description: "Look up a WPA deletion request using its confirmation code.",
    pathname: `/data-deletion/status/${encodeURIComponent(confirmationCode)}`,
  });
}

export default async function DeletionStatusPage({
  params,
}: {
  params: Promise<{ confirmationCode: string }>;
}) {
  const { confirmationCode } = await params;

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicPageHero
          eyebrow="Deletion status"
          title="Check a deletion request with your confirmation code."
          description="Use this page to track a request, view the grace-period deadline, or cancel while cancellation is still available."
          highlights={[
            "Confirmation-code lookup",
            "Grace-period deadline visibility",
            "Cancellation when allowed",
          ]}
        />

        <DeletionStatusPanel confirmationCode={confirmationCode} />

        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <PublicContentSection
            eyebrow="What you can do here"
            title="Track the request lifecycle"
            description="The public status page is intentionally limited to the minimum information needed to keep the request secure."
          >
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Confirm the current status and the grace-period deadline.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Cancel the request while cancellation is still permitted.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>Reach support if the request is in review, failed, or unclear.</span>
              </li>
            </ul>
          </PublicContentSection>

          <PublicContentSection
            eyebrow="Need support?"
            title="Contact the WPA team"
            description="If the confirmation code does not work or the request requires manual help, use the public support paths."
          >
            <ContactCard />
          </PublicContentSection>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
