/**
 * Input. Component
 * ---------------
 * A styled input field with a label and optional error message.
 *
 * Props:
 * - label: string - The label text
 * - error?: string - Optional error message
 * - All standard input props are supported
 *
 * Example usage:
 * <Input label="Email" type="email" value={email} onChange={...} />
 */
import clsx from 'clsx';

export default function Input({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
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
