// components/challenge/onboarding/StepImpact.tsx

import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function StepImpact({
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
        <span>3/5</span>
      </div>
      <h2 className="text-xl font-semibold mb-1">Why does this matter?</h2>
      <p className="text-sm text-gray-500 mb-4">
        How is this challenge impacting you? Is it affecting your performance, productivity,
        confidence, or well-being?
      </p>

      <Textarea
        placeholder="e.g. I feel disconnected from the team and worry they think I’m not contributing."
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
