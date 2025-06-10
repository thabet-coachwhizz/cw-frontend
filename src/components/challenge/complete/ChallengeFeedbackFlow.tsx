// src/components/challenge/complete/ChallengeFeedbackFlow.tsx
'use client';

import { useState } from 'react';
import FeedbackStep1 from './FeedbackStep1';
import FeedbackStep2 from './FeedbackStep2';
import { submitTaskCompletion } from '@/lib/api/challenges';
import { useRouter } from 'next/navigation';
import { Challenge, ChallengeTask } from '@/types/challenge';

interface Props {
  challenge: Challenge;
  task: ChallengeTask;
  onComplete?: () => void;
}

export default function ChallengeFeedbackFlow({ challenge, task, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackResponse, setFeedbackResponse] = useState('');
  const [otherText, setOtherText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!rating) return;
    setSubmitting(true);
    try {
      await submitTaskCompletion(challenge.id, task.id, {
        confidence_rating: rating,
        feedback_response: feedbackResponse,
        other_text: feedbackResponse === 'Other' ? otherText : '',
      });

      if (onComplete) {
        onComplete();
      } else {
        router.push('/challenges?id=' + challenge.id);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextFromStep1 = () => {
    if (!rating) return;
    if (rating >= 6) {
      handleSubmit(); // skip step 2
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 mb-4">
          <div className="p-5 rounded-t-3xl rounded-b-0  bg-[#333546] ">
            <div className="inline-block rounded-2xl bg-[#292A38] px-4 py-3">
              <span className="text-gray-400">Soft Skill: </span>{' '}
              <span className="font-semibold">{challenge.soft_skill_name}</span>
            </div>

            <div className=" mt-4">
              <div className="text-2xl">{challenge.main_task_name}</div>
              <p className="mt-4">{challenge.main_task_description}</p>
            </div>
          </div>

          <div className="p-5 rounded-b-3xl rounded-t-0  bg-[#333546] mt-1">
            <div className=" mt-4">
              <div className="text-2xl">Step # {task.step_order}</div>
              <p className=" mb-2">{task.title}</p>
              <p className="text-gray-300 mb-4">{task.instructions}</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-4 lg:pl-10 grid content-between">
          {step === 1 && (
            <FeedbackStep1 value={rating} onSelect={setRating} onNext={handleNextFromStep1} />
          )}

          {step === 2 && (
            <FeedbackStep2
              value={feedbackResponse}
              other={otherText}
              onChange={setFeedbackResponse}
              onOtherText={setOtherText}
              onSubmit={handleSubmit}
              disabled={submitting || !feedbackResponse}
            />
          )}
        </div>
      </div>
    </>
  );
}
