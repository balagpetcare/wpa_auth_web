import { apiClient } from "@/lib/apiClient";
import type {
  DeletionRequestDetail,
  DeletionRequestListResponse,
  DeletionRequestProvider,
  DeletionRequestSubmissionResponse,
  DeletionRequestType,
  DeletionRequestStatusResponse,
} from "./types";

export const deletionApi = {
  requestAccountDeletion(payload: { confirm: true; password?: string }): Promise<{ success: boolean; message: string; data: DeletionRequestSubmissionResponse }> {
    return apiClient.post("/auth/deletion/request", payload);
  },

  requestPublicDeletion(payload: {
    email: string;
    requestType: DeletionRequestType;
    provider?: DeletionRequestProvider;
    explanation?: string;
  }): Promise<{ success: boolean; message: string; request: DeletionRequestSubmissionResponse }> {
    return apiClient.post("/deletion/request", payload, { auth: false });
  },

  getStatus(confirmationCode: string): Promise<{ success: boolean; data: DeletionRequestStatusResponse }> {
    return apiClient.get(`/deletion/status/${encodeURIComponent(confirmationCode)}`, { auth: false });
  },

  cancelByConfirmationCode(confirmationCode: string): Promise<{ success: boolean; message: string; data: DeletionRequestStatusResponse }> {
    return apiClient.post(`/deletion/status/${encodeURIComponent(confirmationCode)}/cancel`, undefined, { auth: false });
  },

  listAdminRequests(params?: {
    status?: string;
    requestType?: string;
    provider?: string;
    requestSource?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<DeletionRequestListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.requestType) searchParams.set('requestType', params.requestType);
    if (params?.provider) searchParams.set('provider', params.provider);
    if (params?.requestSource) searchParams.set('requestSource', params.requestSource);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    return apiClient.get(`/admin/deletion-requests?${searchParams.toString()}`);
  },

  getAdminRequest(id: string): Promise<{ success: boolean; data: DeletionRequestDetail }> {
    return apiClient.get(`/admin/deletion-requests/${id}`);
  },

  updateAdminRequest(id: string, action: 'approve' | 'reject' | 'retry' | 'cancel', reason?: string): Promise<{ success: boolean; data: DeletionRequestDetail }> {
    return apiClient.patch(`/admin/deletion-requests/${id}`, { action, reason });
  },
};
