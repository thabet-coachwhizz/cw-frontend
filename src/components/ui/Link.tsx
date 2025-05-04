/**
 * Link Component (Unified)
 * ------------------------
 * A reusable <Link> component that can optionally be styled as a button.
 *
 * Props:
 * - href: string - the destination path
 * - children: React.ReactNode - inner content
 * - variant?: 'link' | 'primary' | 'secondary' | 'outline' - styling variant
 * - className?: string - additional tailwind classes
 * - All native anchor props
 */

import Link from 'next/link';
import clsx from 'clsx';

export default function AppLink({
  href,
  children,
  className,
  variant = 'link',
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'link' | 'primary' | 'secondary' | 'outline';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const styles = {
    link: 'text-blue-600 underline',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 rounded',
    outline: 'border border-gray-500 text-black px-4 py-2 rounded',
  };

  return (
    <Link
      href={href}
      className={clsx('inline-block font-medium', styles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
