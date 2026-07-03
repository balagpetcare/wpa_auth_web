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
    <AuthShell>
      <AuthCard
        title="Reset your password"
        subtitle="Enter your email and we'll send you a reset link"
        footer={
          <Link href={appConfig.routes.login} className="font-medium text-brand hover:underline">
            Back to sign in
          </Link>
        }
      >
        {submitted ? (
          <AlertMessage variant="success">
            If an account exists for that email, a password reset link is on its way.
          </AlertMessage>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
