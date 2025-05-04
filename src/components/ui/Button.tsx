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
        'rounded px-4 py-2 font-medium transition',
        {
          primary: 'bg-blue-600 text-white hover:bg-blue-700',
          secondary: 'bg-gray-200 text-black hover:bg-gray-300',
          outline: 'border border-gray-500 text-black',
        }[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
}
