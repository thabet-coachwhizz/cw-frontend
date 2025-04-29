// src/lib/apiClient.ts
import { API } from '@/lib/api';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '@/lib/auth';

interface FetchOptions extends RequestInit {
  retry?: boolean; // Prevent infinite retry loop
}

export const apiClient = async (url: string, options: FetchOptions = {}): Promise<Response> => {
  let accessToken = getAccessToken();

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 && !options.retry) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        throw new Error('No refresh token available.');
      }

      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshRes.ok) {
        // Token is refreshed — try the original request again
        return apiClient(url, { ...options, retry: true });
      } else {
        clearTokens();
        throw new Error('Session expired. Please login again.');
      }
    }

    return response;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
};
