// src/components/auth/ResetPasswordFlow.tsx
'use client';

import { useState } from 'react';
import { API } from '@/lib/api';
import { isValidEmail } from '@/lib/validators';
import Link from '@/components/ui/Link';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

export default function ResetPasswordFlow() {
  const [step, setStep] = useState<'request' | 'confirm' | 'success'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(API.RESET_PASSWORD_REQUEST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('Reset code sent to your email if the user exists.');
        setTimeout(() => setStep('confirm'), 1500); // ✅ wait before switching UI
      } else {
        const data = await res.json();
        setError(data.error || 'Request failed.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    if (!code || newPassword.length < 8) {
      setError('Code is required and password must be at least 8 characters.');
      setSubmitting(false);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {step === 'request' && (
        <>
          <h2 className="text-lg font-semibold">Reset Your Password</h2>
          <Form onSubmit={handleRequest} error={error} message={message} disabled={submitting}>
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" loading={submitting} className="w-full">
              Request Reset Code
            </Button>
          </Form>
        </>
      )}

      {step === 'confirm' && (
        <>
          <h2 className="text-lg font-semibold">Enter Verification Code</h2>
          <Form onSubmit={handleConfirm} error={error} disabled={submitting}>
            <Input
              type="text"
              label="Verification Code"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <Input
              type="password"
              label="New Password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit" loading={submitting} className="w-full">
              Confirm Reset
            </Button>
          </Form>
        </>
      )}

      {step === 'success' && (
        <>
          <div className="text-center space-y-4">
            <Alert type="success" message="Password reset successful." />
            <p>You can now log in with your new password.</p>
            <Link href="/auth/login">Go to Login</Link>
          </div>
        </>
      )}
    </div>
  );
}
