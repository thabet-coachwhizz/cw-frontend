// src/lib/api.ts
export const API = {
  BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',

  LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`,
  LOGOUT: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout/`,
  AUTH_SESSION: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/auth/session/`,
  REFRESH: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/token/refresh/`,
  PROFILE: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile/`,
  RESET_PASSWORD_REQUEST: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/reset-password/request/`,
  RESET_PASSWORD_CONFIRM: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/reset-password/confirm/`,
  CONFIRM_NEW_PASSWORD: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/confirm-new-password/`,

  // Onboarding
  ONBOARDING_PROGRESS: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/onboarding/progress/`,
  ONBOARDING_GOAL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/onboarding/goal/`,
  ONBOARDING_TERMS: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/onboarding/terms/`,

  // Assessments
  ASSESSMENT_DETAIL: (slug: string) => `${API.BASE}/api/v1/assessments/${slug}/`,
  ASSESSMENT_SUBMIT: (slug: string) => `${API.BASE}/api/v1/assessments/${slug}/submit/`,
  ASSESSMENT_RESULT: (slug: string) => `${API.BASE}/api/v1/assessments/${slug}/latest/`,
  ASSESSMENT_SKIP: (slug: string) => `${API.BASE}/api/v1/assessments/${slug}/skip/`,

  // Challenges
  CHALLENGE: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/challenges/`,
  CHALLENGE_COMPLETE_TASK: (challengeId: number, taskId: number) =>
    `${API.CHALLENGE}${challengeId}/tasks/${taskId}/complete/`,
  CHALLENGE_DELETE: (challengeId: number) => `${API.CHALLENGE}${challengeId}/delete/`,
};
