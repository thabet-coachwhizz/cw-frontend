/**
 * Alert Component
 * ---------------
 * Displays an alert box for success, error, or info messages.
 *
 * Props:
 * - type: 'error' | 'success' | 'info'
 * - message: string
 *
 * Example usage:
 * <Alert type="error" message="Something went wrong." />
 */

export default function Alert({
  type = 'info',
  message,
  className,
}: {
  type?: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}) {
  const baseStyle = 'px-4 py-2 rounded text-sm font-medium';
  const typeStyle = {
    error: 'bg-red-100 text-[#EE7777]',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return <div className={`${baseStyle} ${typeStyle[type]} ${className || ''}`}>{message}</div>;
}
