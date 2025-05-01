// src/lib/api.ts
export const API = {
  BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`,
  LOGOUT: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout/`,
  REFRESH: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/token/refresh/`,
  PROFILE: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile/`,
  RESET_PASSWORD_REQUEST: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/reset-password/request/`,
  RESET_PASSWORD_CONFIRM: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/reset-password/confirm/`,
  CONFIRM_NEW_PASSWORD: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/confirm-new-password/`,
};
