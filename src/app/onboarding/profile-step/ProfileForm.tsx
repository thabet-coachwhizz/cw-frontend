'use client';

import { useState } from 'react';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import RadioGroup from '@/components/ui/RadioGroup';
import Button from '@/components/ui/Button';

interface ProfileFormProps {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}

export default function ProfileForm({ onSubmit, loading }: ProfileFormProps) {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    birthdate: '',
    title: '',
    //timezone: '',
    work_environment: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!['male', 'female'].includes(form.gender)) errs.gender = 'Gender is required.';
    if (!form.birthdate) errs.birthdate = 'Birthdate is required.';
    if (!form.title.trim()) errs.title = 'Job title is required.';
    //if (!form.timezone.trim()) errs.timezone = "Timezone is required.";
    if (!['hybrid', 'remote', 'on-premises'].includes(form.work_environment)) {
      errs.work_environment = 'Work environment is required.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit} disabled={loading}>
      <Input
        type="text"
        name="name"
        label="What is your name"
        placeholder="Enter your name here"
        value={form.name}
        onChange={handleChange}
        required
        error={errors?.name}
      />

      <RadioGroup
        label="Gender: Choose an option that fits you."
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        value={form.gender}
        onChange={handleChange}
        error={errors?.gender}
        direction="column" // can also be 'row'
      />
      <Input
        type="date"
        name="birthdate"
        label="What is your birthdate?"
        placeholder="select date"
        value={form.birthdate}
        onChange={handleChange}
        required
        error={errors?.birthdate}
      />
      <Input
        type="text"
        name="title"
        label="Your current role"
        placeholder="Enter your role here"
        value={form.title}
        onChange={handleChange}
        required
        error={errors?.title}
      />

      <Select
        label="Work environment"
        name="work_environment"
        onChange={handleChange}
        value={form.work_environment}
        error={errors?.work_environment}
      >
        <option value="">Select Environment</option>
        <option value="hybrid">Hybrid</option>
        <option value="remote">Remote</option>
        <option value="on-premises">On-Premises</option>
      </Select>

      <Button type="submit" loading={loading} className="w-full mt-4">
        Continue
      </Button>
    </Form>
  );
}
