'use client';

import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const isPublicRoute = pathname.startsWith('/auth');

  if (loading) {
    return <div className="p-8 text-center">Loading session...</div>;
  }

  if (!loading && !user && !isPublicRoute) {
    router.replace('/auth/login');
    return null;
  }

  if (user && isPublicRoute) {
    router.replace('/');
  }

  return (
    <>
      {!isPublicRoute && user && (
        <header className="p-4 flex justify-between items-center border-b">
          <span className="font-medium">👤 {user.email}</span>
          <button className="underline text-blue-600" onClick={logout}>
            Logout
          </button>
        </header>
      )}
      <main>{children}</main>
    </>
  );
}
