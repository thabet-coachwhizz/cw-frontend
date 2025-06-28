import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';
import { hasAnyPermission } from './permissions';

export default function withPagePermission<P extends object>(
  Component: React.ComponentType<P>,
  required: string | string[],
) {
  return function PagePermissionWrapper(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const perms = Array.isArray(required) ? required : [required];
    const allowed = hasAnyPermission(user, perms);

    useEffect(() => {
      if (!loading && !allowed) {
        router.replace('/');
      }
    }, [loading, allowed, router]);

    if (loading || (!allowed && typeof window !== 'undefined')) {
      return <Loader message="Redirecting..." />;
    }

    return <Component {...props} />;
  };
}
