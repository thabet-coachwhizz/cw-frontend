import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function updateProfile(data: Record<string, string>) {
  return apiClient.put(API.PROFILE, data);
}

export async function getProfile() {
  return apiClient.get(API.PROFILE);
}
