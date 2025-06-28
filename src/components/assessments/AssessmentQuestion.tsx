import Button from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

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
  isFirst,
  isLast,
  onBack,
  onNext,
  onSelectAndNext,
  onFinish,
  submitting = false,
  error = null,
}: {
  index: number;
  total: number;
  question: AssessmentQuestion;
  selected: string | undefined;
  onChange: (option: string) => void;
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: (selected?: string) => void;
  onSelectAndNext?: (option: string) => void;
  onFinish: () => void;
  submitting: boolean;
  error?: string | null;
}) {
  return (
    <div className="space-y-6">
      <div className={clsx('space-y-1 w-full')}>
        <label className="block  font-semibold leading-6 text-[#BBBBC0] text-xl mb-5">
          {question.content}
        </label>
        <div className="flex flex-col space-y-2.5">
          {question.options.map((opt) => {
            const isSelected = selected === opt.label;

            return (
              <label
                key={opt.label}
                className={clsx(
                  'flex items-center space-x-2 px-4  py-4 rounded-xl text-sm cursor-pointer transition-colors',
                  isSelected ? 'bg-[#292A38] border-1 border-[#08B1C7]' : 'bg-white/5',
                )}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={opt.label}
                  checked={isSelected}
                  onChange={(e) => onChange(e.target.value)}
                  className="h-4 w-4 accent-[#08B1C7]"
                />
                <span className="text-white flex-grow">{opt.text}</span>
                {onSelectAndNext && !isLast && (
                  <span
                    onClick={(e) => {
                      e.preventDefault(); // prevent bubbling if needed
                      onSelectAndNext(opt.label);
                    }}
                    className="w-7 h-7 border-2 border-[#B5B9BE] hover:border-[#08B1C7] rounded-full flex items-center justify-center cursor-pointer transition"
                  >
                    <ArrowRight width={18} />
                  </span>
                )}
              </label>
            );
          })}
        </div>
        {error && <p className="text-sm text-[#EE7777]">{error}</p>}

        <div className="flex justify-center items-center space-x-5 pt-8">
          <Button
            variant="primary"
            onClick={onBack}
            disabled={isFirst}
            className="rounded-tr-none rounded-br-none"
          >
            <ArrowLeft />
          </Button>

          <div className="text-xl font-medium">
            {index + 1}/{total}
          </div>
          {isLast ? (
            <Button
              onClick={onFinish}
              disabled={submitting}
              loading={submitting}
              className="rounded-tl-none rounded-bl-none flex"
            >
              Submit <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                onNext(selected);
              }}
              className="rounded-tl-none rounded-bl-none"
            >
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
