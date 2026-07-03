import type { Metadata } from "next";
import { AccountSecurity } from "@/features/account/components/AccountSecurity";

export const metadata: Metadata = {
  title: "Security",
};

export default function AccountSecurityPage() {
  return <AccountSecurity />;
}
