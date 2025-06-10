export interface Challenge {
  id: number;
  title: string;
  description: string;
  impact: string;
  attempts: string;
  desired_outcome: string;
  status: 'initial' | 'pending' | 'completed';
  soft_skill_name: string;
  soft_skill_description: string;
  soft_skill_reason: string;
  soft_skill_mindset: string;
  soft_skill_awareness: string;
  pro_tip: string;
  main_task_name: string;
  main_task_description: string;
  created_at: Date;
  user: string;
  tasks: ChallengeTask[];
  active_task?: {
    id: number;
    step_order: number;
    title: string;
    status: 'locked' | 'active' | 'completed';
  };
}

export interface ChallengeCreatePayload {
  title: string;
  description: string;
  impact: string;
  attempts: string;
  desired_outcome: string;
}

export interface TaskCompletionPayload {
  confidence_rating: number;
  feedback_response: string;
  other_text?: string;
}

export interface ChallengeTask {
  id: number;
  title: string;
  instructions: string;
  nudge: string;
  confidence_tracker: string;
  status: 'active' | 'locked' | 'completed';
  step_order: number;
  confidence_rating: number | null;
  challenge: number;
}

export interface ChallengeResponse {
  id: number;
  soft_skill_description: string;
  soft_skill_reason: string;
  soft_skill_mindset: string;
  soft_skill_awareness: string;
  pro_tip: string;
  main_task_name: string;
  main_task_description: string;
  tasks: ChallengeTask[];
}
