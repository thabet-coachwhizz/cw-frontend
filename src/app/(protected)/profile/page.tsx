'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateProfile, getProfile } from '@/lib/api/profile';
import Input from '@/components/ui/Input';
import RadioGroup from '@/components/ui/RadioGroup';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    birthdate: '',
    title: '',
    work_environment: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setForm({
          name: data.name || '',
          email: data.email || '',
          gender: data.gender || '',
          birthdate: data.birthdate || '',
          title: data.title || '',
          work_environment: data.work_environment || '',
        });
      } catch (err) {
        console.error(err);
        if (user) {
          setForm({
            name: user.name || '',
            email: user.email || '',
            gender: user.gender || '',
            birthdate: user.birthdate || '',
            title: user.title || '',
            work_environment: user.work_environment || '',
          });
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'email') return; // email is read-only
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!['male', 'female'].includes(form.gender)) errs.gender = 'Gender is required.';
    if (!form.birthdate) errs.birthdate = 'Birthdate is required.';
    if (!form.title.trim()) errs.title = 'Job title is required.';
    if (!['hybrid', 'remote', 'on-premises'].includes(form.work_environment)) {
      errs.work_environment = 'Work environment is required.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setErrors({});
    setMessage('');
    try {
      await updateProfile(form);
      await refreshUser();
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to update profile.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-white">Your Profile</h1>
        <Form onSubmit={handleSubmit} error={errors.form} message={message} disabled={submitting}>
          <Input
            type="text"
            name="name"
            label="Your name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <Input type="email" name="email" label="Email" value={form.email} readOnly disabled />
          <RadioGroup
            label="Your Gender"
            name="gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            value={form.gender}
            onChange={handleChange}
            error={errors.gender}
            direction="row"
          />
          <Input
            type="date"
            name="birthdate"
            label="Birthdate"
            value={form.birthdate}
            onChange={handleChange}
            error={errors.birthdate}
            required
          />
          <Input
            type="text"
            name="title"
            label="Your role"
            placeholder="Enter your role"
            value={form.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          <RadioGroup
            label="Work type"
            name="work_environment"
            options={[
              { value: 'remote', label: 'Remote' },
              { value: 'hybrid', label: 'Hybrid' },
              { value: 'on-premises', label: 'On Site' },
            ]}
            value={form.work_environment}
            onChange={handleChange}
            error={errors.work_environment}
            direction="row"
          />
          <Button type="submit" loading={submitting} className="w-full">
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
}
