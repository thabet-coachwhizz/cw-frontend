// components/challenge/onboarding/StepDescription.tsx

import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function StepDescription({
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
        <span>2/5</span>
      </div>
      <h2 className="text-xl font-semibold mb-1">Detailed Description</h2>
      <p className="text-sm text-gray-500 mb-4">
        {'What’s the situation? What exactly are you struggling with?'}
      </p>

      <Textarea
        placeholder="e.g. I have thoughts during meetings but feel too nervous to speak up."
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
