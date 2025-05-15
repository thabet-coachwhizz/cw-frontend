'use client';

import { useState } from 'react';
import { useAssessmentSetup } from '@/hooks/useAssessmentSetup';
import { useAssessmentFlow } from '@/hooks/useAssessmentFlow';
import { AssessmentStepper } from '@/components/assessments/AssessmentStepper';
import { AssessmentIntro } from '@/components/assessments/AssessmentIntro';
import { TopSelectionList } from '@/components/assessments/TopSelectionList';
import { submitAssessment } from '@/lib/api/assessments';
import { PairwiseSorter } from '@/components/assessments/PairwiseSorter';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { RankedItem } from '@/types/assessments';

export default function CoreValuesStartPage() {
  const slug = 'core-values';

  const { assessment, questions: items, steps, initialIndex, loading } = useAssessmentSetup(slug);
  const { flow, skipCurrent, finishCurrent } = useAssessmentFlow(steps, initialIndex);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [step, setStep] = useState<'intro' | 'select' | 'sort' | 'summary'>('intro');
  const [finalSorted, setFinalSorted] = useState<RankedItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitSortedValues = async () => {
    setIsSubmitting(true);
    const payload = {
      answers: finalSorted.map((item, index) => ({
        item: item.id,
        selected_option: String(index + 1), // 1 = top-ranked
      })),
    };

    try {
      await submitAssessment('core-values', payload);
      finishCurrent();
    } catch (err) {
      console.error('Error submitting sorted values:', err);
      setIsSubmitting(false); // only re-enable on error
      // Optionally show a toast or error UI
    }
  };

  if (loading || !assessment) return <Loader />;

  return (
    <div className="p-6 space-y-6">
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
          isFirst={false}
          onStart={() => setStep('select')}
          onSkip={skipCurrent}
        />
      ) : step === 'select' ? (
        <TopSelectionList
          items={items.map((i) => ({
            id: i.id,
            title: i.content,
            description: i.facet,
          }))}
          onFinishSelection={(ids) => {
            setSelectedItems(ids);
            setStep('sort');
          }}
          maxItems={10}
        />
      ) : step === 'summary' ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Top 3 Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {finalSorted.slice(0, 3).map((item, i) => (
              <li key={item.id}>
                <strong>{i + 1}.</strong> {item.title} –{' '}
                <span className="text-sm text-gray-500">{item.description}</span>
              </li>
            ))}
          </ul>

          <Button onClick={handleSubmitSortedValues} loading={isSubmitting} disabled={isSubmitting}>
            Continue
          </Button>
        </div>
      ) : (
        <PairwiseSorter
          title="Let's prioritize your selected values"
          items={selectedItems.map((id) => {
            const item = items.find((v) => v.id === id)!;
            return {
              id: item.id,
              title: item.content,
              description: item.facet,
            };
          })}
          onSorted={(sorted) => {
            setFinalSorted(sorted);
            setStep('summary');
          }}
        />
      )}
    </div>
  );
}
