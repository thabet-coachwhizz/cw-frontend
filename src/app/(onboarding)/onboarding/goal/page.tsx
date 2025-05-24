'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGoal } from '@/lib/api/onboarding';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';

export default function GoalPage() {
  const [goal, setGoal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleFinish = async () => {
    if (!goal.trim()) return;
    setSubmitting(true);
    try {
      await updateGoal(goal.trim());
      router.push('/'); // onboarding complete in this version
    } catch (err) {
      console.error('Failed to save goal', err);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">Where Are You Headed in 12 months?</h1>

      <Textarea
        label=" Fast forward 12 months—what does career success look like for you? Are you leading a
        project, mastering a new skill, or stepping into a new role?"
        className="min-h-[120px] border-1 border-black mt-2"
        placeholder="Compromise to maintain team harmony."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <Button
        onClick={handleFinish}
        loading={submitting}
        disabled={!goal.trim() || submitting}
        className="w-full"
      >
        Finish
      </Button>
    </div>
  );
}
