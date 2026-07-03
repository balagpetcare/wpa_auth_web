import Link from "next/link";
import { BrandHeader } from "@/components/branding/BrandHeader";
import { SupportFooter } from "@/components/branding/SupportFooter";
import { appConfig } from "@/config/app";

function NavTab({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-brand-soft text-brand" : "text-muted hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

export function AccountShell({
  children,
  actions,
  activeTab,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  activeTab?: "account" | "security";
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:py-12">
      <div className="flex items-center justify-between">
        <BrandHeader href={appConfig.routes.account} />
        {actions}
      </div>

      {activeTab && (
        <nav className="flex items-center gap-1 border-b border-border pb-3">
          <NavTab href={appConfig.routes.account} label="Account" active={activeTab === "account"} />
          <NavTab
            href={appConfig.routes.accountSecurity}
            label="Security"
            active={activeTab === "security"}
          />
        </nav>
      )}

      <div className="flex flex-col gap-6">{children}</div>

      <div className="mt-4 flex flex-col items-center gap-2 border-t border-border pt-6">
        <SupportFooter />
      </div>
    </div>
  );
}
