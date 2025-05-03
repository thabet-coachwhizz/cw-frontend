'use client';

import Link from 'next/link';

export default function AuthNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">This page doesn’t exist</h1>
        <p className="text-muted-foreground mb-4">
          You may have followed an invalid authentication link.
        </p>
        <Link href="/auth/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    </main>
  );
}
