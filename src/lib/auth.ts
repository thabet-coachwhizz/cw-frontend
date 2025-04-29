// src/lib/auth.ts
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;

export const getRefreshToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
