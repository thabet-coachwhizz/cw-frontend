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
  onboarding_progress?: onboarding_progress;
  roles?: string[];
  permissions?: string[];
}

export interface onboarding_progress {
  profile_completed: boolean;
  personality_done: boolean;
  values_done: boolean;
  passions_done: boolean;
  percent_complete: number;
}

export interface ListedUser {
  id: string;
  email: string;
  name?: string;
}

export interface UserSummary {
  intern_role: string;
  work_environment: string;
  goal_12_months: string;
  core_values: string[];
  career_passions: string[];
  ocean_text: string;
}
