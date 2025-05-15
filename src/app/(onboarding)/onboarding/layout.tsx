import { ReactNode } from 'react';
import OnboardingLayout from '@/components/layout/OnboardingLayout';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingLayout>
      <div>{children}</div>
    </OnboardingLayout>
  );
}
