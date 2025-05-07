'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/api/profile';
import { useRouter } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default function ProfileStep() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    setLoading(true);
    try {
      await updateProfile(formData);
      router.push('/onboarding/get-started');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow">
        <ProfileForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </main>
  );
}
