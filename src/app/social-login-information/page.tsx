import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/public/LegalPageLayout";
import { buildPublicPageMetadata, LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from "@/config/legal";
import { appConfig } from "@/config/app";

type ProviderRow = {
  provider: string;
  dataRequested: string;
  purpose: string;
  emailAvailability: string;
  accountLinking: string;
  disconnect: string;
};

const providers: ProviderRow[] = [
  {
    provider: "Google",
    dataRequested: "Verified email when available, basic profile name, avatar, and Google subject ID.",
    purpose: "Used to sign you in and connect the Google identity to your WPA account.",
    emailAvailability: "Usually available when the provider and account permit it.",
    accountLinking: "The Google identity is linked to one WPA account and will not be moved to a different account automatically.",
    disconnect: "Remove the linked identity from WPA account settings when available, or contact support for help unlinking it.",
  },
  {
    provider: "Facebook",
    dataRequested: "Facebook user ID, name, email when available, and profile image data when returned by the provider.",
    purpose: "Used to authenticate you and manage the linked Facebook identity.",
    emailAvailability: "Varies by account settings, consent, and the provider response.",
    accountLinking: "Facebook identities are linked by provider ID and are not silently merged across accounts.",
    disconnect: "Disconnect from WPA account settings when available, or contact support to request unlinking.",
  },
  {
    provider: "Apple",
    dataRequested: "Apple subject ID and, when provided, the email address and display name shared by Apple.",
    purpose: "Used for Apple sign-in and account linkage.",
    emailAvailability: "May be relay-based or unavailable on later sign-ins after the initial consent.",
    accountLinking: "Apple identities are linked by the Apple subject identifier and verified email is not assumed to be permanent.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "Microsoft",
    dataRequested: "Microsoft subject ID, name, email when returned, and profile image data when available.",
    purpose: "Used to authenticate you and keep the Microsoft identity connected to your WPA account.",
    emailAvailability: "Usually available when the provider and account permit it.",
    accountLinking: "Microsoft identities are linked by provider ID and are not auto-moved between accounts.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "LinkedIn",
    dataRequested: "LinkedIn user ID, profile name, email when available, and profile fields returned through the approved scopes.",
    purpose: "Used to sign you in when LinkedIn login is enabled for the deployment.",
    emailAvailability: "Depends on approved LinkedIn scopes and account permissions.",
    accountLinking: "LinkedIn identities are linked to one WPA account and only used when the provider is configured and active.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "TikTok",
    dataRequested: "TikTok user ID and profile data available through the approved TikTok scopes.",
    purpose: "Used to support TikTok sign-in where the provider is configured and permitted.",
    emailAvailability: "Email may not be available and depends on the approved TikTok product and scopes.",
    accountLinking: "TikTok identities are linked by provider ID; email is not treated as guaranteed.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "X",
    dataRequested: "X user ID, profile name, and profile fields available through the approved X scopes.",
    purpose: "Used to support X sign-in when the provider is enabled.",
    emailAvailability: "Often unavailable; do not rely on X to provide an email address.",
    accountLinking: "X identities are linked by provider ID and may require an additional account completion step if email is missing.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "GitHub",
    dataRequested: "GitHub user ID, profile name, profile image, and email access when the user:email scope is granted.",
    purpose: "Used to authenticate you and link GitHub to your WPA account.",
    emailAvailability: "Depends on GitHub privacy settings and granted scopes.",
    accountLinking: "GitHub identities are linked by provider ID; email is only used when the provider returns it.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
  {
    provider: "Instagram",
    dataRequested: "Instagram profile or basic identity data when supported by the configured provider; email is not generally reliable.",
    purpose: "Used only where the deployment explicitly configures Instagram sign-in support.",
    emailAvailability: "Not generally available and should not be assumed.",
    accountLinking: "Instagram personal-account login is not universally supported; it should only be shown when the configured provider truly supports the flow.",
    disconnect: "Disconnect from WPA account settings when available, or contact support for unlinking help.",
  },
];

export const metadata: Metadata = buildPublicPageMetadata({
  title: "Social Login Information",
  description: "Provider-specific information about WPA Account social sign-in behavior.",
  pathname: "/social-login-information",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}

export default function SocialLoginInformationPage() {
  return (
    <LegalPageLayout
      title="Social Login Information"
      description="This page explains what each social provider can share with WPA Account and how linked identities behave."
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

      <Section title="How social login works">
        <p>
          When a WPA deployment enables a social provider, you can sign in or link that provider to your WPA account. The exact data returned by the provider depends on the provider, the scopes requested, and the permissions you grant.
        </p>
        <p>
          WPA links each social identity to one WPA account. The same provider identity is not silently moved to a different account.
        </p>
      </Section>

      <Section title="Provider details">
        <div className="overflow-x-auto rounded-2xl border border-border/70">
          <table className="min-w-[980px] w-full border-collapse text-left text-sm">
            <thead className="bg-surface-muted">
              <tr>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">Provider</th>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">Data requested</th>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">Purpose</th>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">Email availability</th>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">Account-linking behavior</th>
                <th className="border-b border-border/70 px-4 py-3 font-semibold text-foreground">How to disconnect</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((row) => (
                <tr key={row.provider} className="align-top">
                  <td className="border-b border-border/70 px-4 py-4 font-semibold text-foreground">{row.provider}</td>
                  <td className="border-b border-border/70 px-4 py-4">{row.dataRequested}</td>
                  <td className="border-b border-border/70 px-4 py-4">{row.purpose}</td>
                  <td className="border-b border-border/70 px-4 py-4">{row.emailAvailability}</td>
                  <td className="border-b border-border/70 px-4 py-4">{row.accountLinking}</td>
                  <td className="border-b border-border/70 px-4 py-4">{row.disconnect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Instagram availability note">
        <p>
          Instagram personal-account login may not be generally supported. Do not advertise it as universally available unless the deployment actually has the provider configured and the supported Instagram flow is working for that account type.
        </p>
      </Section>

      <Section title="Support contact">
        <p>
          If you need help with a linked social identity, contact support at <span className="font-medium text-foreground">{appConfig.emails.support}</span>.
        </p>
      </Section>
    </LegalPageLayout>
  );
}
