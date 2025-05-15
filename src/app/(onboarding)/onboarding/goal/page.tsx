'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGoal } from '@/lib/api/onboarding';
import Button from '@/components/ui/Button';

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
      <p className="text-gray-600">
        Fast forward 12 months—what does career success look like for you? Are you leading a
        project, mastering a new skill, or stepping into a new role?
      </p>

      <textarea
        className="w-full border rounded-lg p-3 text-sm min-h-[120px]"
        placeholder="Compromise to maintain team harmony."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <Button onClick={handleFinish} loading={submitting} disabled={!goal.trim() || submitting}>
        Finish
      </Button>
    </div>
  );
}
