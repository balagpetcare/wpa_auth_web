import type { ReactNode } from "react";
import { appConfig } from "@/config/app";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { ContactCard } from "@/components/public/ContactCard";

export function LegalPageLayout({
  title,
  description,
  children,
  updatedLabel,
  sidebar,
}: {
  title: string;
  description: string;
  children: ReactNode;
  updatedLabel?: string;
  sidebar?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-border/70 bg-surface p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-subtle">
              {appConfig.brandName}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">{description}</p>
            {updatedLabel && (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-subtle">{updatedLabel}</p>
            )}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[28px] border border-border/70 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="space-y-8">{children}</div>
          </article>
          <aside className="space-y-4">
            {sidebar ?? (
              <section className="rounded-[28px] border border-border/70 bg-surface/96 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Contact</h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Reach the WPA team if you need help with access, privacy, or security.
                </p>
                <div className="mt-4">
                  <ContactCard />
                </div>
              </section>
            )}
          </aside>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
