import { Suspense } from "react";
import type { Metadata } from "next";
import { CompleteSocialEmailForm } from "@/features/auth/components";

export const metadata: Metadata = { title: "Complete your account" };

export default function CompleteEmailPage() {
  return <Suspense><CompleteSocialEmailForm /></Suspense>;
}
