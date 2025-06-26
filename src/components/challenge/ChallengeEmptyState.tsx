// components/challenge/ChallengeEmptyState.tsx
import React from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function ChallengeEmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="">
      <h2 className="text-lg font-bold">Welcome to Your Soft Skill Journey</h2>
      <p className="mt-2">
        Ready to unlock your potential? Let’s start small, stay consistent, and grow meaningfully.
      </p>
      <Button onClick={onStart} className="mt-4">
        <div className="flex items-center ">
          Start a <span className="font-bold">Challenge</span>{' '}
          <ArrowRight width={20} className="ml-1" />
        </div>
      </Button>
    </div>
  );
}
