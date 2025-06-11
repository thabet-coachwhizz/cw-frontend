// lib/api/challenges.ts

import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';
import { ChallengeCreatePayload, TaskCompletionPayload } from '@/types/challenge';

export async function createChallenge(payload: ChallengeCreatePayload) {
  const response = await apiClient.post(API.CHALLENGE, {
    title: payload.title,
    description: payload.description,
    impact: payload.impact,
    attempts: payload.attempts,
    desired_outcome: payload.desired_outcome,
  });

  return response;
}

export async function getUserChallenges() {
  const response = await apiClient.get(API.CHALLENGE);
  return response;
}

export async function getChallengeById(id: number | string) {
  return apiClient.get(`${API.CHALLENGE}${id}/`);
}

export async function submitTaskCompletion(
  challengeId: number,
  taskId: number,
  payload: TaskCompletionPayload,
) {
  return apiClient.post(
    API.CHALLENGE_COMPLETE_TASK(challengeId, taskId),
    {
      confidence_rating: payload.confidence_rating,
      feedback_response: payload.feedback_response,
      other_text: payload.other_text,
    },
    true,
  );
}

export async function deleteChallenge(challengeId: number, reason: string, otherText?: string) {
  return apiClient.post(API.CHALLENGE_DELETE(challengeId), {
    reason,
    other_text: otherText,
  });
}
