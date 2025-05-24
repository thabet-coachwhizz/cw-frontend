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
    <div className="space-y-1 w-full">
      {label && (
        <label className="block text-base font-semibold leading-6 text-[#BBBBC0]">{label}</label>
      )}
      <input
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
