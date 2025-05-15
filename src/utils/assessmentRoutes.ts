export const ASSESSMENT_ROUTE_MAP: Record<string, string> = {
  ocean: '/assessments/ocean/start',
  'core-values': '/assessments/core-values/start',
  'career-passions': '/assessments/career-passions/start',
};

export function getAssessmentRoute(slug: string): string {
  return ASSESSMENT_ROUTE_MAP[slug] || `/assessments/${slug}/start`;
}
