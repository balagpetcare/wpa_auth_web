"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthCard } from "@/components/auth/AuthCard";
import { RedirectNotice } from "@/components/auth/RedirectNotice";
import { AlertMessage } from "@/components/ui/AlertMessage";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FormInput } from "@/components/forms/FormInput";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { FormFooterLink } from "@/components/forms/FormFooterLink";
import { SocialLoginSection } from "@/components/auth/SocialLoginSection";
import { appConfig } from "@/config/app";
import { register as registerUser } from "@/features/auth/authService";
import { socialLoginService } from "@/features/social-login/socialLoginService";
import type { SocialLoginProvidersResponse, SocialLoginProvider } from "@/features/social-login/types";
import { parseApiError } from "@/lib/errors";
import { buildLoginRedirect, normalizeRedirectTo, preserveSocialLoginContext } from "@/lib/redirect";
import { registerSchema, type RegisterFormValues } from "@/lib/validation";

const SERVER_FIELD_KEYS = ["email", "password", "displayName"] as const satisfies ReadonlyArray<
  keyof RegisterFormValues
>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [socialProviders, setSocialProviders] = useState<SocialLoginProvidersResponse>({ main: [], more: [] });
  const [socialLoading, setSocialLoading] = useState(true);
  const [socialError, setSocialError] = useState<string | null>(null);

  const next = normalizeRedirectTo(searchParams.get("next"));
  const clientId = searchParams.get("client_id") ?? undefined;
  const clientName = searchParams.get("client_name");
  const socialContext = useMemo(() => preserveSocialLoginContext(searchParams), [searchParams]);

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  // The API does not auto-authenticate on registration, so the account is
  // created and the user is sent to sign in explicitly.
  const loginHref =
    next === appConfig.routes.account ? appConfig.routes.login : buildLoginRedirect(next);

  const buildSocialHref = (provider: SocialLoginProvider) =>
    `${provider.startUrl}${socialContext ? `?${socialContext}` : ""}`;

  useEffect(() => {
    let alive = true;
    socialLoginService
      .getSocialLoginProviders(socialContext)
      .then((res) => {
        if (!alive) return;
        setSocialProviders(res);
        setSocialError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setSocialError(err?.message || "Social sign-up options are temporarily unavailable.");
      })
      .finally(() => {
        if (!alive) return;
        setSocialLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [socialContext]);

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null);
    try {
      await registerUser({
        email: values.email,
        displayName: values.displayName,
        password: values.password,
        clientId,
      });
      setSubmitted(true);
      setTimeout(() => router.push(loginHref), 1200);
    } catch (err) {
      const parsed = parseApiError(err);
      const matchedFields = new Set<string>();
      for (const fieldError of parsed.fieldErrors ?? []) {
        if ((SERVER_FIELD_KEYS as readonly string[]).includes(fieldError.field)) {
          setError(fieldError.field as (typeof SERVER_FIELD_KEYS)[number], {
            type: "server",
            message: fieldError.message,
          });
          matchedFields.add(fieldError.field);
        }
      }
      if (matchedFields.size === 0) {
        setFormError(parsed.message);
      }
    }
  };

  return (
    <AuthShell>
      <AuthCard
        title="Create your account"
        subtitle="Join the World Pet Association"
        footer={<FormFooterLink prompt="Already have an account?" label="Sign in" href={loginHref} />}
      >
        {clientName && <RedirectNotice appName={clientName} />}

        {submitted ? (
          <AlertMessage variant="success">
            Account created. Redirecting you to sign in…
          </AlertMessage>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {formError && <AlertMessage variant="error">{formError}</AlertMessage>}
            <FormInput
              label="Full name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              error={errors.displayName?.message}
              {...registerField("displayName")}
            />
            <FormInput
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...registerField("email")}
            />
            <PasswordInput
              label="Password"
              autoComplete="new-password"
              hint="At least 8 characters"
              error={errors.password?.message}
              {...registerField("password")}
            />
            <PasswordInput
              label="Confirm password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...registerField("confirmPassword")}
            />
            <PrimaryButton type="submit" isLoading={isSubmitting}>
              Create account
            </PrimaryButton>
          </form>
        )}

        <SocialLoginSection
          loading={socialLoading}
          error={socialError}
          providers={socialProviders}
          buildHref={buildSocialHref}
        />
      </AuthCard>
    </AuthShell>
  );
}
