'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChallengeById } from '@/lib/api/challenges';
import { Challenge } from '@/types/challenge';
import ChallengeDetail from '@/components/challenge/detail/ChallengeDetail';
import Loader from '@/components/ui/Loader';

export default function ChallengeDetailPage() {
  const { id } = useParams();

  const router = useRouter();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const numericId = Number(id);
    if (!numericId) return;

    const loadChallenge = async () => {
      try {
        const res = await getChallengeById(numericId);
        setChallenge(res);
      } catch (err) {
        console.error('Failed to load challenge', err);
        router.push('/challenges'); // fallback if not found or unauthorized
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [id, router]);

  if (loading) return <Loader message="Loading challenge..." />;

  if (!challenge) return <p className="text-center text-red-400">Challenge not found.</p>;

  return (
    <div className="px-6 py-8 flex justify-center">
      <div className="w-full max-w-[990px] rounded-3xl bg-[#1C1F27] mt-12 p-8">
        <ChallengeDetail challenge={challenge} />
      </div>
    </div>
  );
}
