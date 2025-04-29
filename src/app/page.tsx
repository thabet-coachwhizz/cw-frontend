'use client';
import useAuth from '@/hooks/useAuth';

export default function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;

  if (!user) return <div className="p-8">You are not authenticated.</div>;
  console.log('User::: ', user);
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Welcome, {user?.email || 'user'} 👋</h1>
      <button className="mt-4 underline text-blue-600" onClick={logout}>
        Logout
      </button>
    </main>
  );
}
