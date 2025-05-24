/**
 * Label Component
 * ---------------
 * A simple label wrapper with styling.
 *
 * Props:
 * - htmlFor: string - ID of the input this label is associated with
 * - children: ReactNode - Label text
 *
 * Example usage:
 * <Label htmlFor="email">Email</Label>
 */

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-base font-semibold leading-6 text-[#BBBBC0]">
      {children}
    </label>
  );
}
