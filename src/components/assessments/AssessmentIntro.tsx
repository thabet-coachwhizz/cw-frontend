import Button from '@/components/ui/Button';
//import { Clock } from 'lucide-react';

export function AssessmentIntro({
  assessment,
  onStart,
  onSkip,
  isFirst,
}: {
  assessment: { name: string; description?: string; slug: string };
  onStart: () => void;
  onSkip?: () => void;
  isFirst: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-500">
        {
          //<Clock className="w-4 h-4 mr-1" />
        }
        <span>Estimated time: 5 minutes</span>
      </div>

      <h1 className="text-2xl font-bold">{assessment.name}</h1>
      <p>{assessment.description}</p>

      <div className="flex gap-4 pt-4">
        {isFirst ? (
          <Button onClick={onStart}>Start</Button>
        ) : (
          <>
            <Button onClick={onStart}>Next</Button>
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
