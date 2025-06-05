// components/challenge/ChallengeEmptyState.tsx

import Button from '@/components/ui/Button';

import React from 'react';

export default function ChallengeEmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center  ">
      <h2 className="text-lg font-semibold">You don’t have any challenges yet</h2>
      <p className="mt-1">Let’s bring one and turn it into a soft skill.</p>
      <Button onClick={onStart} className="mt-4">
        Bring a Challenge
      </Button>
    </div>
  );
}
