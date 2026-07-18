import { Suspense } from "react";
import type { Metadata } from "next";
import { LogoutHandler } from "@/features/auth/components/LogoutHandler";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Sign out",
  description: "Sign out of your WPA Account.",
  pathname: "/auth/logout",
});

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutHandler />
    </Suspense>
  );
}
