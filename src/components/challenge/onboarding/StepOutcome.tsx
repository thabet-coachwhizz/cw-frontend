// components/challenge/onboarding/StepOutcome.tsx

import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function StepOutcome({
  value,
  onChange,
  onSubmit,
  onBack,
}: {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-gray-500 mb-8">
        <span>{"LET'S BREAK IT DOWN"}</span>
        <span>5/5</span>
      </div>
      <h2 className="text-xl font-semibold mb-1">5/5 Desired Outcome</h2>
      <p className="text-sm text-gray-500 mb-4">What would success look like for you?</p>

      <Textarea
        placeholder="e.g. I want to feel calm and confident sharing one thought in each meeting."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={!value.trim()}>
          Create Challenge
        </Button>
      </div>
    </div>
  );
}
