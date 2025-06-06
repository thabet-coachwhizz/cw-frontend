// src/components/challenge/shared/ChallengeBreadcrumb.tsx
'use client';

import clsx from 'clsx';

interface Props {
  currentTitle?: string;
  onBack?: () => void;
  className?: string;
}

export default function ChallengeBreadcrumb({ currentTitle, onBack, className }: Props) {
  return (
    <div className={clsx('mb-6', className)}>
      <span className="cursor-pointer text-[#08b1c7] " onClick={onBack}>
        All Challenges
      </span>
      {currentTitle && (
        <span className="text-white">
          {' '}
          &gt; <span className="text-white">{currentTitle}</span>
        </span>
      )}
    </div>
  );
}
