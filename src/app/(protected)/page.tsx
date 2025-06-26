'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ChallengeOnboardingFlow from '@/components/challenge/onboarding/ChallengeOnboardingFlow';
import ChallengeEmptyState from '@/components/challenge/ChallengeEmptyState';
import { getUserChallenges } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';
import ChallengeList from '@/components/challenge/list/ChallengeList';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import MiniProgressTracker from '@/components/onboarding/MiniProgressTracker';

export default function Home() {
  const { user } = useAuth();
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
        <div className="flex-col space-y-3 max-w-[453px] w-full">
          <div>
            <div className="text-[#FBFBFF]">Dashboard</div>
            <div className="text-white font-bold text-lg">Welcome back!</div>
          </div>
          {showForm ? (
            <>
              <ChallengeOnboardingFlow onFinish={handleFinish} />
            </>
          ) : challenges.length === 0 ? (
            <div className="rounded-2xl bg-[#333546] p-4 w-full">
              <ChallengeEmptyState onStart={() => setShowForm(true)} />
            </div>
          ) : (
            <>
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
            </>
          )}
          <div>
            {user?.onboarding_progress && (
              <MiniProgressTracker progress={user.onboarding_progress} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
