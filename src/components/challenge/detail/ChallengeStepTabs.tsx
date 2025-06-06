// src/components/challenge/detail/ChallengeStepTabs.tsx
import { ChallengeTask } from '@/types/challenge';
import { Lock } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  tasks: ChallengeTask[];
  current: number;
  onChange: (step: number) => void;
}

export default function ChallengeStepTabs({ tasks, current, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {tasks.map((task, index) => {
        const isLocked = task.status === 'locked';
        const isActive = task.step_order === current;
        const isFirst = index === 0;
        const isLast = index === tasks.length - 1;

        return (
          <button
            key={task.id}
            className={clsx('px-4 py-2 mb-1', {
              'bg-[#333546]': isActive,
              'bg-[#292A38] text-[#B5B9BE]': !isActive || isLocked,
              ' cursor-not-allowed': isLocked,
              'hover:bg-[#333546] hover:text-white hover:cursor-pointer': !isLocked && !isActive,
              'rounded-tl-xl': isFirst,
              'rounded-tr-xl': isLast,
            })}
            onClick={() => !isLocked && onChange(task.step_order)}
            disabled={isLocked}
          >
            Step # {task.step_order} {isLocked && <Lock className="inline-block ml-1 h-4 w-4" />}
          </button>
        );
      })}
    </div>
  );
}
