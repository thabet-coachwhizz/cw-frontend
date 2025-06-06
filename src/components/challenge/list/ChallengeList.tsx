// src/components/challenge/list/ChallengeList.tsx
'use client';

import { Challenge } from '@/types/challenge';
import ChallengeListItem from './ChallengeListItem';

interface Props {
  challenges: Challenge[];
  onSelect: (challenge: Challenge) => void;
}

export default function ChallengeList({ challenges, onSelect }: Props) {
  if (!challenges?.length) {
    return <p className="text-gray-400">No challenges yet.</p>;
  }

  return (
    <div className="space-y-2">
      {challenges.map((challenge) => (
        <ChallengeListItem
          key={challenge.id}
          challenge={challenge}
          onClick={() => onSelect(challenge)}
        />
      ))}
    </div>
  );
}
