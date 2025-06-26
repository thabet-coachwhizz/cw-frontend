'use client';

import AppLink from '@/components/ui/Link';
import clsx from 'clsx';

type StepStatus = 'not_started' | 'completed';

interface Step {
  id: number;
  title: string;
  href: string;
  status: StepStatus;
  required: boolean;
}

interface MiniProgressTrackerProps {
  progress: {
    personality_done: boolean;
    values_done: boolean;
    passions_done: boolean;
  };
}

export default function MiniProgressTracker({ progress }: MiniProgressTrackerProps) {
  const steps: Step[] = [
    {
      id: 1,
      title: 'Personality Assessment',
      href: '/assessments/ocean/start',
      status: progress.personality_done ? 'completed' : 'not_started',
      required: true,
    },
    {
      id: 2,
      title: 'Core Values Assessment',
      href: '/assessments/core-values/start',
      status: progress.values_done ? 'completed' : 'not_started',
      required: false,
    },
    {
      id: 3,
      title: 'Career Passion Assessment',
      href: '/assessments/career-passions/start',
      status: progress.passions_done ? 'completed' : 'not_started',
      required: false,
    },
    /*{
      id: 4,
      title: 'First Challenge',
      href: '/challenges',
      status: 'not_started', // Placeholder for future integration
      required: true,
    },*/
  ];

  const customDash = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderImage: 'repeating-linear-gradient(to bottom, #B5B9BE 0 4px, transparent 5px 10px) 1',
  };
  const customSolid = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#08B1C7',
  };

  return (
    <div className="rounded-2xl bg-[#333546] p-4 w-full ">
      <h4 className="text-white font-bold mb-4">Mini Progress Tracker</h4>
      <div className="relative  ">
        {steps.map((step, index) => {
          const statusColor = step.status === 'completed' ? 'text-[#08B1C7]' : 'text-gray-300';

          return (
            <div key={step.id} className="relative pl-9 pb-4">
              {/* Step circle */}
              <span
                className={clsx(
                  'absolute -left-0 flex h-7 w-7 items-center justify-center rounded-full border-2 ',
                  {
                    'bg-[#08B1C7] text-white border-[#08B1C7]': step.status === 'completed',
                    'bg-[#252830] text-white border-[#08B1C7]': step.status === 'not_started',
                  },
                )}
              >
                {step.id}
              </span>
              {/* Connector line, except for last item */}
              {index < steps.length - 1 && (
                <span
                  className="absolute left-3.5 top-6 h-full"
                  style={step.status === 'completed' ? customSolid : customDash}
                ></span>
              )}
              {/* Step content */}

              <div>
                {step.status === 'not_started' ? (
                  <AppLink
                    href={step.href}
                    className={clsx('block font-semibold', statusColor, 'hover:underline')}
                  >
                    {step.title}
                  </AppLink>
                ) : (
                  <div className={clsx('block font-semibold', statusColor)}>{step.title}</div>
                )}

                <div className={clsx('text-xs capitalize', statusColor)}>
                  {step.status === 'completed' ? 'Completed' : 'Not Started'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
