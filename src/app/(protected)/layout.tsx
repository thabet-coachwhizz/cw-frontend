import { ReactNode } from 'react';

import AppLayout from '@/components/layout/AppLayout';
import { AuthProvider } from '@/context/AuthContext';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
}
