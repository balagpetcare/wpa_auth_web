import type { ApiErrorBody } from "@/types/api";

/**
 * Typed error thrown by apiClient for any non-2xx response.
 * `message` is always safe to render to the user — it either echoes the
 * API's own message (never includes tokens/secrets) or falls back to a
 * generic, status-appropriate message.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly requestId?: string;
  readonly fieldErrors?: Array<{ field: string; message: string }>;

  constructor(status: number, body: ApiErrorBody | null) {
    super(ApiError.resolveMessage(status, body));
    this.name = "ApiError";
    this.status = status;
    this.code = body?.code;
    this.requestId = body?.requestId;
    this.fieldErrors = body?.errors;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isRateLimited(): boolean {
    return this.status === 429;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  get isValidationError(): boolean {
    return this.code === "VALIDATION_ERROR" || Boolean(this.fieldErrors?.length);
  }

  private static resolveMessage(status: number, body: ApiErrorBody | null): string {
    if (body?.message) return body.message;
    if (status === 401) return "Your session has expired. Please sign in again.";
    if (status === 403) return "You don't have permission to do that.";
    if (status === 429) return "Too many attempts. Please wait a moment and try again.";
    if (status >= 500) return "Something went wrong on our end. Please try again.";
    return "Something went wrong. Please try again.";
  }
}

/**
 * The API returned a response (2xx or otherwise), but it wasn't parseable
 * as the JSON we expected. Distinct from ApiError, which always represents
 * a well-formed API error response.
 */
export class UnexpectedResponseError extends Error {
  constructor() {
    super("We received an unexpected response from the WPA Auth service. Please try again.");
    this.name = "UnexpectedResponseError";
  }
}

/**
 * The request never reached the API at all — connection refused (wrong URL
 * or the API isn't running), DNS failure, or the browser blocked the
 * response due to CORS. Browsers deliberately don't let JS distinguish
 * "CORS blocked" from "couldn't connect" (both surface as a generic fetch
 * failure), so this message covers both without pretending to know which.
 */
export class NetworkError extends Error {
  constructor(cause?: unknown) {
    super(
      "We couldn't reach the WPA Auth service. It may be offline, or this app's origin isn't allowed to access it yet. Please try again shortly.",
    );
    this.name = "NetworkError";
    this.cause = cause;
  }
}

export interface ParsedApiError {
  message: string;
  status?: number;
  code?: string;
  fieldErrors?: Array<{ field: string; message: string }>;
}

/**
 * Normalizes any thrown value into a UI-safe, structured error shape.
 * Centralizes error handling so every form/handler renders errors the same
 * way instead of each one re-deriving a message from `unknown`. Never
 * surfaces anything beyond what the API itself chose to send back (or, for
 * network/parse failures, a fixed safe message — never a raw exception
 * message, which could contain a local file path, host, or stack detail).
 */
export function parseApiError(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): ParsedApiError {
  if (err instanceof ApiError) {
    return {
      message: err.message,
      status: err.status,
      code: err.code,
      fieldErrors: err.fieldErrors,
    };
  }
  if (err instanceof NetworkError || err instanceof UnexpectedResponseError) {
    return { message: err.message };
  }
  return { message: fallback };
}

/** Safe to render directly in UI; never leaks tokens, internal details, or raw exception text. */
export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  return parseApiError(err, fallback).message;
}
