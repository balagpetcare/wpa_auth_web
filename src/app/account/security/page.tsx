import type { Metadata } from "next";
import { AccountSecurity } from "@/features/account/components/AccountSecurity";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Security",
  description: "Signed-in security settings for WPA Account users.",
  pathname: "/account/security",
});

export default function AccountSecurityPage() {
  return <AccountSecurity />;
}
