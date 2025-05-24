'use client';

import clsx from 'clsx';
import Link from '@/components/ui/Link';
import { AssessmentStepState, OnboardingProgress } from '@/types/onboarding';

interface Props {
  steps: AssessmentStepState[];
  progress: OnboardingProgress;
}

export default function OnboardingTimeline({ steps, progress }: Props) {
  const next = steps.find((step) => step.status == 'not_started');
  const nextIndex = steps.findIndex((s) => s.status === 'not_started');
  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium ">Progress</span>
          <span className="text-sm ">{progress.percent_complete}% completed</span>
        </div>
        <div className="h-2 rounded bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-[#08B1C7] transition-all duration-300"
            style={{ width: `${progress.percent_complete}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-dashed border-gray-300 pl-4">
        {steps.map((step, i) => {
          const isCurrent = i === nextIndex;

          return (
            <div key={step.step} className="relative pb-6 pt-1 pl-4">
              {/* Step circle */}
              <div className="absolute -left-2 top-1.5 w-4 h-4 flex items-center justify-center">
                <div
                  className={clsx(
                    'w-4 h-4 rounded-full border-2',

                    {
                      'bg-[#08B1C7] border-[#08B1C7]': step.status === 'completed',
                      'border-5  border-[#EE7777] bg-white': step.status === 'skipped',
                      'border-5 border-[#08B1C7] bg-white': isCurrent,
                      'border-gray-300':
                        !isCurrent && step.status !== 'completed' && step.status !== 'skipped',
                    },
                  )}
                ></div>
              </div>

              {/* Step content */}
              <div
                className={clsx('flex justify-between text-base', {
                  'text-black': isCurrent || (step.required && step.status !== 'completed'),
                  'text-[#08B1C7]': step.status === 'completed',
                  'text-[#EE7777]': step.status === 'skipped',
                  'text-gray-400':
                    !isCurrent &&
                    !step.required &&
                    step.status !== 'completed' &&
                    step.status !== 'skipped',
                })}
              >
                <div>
                  <h3 className={clsx('text-sm font-semibold')}>Step {step.step}</h3>
                  <p>{step.name}</p>
                  <p className={clsx('text-sm')}>{step.description}</p>
                </div>
                <span className={clsx('text-xs mt-1 font-medium')}>
                  {step.status == 'not_started'
                    ? step.required
                      ? 'Required'
                      : 'Optional'
                    : step.status}
                </span>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className={clsx(
                    'absolute left-0 top-4 h-full border-l border-dashed ',
                    step.status == 'completed' ? 'border-[#08B1C7]' : 'border-gray-300',
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
          <Link
            href={`/assessments/${next.slug}/start`}
            variant="primary"
            className="w-full text-center p-3"
          >
            Take the {next.name}
          </Link>
        </div>
      )}
    </div>
  );
}
