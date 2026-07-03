import { BrandHeader } from "@/components/branding/BrandHeader";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  showBrand = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showBrand?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[28px] border border-border/80 bg-surface p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-5 flex flex-col items-center gap-4 text-center">
          {showBrand && (
            <div className="flex justify-center">
              <BrandHeader />
            </div>
          )}
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="max-w-md text-sm leading-6 text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
      {footer && <div className="text-center text-sm text-muted">{footer}</div>}
    </div>
  );
}
