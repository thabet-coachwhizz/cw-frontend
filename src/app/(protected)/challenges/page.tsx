'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserChallenges } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';
import ChallengeList from '@/components/challenge/list/ChallengeList';
import ChallengeOnboardingFlow from '@/components/challenge/onboarding/ChallengeOnboardingFlow';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import withPagePermission from '@/utils/withPagePermission';
import { PERMISSION_CREATE_OWN_CHALLENGE } from '@/utils/permissions';

function ChallengesPage() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // On mount: check if hash is #new
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#new') {
      setShowForm(true);
      // Clean the URL after activating
      setTimeout(() => {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }, 0);
    }
  }, []);
  const loadChallenges = async () => {
    setLoading(true);
    try {
      const res = await getUserChallenges();
      setChallenges(res);
    } finally {
      setLoading(false);
    }
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

  if (showForm)
    return (
      <main className="py-8 px-14 flex-grow flex items-center justify-center">
        <ChallengeOnboardingFlow onFinish={handleFinish} />
      </main>
    );

  return (
    <div className="px-6 py-8 flex justify-center">
      <div className="w-full max-w-[800px]">
        <div className="my-6 flex justify-end">
          <Button className="uppercase px-12 py-3" onClick={() => setShowForm(true)}>
            Start Challenge
          </Button>
        </div>

        <>
          <div className={'mb-6 text-xl'}>
            <span className="cursor-pointer text-[#08b1c7] ">All Challenges</span>
          </div>
          <ChallengeList
            challenges={challenges}
            onSelect={(challenge) => {
              router.push(`/challenges/${challenge.id}`);
            }}
          />
        </>
      </div>
    </div>
  );
}

export default withPagePermission(ChallengesPage, PERMISSION_CREATE_OWN_CHALLENGE);
