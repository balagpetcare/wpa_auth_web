"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { appConfig } from "@/config/app";
import { resetPassword } from "@/features/auth/authService";
import { getErrorMessage } from "@/lib/errors";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validation";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      setFormError("This reset link is missing a token. Please request a new one.");
      return;
    }
    setFormError(null);
    try {
      await resetPassword({ token, password: values.password });
      setSuccess(true);
      setTimeout(() => router.push(appConfig.routes.login), 1500);
    } catch (err) {
      setFormError(getErrorMessage(err, "Something went wrong. Please try again."));
    }
  };

  return (
    <AuthShell maxWidth="max-w-[440px]">
      <AuthCard
        title="Set a new password"
        subtitle="Choose a strong password to secure your WPA account."
        footer={
          <Link href={appConfig.routes.login} className="font-medium text-brand hover:underline">
            Back to sign in
          </Link>
        }
      >
        {!token && <AlertMessage variant="error">This reset link is invalid or expired.</AlertMessage>}
        {success ? (
          <div className="flex flex-col gap-4">
            <AlertMessage variant="success">Your password has been reset. Redirecting to sign in…</AlertMessage>
            <div className="rounded-2xl border border-border/70 bg-surface-muted/50 px-4 py-3 text-sm text-muted">
              You can now sign in with your new password.
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            {formError && <AlertMessage variant="error">{formError}</AlertMessage>}
            <PasswordInput
              label="New password"
              autoComplete="new-password"
              hint="At least 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />
            <PasswordInput
              label="Confirm new password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <PrimaryButton type="submit" isLoading={isSubmitting} disabled={!token}>
              Reset password
            </PrimaryButton>
          </form>
        )}
      </AuthCard>
    </AuthShell>
  );
}
