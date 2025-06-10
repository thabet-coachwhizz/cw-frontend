// src/components/challenge/complete/FeedbackStep2.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import RadioGroup from '@/components/ui/RadioGroup';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface Props {
  value: string;
  other: string;
  onChange: (val: string) => void;
  onOtherText: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const options = [
  'I’m still not sure I did it right',
  'I need more guidance or examples',
  'It didn’t fully address my challenge',
  'I struggled to stay focused or motivated',
  'It felt overwhelming or unclear',
  'I’m unsure how this connects to my growth',
  'Other',
];

export default function FeedbackStep2({
  value,
  other,
  onChange,
  onOtherText,
  onSubmit,
  disabled,
}: Props) {
  const handleSubmit = async () => {
    await onSubmit();
  };

  return (
    <>
      <div className="space-y-4">
        <div className="text-2xl">Feedback</div>
        <div className="space-y-4">
          <p>
            Thanks for completing the challenge. We noticed your confidence level is still a bit
            low, and that’s totally okay.
          </p>
          <p>
            To help us support you better next time, what best explains how you’re feeling right
            now?
          </p>
          <p>Pick the option that fits most:</p>
        </div>

        <div className="space-y-2">
          <RadioGroup
            label={''}
            name={`feedback-radio-group`}
            options={options.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            direction="column"
          />
        </div>

        {value === 'Other' && (
          <div className="mt-2">
            <label className="text-sm text-gray-400">Tell us 👇</label>
            <Textarea value={other} onChange={(e) => onOtherText(e.target.value)} />
          </div>
        )}

        <div>
          <p>
            Your feedback helps us improve the next step, and make sure you’re never stuck for long.
          </p>
        </div>

        <div className=" text-right">
          <Button className="mt-4" onClick={handleSubmit} disabled={disabled}>
            <span className="flex px-4">
              <span className="pr-2">Next </span>

              <ArrowRight size={24} />
            </span>{' '}
          </Button>
        </div>
      </div>
    </>
  );
}
