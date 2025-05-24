import LoginForm from '@/components/auth/LoginForm';
import GuardedPage from '@/components/auth/GuardedPage';

export default function LoginPage() {
  return (
    <GuardedPage>
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[#333546] p-8 rounded shadow">
          <LoginForm />
        </div>
      </main>
    </GuardedPage>
  );
}
