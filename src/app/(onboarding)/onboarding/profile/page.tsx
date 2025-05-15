'use client';

import { useState } from 'react';
import { updateProfile } from '@/lib/api/profile';
import { useRouter } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default function ProfileStep() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    setSubmitting(true);
    try {
      await updateProfile(formData);
      router.push('/onboarding/get-started');
    } catch (e) {
      console.error(e);
      setSubmitting(false); // only re-enable on error
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow">
        <ProfileForm onSubmit={handleSubmit} loading={submitting} />
      </div>
    </main>
  );
}
