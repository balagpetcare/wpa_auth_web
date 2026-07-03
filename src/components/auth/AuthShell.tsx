import { BrandHeader } from "@/components/branding/BrandHeader";
import { SupportFooter } from "@/components/branding/SupportFooter";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        d="M12 3.5 5 6.2v5.1c0 4.5 3 7.9 7 9.2 4-1.3 7-4.7 7-9.2V6.2L12 3.5Z"
        strokeLinejoin="round"
      />
      <path d="m9 12 2.1 2.1L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AuthShell({
  children,
  maxWidth = "max-w-md",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-background-accent to-transparent"
      />

      <div className="relative z-10 mb-8">
        <BrandHeader showTagline />
      </div>

      <div className={`relative z-10 w-full ${maxWidth}`}>{children}</div>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-subtle">
          <ShieldIcon />
          Protected by WPA Central Auth
        </div>
        <SupportFooter />
      </div>
    </div>
  );
}
