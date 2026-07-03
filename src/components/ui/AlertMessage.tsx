type AlertVariant = "error" | "success" | "info" | "warning" | "loading";

const variantClasses: Record<AlertVariant, string> = {
  error: "bg-danger-bg text-danger border-danger/20",
  success: "bg-success-bg text-success border-success/20",
  info: "bg-brand-soft text-brand border-brand/20",
  warning: "bg-warning-bg text-warning border-warning/20",
  loading: "bg-brand-soft text-brand border-brand/20",
};

function VariantIcon({ variant }: { variant: AlertVariant }) {
  if (variant === "loading") {
    return (
      <span
        aria-hidden
        className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
      />
    );
  }

  const paths: Record<Exclude<AlertVariant, "loading">, string> = {
    error: "M12 8v5m0 3h.01M10.3 3.9 2.7 17a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z",
    success: "m5 13 4 4L19 7",
    info: "M12 8h.01M11 12h1v5h1",
    warning: "M12 8v5m0 3h.01M10.3 3.9 2.7 17a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z",
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d={paths[variant]} />
      {(variant === "info" || variant === "success") && <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

export function AlertMessage({
  variant = "info",
  children,
}: {
  variant?: AlertVariant;
  children: React.ReactNode;
}) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${variantClasses[variant]}`}
    >
      <VariantIcon variant={variant} />
      <span>{children}</span>
    </div>
  );
}
