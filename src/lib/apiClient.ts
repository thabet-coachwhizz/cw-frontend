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

// REST-style helpers
apiClient.get = async (url: string) => {
  const res = await apiClient(url, { method: 'GET', credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

apiClient.post = async (url: string, data?: Record<string, unknown>) => {
  const res = await apiClient(url, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

apiClient.put = async (url: string, data?: Record<string, unknown>) => {
  const res = await apiClient(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
