import type { ReactNode } from "react";

export function PublicContentSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-border/70 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
      <div className="mb-5 space-y-2">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-subtle">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description && <p className="max-w-3xl text-sm leading-6 text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
