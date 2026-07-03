"use client";

import { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { FieldError } from "@/components/forms/FieldError";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  hint?: string;
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path
        d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a16.7 16.7 0 0 1-3.4 4.3M6.6 6.6C4 8.3 2 12 2 12s3.6 7 10 7c1.4 0 2.6-.3 3.7-.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = id ?? rest.name ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium tracking-tight text-foreground">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId ?? hintId}
            className={`w-full rounded-2xl border bg-surface px-4 py-3 pr-11 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-subtle focus:border-brand focus:shadow-[0_0_0_3px_var(--focus-ring)] ${
              error ? "border-danger" : "border-border"
            } ${className}`}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted outline-none hover:text-foreground focus-visible:text-brand"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
          >
            <EyeIcon open={visible} />
          </button>
        </div>
        {hintId && (
          <p id={hintId} className="text-xs text-muted">
            {hint}
          </p>
        )}
        <FieldError id={errorId} message={error} />
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
