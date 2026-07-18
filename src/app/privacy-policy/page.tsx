import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/public/LegalPageLayout";
import { buildPublicPageMetadata, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from "@/config/legal";
import { appConfig } from "@/config/app";

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Privacy Policy",
  description: "How WPA Account collects, uses, shares, and protects personal information.",
  pathname: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This policy explains how WPA Account processes personal information for account creation, sign-in, recovery, social login, security, support, and related WPA services."
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

      <Section title="Information we collect">
        <BulletList
          items={[
            "Registration data such as your email address, phone number, username, display name, and password when you create or update a WPA account.",
            "Login and account recovery data such as sign-in timestamps, password reset requests, email verification events, and session activity.",
            "Social provider data such as your provider user ID, email address when available, profile name, avatar, and provider-specific profile fields returned by the login provider.",
            "Security and audit data such as IP address, device and browser information, login history, token and session revocation events, and administrative or system audit entries.",
            "Deletion request data such as request source, request type, public confirmation code, review status, and lifecycle events for account or provider-specific deletion flows.",
            "Support data you send to us when you contact support or privacy/security channels.",
          ]}
        />
      </Section>

      <Section title="How we use information">
        <BulletList
          items={[
            "Create and maintain your WPA account and verify your identity.",
            "Authenticate you, keep you signed in, and recover access when you forget your password or need to verify your email.",
            "Link one or more social identities to the same WPA account when the provider and account rules allow it.",
            "Protect the service, detect abuse, investigate suspicious activity, and preserve audit trails.",
            "Respond to support, privacy, and security requests.",
            "Operate and improve the public site and the WPA Account experience.",
          ]}
        />
      </Section>

      <Section title="Data sharing">
        <p>
          We do not sell your personal information. We share information only when needed to operate WPA Account, for example with service providers that help us run hosting, authentication, messaging, storage, or support workflows.
        </p>
        <p>
          Social login also involves the provider you choose to sign in with. That provider receives the data necessary to complete the sign-in flow and may process information under its own privacy policy.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We keep account and security records only as long as needed for authentication, support, security, legal, accounting, and operational purposes. Some records such as audit logs, delivery logs, or security events may be retained longer where required for safety, fraud prevention, or legal obligations.
        </p>
        <p>
          When an account is deleted or deactivated, some information may still remain in backup, audit, or security systems for a limited period before it is removed or expires according to our retention practices.
        </p>
      </Section>

      <Section title="Account deletion">
        <p>
          Signed-in users can request account deletion from the WPA Account deletion page. Users who cannot sign in can submit a public deletion request by email or provider-specific flow. Public requests may enter manual review before they are scheduled for processing, and every approved request receives a non-sensitive confirmation code and a public status page.
        </p>
        <p>
          When a request is processed, WPA Account may revoke sessions and refresh tokens, disconnect linked social identities, and remove or anonymize account data where required by law or operational needs. Some security, audit, and legal records may still be retained for justified compliance or fraud-prevention purposes.
        </p>
      </Section>

      <Section title="Your rights">
        <BulletList
          items={[
            "Request access to the personal information we hold about you.",
            "Ask us to correct inaccurate information.",
            "Request deletion where permitted by law and product controls.",
            "Object to or restrict certain processing where applicable.",
            "Withdraw consent where processing is based on consent.",
            "Request a copy of your data in a portable format where applicable.",
          ]}
        />
      </Section>

      <Section title="Children's privacy">
        <p>
          WPA Account is not intended for children where parental consent or age restrictions apply. If you believe a child has provided personal information to us, contact us so we can review the request.
        </p>
      </Section>

      <Section title="International processing">
        <p>
          WPA Account may process and store information in locations outside your country of residence. Where required, we use contractual or operational safeguards appropriate to the service and the jurisdictions involved.
        </p>
      </Section>

      <Section title="Contact">
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
