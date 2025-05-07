'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import Loader from '@/components/ui/Loader';

export default function OnboardingPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const progress = await getOnboardingProgress();

        if (!progress.profile_completed) {
          router.replace('/onboarding/profile-step');
        } else {
          router.replace('/onboarding/get-started');
        }
      } catch {
        // optionally redirect to fallback or show error UI
      }
    };

    checkProgress();
  }, [router, pathname]);

  return <Loader />;
}
