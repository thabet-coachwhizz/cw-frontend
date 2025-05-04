import clsx from 'clsx';

/**
 * RadioGroup Component
 * --------------------
 * Flexible group of radio buttons with label, direction, and error support.
 *
 * Props:
 * - label: string - group label
 * - name: string - shared input name
 * - options: { value: string; label: string }[] - options to display
 * - value?: string - currently selected value
 * - onChange: (value: string) => void
 * - direction?: 'row' | 'column' - layout direction
 * - error?: string - optional error message
 * - className?: string - extra styles for the group wrapper
 */
export default function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  direction = 'column',
  error,
  className,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  direction?: 'row' | 'column';
  error?: string;
  className?: string;
}) {
  return (
    <div className={clsx('space-y-1', className)}>
      <label className="block text-sm font-medium">{label}</label>
      <div
        className={clsx(
          'flex',
          direction === 'column' ? 'flex-col space-y-2' : 'flex-row space-x-4',
        )}
      >
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center space-x-2 text-sm">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
