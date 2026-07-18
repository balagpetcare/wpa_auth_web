import { Suspense } from "react";
import type { Metadata } from "next";
import { CompleteSocialEmailForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Complete your account",
  description: "Finish creating your WPA Account after social sign-in.",
  pathname: "/auth/social/complete-email",
});

export default function CompleteEmailPage() {
  return <Suspense><CompleteSocialEmailForm /></Suspense>;
}
