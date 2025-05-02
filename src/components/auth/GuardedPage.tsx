// src/components/GuardedPage.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GuardedPage({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [loading, user]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (user) return null;

  return <>{children}</>;
}
