import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks';
import { cn } from '@/lib/utils';
import { t } from '@/lib/tokens';
import { IconChip, GoldRule } from './IconChip';

/**
 * ============================================================================
 * STAT
 * ============================================================================
 * An animated proof point.
 *
 * Numbers count up once, from zero, when they scroll into view — the effect is
 * subtly persuasive because the eye tracks the movement and lands on the final
 * figure. It fires only once per page view; repeating it would read as a gimmick.
 *
 * With `prefers-reduced-motion` the final value is rendered immediately, and a
 * visually-hidden line always states the completed figure so a screen reader
 * never hears a number being counted digit by digit.
 *
 * Some proof points are not countable ("On Time", a 4.9 rating). Those pass
 * `display` instead of `value` and render statically.
 * ============================================================================
 */
export interface StatProps {
  /** The number to count to. Ignored when `display` is set. */
  value?: number;
  /**
   * A literal value to show instead of a counted number — for proof points
   * that are not integers. Supports `{{TOKENS}}`.
   */
  display?: string;
  /** Rendered before the number, e.g. `₹`. */
  prefix?: string;
  /** Rendered after the number, e.g. `+`, `%`, `K`. */
  suffix?: string;
  /** The caption under the figure. */
  label: string;
  /** Optional one-line clarification under the label. */
  detail?: string;
  /** Optional badge above the figure. */
  icon?: LucideIcon;
  align?: 'left' | 'center';
  tone?: 'default' | 'light' | 'accent';
  /**
   * `xs` exists for the hero card, which puts four statistics across a 390px
   * phone. That leaves roughly 79px per column, and at `sm` the widest figure
   * ("1500+") is about 85px — it would overflow its own cell before any label
   * wrapped. `xs` also tightens the label, because a 0.7rem label at 0.2em
   * tracking cannot wrap inside that column either.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Adds the short gold rule between figure and label. */
  rule?: boolean;
  className?: string;
}

