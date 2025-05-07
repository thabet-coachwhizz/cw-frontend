import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function getOnboardingProgress() {
  return apiClient.get(API.ONBOARDING_PROGRESS);
}
