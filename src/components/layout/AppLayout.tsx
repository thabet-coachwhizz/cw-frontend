// src/components/layout/AppLayout.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <>
          <header className="p-4 flex justify-between items-center border-b">
            <span className="font-medium">👤 {user.email}</span>
            <div>
              <Link href="/">Home</Link>
              <Link href="/#test?d=2">Test 1</Link>
              <Link href="/#test?d=3">Test 2</Link>
            </div>
            <button className="underline text-blue-600" onClick={logout}>
              Logout
            </button>
          </header>
          <main>{children}</main>
        </>
      ) : (
        <> Loading ... </>
      )}
    </>
  );
}
