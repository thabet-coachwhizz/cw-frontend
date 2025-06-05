// components/challenge/onboarding/StepSoftSkillInfo.tsx

import Button from '@/components/ui/Button';
import { Circle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

interface StepSoftSkillInfoProps {
  skill: {
    name: string;
    main_task_name?: string;
    what_it_is?: string;
    why_its_needed?: string;
    reframe_mindset?: string;
    awareness?: string;
    pro_tip?: string;
  };
  onNext: () => void;
}

export default function StepSoftSkillInfo({ skill, onNext }: StepSoftSkillInfoProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="rounded-xl px-4 py-2  bg-[#08B1C71A] w-full border-2 border-[#08B1C7]  mb-6 ">
          <div className="text-white  font-semibold"> Soft Skill to Improve:</div>
          <div className="text-[#08B1C7] text-xl font-bold">{skill.name}</div>
        </div>
      </div>

      {skill.main_task_name && (
        <div className="p-4 rounded-xl bg-[#22252f] mb-2 w-full">
          <div className="flex justify-between  text-sm mb-2">
            <span className=" text-[#BBBBC0]">Main Challenge</span>
            <span className="text-[#08B1C7] flex items-center gap-1">
              <Circle size={8} className="fill-[#08B1C7]" />
              Active
            </span>
          </div>
          <div>
            <p className="font-semibold mb-2">{skill.main_task_name}</p>
            <p className="text-sm mb-2">{skill.what_it_is}</p>
          </div>
        </div>
      )}
      <Accordion type="multiple">
        <AccordionItem value="why" className="p-4 rounded-xl bg-[#22252f] mb-2">
          <AccordionTrigger>Why it’s needed</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-[#BBBBC0]">{skill.why_its_needed}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mindset" className="p-4 rounded-xl bg-[#22252f] mb-2">
          <AccordionTrigger>Reframe the Mindset</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-[#BBBBC0]">{skill.reframe_mindset}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="awareness" className="p-4 rounded-xl bg-[#22252f] mb-2">
          <AccordionTrigger>Awareness</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-[#BBBBC0]">{skill.awareness}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tip" className="p-4 rounded-xl bg-[#22252f] mb-2">
          <AccordionTrigger>Pro Tip</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-[#BBBBC0]">{skill.pro_tip}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-center ">
        <Button onClick={onNext} className="w-full">
          Start Challenge
        </Button>
      </div>
    </div>
  );
}
