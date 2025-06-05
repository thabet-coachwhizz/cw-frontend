// components/challenge/onboarding/StepReveal.tsx

import Button from '@/components/ui/Button';
import { Badge, Check } from 'lucide-react';

interface StepRevealProps {
  softSkill: string;
  onNext: () => void;
}

export default function StepReveal({ softSkill, onNext }: StepRevealProps) {
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full border-[12px] border-[#08B1C729]">
            <div
              className="rounded-full bg-[#08B1C7AB] p-4 flex items-center justify-center"
              style={{ width: '60px', height: '60px' }}
            >
              <CustomBadgeCheck />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-6">Soft Skill Identified</h2>

      <div className="rounded-xl px-4 py-2 text-xl font-semibold bg-[#08B1C71A] w-full border-2 border-[#08B1C7] text-[#08B1C7] mb-6 ">
        {softSkill}
      </div>

      <div className=" max-w-[257px] mx-auto mb-6 ">
        <p className="mb-1">
          We’ve carefully analyzed your input and identified the core soft skill that will empower
          you to overcome it.
        </p>
        <p>Let’s turn intention into action— one step at a time.</p>
      </div>

      <Button onClick={onNext} className="w-full">
        Ready to begin
      </Button>
    </div>
  );
}

function CustomBadgeCheck() {
  return (
    <div className="relative w-9 h-9">
      {/* Badge background with white fill */}
      <Badge className="w-full h-full text-white fill-white" />

      {/* Centered Check icon */}
      <Check className="absolute inset-0 m-auto" size={16} color="#08B1C7" strokeWidth={5} />
    </div>
  );
}
