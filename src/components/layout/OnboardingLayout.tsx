'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
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

  if (loading) {
    return <Loader message="Checking ..." />;
  }

  if (!user) return null; // layout is wrapped in auth-only route

  return (
    <>
      <header className="p-4 flex justify-between items-center bg-[#2A2D37] border-[#22252F] border-b">
        <span className="font-medium">On-Boarding </span>

        <Button onClick={logout}>Logout</Button>
      </header>
      <main>{children}</main>
    </>
  );
}
