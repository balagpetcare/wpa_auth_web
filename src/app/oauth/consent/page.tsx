import { Suspense } from "react";
import type { Metadata } from "next";
import { ConsentForm } from "@/features/oauth/components/ConsentForm";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Authorize access",
  description: "Review requested access for a connected WPA application.",
  pathname: "/oauth/consent",
});

export default function ConsentPage() {
  return (
    <Suspense>
      <ConsentForm />
    </Suspense>
  );
}
