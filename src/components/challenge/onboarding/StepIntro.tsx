// components/challenge/onboarding/StepIntro.tsx

import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function StepIntro({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-gray-500 mb-8">
        <span>{"LET'S BREAK IT DOWN"}</span>
        <span>1/5</span>
      </div>
      <h2 className="text-xl font-semibold mb-1"> Title of the challenge</h2>
      <p className="text-sm text-gray-500 mb-4">Give your challenge a short, clear name.</p>

      <Textarea
        placeholder="e.g. Difficulty speaking up in meetings"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={onNext} disabled={!value.trim()}>
          Next
        </Button>
      </div>
    </div>
  );
}
