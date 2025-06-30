'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { acceptTerms } from '@/lib/api/onboarding';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import Loader from '@/components/ui/Loader';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

export default function TermsPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<{ current_step: string | null }>({
    current_step: null,
  });
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getOnboardingProgress().then((res) => setProgress(res));
  }, []);

  useOnboardingRedirect(progress);

  const handleStart = async () => {
    if (!checked) return;
    setSubmitting(true);
    try {
      await acceptTerms();
      router.push('/onboarding/get-started');
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };
  if (progress.current_step !== 'terms') {
    return <Loader />;
  }
  return (
    <TwoColumnLayout
      rightTop={
        <div>
          <RightTopSection />
        </div>
      }
    >
      <div className="flex justify-center">
        <div className="w-full max-w-[453px] text-[#BBBBC0] space-y-5">
          <div>
            <div className="flex items-center space-x-1  mb-3">
              <Clock className="text-[#919196]" size={18} />
              <span>5 min</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">{`Let’s get to know You better!`}</h1>
          </div>

          <p>
            Help us tailor your growth journey by answering a few quick assessments. Just a few
            minutes to unlock personalized insights.
          </p>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            label={
              <>
                By checking the box, you acknowledge that you have read, comprehended and consented
                to the{' '}
                <a
                  href="https://coachwhizz.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#08B1C7] underline"
                >
                  terms and conditions
                </a>
                .
              </>
            }
            className="bg-[#BDC8F208] rounded-2xl p-2.5"
            name="accept-terms"
          />
          <Button
            className="w-full mt-5"
            onClick={handleStart}
            disabled={!checked || submitting}
            loading={submitting}
          >
            {`LET'S START`}
          </Button>
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
        <AccordionTrigger>Why These Assessments?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              We use your personality, core values, and career passions to tailor everything to you.
            </p>
            <p>
              From the way you learn to the goals you chase, this data helps us recommend the right
              challenges, tasks, and support so you grow faster and smarter.
            </p>
            <p>No generic paths. Just your path, powered by you.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
