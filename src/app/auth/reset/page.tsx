import ResetPasswordFlow from '@/components/auth/ResetPasswordFlow';
import GuardedPage from '@/components/auth/GuardedPage';

export default function ResetPasswordRequestPage() {
  return (
    <GuardedPage>
      <ResetPasswordFlow />
    </GuardedPage>
  );
}
