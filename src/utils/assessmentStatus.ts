import { ASSESSMENT_FLOW } from '@/config/assessments';
import { OnboardingProgress } from '@/types/onboarding';
import { AssessmentStepState, AssessmentStatus } from '@/types/onboarding';

export function resolveAssessmentSteps(progress: OnboardingProgress): AssessmentStepState[] {
  return ASSESSMENT_FLOW.map((cfg) => {
    const done = progress[cfg.key] as boolean;

    const skippedFlags = {
      personality_done: false, // required, not skippable
      values_done: progress.values_skipped,
      passions_done: progress.passions_skipped,
    };

    const skipped = skippedFlags[cfg.key as keyof typeof skippedFlags] || false;

    let status: AssessmentStatus = 'not_started';
    if (done) status = 'completed';
    else if (skipped) status = 'skipped';

    return {
      slug: cfg.slug,
      name: cfg.name,
      description: cfg.description,
      required: cfg.required,
      step: cfg.step,
      status,
    };
  });
}
