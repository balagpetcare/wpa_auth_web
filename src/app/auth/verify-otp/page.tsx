import { Suspense } from "react";
import type { Metadata } from "next";
import { VerifyOtpForm } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Verify email",
};

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
