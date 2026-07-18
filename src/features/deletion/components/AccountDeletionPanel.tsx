"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { appConfig } from "@/config/app";
import { useAuth } from "@/features/auth/context";
import { deletionApi } from "@/features/deletion/api";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function statusTone(status: string) {
  switch (status) {
    case "COMPLETED":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "SCHEDULED":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "PROCESSING":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "CANCELLED":
      return "text-slate-700 bg-slate-100 border-slate-200";
    case "FAILED":
    case "REJECTED":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-slate-700 bg-slate-100 border-slate-200";
  }
}

export function AccountDeletionPanel() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    confirmationCode: string;
    statusUrl: string;
    status: string;
    gracePeriodDeadlineAt?: string | null;
  } | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!confirm) {
      setError("Confirm the checkbox before continuing.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await deletionApi.requestAccountDeletion({
        confirm: true,
        password: password.trim() || undefined,
      });
      setResult({
        confirmationCode: response.data.confirmationCode,
        statusUrl: response.data.statusUrl,
        status: response.data.status,
        gracePeriodDeadlineAt: response.data.gracePeriodDeadlineAt,
      });
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Unable to submit the deletion request."));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="rounded-[28px] border border-border/70 bg-surface/96 p-6 text-sm text-muted">Loading your account details...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sign in to request deletion</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Account deletion for a signed-in WPA account starts from your account session so we can confirm ownership.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={appConfig.routes.login} className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
            Sign in
          </Link>
          <Link href={appConfig.routes.dataDeletion} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
            Public data deletion
          </Link>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusTone(result.status)}`}>
          Request {result.status.toLowerCase()}
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Deletion request received</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Your request is scheduled for processing after the grace period ends. Keep the confirmation code below if you need to check status or cancel before processing.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Confirmation code</dt>
            <dd className="mt-2 font-mono text-sm text-foreground break-all">{result.confirmationCode}</dd>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Status page</dt>
            <dd className="mt-2 text-sm text-foreground">
              <a className="font-medium text-brand hover:underline" href={result.statusUrl}>
                View deletion status
              </a>
            </dd>
          </div>
        </dl>
        {result.gracePeriodDeadlineAt && (
          <p className="mt-4 text-sm leading-6 text-muted">
            Grace period deadline: <span className="font-medium text-foreground">{new Date(result.gracePeriodDeadlineAt).toLocaleString()}</span>
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={result.statusUrl} className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
            Open status page
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
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">Signed-in account</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Delete {user.displayName ?? user.email ?? "your account"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            The request enters a grace period before it is processed. During that period you can use the confirmation code to cancel the request.
          </p>
        </div>

        <div className="grid gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Signed in as</p>
            <p className="mt-1 font-medium text-foreground">{user.email ?? user.username ?? user.displayName ?? "WPA user"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Current status</p>
            <p className="mt-1 font-medium text-foreground">{user.status.replaceAll("_", " ").toLowerCase()}</p>
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm leading-6 text-foreground">
          <input
            checked={confirm}
            onChange={(event) => setConfirm(event.target.checked)}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand"
            required
          />
          <span>
            I understand this request will delete my WPA account data after the grace period and disconnect any linked social identities.
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Current password, if your account uses one</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
            placeholder="Enter your current password"
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="danger" isLoading={submitting} className="w-auto rounded-full px-5">
            Request account deletion
          </Button>
          <Link href={appConfig.routes.account} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
            Back to account
          </Link>
        </div>
      </div>
    </form>
  );
}
