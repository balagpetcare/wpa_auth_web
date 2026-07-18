import type { Metadata } from "next";
import { AccountOverview } from "@/features/account/components/AccountOverview";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Account",
  description: "Signed-in account settings for WPA Account users.",
  pathname: "/account",
});

export default function AccountPage() {
  return <AccountOverview />;
}
