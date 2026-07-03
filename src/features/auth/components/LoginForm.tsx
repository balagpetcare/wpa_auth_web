"use client";

import Link from "next/link";
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
import { login } from "@/features/auth/authService";
import { useAuth } from "@/features/auth/context";
import { socialLoginService } from "@/features/social-login/socialLoginService";
import type { SocialLoginProvidersResponse, SocialLoginProvider } from "@/features/social-login/types";
import { parseApiError } from "@/lib/errors";
import { normalizeRedirectTo, preserveSocialLoginContext } from "@/lib/redirect";
import { loginSchema, type LoginFormValues } from "@/lib/validation";

const SERVER_FIELD_KEYS = ["emailOrUsername", "password"] as const satisfies ReadonlyArray<
  keyof LoginFormValues
>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthenticatedUser } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [socialProviders, setSocialProviders] = useState<SocialLoginProvidersResponse>({ main: [], more: [] });
  const [socialLoading, setSocialLoading] = useState(true);
  const [socialError, setSocialError] = useState<string | null>(null);

  const next = normalizeRedirectTo(searchParams.get("next"));
  const clientId = searchParams.get("client_id") ?? undefined;
  const clientName = searchParams.get("client_name");
  const socialContext = useMemo(() => preserveSocialLoginContext(searchParams), [searchParams]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      const result = await login(values.emailOrUsername, values.password, next, clientId);
      setAuthenticatedUser(result.user);
      router.push(result.redirectTo ?? next);
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

  const registerHref = `${appConfig.routes.register}${
    next !== appConfig.routes.account ? `?next=${encodeURIComponent(next)}` : ""
  }`;

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
        setSocialError(err?.message || "Social sign-in options are temporarily unavailable.");
      })
      .finally(() => {
        if (!alive) return;
        setSocialLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [socialContext]);

  return (
    <AuthShell>
      <AuthCard
        title="Sign in"
        subtitle="Use your WPA account to continue"
        footer={<FormFooterLink prompt="Don't have an account?" label="Create one" href={registerHref} />}
      >
        {clientName && <RedirectNotice appName={clientName} />}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {formError && <AlertMessage variant="error">{formError}</AlertMessage>}
          <FormInput
            label="Email or phone number"
            type="text"
            inputMode="email"
            autoComplete="username"
            placeholder="you@example.com"
            error={errors.emailOrUsername?.message}
            {...register("emailOrUsername")}
          />
          <div className="flex flex-col gap-1.5">
            <PasswordInput
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Link
              href={appConfig.routes.forgotPassword}
              className="self-end text-xs font-medium text-brand hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PrimaryButton type="submit" isLoading={isSubmitting}>
            Continue
          </PrimaryButton>
        </form>

        <SocialLoginSection
          loading={socialLoading}
          error={socialError}
          providers={socialProviders}
          buildHref={buildSocialHref}
        />

        {!socialLoading && !socialError && socialProviders.main.length === 0 && socialProviders.more.length === 0 && (
          <>
            <div className="my-5 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-subtle">OR</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              disabled
              title="One-time code sign-in is coming soon"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-subtle"
            >
              Sign in with a one-time code
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Coming soon
              </span>
            </button>
          </>
        )}
      </AuthCard>
    </AuthShell>
  );
}
