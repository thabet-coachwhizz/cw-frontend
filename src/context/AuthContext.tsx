// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { API } from '@/lib/api';
import toast from 'react-hot-toast';
import { User } from '@/types/user';
import { getSession } from '@/lib/api/auth';
import { bindUserRefresher } from '@/lib/apiClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = async () => {
    try {
      const result = await getSession();
      if (result.isAuthenticated) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };
  useEffect(() => {
    // Register refreshUser with apiClient to allow optional auto-refresh after POST
    bindUserRefresher(refreshUser);
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getSession();
        if (result.isAuthenticated) {
          setUser(result.user);
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

  // Auto-redirect based on onboarding status after user loads
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

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

/**
 * Redirects the user to the correct onboarding step or dashboard
 * depending on their onboarding_status and current page location.
 */
function handleOnboardingRedirect(
  user: User,
  pathname: string,
  router: ReturnType<typeof useRouter>,
) {
  const isOnboardingPage =
    pathname.startsWith('/onboarding') || pathname.startsWith('/assessments');
  const onboardingRequired = user.onboarding_status !== 'completed';
  if (onboardingRequired && !isOnboardingPage) {
    router.replace('/onboarding');
  }

  // Allows users to revisit assessments even after completing onboarding
  if (!onboardingRequired && pathname.startsWith('/onboarding')) {
    router.replace('/'); // go to home page
  }
}
