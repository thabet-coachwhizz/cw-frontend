/**
 * Loader Component
 * ----------------
 * Displays a simple loader with optional message.
 *
 * Props:
 * - message?: string
 *
 * Example usage:
 * <Loader message="Please wait..." />
 */

export default function Loader({ message, className }: { message?: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 text-center space-y-2 ${className || ''}`}
    >
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
