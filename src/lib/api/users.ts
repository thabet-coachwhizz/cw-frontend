import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function listUsers() {
  return apiClient.get(API.USERS_LIST);
}

export async function fetchUserSummary(userId: string) {
  return apiClient.get(API.USER_SUMMARY(userId));
}
