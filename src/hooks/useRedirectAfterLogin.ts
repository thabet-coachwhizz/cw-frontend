// src/hooks/useRedirectAfterLogin.ts
import { useEffect } from 'react';

export function useRedirectAfterLogin(trigger: boolean) {
  useEffect(() => {
    if (!trigger) return;

    const redirectTo = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin');

    window.location.href = redirectTo || '/';
  }, [trigger]);
}
