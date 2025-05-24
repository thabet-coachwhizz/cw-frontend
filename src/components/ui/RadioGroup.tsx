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
    <div className={clsx('space-y-1 w-full', className)}>
      <label className="block text-base font-semibold leading-6 text-[#BBBBC0]">{label}</label>
      <div
        className={clsx(
          'flex',
          direction === 'column' ? 'flex-col space-y-2' : 'flex-row space-x-4',
        )}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-xl text-sm cursor-pointer transition-colors',
                isSelected ? 'bg-[#292A38] border-1 border-[#08B1C7]' : 'bg-white/5',
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={onChange}
                className="h-4 w-4 accent-[#08B1C7]"
              />
              <span className="text-white">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-sm text-[#EE7777]">{error}</p>}
    </div>
  );
}
