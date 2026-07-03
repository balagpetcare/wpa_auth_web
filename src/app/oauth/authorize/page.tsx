import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthorizeHandler } from "@/features/oauth/components/AuthorizeHandler";

export const metadata: Metadata = {
  title: "Authorize",
};

export default function AuthorizePage() {
  return (
    <Suspense>
      <AuthorizeHandler />
    </Suspense>
  );
}
