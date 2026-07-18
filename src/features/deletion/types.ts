export type DeletionRequestType = 'ACCOUNT' | 'DATA';
export type DeletionRequestStatus = 'PENDING_REVIEW' | 'SCHEDULED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REJECTED' | 'FAILED';
export type DeletionRequestSource = 'AUTHENTICATED_WEB' | 'PUBLIC_WEB' | 'EMAIL_REQUEST' | 'META_CALLBACK' | 'ADMIN';
export type DeletionRequestProvider = 'GOOGLE' | 'FACEBOOK' | 'APPLE' | 'MICROSOFT' | 'LINKEDIN' | 'TIKTOK' | 'X' | 'GITHUB' | 'INSTAGRAM';

export interface DeletionRequestStatusResponse {
  confirmationCode: string;
  requestType: DeletionRequestType;
  provider?: DeletionRequestProvider | null;
  requestSource: DeletionRequestSource;
  status: DeletionRequestStatus;
  requestedAt: string;
  gracePeriodDeadlineAt?: string | null;
  processedAt?: string | null;
  failureReason?: string | null;
  canCancel?: boolean;
  statusUrl?: string;
}

export interface DeletionRequestSubmissionResponse {
  confirmationCode: string;
  requestType: DeletionRequestType;
  provider?: DeletionRequestProvider | null;
  requestSource: DeletionRequestSource;
  status: DeletionRequestStatus;
  statusUrl: string;
  gracePeriodDeadlineAt?: string | null;
}

export interface DeletionRequestDetail extends DeletionRequestStatusResponse {
  id: string;
  userId?: string | null;
  emailHash?: string | null;
  emailReference?: string | null;
  cancelledAt?: string | null;
  reviewedAt?: string | null;
  sourceIp?: string | null;
  sourceUserAgent?: string | null;
  auditMetadata?: unknown;
  user?: {
    id: string;
    email?: string | null;
    username?: string | null;
    displayName?: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string | null;
  } | null;
  events?: Array<{
    id: string;
    eventType: string;
    actorSource: string;
    createdAt: string;
    metadata?: unknown;
  }>;
  processing?: Record<string, unknown>;
}

export interface DeletionRequestListResponse {
  success: boolean;
  data: {
    items: Array<{
      id: string;
      confirmationCode: string;
      requestType: DeletionRequestType;
      provider?: DeletionRequestProvider | null;
      requestSource: DeletionRequestSource;
      status: DeletionRequestStatus;
      requestedAt: string;
      gracePeriodDeadlineAt?: string | null;
      processedAt?: string | null;
      cancelledAt?: string | null;
      reviewedAt?: string | null;
      failureReason?: string | null;
      userId?: string | null;
      emailHash?: string | null;
      emailReference?: string | null;
    }>;
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
