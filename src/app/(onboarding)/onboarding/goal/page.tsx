'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGoal } from '@/lib/api/onboarding';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';

export default function GoalPage() {
  const [goal, setGoal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleFinish = async () => {
    if (!goal.trim()) return;
    setSubmitting(true);
    try {
      await updateGoal(goal.trim());
      router.push('/'); // onboarding complete in this version
    } catch (err) {
      console.error('Failed to save goal', err);
      setSubmitting(false);
    }
  };

  return (
    <TwoColumnLayout
      rightTop={
        <div>
          <RightTopSection />
        </div>
      }
    >
      <div className="flex items-center justify-center">
        <div className="max-w-[453px] mx-auto space-y-6 p-6">
          <div className="uppercase text-[#919196] p-4">What are your goals?</div>
          <div className="bg-[#333546] rounded-2xl p-4">
            <h1 className="text-3xl font-semibold mb-4">Where Are You Headed in 12 months?</h1>

            <Textarea
              label=" Fast forward 12 months—what does career success look like for you? Are you leading a
        project, mastering a new skill, or stepping into a new role?"
              className="min-h-[120px] border-1 border-black mt-2 bg-[#292A38]!"
              placeholder="Landing a full time job"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <Button
            onClick={handleFinish}
            loading={submitting}
            disabled={!goal.trim() || submitting}
            className="w-full uppercase mt-4"
          >
            Finish
          </Button>
        </div>
      </div>
    </TwoColumnLayout>
  );
}

function RightTopSection() {
  return (
    <Accordion type="multiple" defaultValue={['why-step']} className="">
      <AccordionItem value="why-step" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Why Set a Destination?</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              {`This is a brief reflection exercise to help you define your short-term direction. `}
            </p>
            <p>
              {`Whether it's a personal goal, a professional milestone, or a meaningful habit you want to build, understanding where you want to be in the next 12 months gives purpose to your journey.`}
            </p>
            <p>
              {`By identifying your destination, we can better align challenges, skill-building activities, and coaching support to keep you focused and motivated.`}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
