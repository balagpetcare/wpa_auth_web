import { Suspense } from "react";
import type { Metadata } from "next";
import { VerifyOtpForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Verify email",
  description: "Verify your WPA Account sign-in code.",
  pathname: "/auth/verify-otp",
});

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
