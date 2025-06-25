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
    link: 'text-[#08B1C7]',
    primary: 'bg-[#08B1C7] text-white shadow-lg shadow-[#08B1C724] hover:bg-[#089EB3] rounded-xl',
    secondary: 'bg-[#CBCED9] text-[#333546] rounded-xl',
    outline: 'bg-none text-[#73798F] border-[#F5F5F5] border-1 rounded-xl',
  };

  return (
    <Link href={href} className={clsx('inline-block ', styles[variant], className)} {...props}>
      {children}
    </Link>
  );
}
