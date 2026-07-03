"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FormInput } from "@/components/forms/FormInput";
import { appConfig } from "@/config/app";
import { forgotPassword } from "@/features/auth/authService";
import { getErrorMessage } from "@/lib/errors";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validation";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setFormError(null);
    try {
      await forgotPassword(values.email);
      setSubmitted(true);
    } catch (err) {
      setFormError(getErrorMessage(err, "Something went wrong. Please try again."));
    }
  };

  return (
    <AuthShell maxWidth="max-w-[440px]">
      <AuthCard
        title="Reset your password"
        subtitle="We'll send a secure recovery link to the email on file."
        footer={
          <Link href={appConfig.routes.login} className="font-medium text-brand hover:underline">
            Back to sign in
          </Link>
        }
      >
        {submitted ? (
          <div className="flex flex-col gap-4">
            <AlertMessage variant="success">
              If an account exists for that email, a password reset link is on its way.
            </AlertMessage>
            <div className="rounded-2xl border border-border/70 bg-surface-muted/50 px-4 py-3 text-sm text-muted">
              Check your inbox and spam folder. The link expires after a short period for security.
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            {formError && <AlertMessage variant="error">{formError}</AlertMessage>}
            <FormInput
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <PrimaryButton type="submit" isLoading={isSubmitting}>
              Send reset link
            </PrimaryButton>
          </form>
        )}
      </AuthCard>
    </AuthShell>
  );
}
