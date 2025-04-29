// src/lib/apiClient.ts
import { getRefreshToken, clearTokens } from '@/lib/auth'; // No getAccessToken anymore

interface FetchOptions extends RequestInit {
  retry?: boolean; // Prevent infinite retry loop
}

export const apiClient = async (url: string, options: FetchOptions = {}): Promise<Response> => {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  // ❌ DO NOT attach Authorization manually
  // Access token will come automatically from HttpOnly cookie

  try {
    const response = await fetch(url, { ...options, headers, credentials: 'include' }); // ✅ add credentials: "include"

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
        credentials: 'include', // ✅ make sure cookies are sent
      });

      if (refreshRes.ok) {
        // Token refreshed, try the original request again
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
