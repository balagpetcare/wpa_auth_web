import { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components";
import { buildNoIndexPageMetadata } from "@/config/legal";

export const metadata: Metadata = buildNoIndexPageMetadata({
  title: "Create account",
  description: "Create a WPA Account.",
  pathname: "/auth/register",
});

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
