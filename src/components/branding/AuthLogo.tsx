import Image from "next/image";
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";

/**
 * The single authoritative WPA logo mark for the public auth UI (login,
 * register, verify-otp, forgot/reset password, OAuth authorize/consent,
 * logout). Renders as a static import so Next.js Image can derive intrinsic
 * width/height itself — sizing is controlled purely via CSS so the image
 * never stretches or distorts.
 *
 * `logo-light.png` (dark navy wordmark) is used on light backgrounds;
 * `logo-dark.png` (white wordmark) is swapped in for dark backgrounds via
 * Tailwind's prefers-color-scheme-based `dark:` variant, matching how the
 * rest of the app's theme tokens already respond to color scheme.
 */
export function AuthLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`}>
      <Image
        src={logoLight}
        alt="World Pet Association"
        priority
        className="h-auto w-[168px] max-w-full dark:hidden"
      />
      <Image
        src={logoDark}
        alt="World Pet Association"
        priority
        className="hidden h-auto w-[168px] max-w-full dark:block"
      />
    </span>
  );
}
