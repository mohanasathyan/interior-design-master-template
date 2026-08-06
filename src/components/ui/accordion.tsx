import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * ACCORDION
 * ============================================================================
 * Built on Radix so keyboard interaction, `aria-expanded`, focus management
 * and the disclosure semantics are correct without us re-implementing them.
 *
 * The visual treatment is deliberately editorial: a hairline rule between
 * items, generous vertical rhythm, and a thin `+` that rotates into a `âˆ’`.
 * No chevrons, no filled backgrounds.
 * ============================================================================
 */

const Accordion = AccordionPrimitive.Root;

/**
 * Closed items are a bare row with a hairline underneath. The OPEN item lifts
 * into a bordered, tinted panel — so at a glance you can see which question is
 * expanded without having to read the `+`/`−` glyphs.
 */
const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'group border-b border-border transition-all duration-500 ease-luxe',
      'data-[state=open]:mb-2 data-[state=open]:rounded-(--radius-brand)',
      'data-[state=open]:border-b-0 data-[state=open]:border data-[state=open]:border-accent/25',
      'data-[state=open]:bg-surface/75 data-[state=open]:px-6 data-[state=open]:backdrop-blur-[2px]',
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-start justify-between gap-6 py-6 text-left md:py-7',
        /* `leading-snug` after `md:text-xl` — a font-size utility carries a
           default line-height, so tailwind-merge drops whichever leading it
           sees first. */
        'font-display text-lg text-ink md:text-xl leading-snug',
        'transition-colors duration-300 ease-luxe',
        'hover:text-accent-strong data-[state=open]:text-accent-strong',
        className,
      )}
      {...props}
    >
      <span className="pr-2">{children}</span>
      <span
        aria-hidden="true"
        className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-border text-ink-muted transition-all duration-500 ease-luxe group-hover:border-accent group-hover:text-accent-strong group-data-[state=open]:rotate-[135deg] group-data-[state=open]:border-accent group-data-[state=open]:text-accent-strong"
      >
        <Plus className="size-3.5" strokeWidth={1.5} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[accordion-up_320ms_var(--ease-luxe)] data-[state=open]:animate-[accordion-down_320ms_var(--ease-luxe)]"
    {...props}
  >
    <div className={cn('max-w-3xl pb-7 pr-10 text-ink-muted leading-relaxed', className)}>
      {/* Short gold rule separating the question from its answer. */}
      <span aria-hidden="true" className="mb-5 block h-px w-10 bg-accent/55" />
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
