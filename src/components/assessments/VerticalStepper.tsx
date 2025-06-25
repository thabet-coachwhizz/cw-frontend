'use client';

import clsx from 'clsx';

export interface StepItem {
  id: number;
  title: string;
  description?: string;
}

interface VerticalStepperProps {
  currentStep: number;
  steps: StepItem[];
}

export function VerticalStepper({ currentStep, steps }: VerticalStepperProps) {
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
    <div className="relative  ">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="relative pl-8 pb-4">
            {/* Step circle */}
            <span
              className={clsx(
                'absolute -left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ',
                {
                  'bg-[#252830] text-white border-[#08B1C7]': isActive,
                  'bg-[#08B1C7] text-white border-[#08B1C7]': isCompleted,
                  ' bg-[#252830] border-gray-500 text-gray-400': !isActive && !isCompleted,
                },
              )}
            >
              {step.id}
            </span>
            {/* Connector line, except for last item */}
            {index < steps.length - 1 && (
              <span
                className="absolute left-3 top-6 h-full"
                style={step.id < currentStep ? customSolid : customDash}
              ></span>
            )}
            {/* Step content */}
            <div
              className={clsx(
                isActive ? 'text-white' : isCompleted ? 'text-[#08B1C7]' : 'text-gray-400',
              )}
            >
              <h4 className="font-bold">{step.title}</h4>
              <p className="text-sm">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
