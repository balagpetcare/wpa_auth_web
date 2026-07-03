import Link from "next/link";
import { AuthLogo } from "@/components/branding/AuthLogo";

interface BrandHeaderProps {
  href?: string;
}

export function BrandHeader({ href = "/" }: BrandHeaderProps) {
  return (
    <Link href={href} className="inline-flex items-center">
      <AuthLogo className="shrink-0" />
    </Link>
  );
}
