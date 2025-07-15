'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAssessmentSetup } from '@/hooks/useAssessmentSetup';
import { useAssessmentFlow } from '@/hooks/useAssessmentFlow';
import { AssessmentQuestion } from '@/components/assessments/AssessmentQuestion';
import { submitAssessment } from '@/lib/api/assessments';
import Loader from '@/components/ui/Loader';
import AppLink from '@/components/ui/Link';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { Badge, Check } from 'lucide-react';
import { VerticalStepper, StepItem } from '@/components/assessments/VerticalStepper';
import styles from './QuestionPage.module.css';
import clsx from 'clsx';

export default function OceanAssessmentPage() {
  const slug = 'ocean';
  const router = useRouter();
  const { user } = useAuth();
  const { assessment, questions, steps, initialIndex, loading } = useAssessmentSetup(slug);

  const [step, setStep] = useState<'intro' | 'questions' | 'completed'>('intro');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [animationClass, setAnimationClass] = useState<'in' | 'out' | null>('in');

  const { goToPrev } = useAssessmentFlow(steps, initialIndex);

  if (loading || !assessment) return <Loader />;

  const handleNext = (selected?: string) => {
    if (!selected) {
      setError('Please select an answer before proceeding.');
      return;
    }
    setError(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleAutoSelect = (option: string) => {
    const isLast = currentIndex === questions.length - 1;
    const qId = questions[currentIndex].id;
    const updatedAnswers = { ...answers, [qId]: option };
    setAnswers(updatedAnswers);
    setError(null);

    // Step 1: Delay animation to allow visual feedback of selection
    setTimeout(() => {
      setAnimationClass('out');
      setTimeout(() => {
        if (isLast) {
          handleFinish(qId, option);
        } else {
          setCurrentIndex((i) => i + 1);
          setAnimationClass('in');
        }
      }, 300); // match .fadeScaleOut duration
    }, 200); // short delay to apply visual feedback on option
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      goToPrev();
    }
  };

  const handleFinish = async (qIdOverride?: number, selectedOverride?: string) => {
    const q = questions[currentIndex];
    const qId = qIdOverride ?? q.id;
    const selected = selectedOverride ?? answers[qId];
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
      setStep('completed');
    } catch (err) {
      console.error('Error submitting:', err);
      setSubmitting(false); // only re-enable on error
    }
  };
  const handleDone = () => {
    if (user?.onboarding_status === 'completed') {
      router.push('/');
    } else {
      router.push('/onboarding/get-started');
    }
  };
  return (
    <>
      <TwoColumnLayout
        rightTop={
          <div>
            <RightTopSection currentStep={step === 'intro' ? 1 : step === 'questions' ? 2 : 3} />
          </div>
        }
      >
        <div className=" flex items-center justify-center">
          {step !== 'completed' ? (
            <div className="w-full max-w-[600px] ">
              <div className="text-xl sm:text-2xl pb-6">
                <AppLink href="/onboarding/get-started"> Profile Assessments</AppLink>
                <span className="px-2 sm:px-4">{'>'}</span>
                <span className="font-semibold">Personality Assessment</span>
              </div>

              {step === 'intro' && <AssessmentVideoIntro onStart={() => setStep('questions')} />}

              {step === 'questions' && (
                <div className="max-w-[693px] rounded-2xl bg-[#333546] p-5">
                  <div
                    key={questions[currentIndex].id}
                    className={clsx(
                      'transition-all',
                      animationClass === 'in' && styles.fadeScaleIn,
                      animationClass === 'out' && styles.fadeScaleOut,
                    )}
                  >
                    <AssessmentQuestion
                      index={currentIndex}
                      total={questions.length}
                      question={questions[currentIndex]}
                      selected={answers[questions[currentIndex].id] || undefined}
                      onChange={handleAutoSelect}
                      isFirst={currentIndex === 0}
                      isLast={currentIndex === questions.length - 1}
                      onBack={handleBack}
                      onNext={handleNext}
                      submitting={submitting}
                      error={error}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-[343px] rounded-2xl bg-[#333546] py-6 px-4">
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

                <div className=" w-full mb-6 ">
                  {`Your personality traits influence how you approach challenges, communicate, and
                  develop new skills. Well use this to personalize your journey ahead.`}
                </div>

                <Button onClick={handleDone} className="mt-6 p-3! w-full font-bold! rounded-2xl!">
                  DONE
                </Button>
              </div>
            </div>
          )}
        </div>
      </TwoColumnLayout>
    </>
  );
}

function RightTopSection({ currentStep }: { currentStep: number }) {
  const oceanSteps: StepItem[] = [
    {
      id: 1,
      title: 'Introduction',
      description: 'What is this assessment and why should I take it?',
    },
    { id: 2, title: 'Take Assessment', description: 'Answer simple questions' },
    { id: 3, title: 'Finish', description: 'Move to the next step.' },
  ];

  return (
    <Accordion type="multiple" defaultValue={['steps', 'why-assessments']} className="">
      <AccordionItem value="steps" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Steps</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <VerticalStepper currentStep={currentStep} steps={oceanSteps} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="why-assessments" className="p-4 rounded-xl bg-[#BDC8F208] mb-2.5">
        <AccordionTrigger>
          <span className="font-bold">Why Personality?</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2.5">
            <p>
              We use the OCEAN Personality Assessment to understand how you work best, so the app
              can give you smarter tasks, better support, and real growth. No fluff, just data that
              helps us help you.
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
      <div>{`To help us personalize your growth, we'd like to know more about your personality.`}</div>

      <div>
        <video
          controls
          poster="/videoThumb/ocean.webp" // ✅ A quick-loading image to show before play
          className="rounded-3xl w-full h-auto bg-black"
        >
          <source
            src="https://coachwhizz-public.s3.us-east-1.amazonaws.com/ChallengeApp/OnBoarding/OCEAN_Video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="py-2.5 px-3 bg-[#bdc8f208] rounded-2xl">
        Here are 40 quick questions, all about how you think, feel, and interact with the world.
      </div>
      <div className="py-2.5 px-3 bg-[#BDC8F208] rounded-2xl">
        There are no right or wrong answers—just be honest and go with your gut.
      </div>

      <div className="pt-10 text-right">
        <Button onClick={onStart} className="uppercase py-4 px-24 rounded-2xl!">
          Start
        </Button>
      </div>
    </div>
  );
}
