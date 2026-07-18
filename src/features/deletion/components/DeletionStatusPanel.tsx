"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { appConfig } from "@/config/app";
import { deletionApi } from "@/features/deletion/api";
import type { DeletionRequestDetail, DeletionRequestStatus } from "@/features/deletion/types";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function toneClasses(status: DeletionRequestStatus) {
  switch (status) {
    case "COMPLETED":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "SCHEDULED":
      return "text-amber-700 bg-amber-50 border-amber-200";
    case "PROCESSING":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "CANCELLED":
      return "text-slate-700 bg-slate-100 border-slate-200";
    case "REJECTED":
    case "FAILED":
      return "text-red-700 bg-red-50 border-red-200";
    case "PENDING_REVIEW":
    default:
      return "text-violet-700 bg-violet-50 border-violet-200";
  }
}

function formatDate(value?: string | null) {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function DeletionStatusPanel({ confirmationCode }: { confirmationCode: string }) {
  const router = useRouter();
  const [lookupCode, setLookupCode] = useState(confirmationCode);
  const [currentCode, setCurrentCode] = useState(confirmationCode);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [detail, setDetail] = useState<DeletionRequestDetail | null>(null);

  const load = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deletionApi.getStatus(code);
      setDetail(response.data as DeletionRequestDetail);
      setCurrentCode(code);
      setLookupCode(code);
    } catch (error: unknown) {
      setDetail(null);
      setError(getErrorMessage(error, "Unable to load that request."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load(confirmationCode);
    }, 0);
    return () => clearTimeout(timer);
  }, [confirmationCode]);

  const submitLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lookupCode.trim()) return;
    await load(lookupCode.trim());
    router.replace(`${appConfig.routes.dataDeletion}/status/${encodeURIComponent(lookupCode.trim())}`);
  };

  const cancel = async () => {
    if (!detail) return;
    setCanceling(true);
    setError(null);
    try {
      await deletionApi.cancelByConfirmationCode(detail.confirmationCode);
      await load(detail.confirmationCode);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Unable to cancel the request."));
    } finally {
      setCanceling(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submitLookup} className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Status lookup</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Enter a confirmation code to check the current deletion status or use the code from your request receipt.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={lookupCode}
            onChange={(event) => setLookupCode(event.target.value)}
            type="text"
            className="min-w-0 flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand"
            placeholder="Confirmation code"
          />
          <Button type="submit" className="w-auto rounded-full px-5">
            Look up status
          </Button>
        </div>
      </form>

      <div className="rounded-[28px] border border-border/70 bg-surface/96 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        {loading ? (
          <div className="text-sm text-muted">Loading request status...</div>
        ) : error ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={appConfig.routes.contact} className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
                Contact support
              </Link>
              <Link href={appConfig.routes.dataDeletion} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
                Start over
              </Link>
            </div>
          </div>
        ) : detail ? (
          <div className="space-y-5">
            <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${toneClasses(detail.status)}`}>
              {detail.status.toLowerCase().replaceAll("_", " ")}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Request type</p>
                <p className="mt-2 text-sm text-foreground">{detail.requestType === "ACCOUNT" ? "Account deletion" : "Social data deletion"}</p>
                {detail.provider && <p className="mt-1 text-sm text-muted">Provider: {detail.provider}</p>}
                <p className="mt-1 text-sm text-muted">Source: {detail.requestSource.replaceAll("_", " ").toLowerCase()}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Confirmation code</p>
                <p className="mt-2 break-all font-mono text-sm text-foreground">{detail.confirmationCode}</p>
                <p className="mt-1 text-sm text-muted">Created: {formatDate(detail.requestedAt)}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Grace period</p>
                <p className="mt-2 text-sm text-foreground">{formatDate(detail.gracePeriodDeadlineAt)}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Processed</p>
                <p className="mt-2 text-sm text-foreground">{formatDate(detail.processedAt)}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-subtle">Reference</p>
                <p className="mt-2 text-sm text-foreground">{currentCode}</p>
              </div>
            </div>

            {detail.failureReason && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="status">
                {detail.failureReason}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {detail.canCancel ? (
                <Button type="button" variant="danger" isLoading={canceling} onClick={cancel} className="w-auto rounded-full px-5">
                  Cancel request
                </Button>
              ) : null}
              <Link href={appConfig.routes.contact} className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted">
                Contact support
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
