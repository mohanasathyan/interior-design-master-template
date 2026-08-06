import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * CARD
 * ============================================================================
 * The surface primitive. Three deliberately different personalities:
 *
 *  • `plain`    — a hairline-bordered white panel. The workhorse.
 *  • `elevated` — lifts and warms its border on hover. For clickable cards.
 *  • `bare`     — no chrome at all; content sits directly on the canvas with a
 *                 top rule. Used for editorial feature grids, where borders
 *                 would clutter the composition.
 *
 * The hover state deliberately moves only 4px. Restraint is the whole point.
 * ============================================================================
 */
const cardVariants = cva(
  'relative rounded-(--radius-brand) transition-all duration-500 ease-luxe',
  {
    variants: {
      variant: {
        plain: 'bg-surface border border-border',
        elevated:
          'bg-surface border border-border hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift',
        bare: 'bg-transparent border-t border-border pt-8',
        contrast: 'bg-contrast text-contrast-ink border border-white/10',
      },
      padding: {
        none: 'p-0',
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-8 md:p-10',
        xl: 'p-10 md:p-14',
      },
    },
    defaultVariants: {
      variant: 'plain',
      padding: 'md',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-display text-h3 leading-snug text-ink', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-ink-muted leading-relaxed', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
