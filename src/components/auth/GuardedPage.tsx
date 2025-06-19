// src/components/GuardedPage.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';

export default function GuardedPage({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  if (loading) return <Loader message="Redirecting..." />;

  if (user) return null;

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-between bg-[#22252F] text-white md:w-1/2 w-full  pt-14">
        {/* Top: Logo + Title + Description */}
        <div className="px-14">
          <div className="mb-10">
            <Logo /> {/* Replace with your <Logo /> component or <img> */}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Soft Skills Development Platform</h1>
            <p className="text-lg max-w-[489px]">
              Interns log real challenges. AI turns them into tasks they complete on the job. You
              scale soft skills training affordably. They gain an edge in the job market.
            </p>
          </div>
        </div>

        {/* Bottom: Image */}

        <div className="mt-8 flex-grow relative h-full max-h-[496px]">
          <Image
            src="/auth-side-image.webp"
            alt="Auth Side Illustration"
            fill
            className="object-contain object-right"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-1 items-center justify-center p-14  bg-[#2A2D37]">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
