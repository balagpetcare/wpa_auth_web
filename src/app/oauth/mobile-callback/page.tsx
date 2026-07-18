import { Suspense } from "react";
import type { Metadata } from "next";
import { MobileCallbackHandler } from "@/features/oauth/components/MobileCallbackHandler";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Redirecting...",
  description: "Completing the mobile OAuth sign-in flow.",
  pathname: "/oauth/mobile-callback",
});

export default function MobileCallbackPage() {
  return (
    <Suspense>
      <MobileCallbackHandler />
    </Suspense>
  );
}
