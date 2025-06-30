import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useOnboardingRedirect(progress?: { current_step: string | null }) {
  const router = useRouter();
  useEffect(() => {
    if (!progress) return;
    switch (progress.current_step) {
      case 'profile':
        router.replace('/onboarding/profile');
        break;
      case 'terms':
        router.replace('/onboarding/terms');
        break;
      case 'assessment':
        router.replace('/onboarding/get-started');
        break;
      case 'goal':
        router.replace('/onboarding/goal');
        break;
      /*case 'review':
        router.replace('/onboarding/review');
        break;*/
      case 'done':
        router.replace('/');
        break;
    }
  }, [progress, router]);
}
