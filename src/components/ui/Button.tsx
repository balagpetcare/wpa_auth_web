"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover disabled:bg-brand/60",
  secondary:
    "bg-transparent border border-border text-foreground hover:bg-black/5 dark:hover:bg-white/5",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "bg-transparent text-brand hover:underline",
};

const spinnerClasses: Record<Variant, string> = {
  primary: "border-white/40 border-t-white",
  secondary: "border-foreground/25 border-t-foreground",
  danger: "border-white/40 border-t-white",
  ghost: "border-brand/30 border-t-brand",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", isLoading, className = "", children, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant]} ${className}`}
        {...rest}
      >
        {isLoading && (
          <span
            aria-hidden
            className={`h-4 w-4 animate-spin rounded-full border-2 ${spinnerClasses[variant]}`}
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
