// src/components/layout/AppLayout.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      sessionStorage.setItem(
        'redirectAfterLogin',
        window.location.pathname + window.location.search,
      );
      router.replace('/auth/login');
    }
  }, [loading, user, router]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return <Loader message="Checking authentication..." />;
  }

  if (!user) return null; // layout is wrapped in auth-only route

  return (
    <>
      {user?.onboarding_status === 'completed' && (
        <header className="p-4 flex justify-between items-center border-b">
          <span className="font-medium">👤 {user.email}</span>
          <div>
            <Link href="/">Home</Link>
            <Link href="/#test?d=2">Test 1</Link>
            <Link href="/#test?d=3">Test 2</Link>
          </div>
          <Button onClick={logout}>Logout</Button>
        </header>
      )}
      <main>{children}</main>
    </>
  );
}
