// src/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, clearTokens } from '@/lib/auth';

interface DecodedToken {
  exp: number;
  email?: string;
}

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        clearTokens();
        setUser(null);
        router.replace('/auth/login');
      } else {
        setUser(decoded);
      }
    } catch {
      clearTokens();
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = () => {
    clearTokens();
    setUser(null);
    router.replace('/auth/login');
  };

  return { user, loading, logout };
};

export default useAuth;
