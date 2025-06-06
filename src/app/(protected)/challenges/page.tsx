'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserChallenges } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import clsx from 'clsx';
import { Lightbulb, Trash2 } from 'lucide-react';

import ChallengeList from '@/components/challenge/list/ChallengeList';
import ChallengeDetail from '@/components/challenge/detail/ChallengeDetail';
import ChallengeBreadcrumb from '@/components/challenge/shared/ChallengeBreadcrumb';
import ChallengeOnboardingFlow from '@/components/challenge/onboarding/ChallengeOnboardingFlow';

export default function ChallengesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadChallenges = async () => {
    setLoading(true);
    try {
      const res = await getUserChallenges();
      setChallenges(res);
      const id = searchParams.get('id');
      if (id) {
        const match = res.find((c: Challenge) => c.id === Number(id));
        if (match) {
          setSelected(match);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!challenges.length) return;

    const id = searchParams.get('id');
    if (id) {
      const match = challenges.find((c) => c.id === Number(id));
      setSelected(match || null);
    } else {
      setSelected(null); // clear if no id param
    }
  }, [searchParams, challenges]);

  const handleFinish = () => {
    setShowForm(false);
    loadChallenges();
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
      <div
        className={clsx('w-full', {
          'max-w-[800px]': !selected,
          'max-w-[990px] rounded-3xl bg-[#1C1F27] mt-12 p-8': selected,
        })}
      >
        {!selected && (
          <div className="my-6 flex justify-end">
            <Button className="uppercase px-12 py-3" onClick={() => setShowForm(true)}>
              Start Challenge
            </Button>
          </div>
        )}

        {selected ? (
          <>
            <section className="flex flex-col md:flex-row">
              <div className="space-y-7 flex-1 md:mr-5">
                {/* Left column content */}
                <ChallengeBreadcrumb
                  className={clsx({
                    'text-xl': !selected,
                    'text-md': selected,
                  })}
                  currentTitle={selected?.main_task_name}
                  onBack={() => {
                    setSelected(null);
                    router.push('/challenges');
                  }}
                />
                <ChallengeDetail challenge={selected} />
              </div>

              <div className="w-[181px] shrink-0">
                {/* Right column content */}
                <div className="relative">
                  <Lightbulb className="relative" />
                </div>
                <div className="font-semibold mt-2">Pro tip</div>
                <p className="text-[#FFFFFF80]">{selected.pro_tip}</p>
                <div className="mt-8">
                  <DeleteChallengeButton />
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <ChallengeBreadcrumb
              className="text-xl"
              onBack={() => {
                setSelected(null);
                router.push('/challenges');
              }}
            />
            <ChallengeList
              challenges={challenges}
              onSelect={(challenge) => {
                setSelected(challenge);
                router.push(`/challenges?id=${challenge.id}`);
              }}
            />
          </>
        )}
      </div>
    </div>
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
