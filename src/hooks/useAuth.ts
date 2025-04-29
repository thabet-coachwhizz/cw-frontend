'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearTokens } from '@/lib/auth';
import { apiClient } from '@/lib/apiClient';
import { API } from '@/lib/api';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
}

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await apiClient(API.PROFILE, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      clearTokens();
    } finally {
      setUser(null);
      router.replace('/auth/login');
    }
  };

  useEffect(() => {
    fetchUser();
    // Only run once on mount
  }, []);

  return { user, loading, logout };
};

export default useAuth;
