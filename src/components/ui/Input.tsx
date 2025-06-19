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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === 'password';

  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="block text-base font-semibold leading-6 text-[#BBBBC0]">{label}</label>
      )}

      <div className="relative">
        <input
          {...props}
          type={isPassword && showPassword ? 'text' : props.type}
          className={clsx(
            'w-full rounded-xl bg-white/5 px-4 py-3 text-base leading-5 font-normal placeholder-opacity-40 text-white focus:outline-none ',
            { 'pr-12': isPassword },
            className,
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BBBBC0]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-[#EE7777]">{error}</p>}
    </div>
  );
}
