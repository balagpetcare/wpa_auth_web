import { z } from "zod";

export const emailOrUsernameSchema = z.string().min(1, "Enter your email or username");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
export const emailSchema = z.string().email("Enter a valid email address");
export const otpTokenSchema = z.string().min(1, "Enter the verification code");

export const loginSchema = z.object({
  emailOrUsername: emailOrUsernameSchema,
  password: z.string().min(1, "Enter your password"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    displayName: z.string().min(1, "Enter your name").optional(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  token: otpTokenSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
