/**
 * Textarea Component
 * ------------------
 * A flexible, styled <textarea> with label and error support.
 *
 * Props:
 * - label: string - label to show above the textarea
 * - error?: string - error message shown below the field
 * - className?: string - additional TailwindCSS classes
 * - All standard <textarea> attributes (rows, placeholder, etc.)
 */

import clsx from 'clsx';

export default function Textarea({
  label,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-base font-semibold leading-6 text-[#BBBBC0]">{label}</label>
      <textarea
        {...props}
        className={clsx(
          'w-full rounded-xl bg-white/5 px-4 py-3 text-base leading-5 font-normal placeholder-opacity-40 text-white focus:outline-none',
          className,
        )}
      />
      {error && <p className="text-sm text-[#EE7777]">{error}</p>}
    </div>
  );
}
