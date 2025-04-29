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
        throw new Error('Unauthorized: No refresh token');
      }

      const refreshRes = await fetch(API.REFRESH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        saveTokens(refreshData.access_token, refreshToken); // Keep the same refresh_token
        accessToken = refreshData.access_token;

        headers.set('Authorization', `Bearer ${accessToken}`);

        // Retry the original request
        return apiClient(url, { ...options, headers, retry: true });
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
