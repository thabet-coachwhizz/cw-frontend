'use client';
import { useState, useEffect } from 'react';
import ChallengeOnboardingFlow from '@/components/challenge/onboarding/ChallengeOnboardingFlow';
import ChallengeEmptyState from '@/components/challenge/ChallengeEmptyState';
import { getUserChallenges } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';
import ChallengeList from '@/components/challenge/list/ChallengeList';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loadChallenges = async () => {
    setLoading(true);
    getUserChallenges()
      .then((res) => {
        setChallenges(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleFinish = (newChallengeId?: number) => {
    setShowForm(false);
    loadChallenges();
    if (newChallengeId) {
      router.push(`/challenges/${newChallengeId}`);
    }
  };

  if (loading) return <Loader message="Loading challenges..." />;

  return (
    <>
      <main className="py-8 px-14 flex-grow flex items-center justify-center">
        {showForm ? (
          <ChallengeOnboardingFlow onFinish={handleFinish} />
        ) : challenges.length === 0 ? (
          <ChallengeEmptyState onStart={() => setShowForm(true)} />
        ) : (
          <div className=" md:min-w-[700px] ">
            <h2 className="text-xl font-semibold text-white mb-4">Active Challenges</h2>
            <ChallengeList
              challenges={challenges}
              onSelect={(challenge) => router.push(`/challenges?id=${challenge.id}`)}
            />

            <Button onClick={() => setShowForm(true)} className="mt-4">
              Bring Another Challenge
            </Button>
          </div>
        )}
      </main>
    </>
  );
}
