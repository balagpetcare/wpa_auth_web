function AppIcon({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-base font-semibold text-brand">
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
  openid: "Confirm your identity",
  profile: "View your basic profile information",
  email: "View your email address",
  offline_access: "Access your account when you're not present",
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
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-muted p-4">
      <div className="flex items-center gap-3">
        <AppIcon name={appName} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{appName}</span>
          {hostname && <span className="text-xs text-muted">{hostname}</span>}
        </div>
      </div>

      {scopes.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-border pt-3">
          <p className="text-xs font-medium text-muted">This app will be able to:</p>
          <ul className="flex flex-col gap-1.5">
            {scopes.map((scope) => (
              <li key={scope} className="flex items-start gap-2 text-sm text-foreground">
                <ScopeIcon />
                <span>{SCOPE_DESCRIPTIONS[scope] ?? scope}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {redirectUri && (
        <div className="flex flex-col gap-1 border-t border-border pt-3">
          <p className="text-xs font-medium text-muted">You&apos;ll be sent back to:</p>
          <p className="break-all font-mono text-xs text-foreground">{redirectUri}</p>
        </div>
      )}
    </div>
  );
}
