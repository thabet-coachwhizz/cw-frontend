'use client';

import { useState, useEffect } from 'react';
import { updateProfile } from '@/lib/api/profile';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import RadioGroup from '@/components/ui/RadioGroup';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Loader from '@/components/ui/Loader';
import { getOnboardingProgress } from '@/lib/api/onboarding';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

export default function ProfileStep() {
  const router = useRouter();
  const [progress, setProgress] = useState<{ current_step: string | null }>({
    current_step: null,
  });
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: '',
    birthdate: '',
    title: '',
    work_environment: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getOnboardingProgress().then((res) => setProgress(res));
  }, []);

  useOnboardingRedirect(progress);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePersonal = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!['male', 'female'].includes(form.gender)) errs.gender = 'Gender is required.';
    if (!form.birthdate) errs.birthdate = 'Birthdate is required.';
    return errs;
  };

  const validateWork = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Job title is required.';
    if (!['hybrid', 'remote', 'on-premises'].includes(form.work_environment)) {
      errs.work_environment = 'Work environment is required.';
    }
    return errs;
  };

  const handleNextPersonal = () => {
    const errs = validatePersonal();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { ...validatePersonal(), ...validateWork() };
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      await updateProfile(form);
      setStep(4);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>HELLO!</div>
            <div className="text-2xl font-semibold text-white">
              <div>Welcome to</div> <div>CoachWhizz Platform</div>
            </div>
            <p>
              Before we get started, we want to learn more about you and how we can tailor our
              platform to best meet your needs.
            </p>
            <Button className="w-full mt-4" onClick={() => setStep(2)}>
              {`LET'S START`}
            </Button>
          </div>
        );
      case 2:
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextPersonal();
            }}
            disabled={submitting}
          >
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Please tell us about yourself</h2>

              <Input
                type="text"
                name="name"
                label="Your name"
                placeholder="Enter your name here"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
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
                label="Your Birthdate"
                value={form.birthdate}
                onChange={handleChange}
                error={errors.birthdate}
                required
              />
              <Button type="submit" className="w-full mt-6">
                NEXT
              </Button>
            </div>
          </Form>
        );
      case 3:
        return (
          <Form onSubmit={handleSubmit} disabled={submitting}>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Tell us about your work environment
              </h2>
              <Input
                type="text"
                name="title"
                label="Your role"
                placeholder="Enter your role here"
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
              />
              <div className="flex justify-between pt-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-[#08B1C7]! text-white"
                >
                  BACK
                </Button>
                <Button type="submit" loading={submitting} className="flex-1">
                  NEXT
                </Button>
              </div>
            </div>
          </Form>
        );
      case 4:
        return (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white mb-8">First step completed!</h2>
            <p>Thank you for completing the first step of your learning journey with CoachWhizz.</p>
            <p>{`Now let's explore the platform, shall we?`}</p>
            <Button className="w-full mt-8" onClick={() => router.push('/onboarding/terms')}>
              {`LET'S START`}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  if (progress.current_step !== 'profile') {
    return <Loader />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#2A2D37] p-8 rounded-2xl shadow space-y-4 text-[#BBBBC0]">
        {renderStep()}
      </div>
    </main>
  );
}
