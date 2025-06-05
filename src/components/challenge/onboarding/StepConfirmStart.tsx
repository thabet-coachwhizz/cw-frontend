// components/challenge/onboarding/StepConfirmStart.tsx

import Button from '@/components/ui/Button';
import { Badge, Check } from 'lucide-react';

interface StepConfirmStartProps {
  softSkill: string;
  mainTask: string;
  mainTaskDescription?: string;
  onConfirm: () => void;
}

export default function StepConfirmStart({
  softSkill,
  mainTask,
  mainTaskDescription,
  onConfirm,
}: StepConfirmStartProps) {
  return (
    <div className="text-center py-10 space-y-4">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full border-[12px] border-[#08B1C729]">
            <div
              className="rounded-full bg-[#08B1C7AB] p-4 flex items-center justify-center"
              style={{ width: '60px', height: '60px' }}
            >
              <div className="relative w-9 h-9">
                <Badge className="w-full h-full text-white fill-white" />
                <Check
                  className="absolute inset-0 m-auto"
                  size={16}
                  color="#08B1C7"
                  strokeWidth={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-6">Challenge Accepted</h2>

      <div className="rounded-xl px-4 py-2 text-xl font-semibold bg-[#08B1C71A] w-full border-2 border-[#08B1C7] text-[#08B1C7] mb-6 ">
        {softSkill}
      </div>

      <div className="p-4 rounded-xl bg-[#22252f] mb-2 w-full text-left ">
        <div className=" text-sm mb-2">
          <span className=" text-[#BBBBC0]">Main Challenge</span>
        </div>
        <div>
          <p className="font-semibold mb-2">{mainTask}</p>
          <p className="text-sm mb-2">{mainTaskDescription}</p>
        </div>
      </div>

      <Button className="mt-6 w-full" onClick={onConfirm}>
        Let’s Begin
      </Button>
    </div>
  );
}
