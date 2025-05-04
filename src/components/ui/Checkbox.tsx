/**
 * Checkbox Component
 * ------------------
 * A styled checkbox with label.
 *
 * Props:
 * - label: string - text to display next to the checkbox
 * - className?: string - optional wrapper styling
 * - All standard checkbox input props (checked, onChange, etc.)
 */

import clsx from 'clsx';

export default function Checkbox({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
}) {
  return (
    <label className={clsx('flex items-center space-x-2 text-sm', className)}>
      <input type="checkbox" className="h-4 w-4" {...props} />
      <span>{label}</span>
    </label>
  );
}
