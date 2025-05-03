// src/components/auth/ResetPasswordFlow.tsx
'use client';

import { useState } from 'react';
import { API } from '@/lib/api';
import { isValidEmail } from '@/lib/validators';
import Link from 'next/link';

export default function ResetPasswordFlow() {
  const [step, setStep] = useState<'request' | 'confirm' | 'success'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch(API.RESET_PASSWORD_REQUEST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStep('confirm');
      } else {
        const data = await res.json();
        setError(data.error || 'Request failed.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!code || newPassword.length < 8) {
      setError('Code is required and password must be at least 8 characters.');
      return;
    }

    try {
      const res = await fetch(API.RESET_PASSWORD_CONFIRM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          confirmation_code: code,
          new_password: newPassword,
        }),
      });

      if (res.ok) {
        setStep('success');
      } else {
        const data = await res.json();
        setError(data.error || 'Reset failed.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {step === 'request' && (
        <form onSubmit={handleRequest} className="space-y-4">
          <h2 className="text-lg font-semibold">Reset Your Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Request Reset Code
          </button>
        </form>
      )}

      {step === 'confirm' && (
        <form onSubmit={handleConfirm} className="space-y-4">
          <h2 className="text-lg font-semibold">Enter Verification Code</h2>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
            required
            className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
            className="w-full rounded border border-gray-400 p-2 dark:bg-zinc-900 dark:text-white"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Confirm Reset
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-green-700">Password reset successful.</h2>
          <p>You can now log in with your new password.</p>
          <Link href="/auth/login" className="text-blue-600 underline">
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
}
