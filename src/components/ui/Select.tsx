/**
 * Select Component
 * ----------------
 * A styled <select> dropdown with label and error support.
 *
 * Props:
 * - label: string - label for the dropdown
 * - error?: string - validation error message
 * - children: React.ReactNode - <option> elements
 * - className?: string - optional styling
 * - All standard <select> props
 */

import clsx from 'clsx';
export default function Select({
  label,
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium">{label}</label>
      <select
        {...props}
        className={clsx(
          'w-full rounded border p-2 text-black dark:text-white dark:bg-zinc-900 border-gray-300',
          className,
        )}
      >
        {children}
      </select>
      {error && <p className="text-sm text-[#EE7777]">{error}</p>}
    </div>
  );
}
