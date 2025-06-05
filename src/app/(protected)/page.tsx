'use client';
import { useState, useEffect } from 'react';
import ChallengeOnboardingFlow from '@/components/challenge/onboarding/ChallengeOnboardingFlow';
import ChallengeEmptyState from '@/components/challenge/ChallengeEmptyState';
import ChallengeList from '@/components/challenge/ChallengeList';
import { getUserChallenges } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const loadChallenges = async () => {
    const all = await getUserChallenges();
    const active = all.filter((ch: Challenge) => ch.status !== 'completed');
    setChallenges(active);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleFinish = () => {
    setShowForm(false);
    loadChallenges();
  };

  return (
    <>
      <main className="py-8 px-14 flex-grow flex items-center justify-center">
        <div className="rounded-xl p-6 bg-[#333546] md:min-w-[690px]">
          {showForm ? (
            <ChallengeOnboardingFlow onFinish={handleFinish} />
          ) : challenges.length === 0 ? (
            <ChallengeEmptyState onStart={() => setShowForm(true)} />
          ) : (
            <ChallengeList challenges={challenges} onNew={() => setShowForm(true)} />
          )}
        </div>
      </main>
    </>
  );
}
