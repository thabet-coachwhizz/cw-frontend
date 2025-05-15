import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

export async function fetchAssessment(slug: string, lang = 'en') {
  return apiClient.get(`${API.ASSESSMENT_DETAIL(slug)}?lang=${lang}`);
}

export async function submitAssessment(
  slug: string,
  payload: { answers: { item: number; selected_option: string }[] },
) {
  return apiClient.post(API.ASSESSMENT_SUBMIT(slug), payload);
}

export async function fetchAssessmentResult(slug: string, lang = 'en') {
  return apiClient.get(`${API.ASSESSMENT_RESULT(slug)}?lang=${lang}`);
}

export async function skipAssessment(slug: string) {
  return apiClient.post(`${API.ASSESSMENT_SKIP(slug)}`);
}
