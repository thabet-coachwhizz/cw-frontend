// components/challenge/onboarding/StepProcessing.tsx

import { Hourglass } from 'lucide-react';

export default function StepProcessing() {
  return (
    <div className="text-center py-12  max-w-[690px]">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full border-[6px] border-[#FFB64040]">
            <div
              className="rounded-full bg-[#EFD16DAB] p-4 animate-pulse"
              style={{ width: '60px', height: '60px' }}
            >
              <Hourglass
                className="animate-spin "
                size={24}
                color="#fff"
                style={{ animationDuration: '2s', fill: '#FFFFFF' }}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2 ">
        Thank you so much for your honesty and openness.
      </h2>

      <p className="text-sm">
        You’ve just taken the first (and hardest) step, turning a vague struggle into something
        clear, actionable, and real. Now our AI can help you move forward with personalized support,
        one step at a time.
      </p>

      <p className="text-sm">
        This isn’t just data. This is your story, and we’re here to help you change the ending.
      </p>
    </div>
  );
}
