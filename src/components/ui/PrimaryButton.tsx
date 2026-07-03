"use client";

import { forwardRef } from "react";
import { Button } from "@/components/ui/Button";

type PrimaryButtonProps = Omit<React.ComponentProps<typeof Button>, "variant">;

/**
 * The main call-to-action button for auth flows (Continue, Sign in, etc).
 * Thin, intention-revealing wrapper around the shared Button primitive.
 */
export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>((props, ref) => {
  return <Button ref={ref} variant="primary" {...props} />;
});

PrimaryButton.displayName = "PrimaryButton";
