import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/public/LegalPageLayout";
import { buildPublicPageMetadata, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from "@/config/legal";
import { appConfig } from "@/config/app";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Cookie Policy",
  description: "How WPA Account uses cookies and similar technologies.",
  pathname: "/cookie-policy",
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

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="This page explains how WPA Account uses cookies and similar technologies in the public website and sign-in experience."
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

      <Section title="What we use today">
        <p>
          WPA Account is designed to work with essential sign-in and security controls. The current web application stores access and refresh tokens in browser local storage for authenticated sessions, and it does not currently rely on analytics cookies.
        </p>
        <p>
          If a deployment introduces cookies or similar technologies, they should be limited to the categories described below unless you are clearly told otherwise.
        </p>
      </Section>

      <Section title="Essential authentication">
        <BulletList
          items={[
            "Used to support sign-in, session continuity, and returning you to the correct WPA page after login when a deployment uses cookies for that purpose.",
            "Security-related session controls may be used to detect invalid or revoked sessions.",
            "These are necessary for the service to function and cannot be turned off without affecting sign-in.",
          ]}
        />
      </Section>

      <Section title="Security cookies or similar controls">
        <p>
          Security-oriented cookies or similar controls may be used to help protect the account experience, for example to reduce abuse or maintain sign-in integrity. WPA Account does not publish raw session values or provider secrets in the browser.
        </p>
      </Section>

      <Section title="Preference cookies">
        <p>
          Preference cookies or similar settings may be used if a WPA deployment offers display or interface preferences. These should remember a user choice rather than identify you for advertising.
        </p>
      </Section>

      <Section title="Analytics cookies">
        <p>
          WPA Account does not currently use analytics cookies on the public website. If analytics are introduced later, they should be documented separately and explained in the product that enables them.
        </p>
      </Section>

      <Section title="Cookie controls">
        <BulletList
          items={[
            "Use your browser settings to block, delete, or limit cookies and site data.",
            "Sign out to remove your active session from the current browser session flow.",
            "Clear site data if you want to remove locally stored sign-in tokens or other site data from this web app.",
          ]}
        />
      </Section>

      <Section title="Contact">
        <BulletList
          items={[
            `Support: ${appConfig.emails.support}`,
            `Privacy: ${appConfig.emails.privacy}`,
            `Legal entity: ${appConfig.legalEntityName}`,
          ]}
        />
      </Section>
    </LegalPageLayout>
  );
}
