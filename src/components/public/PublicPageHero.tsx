import type { ReactNode } from "react";

export function PublicPageHero({
  eyebrow,
  title,
  description,
  actions,
  highlights,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  highlights?: string[];
}) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-surface p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_top_right,rgba(29,78,216,0.18),transparent_68%)]"
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div className="space-y-6">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-subtle">{eyebrow}</p>
          )}
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>

        <div className="relative">
          <div className="rounded-[28px] border border-border/70 bg-background/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-subtle">Why WPA Account</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">One identity, many WPA experiences.</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {(highlights ?? [
                "Central sign-in for connected WPA platforms",
                "Account recovery and social sign-in support",
                "Privacy-conscious account access and support channels",
              ]).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
