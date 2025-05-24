// src/components/layout/AppLayout.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
        <header className="py-8 px-14 flex  items-center  bg-[#2A2D37] border-[#22252F] border-b">
          <span className=" text-3xl">
            <span className="font-bold">Coach</span>
            <span className="font-thin">Whizz</span>
          </span>
          <div className="px-12">
            <Link href="/" className={clsx('px-4', pathname === '/' && 'font-bold text-primary')}>
              Home
            </Link>
          </div>
          <div className="ml-auto">
            <span className="hover:cursor-pointer" onClick={logout}>
              Logout
            </span>
          </div>
        </header>
      )}
      <main className="flex flex-col flex-1">{children}</main>
    </>
  );
}
