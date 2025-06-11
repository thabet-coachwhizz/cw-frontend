'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import RadioGroup from '@/components/ui/RadioGroup';
import Textarea from '@/components/ui/Textarea';
import { deleteChallenge } from '@/lib/api/challenges';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  challengeId: number;
  onClose: () => void;
}

const options = [
  'Personal development',
  'I am feeling unsure, need more clarity and support',
  'Now isn’t the right time, I’ll come back later',
  'The challenge is no longer an issue',
  'Need more guidance before taking action',
  'I have other priorities right now',
  'Other',
];

export default function DeleteChallengeDialog({ open, challengeId, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [reason, setReason] = useState('');
  const [otherText, setOtherText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleDelete = async () => {
    if (!reason) return;
    setSubmitting(true);
    try {
      await deleteChallenge(challengeId, reason, reason === 'Other' ? otherText : '');
      toast.success('Challenge deleted.');
      router.push('/challenges');
    } catch {
      toast.error('Something went wrong');
      setSubmitting(false);
    }
  };

  const contentStep1 = (
    <div className="bg-[#333546] rounded-xl p-6 w-[90%] max-w-[400px]">
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="rounded-full border-[16px] border-[#EE777733]">
            <div
              className="rounded-full bg-[#EE777799] p-4 "
              style={{ width: '60px', height: '60px' }}
            >
              <Trash2 className=" " size={30} color="#fff" />
            </div>
          </div>
        </div>
        <p className="text-2xl font-semibold text-center text-[#EE7777]">
          Do you want to completely delete the Main Quest?
        </p>
        <div className="bg-[#292A38] rounded-2xl p-5 space-y-3 text-[#BBBBC0]">
          <p>This operation can not be reversed.</p>
          <p>All progress related to this quest and the tasks within it will be lost</p>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              onClose();
            }}
            className="w-full uppercase border-[#08B1C7]! text-white! border-2!"
          >
            No
          </Button>
          <Button onClick={() => setStep(2)} className="w-full uppercase bg-[#EE7777]!">
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );

  const contentStep2 = (
    <div className="bg-[#1C1F27] rounded-xl p-6 w-[90%] max-w-[595px]">
      <div className="space-y-6">
        <p className="text-sm mb-4">Delete Complete Challenge?</p>
        <p className="text-xl font-semibold">Before You Exit, Quick Question!</p>
        <RadioGroup
          label=""
          name="delete-reason"
          options={options.map((opt) => ({
            value: opt,
            label: opt,
          }))}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          direction="column"
        />

        {reason === 'Other' && (
          <Textarea
            label="Let us know! 👇"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        )}
        <div className="flex justify-between gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setStep(1);
              onClose();
            }}
            className="w-full uppercase  text-white! border-2!"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={submitting || !reason || (reason === 'Other' && !otherText.trim())}
            loading={submitting}
            className="w-full uppercase bg-[#EE7777]!"
          >
            Delete Quest
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto max-h-full">
      {step === 1 ? contentStep1 : contentStep2}
    </div>
  );
}
