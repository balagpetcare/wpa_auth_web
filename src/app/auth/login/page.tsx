import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Sign in",
  description: "Sign in to your WPA Account.",
  pathname: "/auth/login",
});

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
