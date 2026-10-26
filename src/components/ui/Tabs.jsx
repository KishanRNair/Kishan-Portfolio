import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(({ className = '', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`shadcn-tabs-list ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`shadcn-tabs-trigger ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`shadcn-tabs-content ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
