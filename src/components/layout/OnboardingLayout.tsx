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
      <header className="py-6 px-14 flex justify-between items-center bg-[#2A2D37] border-[#22252F] border-b">
        <span className=" text-3xl">
          <span className="font-bold">Coach</span>
          <span className="font-thin">Whizz</span>
        </span>

        <Button onClick={logout}>Logout</Button>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
