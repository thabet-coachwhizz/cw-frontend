'use client';

import { useAuth } from '@/context/AuthContext';
import ChallengeEmptyState from '@/components/challenge/ChallengeEmptyState';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import MiniProgressTracker from '@/components/onboarding/MiniProgressTracker';
import { hasPermission, PERMISSION_CREATE_OWN_CHALLENGE } from '@/utils/permissions';

export default function Home() {
  const { user, loading } = useAuth();

  const router = useRouter();
  const canCreateChallenges = hasPermission(user, PERMISSION_CREATE_OWN_CHALLENGE);

  if (loading || user?.onboarding_status !== 'completed') return <Loader message=" " />;

  return (
    <>
      <main className="py-8 px-14 flex-grow flex items-center justify-center">
        <div className="flex-col space-y-3 max-w-[453px] w-full">
          <div>
            <div className="text-[#FBFBFF]">Dashboard</div>
            <div className="text-white font-bold text-lg">Welcome back!</div>
          </div>

          {canCreateChallenges && (
            <div className="rounded-2xl bg-[#333546] p-4 w-full">
              <ChallengeEmptyState onStart={() => router.push(`/challenges#new`)} />
            </div>
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
