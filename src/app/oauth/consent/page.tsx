import { Suspense } from "react";
import type { Metadata } from "next";
import { ConsentForm } from "@/features/oauth/components/ConsentForm";

export const metadata: Metadata = {
  title: "Authorize access",
};

export default function ConsentPage() {
  return (
    <Suspense>
      <ConsentForm />
    </Suspense>
  );
}
