import { ReactNode } from 'react';

import AppLayout from '@/components/layout/AppLayout';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
