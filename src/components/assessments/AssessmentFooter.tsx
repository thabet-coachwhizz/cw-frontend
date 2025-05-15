import Button from '@/components/ui/Button';

export function AssessmentFooter({
  isFirst,
  isLast,
  onBack,
  onNext,
  onFinish,
  submitting = false,
}: {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  submitting: boolean;
}) {
  return (
    <div className="flex justify-between pt-6">
      {!isFirst && (
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      )}
      {isLast ? (
        <Button onClick={onFinish} disabled={submitting} loading={submitting}>
          Finish
        </Button>
      ) : (
        <Button onClick={onNext}>Next</Button>
      )}
    </div>
  );
}
