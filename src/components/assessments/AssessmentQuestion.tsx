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
  selected: string | null;
  onChange: (option: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500 font-medium">
        Question {index + 1} of {total}
      </div>
      <div className="text-lg font-semibold">{question.content}</div>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={opt.label}
              checked={selected === opt.label}
              onChange={() => onChange(opt.label)}
              className="accent-blue-500"
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
