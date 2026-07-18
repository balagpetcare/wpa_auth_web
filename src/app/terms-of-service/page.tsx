import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/public/LegalPageLayout";
import { buildPublicPageMetadata, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from "@/config/legal";
import { appConfig } from "@/config/app";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Terms of Service",
  description: "Rules and responsibilities for using WPA Account and connected WPA services.",
  pathname: "/terms-of-service",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These terms describe how WPA Account may be used and what responsibilities apply when you sign in to WPA services."
      updatedLabel={`Effective date: ${LEGAL_EFFECTIVE_DATE} | Last updated: ${LEGAL_LAST_UPDATED}`}
    >
      <Section title="Policy dates">
        <p>
          Effective date: <span className="font-medium text-foreground">{LEGAL_EFFECTIVE_DATE}</span>
        </p>
        <p>
          Last updated: <span className="font-medium text-foreground">{LEGAL_LAST_UPDATED}</span>
        </p>
      </Section>

      <Section title="Eligibility">
        <p>
          You must be able to enter into a binding agreement where you live, and you must comply with applicable laws and any age or parental consent requirements that apply to the WPA service you are using.
        </p>
      </Section>

      <Section title="Account responsibilities">
        <BulletList
          items={[
            "Keep your password, verification codes, recovery options, and session access secure.",
            "Provide accurate information when you create or update your account.",
            "Use your account only for legitimate WPA purposes.",
            "Notify us if you suspect unauthorized access or a security incident involving your account.",
          ]}
        />
      </Section>

      <Section title="Acceptable use">
        <BulletList
          items={[
            "Do not attempt to bypass authentication, security controls, or rate limits.",
            "Do not use WPA Account to impersonate another person or submit false information.",
            "Do not abuse social login, account recovery, or support processes.",
            "Do not upload or transmit malware, spam, or unlawful content through WPA services.",
          ]}
        />
      </Section>

      <Section title="Social login">
        <p>
          If social login is enabled by a WPA deployment, you may be asked to sign in with a third-party identity provider. The information returned by each provider can vary based on the provider, account type, and consent granted.
        </p>
        <p>
          WPA may link a social identity to your WPA account to simplify future sign-in and account recovery, subject to the provider rules and the account-linking behavior described on the social login information page.
        </p>
      </Section>

      <Section title="Connected WPA applications">
        <p>
          WPA Account can be used by connected WPA applications or platforms that rely on the central identity service. A connected application may have its own terms, privacy notice, or additional requirements.
        </p>
      </Section>

      <Section title="Suspension and termination">
        <p>
          We may suspend or terminate access if we believe your account or activity creates a security risk, violates these terms, violates another policy, or creates legal or operational concerns. We may also limit access while investigating suspicious activity.
        </p>
      </Section>

      <Section title="Intellectual property">
        <p>
          WPA Account, associated logos, branding, text, and software are protected by intellectual property laws and remain the property of their respective owners. You may not copy or reuse them except where permitted by law or written authorization.
        </p>
      </Section>

      <Section title="Liability limitations">
        <p>
          To the maximum extent permitted by law, WPA Account is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not guarantee uninterrupted or error-free service, and our liability is limited to the extent allowed by applicable law.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          We may update these terms from time to time. When we do, we will revise the last updated date on this page and may provide additional notice when appropriate.
        </p>
      </Section>

      <Section title="Contact information">
        <BulletList
          items={[
            `Support: ${appConfig.emails.support}`,
            `Privacy: ${appConfig.emails.privacy}`,
            `Security: ${appConfig.emails.security}`,
            `Legal entity: ${appConfig.legalEntityName}`,
          ]}
        />
      </Section>
    </LegalPageLayout>
  );
}
