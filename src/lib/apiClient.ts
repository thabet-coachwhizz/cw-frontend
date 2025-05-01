import { API } from './api';

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
      const refreshRes = await fetch(API.REFRESH, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        return apiClient(url, { ...options, retry: true });
      } else {
        // session is expired
        const path = window.location.pathname + window.location.search;
        sessionStorage.setItem('redirectAfterLogin', path);
        window.location.href = '/auth/login';
        return response;
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};
