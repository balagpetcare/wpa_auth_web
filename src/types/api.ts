/**
 * Error envelope shape used across the WPA Auth API.
 *
 * Two variants exist in practice:
 * - AppError-thrown errors (has `requestId`)
 * - Zod validation failures from `validateBody` middleware (has `errors`, no `requestId`)
 * - authGuard 401s (neither `requestId` nor `errors`)
 *
 * All fields beyond `success`/`message` are therefore optional.
 */
export interface ApiErrorBody {
  success: false;
  message: string;
  code?: string;
  requestId?: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
