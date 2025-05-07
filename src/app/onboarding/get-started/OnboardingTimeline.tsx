'use client';

import clsx from 'clsx';
import Link from '@/components/ui/Link';

interface AssessmentStep {
  step: number;
  name: string;
  description: string;
  done: boolean;
  required: boolean;
  slug: string;
}

interface Props {
  progress: {
    percent_complete: number;
    profile_completed: boolean;
    personality_done: boolean;
    values_done: boolean;
    passions_done: boolean;
  };
}

const ASSESSMENTS: AssessmentStep[] = [
  {
    step: 1,
    name: 'Personality Assessment',
    description: 'Curiosity, Imagination, Innovation',
    done: false,
    required: true,
    slug: 'personality',
  },
  {
    step: 2,
    name: 'Core Values',
    description: 'What matters most to you?',
    done: false,
    required: false,
    slug: 'values',
  },
  {
    step: 3,
    name: 'Career Passions',
    description: 'What drives you at work?',
    done: false,
    required: false,
    slug: 'passions',
  },
];

export default function OnboardingTimeline({ progress }: Props) {
  const assessments = ASSESSMENTS.map((step) => ({
    ...step,
    done: progress[`${step.slug.replace('-', '_')}_done` as keyof typeof progress] === true,
  }));

  const next = assessments.find((step) => !step.done);

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">Progress</span>
          <span className="text-sm text-gray-600">{progress.percent_complete}% completed</span>
        </div>
        <div className="h-2 rounded bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress.percent_complete}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-dashed border-gray-300 pl-4">
        {assessments.map((step, i) => {
          const noStepsDone = assessments.every((s) => !s.done);
          const isCurrent = noStepsDone ? i === 0 : !step.done && assessments[i - 1]?.done;

          return (
            <div key={step.step} className="relative pb-6 pt-1 pl-4">
              {/* Step circle */}
              <div className="absolute -left-2 top-1.5 w-4 h-4 flex items-center justify-center">
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border-2',
                    step.done
                      ? 'bg-blue-600 border-blue-600'
                      : isCurrent
                        ? 'border-5 border-blue-600 bg-white'
                        : 'border-gray-300',
                  )}
                ></div>
              </div>

              {/* Step content */}
              <div
                className={clsx(
                  'flex justify-between text-base',
                  isCurrent || step.done ? 'text-black' : 'text-gray-400',
                )}
              >
                <div>
                  <h3 className={clsx('text-sm font-semibold')}>Step {step.step}</h3>
                  <p>{step.name}</p>
                  <p className={clsx('text-sm')}>{step.description}</p>
                </div>
                <span className={clsx('text-xs mt-1 font-medium')}>
                  {step.required ? 'Required' : 'Optional'}
                </span>
              </div>

              {/* Connector */}
              {i < assessments.length - 1 && (
                <div
                  className={clsx(
                    'absolute left-0 top-4 h-full border-l border-dashed ',
                    step.done ? 'border-blue-600' : 'border-gray-300',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      {next && (
        <div className="pt-4">
          <Link href={`/assessments/${next.slug}`} variant="primary" className="w-full text-center">
            Take the {next.name}
          </Link>
        </div>
      )}
    </div>
  );
}
