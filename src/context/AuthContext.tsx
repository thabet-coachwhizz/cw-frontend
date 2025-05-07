// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { API } from '@/lib/api';
import toast from 'react-hot-toast';
import { User } from '@/types/user';
import { getSession } from '@/lib/api/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getSession();
        if (result.isAuthenticated) {
          const u = result.user;
          setUser(u);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // a separate useEffect that only runs when both user and loading are ready
  useEffect(() => {
    if (loading || !user) return;
    handleOnboardingRedirect(user, pathname, router);
  }, [loading, user, pathname, router]);

  const logout = async () => {
    try {
      await fetch(API.LOGOUT, {
        method: 'POST',
        credentials: 'include', //  ensure cookies are sent so server can clear them
      });

      setUser(null);
      window.location.href = '/auth/login';
    } catch {
      toast.error('Something went wrong and unable to logout');
    }
  };

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

function handleOnboardingRedirect(
  user: User,
  pathname: string,
  router: ReturnType<typeof useRouter>,
) {
  const isOnboardingPage = pathname.startsWith('/onboarding');
  const onboardingRequired = user.onboarding_status !== 'completed';

  if (onboardingRequired && !isOnboardingPage) {
    router.replace('/onboarding');
  }

  if (!onboardingRequired && isOnboardingPage) {
    router.replace('/'); // go to home page
  }
}
