import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Small metadata pill — project categories, service tags, trust markers.
 * Uppercase micro-type keeps it reading as a label rather than a button.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-(--radius-brand) font-body font-medium uppercase tracking-[0.14em] transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-ink-muted',
        accent: 'bg-accent/10 text-accent-strong',
        outline: 'border border-border text-ink-muted',
        solid: 'bg-ink text-canvas',
        light: 'bg-white/12 text-white backdrop-blur-sm border border-white/20',
      },
      size: {
        sm: 'px-2.5 py-1 text-[0.62rem]',
        md: 'px-3 py-1.5 text-[0.66rem]',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
