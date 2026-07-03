"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { FormInput } from "@/components/forms/FormInput";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { socialLoginService } from "@/features/social-login/socialLoginService";
import { normalizeRedirectTo, preserveSocialLoginContext } from "@/lib/redirect";
import { parseApiError } from "@/lib/errors";

export function CompleteSocialEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState(searchParams.get("token") ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const next = normalizeRedirectTo(searchParams.get("next"));
  const socialContext = useMemo(() => preserveSocialLoginContext(searchParams), [searchParams]);

  const requestCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await socialLoginService.requestSocialEmailCompletion(token, email);
      setToken(res.completionToken);
      setSuccess("Verification request sent. Enter the code from your email.");
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await socialLoginService.confirmSocialEmailCompletion(token, email, code);
      router.push(next + (socialContext ? `?${socialContext}` : ""));
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell maxWidth="max-w-[460px]">
      <AuthCard title="Complete account" subtitle="Add an email to continue securely.">
        {error && <AlertMessage variant="error">{error}</AlertMessage>}
        {success && <AlertMessage variant="success">{success}</AlertMessage>}
        <div className="flex flex-col gap-4">
          <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <FormInput label="Verification code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter the code from your email" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <PrimaryButton type="button" onClick={requestCode} isLoading={loading}>Send code</PrimaryButton>
            <PrimaryButton type="button" onClick={confirm} isLoading={loading}>Continue</PrimaryButton>
          </div>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
