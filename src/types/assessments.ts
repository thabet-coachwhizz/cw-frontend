export type RankedItem = {
  id: number;
  title: string;
  description?: string;
};

export interface AssessmentOption {
  label: string;
  text: string;
}

export interface AssessmentQuestion {
  id: number;
  content: string;
  facet?: string;
  options: AssessmentOption[];
  order: number;
}

export interface AssessmentTrait {
  id: number;
  title: string;
  description?: string;
  items?: AssessmentQuestion[];
}

export interface AssessmentData {
  slug: string;
  name: string;
  description?: string;
  items?: AssessmentQuestion[];
  traits?: AssessmentTrait[];
}
