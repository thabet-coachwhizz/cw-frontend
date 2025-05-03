import ResetPasswordFlow from '@/components/auth/ResetPasswordFlow';
import GuardedPage from '@/components/auth/GuardedPage';

export default function ResetPasswordRequestPage() {
  return (
    <GuardedPage>
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-lg bg-white p-8 rounded shadow">
          <ResetPasswordFlow />
        </div>
      </main>
    </GuardedPage>
  );
}
