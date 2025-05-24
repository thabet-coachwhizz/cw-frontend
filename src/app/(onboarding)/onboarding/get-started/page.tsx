'use client';

import { useEffect, useState } from 'react';
import OnboardingTimeline from './OnboardingTimeline';
import { resolveAssessmentSteps } from '@/utils/assessmentStatus';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import { AssessmentStepState } from '@/types/onboarding';
import Loader from '@/components/ui/Loader';

export default function GetStartedPage() {
  const [progress, setProgress] = useState(null);
  const [steps, setSteps] = useState<AssessmentStepState[]>([]);

  useEffect(() => {
    getOnboardingProgress().then((progress) => {
      setSteps(resolveAssessmentSteps(progress));
      setProgress(progress);
    });
  }, []);

  if (!progress) return <Loader />;

  return (
    <div>
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl p-8 rounded-xl shadow bg-[#333546]">
          <h1>{`Let's get to know you better`}</h1>
          <p>
            Help us tailor your growith journey by answering a few quick assessments.
            <br />
            Just a few minutes to unlock personalized insights.
          </p>
          <OnboardingTimeline steps={steps} progress={progress} />
        </div>
      </main>
    </div>
  );
}
