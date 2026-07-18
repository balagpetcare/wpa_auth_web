"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { appConfig } from "@/config/app";
import { deletionApi } from "@/features/deletion/api";
import type { DeletionRequestProvider, DeletionRequestType } from "@/features/deletion/types";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

const PROVIDERS: Array<{ value: DeletionRequestProvider; label: string }> = [
  { value: "GOOGLE", label: "Google" },
  { value: "FACEBOOK", label: "Facebook / Meta" },
  { value: "APPLE", label: "Apple" },
  { value: "MICROSOFT", label: "Microsoft" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "TIKTOK", label: "TikTok" },
  { value: "X", label: "X" },
  { value: "GITHUB", label: "GitHub" },
  { value: "INSTAGRAM", label: "Instagram" },
];

function requestLabel(value: DeletionRequestType) {
  return value === "ACCOUNT" ? "Account deletion" : "Social data deletion";
}

export function PublicDeletionPanel() {
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<DeletionRequestType>("ACCOUNT");
  const [provider, setProvider] = useState<DeletionRequestProvider>("FACEBOOK");
  const [explanation, setExplanation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    confirmationCode: string;
    statusUrl: string;
    status: string;
    requestType: DeletionRequestType;
    provider?: DeletionRequestProvider | null;
  } | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await deletionApi.requestPublicDeletion({
        email: email.trim(),
        requestType,
        provider: requestType === "DATA" ? provider : undefined,
        explanation: explanation.trim() || undefined,
      });
      setResult({
        confirmationCode: response.request.confirmationCode,
        statusUrl: response.request.statusUrl,
        status: response.request.status,
        requestType: response.request.requestType,
        provider: response.request.provider,
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Unable to submit the request."));
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Request submitted</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{requestLabel(result.requestType)} received</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          The request is now in review. Use the confirmation code below to check status later.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Confirmation code</p>
            <p className="mt-2 break-all font-mono text-sm text-foreground">{result.confirmationCode}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Status page</p>
            <a href={result.statusUrl} className="mt-2 inline-flex text-sm font-medium text-brand hover:underline">
              Open status page
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Status: <span className="font-medium text-foreground">{result.status.toLowerCase()}</span>
          {result.provider ? <> - Provider: <span className="font-medium text-foreground">{result.provider}</span></> : null}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={result.statusUrl} className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
            View status
          </a>
          <Link href={appConfig.routes.support} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
            Contact support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Public request</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Request deletion without signing in</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Use this form if you cannot log in or need provider-specific social data deletion. Requests enter manual review so we can prevent abuse and verify ownership.
          </p>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Email address</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
            placeholder="name@example.com"
            required
          />
        </label>

        <fieldset className="rounded-2xl border border-border/70 bg-background/70 p-4">
          <legend className="px-1 text-sm font-medium text-foreground">Request type</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["ACCOUNT", "DATA"] as DeletionRequestType[]).map((value) => (
              <label key={value} className={`rounded-2xl border px-4 py-4 text-sm ${requestType === value ? "border-brand bg-brand/5" : "border-border/70 bg-surface"}`}>
                <input
                  checked={requestType === value}
                  onChange={() => setRequestType(value)}
                  type="radio"
                  name="requestType"
                  value={value}
                  className="mr-2 align-middle"
                />
                <span className="font-medium text-foreground">{requestLabel(value)}</span>
                <span className="mt-1 block text-xs leading-5 text-muted">
                  {value === "ACCOUNT"
                    ? "Use this when the full WPA account should be deleted but you cannot log in."
                    : "Use this for provider-specific social data deletion or linked provider cleanup."}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {requestType === "DATA" && (
          <label className="block">
            <span className="text-sm font-medium text-foreground">Provider</span>
            <select
              value={provider}
              onChange={(event) => setProvider(event.target.value as DeletionRequestProvider)}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
            >
              {PROVIDERS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-5 text-muted">
              For Instagram, personal-account login is not universally available and should only be requested if that flow is actually enabled for your deployment.
            </p>
          </label>
        )}

        <label className="block">
          <span className="text-sm font-medium text-foreground">Optional details</span>
          <textarea
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
            placeholder="Add any context that helps the review team identify your account or request."
          />
        </label>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-900">
          Requests are reviewed before processing. If you are already signed in, the account-deletion page is faster and more direct.
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="primary" isLoading={submitting} className="w-auto rounded-full px-5">
            Submit request
          </Button>
          <Link href={appConfig.routes.accountDeletion} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
            Signed-in account deletion
          </Link>
        </div>
      </div>
    </form>
  );
}
