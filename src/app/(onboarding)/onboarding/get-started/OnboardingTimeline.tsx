'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import Link from '@/components/ui/Link';
import { AssessmentStepState } from '@/types/onboarding';
import { skipAssessment } from '@/lib/api/assessments';

interface Props {
  steps: AssessmentStepState[];
  reloadProgress: () => void;
}

export default function OnboardingTimeline({ steps, reloadProgress }: Props) {
  const router = useRouter();
  const next = steps.find((step) => step.status == 'not_started');
  const nextIndex = steps.findIndex((s) => s.status === 'not_started');
  const total = steps.length;
  const completedCount = steps.filter((step) => step.status === 'completed').length;
  const customDash = {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderImage: 'repeating-linear-gradient(to right, #B5B9BE 0 5px, transparent 5px 10px) 1',
  };
  const customSolid = {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#08B1C7',
  };

  const onSkip = async () => {
    if (next && next.required === false) {
      try {
        await skipAssessment(next.slug);
        await reloadProgress();

        if (next.slug === 'career-passions') {
          router.push('/onboarding/goal');
        }
      } catch (err) {
        console.error('Failed to skip assessment:', err);
      }
    } else {
      console.warn(`Skipping is not allowed for required assessment: ${next?.slug}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium ">Complete Assessments</span>
          <span className="text-sm bg-[#ffffff0f] rounded-2xl py-0.5 px-2">
            {completedCount}/{total}
          </span>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className=" flex ">
        {steps.map((step, i) => {
          const isCurrent = i === nextIndex;

          return (
            <div key={step.step} className="relative flex flex-col flex-1">
              {/* Step circle */}
              <div
                className={clsx(
                  'w-9 h-9 rounded-full border-2 flex items-center justify-center z-10',

                  {
                    'bg-[#08B1C7] border-[#08B1C7]': step.status === 'completed',
                    'border-2  border-[#EE7777] bg-[#292A38]': step.status === 'skipped',
                    'border-2 border-[#08B1C7] bg-[#292A38]': isCurrent,
                    'border-gray-300 bg-[#333546]':
                      !isCurrent && step.status !== 'completed' && step.status !== 'skipped',
                  },
                )}
              >
                <span className="font-bold text-white">{step.step}</span>
              </div>

              {/* Step content */}
              <div
                className={clsx('mt-4 space-y-2', {
                  'opacity-60': !isCurrent && step.status === 'not_started',
                })}
              >
                <div
                  className={clsx({
                    'text-white': step.status !== 'completed',
                    'text-[#08B1C7]': step.status === 'completed',
                  })}
                >
                  <h3 className="text-sm font-bold ">{step.name}</h3>
                  <p className="text-xs">{step.description}</p>
                </div>
                {step.status !== 'completed' && step.status !== 'skipped' && (
                  <p className="text-xs font-medium text-[#08B1C7]">
                    {step.required ? '* Required' : 'Optional'}
                  </p>
                )}
                {step.status === 'completed' && (
                  <Link
                    href={`/assessments/${step.slug}/start`}
                    variant="outline"
                    className=" text-sm text-white py-2 px-4 bg-[#292A38] !border-[#08B1c7]"
                  >
                    Edit Response
                  </Link>
                )}
                {step.status === 'skipped' && (
                  <Link
                    href={`/assessments/${step.slug}/start`}
                    variant="outline"
                    className=" text-sm text-white py-2 px-4 bg-[#292A38] !border-[#08B1c7]"
                  >
                    Add Response
                  </Link>
                )}
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className={clsx(
                    'absolute top-4 w-full h-0.5 ',
                    step.status === 'completed' ? 'border-[#08B1C7]' : 'border-gray-300',
                  )}
                  style={step.status === 'completed' ? customSolid : customDash}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      {next && (
        <div className="pt-16 text-right">
          {next.required === false && (
            <Link
              variant="outline"
              href=""
              onClick={onSkip}
              className="border-[#08B1C7]! border-2 bg-[#292A38] text-white mr-3 py-3 px-5"
            >
              Skip
            </Link>
          )}

          <Link
            href={`/assessments/${next.slug}/start`}
            variant="primary"
            className=" text-center p-3 uppercase"
          >
            Start <span className="font-bold">{next.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
