// src/components/challenge/detail/ChallengeProgressBar.tsx
import { ChallengeTask } from '@/types/challenge';

interface Props {
  tasks: ChallengeTask[];
}

export default function ChallengeProgressBar({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  const percent = Math.round((completed / total) * 100);

  return (
    <div className="mt-4">
      <div className="w-full bg-[#1919193B] h-2 rounded">
        <div
          className="bg-white h-1 rounded"
          style={{ width: `${percent == 0 ? 0.2 : percent}%` }}
        />
      </div>
    </div>
  );
}
