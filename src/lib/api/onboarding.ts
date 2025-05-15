import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function getOnboardingProgress() {
  return apiClient.get(API.ONBOARDING_PROGRESS);
}

export async function updateGoal(goal_text: string) {
  return apiClient.post(API.ONBOARDING_GOAL, { goal_text }, true);
}
