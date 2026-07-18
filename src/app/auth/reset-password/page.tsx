import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Reset password",
  description: "Set a new password for your WPA Account.",
  pathname: "/auth/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
