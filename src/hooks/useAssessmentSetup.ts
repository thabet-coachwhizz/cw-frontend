import { useEffect, useState } from 'react';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import { fetchAssessment } from '@/lib/api/assessments';
import { resolveAssessmentSteps } from '@/utils/assessmentStatus';
import type { AssessmentStepState } from '@/types/onboarding';
import type { AssessmentData, AssessmentQuestion, AssessmentTrait } from '@/types/assessments';

export function useAssessmentSetup(slug: string) {
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [steps, setSteps] = useState<AssessmentStepState[]>([]);
  const [initialIndex, setInitialIndex] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [assessmentRes, progress] = await Promise.all([
        fetchAssessment(slug),
        getOnboardingProgress(),
      ]);

      const resolvedSteps = resolveAssessmentSteps(progress);
      const idx = resolvedSteps.findIndex((s) => s.slug === slug);

      const data = assessmentRes;

      const flatItems =
        !data.items && Array.isArray(data.traits)
          ? data.traits?.flatMap((t: AssessmentTrait) => t.items || [])
          : data.items || [];

      setAssessment(data);
      setQuestions(flatItems);
      setSteps(resolvedSteps);
      setInitialIndex(idx !== -1 ? idx : 0);
      setLoading(false);
    };

    load();
  }, [slug]);

  return { assessment, questions, steps, initialIndex, loading };
}
