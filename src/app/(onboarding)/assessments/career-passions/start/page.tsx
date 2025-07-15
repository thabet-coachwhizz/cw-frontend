'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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

export default function CareerPassionsStartPage() {
  const slug = 'career-passions';
  const router = useRouter();
  const { user } = useAuth();

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
      await submitAssessment('career-passions', payload);
      setStep('completed');
    } catch (err) {
      console.error('Error submitting sorted values:', err);
      setIsSubmitting(false); // only re-enable on error
      // Optionally show a toast or error UI
    }
  };

  const handleDone = () => {
    if (user?.onboarding_status === 'completed') {
      router.push('/');
    } else {
      router.push('/onboarding/goal');
    }
  };
  if (loading || !assessment) return <Loader />;

  return (
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
            'max-w-[693px]': step === 'intro',
            'max-w-[913px]': step === 'select',
            'max-w-[692px]': step === 'sort',
            'max-w-[533px]': step === 'summary',
            'max-w-[350px]': step === 'completed',
          })}
        >
          {(step === 'select' || step === 'sort') && (
            <div className="text-2xl pb-6">
              <AppLink href="/onboarding/get-started"> Profile Assessments</AppLink>{' '}
              <span className="px-4">{'>'}</span>
              <span className="font-semibold">Career Passions</span>
            </div>
          )}

          {step === 'intro' && <AssessmentVideoIntro onStart={() => setStep('select')} />}
          {step === 'select' && (
            <TopSelectionList
              title="Select Career Passsions"
              items={items.map((i) => ({
                id: i.id,
                title: i.content,
                description: i.facet,
              }))}
              onFinishSelection={(ids) => {
                setSelectedItems(ids);
                setStep('sort');
              }}
              minItems={10}
            />
          )}
          {step === 'sort' && (
            <div className="bg-[#1C1F27] rounded-3xl p-7">
              <PairwiseSorter
                title="Which Career Passion is more important to you?"
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
                <div>Career Passtions Assessment</div>
                <div className="text-[#08B1C7] flex items-center">
                  Completed <Check className="ml-4" width={16} />
                </div>
              </div>
              <div className="bg-[#1C1F27] rounded-3xl p-5">
                <h2 className="text-xl font-semibold mb-7">Here are your top 3 career passions</h2>
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
                    {`You’ve just uncovered what actually excites you, the kind of work that fuels your drive, not just fills your time.`}
                  </p>
                  <p>
                    {`These passions will help the platform guide you toward challenges, goals, and growth paths that light you up, not burn you out.`}
                  </p>
                </div>

                <Button onClick={handleDone} className="mt-6 p-3! w-full font-bold! rounded-2xl!">
                  DONE
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TwoColumnLayout>
  );
}

function RightTopSection({ currentStep }: { currentStep: number }) {
  const careerPassionSteps: StepItem[] = [
    {
      id: 1,
      title: 'Introduction',
      description: 'What is this assessment and why should I take it?',
    },
    { id: 2, title: 'Take Assessment', description: 'Answer simple questions' },
    { id: 3, title: 'Finish', description: 'Get Assessment results' },
  ];
  return (
    <Accordion type="multiple" defaultValue={['steps', 'why-assessments']} className="">
      <AccordionItem value="steps" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Steps</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <VerticalStepper currentStep={currentStep} steps={careerPassionSteps} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="why-assessments" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Why Career Passions?</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              {`Career passions are the themes, causes, and goals that make work feel meaningful to you. They’re not job titles, they’re the why behind the work you want to do. `}
            </p>
            <p>{`Whether it’s creating impact, solving problems, growing fast, or finding balance, your passions help shape a career that actually fits you, not the other way around.`}</p>
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
        <h1 className="text-3xl font-bold text-white">Career Passions Assessment</h1>
      </div>
      <div>{`In this section, you’ll choose from 30 career passions, things that excite you, matter to you, or just feel right.`}</div>

      <div>
        <video
          controls
          poster="/videoThumb/career-passion.webp" // ✅ A quick-loading image to show before play
          className="rounded-3xl w-full h-auto bg-black"
        >
          <source
            src="https://coachwhizz-public.s3.us-east-1.amazonaws.com/ChallengeApp/OnBoarding/Career_Passions_Video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="py-2.5 px-3 bg-[#bdc8f208] rounded-2xl">
        {`It’s just a few quick choices, but they’ll tell us a lot about what kind of work lights you up.`}
      </div>
      <div className="py-2.5 px-3 bg-[#BDC8F208] rounded-2xl">
        {`“When you follow what excites you, work doesn’t feel like work , it feels like momentum.”`}
      </div>

      <div className="pt-10 text-right">
        <Button onClick={onStart} className="uppercase py-4 px-24 rounded-2xl!">
          Start
        </Button>
      </div>
    </div>
  );
}
