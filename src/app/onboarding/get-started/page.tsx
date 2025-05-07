'use client';

import { useEffect, useState } from 'react';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import OnboardingTimeline from './OnboardingTimeline';
//import AssessmentCard from './AssessmentCard';

export default function GetStartedPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    getOnboardingProgress().then(setProgress);
  }, []);

  if (!progress) return <p>Loading...</p>;
  //console.log('-> progress -> : ', progress);

  return (
    <div>
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-3xl bg-white p-8 rounded shadow">
          <h1>{`Let's get to know you better`}</h1>
          <p>
            Help us tailor your growith journey by answering a few quick assessments.
            <br />
            Just a few minutes to unlock personalized insights.
          </p>
          <OnboardingTimeline progress={progress} />
        </div>
      </main>
    </div>
  );
  /*return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Complete your onboarding</h1>
      <AssessmentCard
        title="Personality Assessment"
        status={progress.personality_done ? 'done' : 'pending'}
        required
        href="/assessments/personality"
      />
      <AssessmentCard
        title="Core Values"
        status={progress.values_done ? 'done' : 'pending'}
        href="/assessments/core-values"
      />
      <AssessmentCard
        title="Career Passions"
        status={progress.passions_done ? 'done' : 'pending'}
        href="/assessments/career-passions"
      />
    </div>
  );*/
}
