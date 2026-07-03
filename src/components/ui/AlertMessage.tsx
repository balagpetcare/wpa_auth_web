type AlertVariant = "error" | "success" | "info" | "warning" | "loading";

const variantClasses: Record<AlertVariant, string> = {
  error: "bg-rose-500/10 text-rose-700 border-rose-500/20 dark:text-rose-300",
  success: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300",
  info: "bg-brand/10 text-brand border-brand/20",
  warning: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300",
  loading: "bg-brand/10 text-brand border-brand/20",
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
      className={`flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-sm shadow-[0_8px_20px_rgba(15,23,42,0.04)] ${variantClasses[variant]}`}
    >
      <VariantIcon variant={variant} />
      <span>{children}</span>
    </div>
  );
}
