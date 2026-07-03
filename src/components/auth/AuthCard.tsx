export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="mb-6 flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
      {footer && <div className="text-center text-sm text-muted">{footer}</div>}
    </div>
  );
}
