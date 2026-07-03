import { Suspense } from "react";
import type { Metadata } from "next";
import { LogoutHandler } from "@/features/auth/components/LogoutHandler";

export const metadata: Metadata = {
  title: "Sign out",
};

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutHandler />
    </Suspense>
  );
}
