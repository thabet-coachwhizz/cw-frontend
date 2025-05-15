// hooks/useAssessmentFlow.ts
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { AssessmentFlowState, AssessmentStatus } from '@/types/onboarding';
import { skipAssessment } from '@/lib/api/assessments';
import { getAssessmentRoute } from '@/utils/assessmentRoutes';

export function useAssessmentFlow(initialSteps: AssessmentFlowState['steps'], initialIndex = 0) {
  const [flow, setFlow] = useState<AssessmentFlowState>({ currentIndex: 0, steps: [] });

  const router = useRouter();

  useEffect(() => {
    if (initialSteps.length > 0) {
      setFlow({
        currentIndex: initialIndex,
        steps: initialSteps,
      });
    }
  }, [initialSteps, initialIndex]);

  const current = flow.steps[flow.currentIndex];

  const updateStatus = (slug: string, status: AssessmentStatus) => {
    setFlow((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => (step.slug === slug ? { ...step, status } : step)),
    }));
  };

  const goToNext = () => {
    if (flow.currentIndex + 1 < flow.steps.length) {
      const nextIndex = flow.currentIndex + 1;
      setFlow((prev) => ({ ...prev, currentIndex: nextIndex }));

      const nextSlug = flow.steps[nextIndex].slug;
      router.push(getAssessmentRoute(nextSlug));
    } else {
      router.push('/onboarding/goal'); // or the final step
    }
  };

  const goToPrev = () => {
    if (flow.currentIndex > 0) {
      const prevIndex = flow.currentIndex - 1;
      setFlow((prev) => ({ ...prev, currentIndex: prevIndex }));

      const prevSlug = flow.steps[prevIndex].slug;
      router.push(getAssessmentRoute(prevSlug));
    }
  };

  const finishCurrent = () => {
    updateStatus(current.slug, 'completed');
    goToNext();
  };

  const skipCurrent = async () => {
    const current = flow.steps[flow.currentIndex];

    if (!current.required) {
      try {
        await skipAssessment(current.slug);

        setFlow((prev) => ({
          ...prev,
          steps: prev.steps.map((step) =>
            step.slug === current.slug ? { ...step, status: 'skipped' } : step,
          ),
        }));

        goToNext();
      } catch (err) {
        console.error('Failed to skip assessment:', err);
      }
    } else {
      console.warn(`Skipping is not allowed for required assessment: ${current.slug}`);
    }
  };

  return {
    flow,
    current,
    goToNext,
    goToPrev,
    finishCurrent,
    skipCurrent,
    updateStatus,
  };
}
