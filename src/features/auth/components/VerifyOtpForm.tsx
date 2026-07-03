"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { appConfig } from "@/config/app";
import { requestOtp, verifyOtp } from "@/features/auth/authService";
import { useAuth } from "@/features/auth/context";
import { getErrorMessage } from "@/lib/errors";

type ConfirmState = "idle" | "confirming" | "success" | "error";

export function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { user, isAuthenticated, isLoading, refreshUser } = useAuth();

  const [confirmState, setConfirmState] = useState<ConfirmState>(token ? "confirming" : "idle");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    verifyOtp({ token })
      .then(async () => {
        setConfirmState("success");
        await refreshUser();
      })
      .catch((err) => {
        setConfirmState("error");
        setConfirmError(getErrorMessage(err, "Verification failed."));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleResend = async () => {
    if (!user?.email) return;
    setIsResending(true);
    setResendMessage(null);
    setResendError(null);
    try {
      await requestOtp(user.email);
      setResendMessage("Verification email sent. Check your inbox.");
    } catch (err) {
      setResendError(getErrorMessage(err, "Could not send verification email."));
    } finally {
      setIsResending(false);
    }
  };

  if (token) {
    return (
      <AuthShell maxWidth="max-w-[460px]">
        <AuthCard title="Verify your email" subtitle="Confirm your address to unlock recovery and security notifications.">
          {confirmState === "confirming" && <AlertMessage variant="loading">Verifying your email…</AlertMessage>}
          {confirmState === "success" && (
            <div className="flex flex-col gap-4">
              <AlertMessage variant="success">Your email has been verified.</AlertMessage>
              <Link
                href={appConfig.routes.account}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
              >
                Continue
              </Link>
            </div>
          )}
          {confirmState === "error" && <AlertMessage variant="error">{confirmError}</AlertMessage>}
        </AuthCard>
      </AuthShell>
    );
  }

  return (
    <AuthShell maxWidth="max-w-[460px]">
      <AuthCard title="Verify your email" subtitle="We'll send a one-time verification link to your inbox.">
        <div className="flex flex-col gap-4">
          {resendMessage && <AlertMessage variant="success">{resendMessage}</AlertMessage>}
          {resendError && <AlertMessage variant="error">{resendError}</AlertMessage>}
          {isLoading ? (
            <AlertMessage variant="loading">Checking your session…</AlertMessage>
          ) : isAuthenticated ? (
            user?.emailVerifiedAt ? (
              <AlertMessage variant="success">Your email is already verified.</AlertMessage>
            ) : (
              <>
                <p className="text-sm text-muted">
                  We&apos;ll send a link to{" "}
                  <span className="font-medium text-foreground">{user?.email}</span>.
                </p>
                <PrimaryButton onClick={handleResend} isLoading={isResending}>
                  Send verification email
                </PrimaryButton>
              </>
            )
          ) : (
            <AlertMessage variant="info">
              Sign in to request a new verification link, or check your inbox for the link we already sent.
            </AlertMessage>
          )}
        </div>
      </AuthCard>
    </AuthShell>
  );
}
