// src/components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTokens } from '@/lib/auth';
import { API } from '@/lib/api';
import { apiClient } from '@/lib/apiClient';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || password.length < 8) {
      setError('Please enter a valid email and a password with at least 8 characters.');
      return;
    }

    try {
      const res = await apiClient(API.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Login failed.');
        return;
      }

      saveTokens(data.access_token, data.refresh_token);
      router.replace('/');
    } catch (err) {
      console.error('Login error', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-gray-400 bg-white text-black p-2 dark:bg-zinc-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-400 bg-white text-black p-2 dark:bg-zinc-900 dark:text-white"
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="btn btn-primary w-full">
        Sign In
      </button>
    </form>
  );
}
