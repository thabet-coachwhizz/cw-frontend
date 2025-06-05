// components/challenge/onboarding/StepAttempts.tsx

import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function StepAttempts({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-gray-500 mb-8">
        <span>{"LET'S BREAK IT DOWN"}</span>
        <span>4/5</span>
      </div>
      <h2 className="text-xl font-semibold mb-1">What have you tried?</h2>
      <p className="text-sm text-gray-500 mb-4">{'Any steps you’ve already taken to fix this.'}</p>

      <Textarea
        placeholder="e.g. I tried writing what I want to say before meetings, but still freeze up."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!value.trim()}>
          Next
        </Button>
      </div>
    </div>
  );
}
