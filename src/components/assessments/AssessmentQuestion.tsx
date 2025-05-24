import RadioGroup from '@/components/ui/RadioGroup';

type AssessmentOption = {
  label: string;
  text: string;
};

type AssessmentQuestion = {
  id: number;
  content: string;
  options: AssessmentOption[];
};
export function AssessmentQuestion({
  index,
  total,
  question,
  selected,
  onChange,
}: {
  index: number;
  total: number;
  question: AssessmentQuestion;
  selected: string | undefined;
  onChange: (option: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-sm font-medium">
        Question {index + 1} of {total}
      </div>

      <div className="space-y-2">
        <RadioGroup
          label={question.content}
          name={`question-${question.id}`}
          options={question.options.map((opt) => ({
            value: opt.label,
            label: opt.text,
          }))}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          direction="column"
        />
      </div>
    </div>
  );
}
