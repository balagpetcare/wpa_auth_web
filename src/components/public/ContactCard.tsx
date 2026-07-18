import { appConfig } from "@/config/app";

function Item({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="font-medium text-brand hover:underline">
      {value}
    </a>
  ) : (
    <span className="font-medium text-foreground">{value}</span>
  );

  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-subtle">{label}</p>
      <div className="mt-1 text-sm">{content}</div>
    </div>
  );
}

export function ContactCard() {
  return (
    <div className="grid gap-3">
      <Item label="Support" value={appConfig.emails.support} href={`mailto:${appConfig.emails.support}`} />
      <Item label="Privacy" value={appConfig.emails.privacy} href={`mailto:${appConfig.emails.privacy}`} />
      <Item label="Security" value={appConfig.emails.security} href={`mailto:${appConfig.emails.security}`} />
      <Item label="Legal entity" value={appConfig.legalEntityName} />
      <Item label="Public website" value={appConfig.urls.publicWebsite} href={appConfig.urls.publicWebsite} />
      <Item label="Auth website" value={appConfig.urls.authWebsite} href={appConfig.urls.authWebsite} />
    </div>
  );
}
