export interface User {
  id: string;
  email: string;
  name?: string;
  gender?: string;
  birthdate?: string;
  title?: string;
  timezone?: string;
  work_environment?: string;
  onboarding_status?: 'not_started' | 'in_progress' | 'completed';
  roles?: string[];
}

export interface OnboardingProgress {
  profile_completed: boolean;
  personality_done: boolean;
  values_done: boolean;
  passions_done: boolean;
  percent_complete: number;
}
