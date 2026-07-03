import { apiClient } from "@/lib/apiClient";
import type { SocialLoginProvidersResponse } from "./types";

export async function getSocialLoginProviders(query: string = ""): Promise<SocialLoginProvidersResponse> {
  const suffix = query ? `?${query}` : "";
  const res = await apiClient.get<{ success: boolean } & SocialLoginProvidersResponse>(`/auth/social/providers${suffix}`, {
    auth: false,
  });
  return { main: res.main ?? [], more: res.more ?? [] };
}

export async function requestSocialEmailCompletion(completionToken: string, email: string) {
  return apiClient.post<{ success: boolean; completionToken: string }>("/auth/social/complete-email/request", { completionToken, email }, { auth: false });
}

export async function confirmSocialEmailCompletion(completionToken: string, email: string, code: string) {
  return apiClient.post<{ success: boolean; message: string }>("/auth/social/complete-email/confirm", { completionToken, email, code }, { auth: false });
}

export const socialLoginService = {
  getSocialLoginProviders,
  requestSocialEmailCompletion,
  confirmSocialEmailCompletion,
};
