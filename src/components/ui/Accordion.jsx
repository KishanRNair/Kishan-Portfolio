import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef(({ className = '', ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`shadcn-accordion-item ${className}`}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`shadcn-accordion-trigger ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="shadcn-accordion-chevron" size={16} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={`shadcn-accordion-content ${className}`}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';
