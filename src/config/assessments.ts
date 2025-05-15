export type AssessmentSlug = 'ocean' | 'core-values' | 'career-passions';

export interface AssessmentConfig {
  slug: AssessmentSlug;
  name: string;
  description: string;
  required: boolean;
  step: number;
  key: 'personality_done' | 'values_done' | 'passions_done';
}

export const ASSESSMENT_FLOW: AssessmentConfig[] = [
  {
    slug: 'ocean',
    name: 'Personality Assessment',
    description: 'Curiosity, Imagination, Innovation',
    required: true,
    step: 1,
    key: 'personality_done',
  },
  {
    slug: 'core-values',
    name: 'Core Values',
    description: 'What matters most to you?',
    required: false,
    step: 2,
    key: 'values_done',
  },
  {
    slug: 'career-passions',
    name: 'Career Passions',
    description: 'What drives you at work?',
    required: false,
    step: 3,
    key: 'passions_done',
  },
];
