import { InputHTMLAttributes, forwardRef, useId } from "react";
import { FieldError } from "@/components/forms/FieldError";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? rest.name ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId ?? hintId}
          className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-subtle focus:border-brand focus:shadow-[0_0_0_3px_var(--focus-ring)] ${
            error ? "border-danger" : "border-border"
          } ${className}`}
          {...rest}
        />
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

FormInput.displayName = "FormInput";
