// lib/api/challenges.ts

import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';
import { ChallengeCreatePayload } from '@/types/challenge';

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
