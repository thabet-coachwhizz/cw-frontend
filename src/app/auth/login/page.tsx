import LoginForm from '@/components/auth/LoginForm';
import GuardedPage from '@/components/auth/GuardedPage';

export default function LoginPage() {
  return (
    <GuardedPage>
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-lg bg-white p-8 rounded shadow">
          <h1 className="text-xl font-bold mb-4">Login to CoachWhizz</h1>
          <LoginForm />
        </div>
      </main>
    </GuardedPage>
  );
}
