// src/hooks/useRedirectAfterLogin.ts
import { useEffect } from 'react';
import { User } from '@/types/user';

/**
 * Redirects immediately after login based on session or onboarding status.
 * Prevents homepage flash by skipping default "/" routing when onboarding is required.
 */
export function useRedirectAfterLogin(trigger: boolean, user?: User | null) {
  useEffect(() => {
    if (!trigger) return;

    const redirectTo = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');

    if (redirectTo) {
      window.location.href = redirectTo;
    } else if (user?.onboarding_status !== 'completed') {
      window.location.href = '/onboarding';
    } else {
      window.location.href = '/';
    }
  }, [trigger, user?.onboarding_status]);
}
