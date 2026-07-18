import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthorizeHandler } from "@/features/oauth/components/AuthorizeHandler";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Authorize",
  description: "Authorize access for a connected WPA application.",
  pathname: "/oauth/authorize",
});

export default function AuthorizePage() {
  return (
    <Suspense>
      <AuthorizeHandler />
    </Suspense>
  );
}
