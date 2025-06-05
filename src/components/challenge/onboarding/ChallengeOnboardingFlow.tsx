'use client';

import { useState } from 'react';
import StepIntro from './StepIntro';
import StepDescription from './StepDescription';
import StepImpact from './StepImpact';
import StepAttempts from './StepAttempts';
import StepOutcome from './StepOutcome';
import StepProcessing from './StepProcessing';
import StepReveal from './StepReveal';
import StepSoftSkillInfo from './StepSoftSkillInfo';
import StepConfirmStart from './StepConfirmStart';
import { createChallenge } from '@/lib/api/challenges';
import { ChallengeCreatePayload, Challenge } from '@/types/challenge';
import toast from 'react-hot-toast';

export default function ChallengeOnboardingFlow({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ChallengeCreatePayload>({
    title: '',
    description: '',
    impact: '',
    attempts: '',
    desired_outcome: '',
  });
  const [challengeResponse, setChallengeResponse] = useState<Challenge | null>(null);

  const setField = (key: keyof ChallengeCreatePayload, value: string) => {
    setForm((prev: ChallengeCreatePayload) => ({ ...prev, [key]: value }));
  };

  const submitChallenge = async () => {
    setStep(6);

    try {
      const res = await createChallenge(form);

      setChallengeResponse(res);
      setStep(7);
    } catch {
      toast.error('Something went wrong creating the challenge');
      setStep(5); // go back
    }
  };

  return (
    <>
      {step === 1 && (
        <StepIntro
          value={form.title}
          onChange={(v) => setField('title', v)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepDescription
          value={form.description}
          onChange={(v) => setField('description', v)}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepImpact
          value={form.impact}
          onChange={(v) => setField('impact', v)}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <StepAttempts
          value={form.attempts}
          onChange={(v) => setField('attempts', v)}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <StepOutcome
          value={form.desired_outcome}
          onChange={(v) => setField('desired_outcome', v)}
          onSubmit={submitChallenge}
          onBack={() => setStep(4)}
        />
      )}
      {step === 6 && <StepProcessing />}
      {step === 7 && challengeResponse && (
        <StepReveal softSkill={challengeResponse?.soft_skill_name} onNext={() => setStep(8)} />
      )}
      {step === 8 && challengeResponse && (
        <StepSoftSkillInfo
          skill={{
            name: challengeResponse.soft_skill_name,
            main_task_name: challengeResponse.main_task_name,
            what_it_is: challengeResponse.soft_skill_description,
            why_its_needed: challengeResponse.soft_skill_reason,
            reframe_mindset: challengeResponse.soft_skill_mindset,
            awareness: challengeResponse.soft_skill_awareness,
            pro_tip: challengeResponse.pro_tip,
          }}
          onNext={() => setStep(9)}
        />
      )}
      {step === 9 && challengeResponse && (
        <StepConfirmStart
          softSkill={challengeResponse.soft_skill_name}
          mainTask={challengeResponse.main_task_name}
          mainTaskDescription={challengeResponse.soft_skill_description}
          onConfirm={onFinish}
        />
      )}
    </>
  );
}
