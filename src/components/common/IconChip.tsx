import type { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * ICON CHIP
 * ============================================================================
 * The circular gold-on-tint icon badge that recurs across the whole design:
 * feature cards, statistics, promises, quick-contact cards, quality standards.
 *
 * It exists as one component because it appears in nine different sections —
 * without it, nine slightly-different circles would drift apart over time, and
 * inconsistent chip sizing is one of the fastest ways a "designed" site starts
 * looking assembled.
 *
 * Icons are decorative here: every chip sits beside a real text label, so they
 * are marked `aria-hidden` and contribute nothing to the accessible name.
 * ============================================================================
 */
const chipVariants = cva(
  'grid shrink-0 place-items-center transition-all duration-500 ease-luxe',
  {
    variants: {
      tone: {
        /** Gold on a warm tint — the default, for light surfaces. */
        default: 'bg-accent/10 text-accent-strong',
        /** Gold on a hairline-bordered surface, for cards on photography. */
        outline: 'border border-accent/25 bg-surface/70 text-accent-strong',
        /** For dark bands: brand gold on a translucent white tint. */
        light: 'border border-white/15 bg-white/8 text-accent',
        /** Solid gold with a white glyph — used sparingly, for emphasis. */
        solid: 'bg-accent-button text-accent-contrast',
      },
      shape: {
        circle: 'rounded-full',
        /** Squared with soft corners — used on the hero metrics rail. */
        square: 'rounded-(--radius-brand)',
      },
      size: {
        sm: 'size-10',
        md: 'size-12',
        lg: 'size-14',
        xl: 'size-16',
      },
    },
    defaultVariants: { tone: 'default', shape: 'circle', size: 'md' },
  },
);

const ICON_SIZE = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-7',
} as const;

export interface IconChipProps extends VariantProps<typeof chipVariants> {
  icon: LucideIcon;
  className?: string;
  /** Lucide stroke weight. 1.3–1.5 keeps the line-art feel. */
  strokeWidth?: number;
}

export function IconChip({
  icon: Icon,
  tone,
  shape,
  size = 'md',
  className,
  strokeWidth = 1.4,
}: IconChipProps) {
  return (
    <span aria-hidden="true" className={cn(chipVariants({ tone, shape, size }), className)}>
      <Icon className={ICON_SIZE[size ?? 'md']} strokeWidth={strokeWidth} />
    </span>
  );
}

/**
 * The short gold rule that separates a title from its body copy throughout the
 * design. Small enough to be trivial, repeated often enough to be worth
 * centralising.
 */
export function GoldRule({
  className,
  align = 'center',
}: {
  className?: string;
  align?: 'center' | 'left';
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block h-px w-10 bg-accent/55',
        align === 'center' && 'mx-auto',
        className,
      )}
    />
  );
}
