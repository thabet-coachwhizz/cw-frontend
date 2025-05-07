import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function getSession() {
  return apiClient.get(API.AUTH_SESSION);
}
