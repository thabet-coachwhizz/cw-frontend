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
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        {...props}
        className={clsx(
          'w-full rounded border p-2 text-black dark:text-white dark:bg-zinc-900 border-gray-300',
          className,
        )}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
