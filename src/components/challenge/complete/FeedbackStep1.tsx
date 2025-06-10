// src/components/challenge/complete/FeedbackStep1.tsx
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
interface Props {
  value: number | null;
  onSelect: (val: number) => void;
  onNext: () => void;
}

export default function FeedbackStep1({ value, onSelect, onNext }: Props) {
  return (
    <>
      <div className="space-y-6 pt-10 ">
        <div className="text-2xl">Tell us how you feel?</div>
        <div className="text-[#BBBBC0]">
          <div className="p-5 rounded-3xl bg-[#333546] ">
            <div className=" mb-4">
              On a scale of 1 to 10, how confident were you about tackling this challenge?
            </div>
            <div className="flex justify-between pb-2">
              <span>Not at all</span>
              <span>Very Confident</span>
            </div>
            <div className="flex justify-between">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => onSelect(num)}
                  className={`w-8 h-8 text-sm rounded-md cursor-pointer ${
                    value && num <= value ? 'bg-[#08B1C7] text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            Your reponse helps us fine-tune the support and the insights you receive.
          </div>
        </div>
      </div>
      <div className="pt-4 text-right">
        <Button onClick={onNext} disabled={value === null}>
          <span className="flex px-4">
            <span className="pr-2">Next </span>

            <ArrowRight size={24} />
          </span>
        </Button>
      </div>
    </>
  );
}
