interface AssessmentStatus {
  slug: string;
  status: 'not_started' | 'completed' | 'skipped';
  label: string;
  stepNumber: number;
}

export function AssessmentStepper({
  assessments,
  currentSlug,
}: {
  assessments: AssessmentStatus[];
  currentSlug: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-2 mb-6">
      <div className="flex gap-2">
        {assessments.map((a) => {
          const isCurrent = a.slug === currentSlug;
          const colorClass = isCurrent
            ? 'bg-blue-500'
            : a.status === 'completed'
              ? 'bg-blue-500'
              : a.status === 'skipped'
                ? 'bg-red-500'
                : 'bg-gray-300';

          return <div key={a.slug} className={`h-2 w-20 rounded ${colorClass}`} />;
        })}
      </div>
      <div className="flex justify-between w-full text-sm font-medium text-gray-600">
        <span>{assessments.find((a) => a.slug === currentSlug)?.label}</span>
        <span>{assessments.find((a) => a.slug === currentSlug)?.stepNumber}/3</span>
      </div>
    </div>
  );
}
