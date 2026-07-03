function AppIcon({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-base font-semibold text-brand ring-1 ring-brand/15">
      {initial}
    </span>
  );
}

function ScopeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="mt-0.5 shrink-0 text-success"
    >
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SCOPE_DESCRIPTIONS: Record<string, string> = {
  openid: "Sign you in with WPA Account",
  profile: "View your basic profile",
  email: "View your email address",
  phone: "View your phone number",
  offline_access: "Keep access when you're offline",
};

function safeHostname(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

export function ConsentAppCard({
  appName,
  domain,
  redirectUri,
  scopes,
}: {
  appName: string;
  domain?: string;
  redirectUri?: string;
  scopes: string[];
}) {
  const hostname = domain ?? safeHostname(redirectUri);

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-border/80 bg-surface-muted/55 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <AppIcon name={appName} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{appName}</span>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {hostname && <span className="text-xs text-muted">{hostname}</span>}
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
              Requesting access
            </span>
          </div>
        </div>
      </div>

      {scopes.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border/70 pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-subtle">
            Requested permissions
          </p>
          <ul className="grid gap-2">
            {scopes.map((scope) => (
              <li
                key={scope}
                className="flex items-start gap-2 rounded-2xl border border-border/70 bg-surface px-3 py-2 text-sm text-foreground"
              >
                <ScopeIcon />
                <span>{SCOPE_DESCRIPTIONS[scope] ?? `Custom permission: ${scope}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {redirectUri && (
        <div className="flex flex-col gap-1 border-t border-border/70 pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-subtle">
            Returning to
          </p>
          <p className="break-all font-mono text-xs text-foreground">{redirectUri}</p>
        </div>
      )}
    </div>
  );
}
