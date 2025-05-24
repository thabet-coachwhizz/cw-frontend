'use client';

import { useState } from 'react';
import { useAssessmentSetup } from '@/hooks/useAssessmentSetup';
import { useAssessmentFlow } from '@/hooks/useAssessmentFlow';
import { AssessmentStepper } from '@/components/assessments/AssessmentStepper';
import { AssessmentIntro } from '@/components/assessments/AssessmentIntro';
import { AssessmentQuestion } from '@/components/assessments/AssessmentQuestion';
import { AssessmentFooter } from '@/components/assessments/AssessmentFooter';
import { submitAssessment } from '@/lib/api/assessments';
import Loader from '@/components/ui/Loader';

export default function OceanAssessmentPage() {
  const slug = 'ocean';
  const { assessment, questions, steps, initialIndex, loading } = useAssessmentSetup(slug);

  const [step, setStep] = useState<'intro' | 'questions'>('intro');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { flow, skipCurrent, finishCurrent, goToPrev } = useAssessmentFlow(steps, initialIndex);

  if (loading || !assessment) return <Loader />;

  const handleAnswer = (option: string) => {
    const q = questions[currentIndex];
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
  };

  const handleNext = () => {
    const q = questions[currentIndex];
    const selected = answers[q.id];
    if (!selected) {
      setError('Please select an answer before proceeding.');
      return;
    }
    setError(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      goToPrev();
    }
  };

  const handleFinish = async () => {
    const q = questions[currentIndex];
    const selected = answers[q.id];
    if (!selected) {
      setError('Please select an answer before finishing.');
      return;
    }
    setSubmitting(true);
    const payload = {
      answers: Object.entries(answers).map(([item, selected_option]) => ({
        item: parseInt(item, 10),
        selected_option,
      })),
    };

    try {
      await submitAssessment(slug, payload);
      finishCurrent();
    } catch (err) {
      console.error('Error submitting:', err);
      setSubmitting(false); // only re-enable on error
    }
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="p-8 space-y-6 w-full max-w-3xl rounded-xl shadow bg-[#333546]">
        <AssessmentStepper
          assessments={flow.steps.map((s, i) => ({
            slug: s.slug,
            label: s.name,
            status: s.status,
            stepNumber: i + 1,
          }))}
          currentSlug={slug}
        />

        {step === 'intro' ? (
          <AssessmentIntro
            assessment={assessment}
            isFirst
            onStart={() => setStep('questions')}
            onSkip={skipCurrent}
          />
        ) : (
          <>
            <AssessmentQuestion
              index={currentIndex}
              total={questions.length}
              question={questions[currentIndex]}
              selected={answers[questions[currentIndex].id] || undefined}
              onChange={handleAnswer}
            />
            {error && <div className="text-sm text-[#EE7777]">{error}</div>}
            <AssessmentFooter
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
              onBack={handleBack}
              onNext={handleNext}
              onFinish={handleFinish}
              submitting={submitting}
            />
          </>
        )}
      </div>
    </div>
  );
}
