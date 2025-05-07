'use client';

import { useState } from 'react';
import { API } from '@/lib/api';
import { useRedirectAfterLogin } from '@/hooks/useRedirectAfterLogin';
import { isValidEmail } from '@/lib/validators';

import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from '@/components/ui/Link';

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
    setSubmitting(true);

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
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setSubmitting(false);
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      setSubmitting(false);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {!challengeRequired ? (
        <>
          <h1 className="text-xl font-bold mb-4">Login to CoachWhizz</h1>
          <Form onSubmit={handleLogin} error={error} disabled={submitting}>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={submitting} className="w-full mt-4">
              Login
            </Button>

            <p className="text-sm text-center text-muted-foreground mt-2">
              <Link href="/auth/reset">Forgot your password?</Link>
            </p>
          </Form>
        </>
      ) : (
        <>
          <Form onSubmit={handleNewPasswordSubmit} error={error} disabled={submitting}>
            <h1 className="text-xl font-bold mb-4">Your account requires a new password.</h1>
            <Input
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              label="New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={submitting} className="w-full mt-4">
              Update Password
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
