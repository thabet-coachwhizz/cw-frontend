// src/components/challenge/detail/ChallengeAccordion.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChallengeAccordion({ title, children, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        className="w-full flex items-center justify-between hover:cursor-pointer font-semibold"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {open && <div>{children}</div>}
    </div>
  );
}
