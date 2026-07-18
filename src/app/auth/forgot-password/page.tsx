import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Forgot password",
  description: "Request a password reset for your WPA Account.",
  pathname: "/auth/forgot-password",
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
