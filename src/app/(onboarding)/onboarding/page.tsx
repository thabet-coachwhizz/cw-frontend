'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import Loader from '@/components/ui/Loader';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

export default function OnboardingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState<{ current_step: string | null }>({ current_step: null });

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const result = await getOnboardingProgress();
        setProgress(result);
      } catch {
        // optionally redirect to fallback or show error UI
      }
    };

    checkProgress();
  }, [router, pathname]);
  useOnboardingRedirect(progress);

  return <Loader />;
}
