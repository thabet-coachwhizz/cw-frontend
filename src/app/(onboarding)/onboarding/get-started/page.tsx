'use client';

import { useEffect, useState } from 'react';
import OnboardingTimeline from './OnboardingTimeline';
import { resolveAssessmentSteps } from '@/utils/assessmentStatus';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import { AssessmentStepState } from '@/types/onboarding';
import Loader from '@/components/ui/Loader';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

export default function GetStartedPage() {
  const [progress, setProgress] = useState(null);
  const [steps, setSteps] = useState<AssessmentStepState[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    getOnboardingProgress().then((progress) => {
      setSteps(resolveAssessmentSteps(progress));
      setProgress(progress);
    });
  }

  if (!progress) return <Loader />;

  return (
    <TwoColumnLayout
      rightTop={
        <div>
          <RightTopSection />
        </div>
      }
    >
      <div className=" flex items-center justify-center">
        <div className="w-full max-w-[693px] ">
          <h1 className="text-2xl pb-4">Profile Assessments</h1>
          <div className="p-4 rounded-xl shadow bg-[#333546]">
            <OnboardingTimeline steps={steps} reloadProgress={loadProgress} />
          </div>
        </div>
      </div>
    </TwoColumnLayout>
  );
}

function RightTopSection() {
  return (
    <Accordion type="multiple" defaultValue={['why-assessments']}>
      <AccordionItem
        value="why-assessments"
        className="p-4 rounded-xl bg-[#BDC8F208] mb-2"
        defaultValue={'why-assessments'}
      >
        <AccordionTrigger>Why Complete All Three?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              Apart from Personality Assessment, the other two are optional, but highly recommended.
              Results of which will greatly enhance the Ai model for a better and tailored coaching
              experience.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
