// src/components/challenge/detail/ChallengeDetail.tsx
'use client';

import { useState } from 'react';
import { Lightbulb, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Challenge, ChallengeTask } from '@/types/challenge';
import ChallengeStepTabs from './ChallengeStepTabs';
import ChallengeAccordion from './ChallengeAccordion';
import ChallengeProgressBar from './ChallengeProgressBar';
import Button from '@/components/ui/Button';
import ChallengeFeedbackFlow from '@/components/challenge/complete/ChallengeFeedbackFlow';

interface Props {
  challenge: Challenge;
}

export default function ChallengeDetail({ challenge }: Props) {
  const router = useRouter();
  const activeStep = challenge.tasks.find((t) => t.status === 'active');
  const [currentStep, setCurrentStep] = useState(activeStep?.step_order || 1);

  const step = challenge.tasks.find((t) => t.step_order === currentStep) as ChallengeTask;

  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      {showFeedback ? (
        <>
          <div className="mb-6">
            <span
              className="cursor-pointer text-[#08b1c7] "
              onClick={() => {
                router.push('/challenges');
              }}
            >
              All Challenges
            </span>
            {challenge && (
              <>
                <span className="text-white">
                  {' '}
                  &gt;{' '}
                  <span
                    className="cursor-pointer text-[#08b1c7]"
                    onClick={() => {
                      setShowFeedback(false);
                    }}
                  >
                    {challenge?.main_task_name}
                  </span>
                </span>
                <span className="text-white">
                  {' '}
                  &gt; <span className="text-white">Feedback</span>
                </span>
              </>
            )}
          </div>
          <ChallengeFeedbackFlow
            challenge={challenge}
            task={step}
            onComplete={() => {
              setShowFeedback(false);
              //refreshChallenge(); // TODO:: refresh challeges after the submittions
            }}
          />
        </>
      ) : (
        <>
          <section className="flex flex-col md:flex-row">
            <div className="space-y-7 flex-1 md:mr-5">
              {/* Left column content */}
              <div className="mb-6">
                <span
                  className="cursor-pointer text-[#08b1c7] "
                  onClick={() => {
                    router.push('/challenges');
                  }}
                >
                  All Challenges
                </span>
                {challenge && (
                  <span className="text-white">
                    {' '}
                    &gt; <span className="text-white">{challenge?.main_task_name}</span>
                  </span>
                )}
              </div>

              <>
                {/* 🟩 Box 1: Main Summary */}
                <div className="p-5 rounded-3xl  bg-[#333546] ">
                  <div className="flex justify-between items-center">
                    <div className="text-lg">{challenge.main_task_name}</div>
                    <div className="rounded-2xl bg-[#292A38] px-4 py-3">
                      <span className="text-gray-400">Soft Skill: </span>{' '}
                      <span className="font-semibold">{challenge.soft_skill_name}</span>
                    </div>
                  </div>
                  <p className="mt-4">{challenge.main_task_description}</p>
                  <ChallengeProgressBar tasks={challenge.tasks} />
                </div>

                {/* 🟩 Box 2: Step Tabs */}
                <div className="">
                  <ChallengeStepTabs
                    tasks={challenge.tasks}
                    current={currentStep}
                    onChange={setCurrentStep}
                  />

                  <div className="p-5 rounded-3xl rounded-tl-none bg-[#333546]">
                    <p className=" mb-2">
                      Step # {step.step_order} - {step.title}
                    </p>
                    <p className="text-gray-300 mb-4">{step.instructions}</p>

                    {step.status === 'active' && (
                      <div className="flex justify-between mt-6">
                        <Button
                          variant="outline"
                          className="text-white border-2 !border-[#08B1c7] bg-[#292A3B]"
                        >
                          Are you stuck?
                        </Button>
                        <Button onClick={() => setShowFeedback(true)}>Mark as Done</Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 🟩 Box 3: Challenge Details */}
                <ChallengeAccordion
                  title="Challenge Detailed Description"
                  className="p-5 bg-[#BDC8F208] rounded-3xl"
                >
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Main Challenge"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <div className="text-xl font-semibold mt-3 mb-2">
                        {challenge.main_task_name}
                      </div>
                      <p>{challenge.main_task_description}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title={`What is ${challenge.soft_skill_name}`}
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.soft_skill_description}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Why is this skill important in your case?"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.soft_skill_reason}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Reframe Your Mindset"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.soft_skill_mindset}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Observe & Identify"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.soft_skill_awareness}</p>
                    </ChallengeAccordion>
                  </div>
                </ChallengeAccordion>

                {/* 🟩 Box 4: Review Input */}
                <ChallengeAccordion
                  title="Review your input"
                  className="p-5 bg-[#BDC8F208] rounded-3xl"
                >
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Detailed description"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.description}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Why Does This Matter?"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.impact}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="What Have You Tried?"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.attempts}</p>
                    </ChallengeAccordion>
                  </div>
                  <div className="mt-4">
                    <ChallengeAccordion
                      title="Desired Outcome?"
                      className="p-5 bg-[#333546] rounded-2xl"
                    >
                      <p className="text-[#BBBBc0] mt-3">{challenge.desired_outcome}</p>
                    </ChallengeAccordion>
                  </div>
                </ChallengeAccordion>
              </>
            </div>

            <div className="w-[181px] shrink-0">
              {/* Right column content */}
              <div className="relative">
                <Lightbulb className="relative" />
              </div>
              <div className="font-semibold mt-2">Pro tip</div>
              <p className="text-[#FFFFFF80]">{challenge.pro_tip}</p>
              <div className="mt-8">
                <DeleteChallengeButton />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function DeleteChallengeButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 bg-[#333546] rounded-xl px-4 py-3 text-[#EE7777] hover:opacity-90 cursor-pointer transition"
    >
      <Trash2 size={20} />
      <span>Delete Challenge</span>
    </button>
  );
}
