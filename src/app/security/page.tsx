import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/public/LegalPageLayout";
import { buildPublicPageMetadata, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from "@/config/legal";
import { appConfig } from "@/config/app";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Security",
  description: "How WPA Account approaches account protection, session safety, and responsible disclosure.",
  pathname: "/security",
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

export default function SecurityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: appConfig.legalEntityName,
        url: appConfig.urls.publicWebsite,
        email: appConfig.emails.support,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: appConfig.emails.support,
          },
          {
            "@type": "ContactPoint",
            contactType: "privacy",
            email: appConfig.emails.privacy,
          },
          {
            "@type": "ContactPoint",
            contactType: "security",
            email: appConfig.emails.security,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: "Security",
        url: `${appConfig.urls.publicWebsite}/security`,
        about: appConfig.brandName,
      },
    ],
  };

  return (
    <LegalPageLayout
      title="Security"
      description="This page explains how to contact us about security issues and how WPA Account handles sessions and account protection."
      updatedLabel={`Effective date: ${LEGAL_EFFECTIVE_DATE} | Last updated: ${LEGAL_LAST_UPDATED}`}
      sidebar={
        <section className="rounded-[28px] border border-border/70 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Security contact</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Report responsible disclosure issues to <a className="font-medium text-brand hover:underline" href={`mailto:${appConfig.emails.security}`}>{appConfig.emails.security}</a>.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            For account access questions, use <a className="font-medium text-brand hover:underline" href={`mailto:${appConfig.emails.support}`}>{appConfig.emails.support}</a>.
          </p>
          <p className="mt-3 rounded-2xl border border-warning/20 bg-warning-bg px-4 py-3 text-sm leading-6 text-warning">
            Never send your password, recovery codes, or access tokens by email.
          </p>
        </section>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Section title="Policy dates">
        <p>
          Effective date: <span className="font-medium text-foreground">{LEGAL_EFFECTIVE_DATE}</span>
        </p>
        <p>
          Last updated: <span className="font-medium text-foreground">{LEGAL_LAST_UPDATED}</span>
        </p>
      </Section>

      <Section title="Responsible disclosure">
        <p>
          If you discover a vulnerability, contact the security team at <span className="font-medium text-foreground">{appConfig.emails.security}</span> and include a clear description of the issue, affected page or flow, and any reproduction steps that do not expose user data.
        </p>
        <BulletList
          items={[
            "Do not publicly disclose an issue before the team has had a reasonable chance to review it.",
            "Do not access, alter, or exfiltrate data you are not authorized to access.",
            "Keep proof-of-concept details limited to what is needed to reproduce the problem safely.",
          ]}
        />
      </Section>

      <Section title="Never send passwords">
        <p>
          WPA will never ask you to email your password, recovery token, private key, or access token. If anyone requests those details, treat it as suspicious and report it to the security team.
        </p>
      </Section>

      <Section title="Encryption and session overview">
        <BulletList
          items={[
            "Sensitive provider credentials are handled on the server and are not displayed in the browser.",
            "WPA Account issues access and refresh tokens to the web app for authenticated sessions.",
            "The current web client stores those tokens in browser local storage and clears them on logout or when the session becomes invalid.",
            "The API supports session revocation, logout-all, account deletion, and audit logging for security review.",
          ]}
        />
        <p>
          We do not claim security certifications or encryption methods on this page beyond what the product actually implements and what each deployment configures.
        </p>
      </Section>

      <Section title="When to contact us">
        <BulletList
          items={[
            "You think someone else may have accessed your account.",
            "A social login provider returned data you did not expect.",
            "A sign-in or session issue looks like a security bug.",
            "You want to report a phishing attempt or suspicious contact related to WPA Account.",
          ]}
        />
      </Section>
    </LegalPageLayout>
  );
}
