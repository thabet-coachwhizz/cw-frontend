import LoginForm from '@/components/auth/LoginForm';
import GuardedPage from '@/components/auth/GuardedPage';

export default function LoginPage() {
  return (
    <GuardedPage>
      <LoginForm />
    </GuardedPage>
  );
}
