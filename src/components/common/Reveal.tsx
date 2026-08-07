import { useMemo, type ReactNode } from 'react';
import { m, type Variants } from 'framer-motion';
import {
  fadeIn,
  fadeLeft,
  fadeRight,
  fadeUp,
  fadeUpTight,
  imageReveal,
  scaleIn,
  staggerContainer,
  viewportOnce,
  viewportRepeat,
  withDelay,
} from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * REVEAL
 * ============================================================================
 * The scroll-reveal wrapper used everywhere on the site.
 *
 * Two reasons it exists rather than sprinkling `m.div` around:
 *  • Consistency — one set of curves and distances across 60+ sections.
 *  • Accessibility — when the OS asks for reduced motion, this renders a plain
 *    element with no transform and no observer, so nothing moves and nothing
 *    is ever left invisible because an animation failed to fire.
 * ============================================================================
 */

const PRESETS = {
  up: fadeUp,
  tight: fadeUpTight,
  fade: fadeIn,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
  image: imageReveal,
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof PRESETS;

export interface RevealProps {
  children: ReactNode;
  /** Which motion preset to use. Defaults to a fade-and-rise. */
  preset?: RevealPreset;
  /** Seconds to wait before this element animates. */
  delay?: number;
  className?: string;
  /** Render as a different element — keeps the markup semantic. */
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'figure';
  /** Replay the animation every time it enters the viewport. Off by default. */
  repeat?: boolean;
}

export function Reveal({
  children,
  preset = 'up',
  delay = 0,
  className,
  as = 'div',
  repeat = false,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = m[as] as typeof m.div;

  /*
   * The delay has to live INSIDE the variant, not in a `transition` prop — a
   * variant's own transition replaces that prop rather than merging with it, so
   * the prop form was silently dropped on every preset. See `withDelay`.
   *
   * Memoised so a reveal keeps one stable variants object across re-renders
   * (`ServiceRow` and `ProcessTimeline` both re-render this on a breakpoint
   * change), and so an undelayed reveal keeps the shared preset by identity.
   */
  const variants = useMemo(() => withDelay(PRESETS[preset], delay), [preset, delay]);

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? viewportRepeat : viewportOnce}
    >
      {children}
    </Component>
  );
}

export interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. Keep small (0.06–0.1) for a composed feel. */
  stagger?: number;
  /** Seconds before the first child animates. */
  delay?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
  /**
   * Accessible name for the group.
   *
   * ⚠️ This must be declared explicitly. These components do not spread unknown
   * props, so an `aria-label` written at a call site was previously accepted by
   * JSX and then dropped on the floor — the list rendered with no accessible
   * name at all, and nothing anywhere reported a problem.
   */
  'aria-label'?: string;
  id?: string;
}

/**
 * Parent that staggers `<RevealItem />` children.
 * Use for card grids, statistic rows and lists — anywhere several elements
 * should arrive as a considered sequence rather than all at once.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
  'aria-label': ariaLabel,
  id,
}: RevealGroupProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = m[as] as typeof m.div;

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} aria-label={ariaLabel} id={id}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      aria-label={ariaLabel}
      id={id}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

export interface RevealItemProps {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  as?: 'div' | 'li' | 'article' | 'figure';
}

/** A child of `<RevealGroup />`. Inherits the parent's stagger timing. */
export function RevealItem({ children, className, preset = 'up', as = 'div' }: RevealItemProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Component = m[as] as typeof m.div;

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component className={className} variants={PRESETS[preset]}>
      {children}
    </Component>
  );
}

/**
 * A hairline rule that draws itself in from the left as it enters view.
 * Used to separate editorial blocks without a hard border.
 */
export function RevealRule({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={cn('h-px w-full bg-border', className)} />;
  }

  return (
    <m.div
      className={cn('h-px w-full origin-left bg-border', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
