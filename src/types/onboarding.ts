export type AssessmentStatus = 'not_started' | 'completed' | 'skipped';

export interface OnboardingProgress {
  profile_completed: boolean;
  personality_done: boolean;
  values_done: boolean;
  passions_done: boolean;
  values_skipped: boolean;
  passions_skipped: boolean;
  goal_text?: string;
  reviewed_summary: boolean;
  onboarding_status: 'not_started' | 'in_progress' | 'completed';
  percent_complete: number;
}

export interface AssessmentStepState {
  slug: string;
  name: string;
  description: string;
  required: boolean;
  step: number;
  status: AssessmentStatus;
}

export interface AssessmentFlowState {
  currentIndex: number;
  steps: AssessmentStepState[];
}
