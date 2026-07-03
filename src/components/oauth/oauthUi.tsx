import Link from "next/link";

function IconBase(props: React.SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function OAuthBadge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "info";
  children: React.ReactNode;
}) {
  const tones = {
    neutral: "bg-slate-500/10 text-slate-700 ring-slate-600/15 dark:text-slate-300",
    success: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/15 dark:text-emerald-300",
    warning: "bg-amber-500/10 text-amber-700 ring-amber-600/15 dark:text-amber-300",
    info: "bg-brand/10 text-brand ring-brand/15",
  } as const;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}

export function OAuthStatusCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-border/80 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-sm leading-6 text-muted">{description}</p>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function OAuthErrorCard({
  title,
  message,
  detail,
  actionHref,
  actionLabel,
}: {
  title: string;
  message: string;
  detail?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <OAuthStatusCard title={title} description="Your request could not be completed safely.">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {message}
        </div>
        {detail && <p className="text-sm text-muted">{detail}</p>}
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </OAuthStatusCard>
  );
}

export function OAuthLoadingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <span className="absolute inset-0 rounded-2xl border border-brand/15" />
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand/25 border-t-brand" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">Completing secure sign-in…</p>
        <p className="text-sm text-muted">Redirecting you back to the application.</p>
      </div>
    </div>
  );
}

export const oauthIcons = {
  shield: (
    <svg {...IconBase({ className: "h-5 w-5" })}>
      <path d="M12 3 20 6v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
      <path d="m9.5 12 1.8 1.8L15.5 10" />
    </svg>
  ),
  app: (
    <svg {...IconBase({ className: "h-5 w-5" })}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  ),
  key: (
    <svg {...IconBase({ className: "h-5 w-5" })}>
      <circle cx="8.5" cy="15.5" r="3.5" />
      <path d="M11.5 15.5H21l-2-2 2-2-2-2 1-1" />
    </svg>
  ),
  check: (
    <svg {...IconBase({ className: "h-5 w-5" })}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  ),
  clock: (
    <svg {...IconBase({ className: "h-5 w-5" })}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  ),
};