export function Stat({
  value = 0,
  display,
  prefix = '',
  suffix = '',
  label,
  detail,
  icon,
  align = 'left',
  tone = 'default',
  size = 'md',
  rule = false,
  className,
}: StatProps) {
  const { ref, value: current } = useCountUp(value);

  /*
   * No thousands separator. `toLocaleString()` renders 1500 as "1,500", and a
   * comma in the middle of one figure breaks the rhythm of a row where every
   * other number is a clean pair or triple of digits — the approved design
   * draws it "1500+". Marketing figures are read as a shape, not parsed as a
   * quantity, so the separator costs more than it buys here.
   */
  const format = (n: number) => String(n);

  const isStatic = Boolean(display);
  const readable = isStatic ? t(display!) : `${prefix}${format(value)}${suffix}`;
  const isCenter = align === 'center';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('flex flex-col', isCenter && 'items-center text-center', className)}
    >
      {icon && (
        <IconChip
          icon={icon}
          size="md"
          tone={tone === 'light' ? 'light' : 'default'}
          className={cn('mb-6', isCenter && 'mx-auto')}
        />
      )}

      {/*
        Screen readers get the final figure once, as text. `aria-label` on a
        plain <div> is not reliably announced (no role to hang it on), and
        without this a screen reader would narrate the count-up.
      */}
      <span className="sr-only">
        {readable} {t(label)}
      </span>

      {/*
        The figure.

        `leading-none` + `tabular-nums` fixes the line box and the digit
        advance, so a counting number neither changes height nor jitters
        horizontally as it passes 9 → 10 → 100.

        `items-baseline` is the important part: the prefix and suffix are set
        smaller than the digits (see `Affix`), and without an explicit baseline
        alignment a smaller inline span is positioned by the line box rather
        than by the baseline — which is what makes "98%" and "1500+" sit at
        visibly different heights from each other in the same row.
      */}
      <div
        aria-hidden="true"
        className={cn(
          /*
           * `lining-nums` is the important one, and it is why the figures were
           * still not sitting level after the layout was corrected.
           *
           * Playfair Display is a Didone-influenced serif, and faces of that
           * class commonly default to OLD-STYLE (text) figures: 3 4 5 7 9 drop
           * below the baseline and 6 8 rise above it, like lowercase letters.
           * That is beautiful in running prose and wrong in a statistics rail,
           * because each number then sits at a different apparent height
           * depending on which digits it happens to contain.
           *
           * It also explains exactly which figures read as misaligned: 98%,
           * 480+ and 96% each pair a rising digit with a falling one, while
           * 12+ and 40+ are far less affected. Forcing lining figures gives
           * every digit the same flat cap height on a shared baseline.
           *
           * `tabular-nums` then equalises the advance widths, so a counting
           * number does not jitter horizontally as it passes 9 → 10 → 100.
           */
          'flex items-baseline font-display lining-nums tabular-nums',
          isCenter && 'justify-center',
          size === 'xs' && 'text-xl sm:text-2xl md:text-3xl',
          size === 'sm' && 'text-3xl md:text-4xl',
          size === 'md' && 'text-4xl md:text-5xl',
          size === 'lg' && 'text-5xl md:text-6xl',
          tone === 'default' && 'text-ink',
          tone === 'light' && 'text-accent',
          tone === 'accent' && 'text-accent-strong',
          /*
           * MUST come after the `text-*` size classes.
           *
           * A Tailwind font-size utility carries a default line-height, so
           * tailwind-merge treats `text-3xl` as conflicting with `leading-*`
           * and drops whichever it sees first. Declared before the sizes, this
           * silently disappears from the output and each size renders with its
           * own default leading — which is precisely how figures in one row end
           * up on slightly different baselines.
           */
          'leading-none',
        )}
      >
        {isStatic ? (
          readable
        ) : (
          <>
            {prefix && <Affix>{prefix}</Affix>}
            <span>{format(current)}</span>
            {suffix && <Affix>{suffix}</Affix>}
          </>
        )}
      </div>

      {rule && <GoldRule className={cn('mt-5', !isCenter && 'mx-0')} align={isCenter ? 'center' : 'left'} />}

      {/* Hidden from assistive tech: the sr-only line above already says it. */}
      <span
        aria-hidden="true"
        className={cn(
          'font-medium uppercase',
          size === 'xs'
            ? 'mt-2 text-[0.55rem] leading-[1.35] tracking-[0.12em] sm:text-[0.6rem] sm:tracking-[0.14em] md:mt-3 md:text-[0.66rem] md:tracking-[0.16em]'
            : 'mt-4 text-[0.7rem] tracking-[0.2em]',
          tone === 'light' ? 'text-white/85' : 'text-accent-strong',
        )}
      >
        {t(label)}
      </span>

      {detail && (
        <span
          className={cn(
            'mt-3 text-sm leading-relaxed',
            tone === 'light' ? 'text-contrast-ink/65' : 'text-ink-muted',
          )}
        >
          {t(detail)}
        </span>
      )}
    </div>
  );
}

/**
 * The `+`, `%` or `₹` beside a figure.
 *
 * Set at 0.72em rather than full size, which is how the approved design draws
 * them and how figures are set in print generally. Two reasons it matters here:
 *
 *  • `%` is a full cap-height glyph while `+` sits on the maths axis, so at
 *    identical size "98%" reads as noticeably heavier than "500+" — the row
 *    looks uneven even though every number is technically the same size.
 *  • A smaller affix lets the digits carry the emphasis, which is the whole
 *    job of a statistics rail.
 *
 * `self-baseline` pins it to the digits' baseline so it cannot drift upward as
 * a shorter inline box otherwise would.
 */
function Affix({ children }: { children: React.ReactNode }) {
  return <span className="self-baseline text-[0.72em] leading-none">{children}</span>;
}
