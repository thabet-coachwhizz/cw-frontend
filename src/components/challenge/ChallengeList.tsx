import Button from '@/components/ui/Button';
import { Challenge } from '@/types/challenge';
export default function ChallengeList({
  challenges,
  onNew,
}: {
  challenges: Challenge[];
  onNew: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Active Challenges</h2>
      <ul className="divide-y divide-gray-700 border border-gray-600 rounded-lg bg-[#2f303f]">
        {challenges.map((ch) => (
          <li key={ch.id} className="p-4 text-white">
            <div className="font-medium text-indigo-400">{ch.soft_skill_name}</div>
            <div className="text-sm">{ch.title}</div>
          </li>
        ))}
      </ul>

      <Button onClick={onNew}>Bring Another Challenge</Button>
    </div>
  );
}
