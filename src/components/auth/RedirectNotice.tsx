function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Tells the user where they'll land after finishing an auth step —
 * used when a client app / redirect target is known ahead of time.
 */
export function RedirectNotice({ appName }: { appName: string }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-muted px-3.5 py-2.5 text-center text-xs text-muted">
      <span>
        You&apos;ll continue to <span className="font-medium text-foreground">{appName}</span> after this step
      </span>
      <ArrowIcon />
    </div>
  );
}
