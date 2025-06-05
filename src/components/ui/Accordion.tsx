// components/ui/Accordion.tsx

'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = AccordionPrimitive.Item;

export const AccordionTrigger = ({
  children,
  className,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={clsx(
        'flex w-full items-center justify-between font-medium transition-all hover:underline',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({
  className,
  ...props
}: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={clsx('overflow-hidden text-sm text-muted-foreground py-4', className)}
    {...props}
  />
);
