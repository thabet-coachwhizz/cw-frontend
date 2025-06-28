/**
 * Button Component
 * ----------------
 * A flexible button component with support for variants and loading state.
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'outline' (default: 'primary')
 * - type: 'button' | 'submit' | 'reset'
 * - disabled: disables the button
 * - loading: shows loading state
 * - children: button label/content
 *
 * Example usage:
 * <Button variant="primary" type="submit">Save</Button>
 */

import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export default function Button({
  children,
  type = 'button',
  disabled = false,
  variant = 'primary',
  loading = false,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'rounded-xl px-4 py-2 font-medium transition hover:cursor-pointer inline-flex items-center justify-center gap-2 ',
        {
          primary: 'bg-[#08B1C7] text-white shadow-lg shadow-[#08B1C724] hover:bg-[#089EB3]',
          secondary: 'bg-[#CBCED9] text-[#333546] ',
          outline: 'bg-none text-[#73798F] border-[#F5F5F5] border-1 hover:opacity-90',
        }[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
      {loading && <Loader2 className="animate-spin w-4 h-4" aria-hidden="true" />}
    </button>
  );
}
