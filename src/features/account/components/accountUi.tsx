"use client";

import Link from "next/link";

function iconStroke(props: React.SVGProps<SVGSVGElement>) {
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

export function StatusBadge({
  tone = "neutral",
  children,
}: {
  tone?: "success" | "warning" | "neutral" | "info";
  children: React.ReactNode;
}) {
  const tones = {
    success: "bg-emerald-500/12 text-emerald-700 ring-emerald-600/15 dark:text-emerald-300",
    warning: "bg-amber-500/12 text-amber-700 ring-amber-600/15 dark:text-amber-300",
    neutral: "bg-slate-500/10 text-slate-700 ring-slate-600/15 dark:text-slate-300",
    info: "bg-brand/10 text-brand ring-brand/15",
  } as const;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}

export function AccountCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-border/80 bg-surface p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function DetailRow({
  label,
  value,
  helper,
}: {
  label: string;
  value: React.ReactNode;
  helper?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-1.5 py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="space-y-1 text-sm text-foreground">
        <div className="font-medium">{value}</div>
        {helper && <div className="text-xs text-muted">{helper}</div>}
      </dd>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border/80 bg-surface-muted/60 p-5">
      <div className="flex items-start gap-4">
        {icon && <div className="rounded-2xl bg-surface p-3 text-brand shadow-sm">{icon}</div>}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
          {action && <div className="mt-4">{action}</div>}
        </div>
      </div>
    </div>
  );
}

export function ActivityTimeline({
  items,
  emptyTitle,
  emptyDescription,
}: {
  items: Array<{ title: string; meta: string; detail?: string }>;
  emptyTitle: string;
  emptyDescription: string;
}) {
  if (!items.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={
          <svg {...iconStroke({ className: "h-5 w-5" })}>
            <path d="M12 8v4l3 2" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        }
      />
    );
  }

  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full bg-brand" />
            {index !== items.length - 1 && <span className="mt-2 h-full w-px bg-border" />}
          </div>
          <div className="min-w-0 flex-1 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <StatusBadge tone="info">{item.meta}</StatusBadge>
            </div>
            {item.detail && <p className="mt-1 text-sm text-muted">{item.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PillLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
    >
      {children}
    </Link>
  );
}

export const accountIcons = {
  shield: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <path d="M12 3 20 6v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6z" />
      <path d="m9.5 12 1.8 1.8L15.5 10" />
    </svg>
  ),
  apps: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  ),
  timeline: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <path d="M12 8v4l3 2" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  key: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <circle cx="8.5" cy="15.5" r="3.5" />
      <path d="M11.5 15.5H21l-2-2 2-2-2-2 1-1" />
    </svg>
  ),
  mail: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  ),
  user: (
    <svg {...iconStroke({ className: "h-5 w-5" })}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.8-3 4.4-4.5 7-4.5s5.2 1.5 7 4.5" />
    </svg>
  ),
};
