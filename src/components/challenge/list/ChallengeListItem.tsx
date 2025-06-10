// src/components/challenge/list/ChallengeListItem.tsx
import { Challenge } from '@/types/challenge';
import { ArrowRight } from 'lucide-react';

interface Props {
  challenge: Challenge;
  onClick: () => void;
}

export default function ChallengeListItem({ challenge, onClick }: Props) {
  const currentStep = challenge.active_task;

  return (
    <div
      className="p-5 rounded-3xl cursor-pointer bg-[#BDC8F208] hover:bg-[#BDC8F209] transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>{challenge.main_task_name}</div>
        <div className="rounded-2xl bg-[#191B26] px-4 py-3">
          <span className="text-gray-400">Soft Skill: </span>{' '}
          <span className="font-semibold">{challenge.soft_skill_name}</span>
        </div>
      </div>
      {currentStep && (
        <div className="flex items-center mt-1">
          <span className="inline-block pr-2">
            <ArrowRight size={19} />
          </span>
          <span className="font-semibold"> Step # {currentStep.step_order} - </span>
          <span className="pl-1">{currentStep.title}</span>
        </div>
      )}
    </div>
  );
}
