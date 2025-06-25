'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useAssessmentSetup } from '@/hooks/useAssessmentSetup';
import { TopSelectionList } from '@/components/assessments/TopSelectionList';
import { submitAssessment } from '@/lib/api/assessments';
import { PairwiseSorter } from '@/components/assessments/PairwiseSorter';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { RankedItem } from '@/types/assessments';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { VerticalStepper, StepItem } from '@/components/assessments/VerticalStepper';
import AppLink from '@/components/ui/Link';
import { Check, Clock, Badge } from 'lucide-react';

export default function CoreValuesStartPage() {
  const slug = 'core-values';

  const { assessment, questions: items, loading } = useAssessmentSetup(slug);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [step, setStep] = useState<'intro' | 'select' | 'sort' | 'summary' | 'completed'>('intro');
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
      setStep('completed');
    } catch (err) {
      console.error('Error submitting sorted values:', err);
      setIsSubmitting(false); // only re-enable on error
      // Optionally show a toast or error UI
    }
  };

  if (loading || !assessment) return <Loader />;

  return (
    <>
      <TwoColumnLayout
        rightTop={
          <div>
            <RightTopSection
              currentStep={
                step === 'intro'
                  ? 1
                  : step === 'select' || step === 'sort'
                    ? 2
                    : step === 'summary'
                      ? 3
                      : 4
              }
            />
          </div>
        }
      >
        <div className="flex items-center justify-center">
          <div
            className={clsx('w-full', {
              'max-w-[600px]': step === 'intro',
              'max-w-[813px]': step === 'select',
              'max-w-[693px]': step === 'sort',
              'max-w-[533px]': step === 'summary',
              'max-w-[350px]': step === 'completed',
            })}
          >
            {(step === 'select' || step === 'sort') && (
              <div className="text-2xl pb-6">
                <AppLink href="/onboarding/get-started"> Profile Assessments</AppLink>{' '}
                <span className="px-4">{'>'}</span>
                <span className="font-semibold">Core Values</span>
              </div>
            )}

            {step === 'intro' && <AssessmentVideoIntro onStart={() => setStep('select')} />}
            {step === 'select' && (
              <TopSelectionList
                title="Select Core Values"
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
            )}
            {step === 'sort' && (
              <div className="bg-[#1C1F27] rounded-3xl p-7">
                <PairwiseSorter
                  title="Which Value is more important to you?"
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
              </div>
            )}
            {step === 'summary' && (
              <div className="space-y-8">
                <div className="flex justify-between text-lg">
                  <div>Core Values Assessment</div>
                  <div className="text-[#08B1C7] flex items-center">
                    Completed <Check className="ml-4" width={16} />
                  </div>
                </div>
                <div className="bg-[#1C1F27] rounded-3xl p-5">
                  <h2 className="text-xl font-semibold mb-7">Here are your top 3 core values</h2>
                  <div className="space-y-2.5">
                    {finalSorted.slice(0, 3).map((item, i) => (
                      <div key={item.id} className="bg-[#292A38] rounded-xl p-4 flex items-center">
                        <span className="rounded-full bg-white text-black w-7 h-7 mr-2.5 flex justify-center items-center text-lg font-bold">
                          {i + 1}
                        </span>
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSubmitSortedValues}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="mt-7 w-full uppercase"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 'completed' && (
              <div className=" rounded-2xl bg-[#333546] py-6 px-4">
                <div className="text-center space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center">
                      <div className="rounded-full border-[12px] border-[#08B1C729]">
                        <div
                          className="rounded-full bg-[#08B1C7AB] p-4 flex items-center justify-center"
                          style={{ width: '60px', height: '60px' }}
                        >
                          <div className="relative w-9 h-9">
                            <Badge className="w-full h-full text-white fill-white" />
                            <Check
                              className="absolute inset-0 m-auto"
                              size={16}
                              color="#08B1C7"
                              strokeWidth={5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-6">Assessment Completed!</h2>

                  <div className=" w-full mb-6 px-4 space-y-1">
                    <p>
                      {`You’ve just named your non-negotiables, the beliefs that guide how you work, lead, and grow.`}
                    </p>
                    <p>
                      {`From now on, your values will shape the way we personalize every challenge, insight, and step you take here. It’s not about what sounds good, it’s about what feels right to you.`}
                    </p>
                  </div>

                  <AppLink
                    className="mt-6 p-3 w-full font-bold rounded-2xl!"
                    variant="primary"
                    href="/onboarding/get-started"
                  >
                    DONE
                  </AppLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </TwoColumnLayout>
    </>
  );
}

function RightTopSection({ currentStep }: { currentStep: number }) {
  const coreValuesSteps: StepItem[] = [
    {
      id: 1,
      title: 'Introduction',
      description: 'What is this assessment and why should I take it?',
    },
    { id: 2, title: 'Compare Values', description: 'Small description of the Step' },
    { id: 3, title: 'Top 3 Values', description: 'The system will find the top 3 values.' },
  ];
  return (
    <Accordion type="multiple" defaultValue={['steps', 'why-assessments']} className="">
      <AccordionItem value="steps" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Steps</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <VerticalStepper currentStep={currentStep} steps={coreValuesSteps} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="why-assessments" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Why Core Values?</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              Core values are the non-negotiables, the beliefs and principles that shape how you
              make decisions, build relationships, and define success. They act like your internal
              compass, guiding you through challenges and keeping you aligned with what truly
              matters. Knowing your values helps you find work that feels real, not just right on
              paper.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AssessmentVideoIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-[#F6F6F6] space-y-5 mt-2">
      <div>
        <div className="flex items-center space-x-1  mb-3">
          <Clock className="text-[#919196]" size={18} />
          <span>5 min</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Core Values Assessment</h1>
      </div>
      <div>{`You’ll pick from a list of 40 core values, the things you believe in and want your work life to reflect.`}</div>

      <div>
        <video
          controls
          poster="/videoThumb/core-values.webp" // ✅ A quick-loading image to show before play
          className="rounded-3xl w-full h-auto bg-black"
        >
          <source
            src="https://coachwhizz-public.s3.us-east-1.amazonaws.com/ChallengeApp/OnBoarding/Core_Values_Video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="py-2.5 px-3 bg-[#bdc8f208] rounded-2xl">
        Just a few clicks to reveal what really guides your choices.
      </div>
      <div className="py-2.5 px-3 bg-[#BDC8F208] rounded-2xl">
        “When your values and your work align, everything clicks into place.”
      </div>

      <div className="pt-10 text-right">
        <Button onClick={onStart} className="uppercase py-4 px-24 rounded-2xl!">
          Start
        </Button>
      </div>
    </div>
  );
}
