import { Suspense } from "react";
import type { Metadata } from "next";
import { CallbackHandler } from "@/features/oauth/components/CallbackHandler";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Completing sign-in",
  description: "Completing OAuth sign-in for a connected WPA application.",
  pathname: "/oauth/callback",
});

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}
