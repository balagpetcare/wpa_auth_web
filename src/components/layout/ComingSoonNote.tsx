/**
 * Standard "not built yet" marker for account-area features that don't have
 * a backing API endpoint. Never render fabricated data next to this — if a
 * feature shows this note, its section must not also claim real values.
 */
export function ComingSoonNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-dashed border-border bg-surface-muted px-3.5 py-3">
      <p className="text-sm text-muted">{children}</p>
      <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-subtle">
        Coming soon
      </span>
    </div>
  );
}
