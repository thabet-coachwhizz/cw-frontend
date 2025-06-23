'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { acceptTerms } from '@/lib/api/onboarding';

export default function TermsPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl p-8 rounded-xl shadow bg-[#333546] text-[#BBBBC0] space-y-6">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="text-[#919196]" size={18} />
          <span>5 min</span>
        </div>
        <h1 className="text-2xl font-semibold text-white">{`Let’s get to know You better!`}</h1>
        <p>
          Help us tailor your growth journey by answering a few quick assessments. Just a few
          minutes to unlock personalized insights.
        </p>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={
            <>
              By checking the box, you acknowledge that you have read, comprehended and consented to
              the{' '}
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
          className="w-full"
          onClick={handleStart}
          disabled={!checked || submitting}
          loading={submitting}
        >
          {`LET'S START`}
        </Button>
      </div>
    </main>
  );
}
