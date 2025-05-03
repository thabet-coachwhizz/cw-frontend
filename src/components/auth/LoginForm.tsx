'use client';

import { useState } from 'react';
import { API } from '@/lib/api';
import { useRedirectAfterLogin } from '@/hooks/useRedirectAfterLogin';
import Link from 'next/link';
import { isValidEmail } from '@/lib/validators';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [challengeRequired, setChallengeRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useRedirectAfterLogin(loginSuccess);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email) || password.length < 8) {
      setError('Please enter a valid email and a password with at least 8 characters.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(API.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ✅ sends and receives cookies
      });

      const result = await res.json();

      if (res.ok && result.challenge === 'NEW_PASSWORD_REQUIRED') {
        setSessionToken(result.session);
        setChallengeRequired(true);
      } else if (res.ok) {
        setLoginSuccess(true); // trigger redirect via hook
      } else {
        setError(result?.error || 'Login failed.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    try {
      const res = await fetch(API.CONFIRM_NEW_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          session: sessionToken,
          new_password: newPassword,
        }),
      });
      if (res.ok) {
        setLoginSuccess(true); // triggers redirect
      } else {
        const result = await res.json();
        setError(result?.error || 'Failed to update password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {!challengeRequired ? (
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
            Sign In
          </button>
          <p className="text-sm text-center text-muted-foreground mt-2">
            <Link href="/auth/reset" className="text-blue-600 underline hover:text-blue-800">
              Forgot your password?
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
          <p className="text-sm text-gray-700 text-center">Your account requires a new password.</p>
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
            Update Password
          </button>
        </form>
      )}
    </div>
  );
}
