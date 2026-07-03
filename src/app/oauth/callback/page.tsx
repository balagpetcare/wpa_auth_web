import { Suspense } from "react";
import type { Metadata } from "next";
import { CallbackHandler } from "@/features/oauth/components/CallbackHandler";

export const metadata: Metadata = {
  title: "Completing sign-in",
};

export default function CallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}
