import type { LucideIcon } from 'lucide-react';
import { t } from '@/lib/tokens';
import { cn, pad2 } from '@/lib/utils';
import { IconChip, GoldRule } from './IconChip';
import { RevealItem } from './Reveal';

/**
 * ============================================================================
 * FEATURE CARD
 * ============================================================================
 * The single card pattern the approved design uses everywhere a set of
 * benefits, values or standards is presented:
 *
 *      ◍ icon chip
 *        01              ← gold ordinal
 *      Title Over
 *      Two Lines         ← Playfair, centred
 *      ────              ← short gold rule
 *      Supporting body copy
 *
 * It backs three separate sections — Why Choose Us, Our Values, Quality
 * Standards — so the rhythm, chip size, ordinal treatment and rule length stay
 * identical across all of them. Change it here and every grid follows.
 *
 * The panel is translucent because these grids sit over soft background
 * photography; `backdrop-blur` keeps the copy legible without hiding the image.
 * ============================================================================
 */
export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Zero-based position — rendered as a two-digit gold ordinal. */
  index: number;
  /** Hide the ordinal for grids where numbering would imply a sequence. */
  showNumber?: boolean;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  index,
  showNumber = true,
  className,
}: FeatureCardProps) {
  return (
    <RevealItem
      as="article"
      className={cn(
        'group flex flex-col items-center rounded-(--radius-brand) p-8 text-center md:p-9',
        'border border-border/80 bg-surface/72 backdrop-blur-[2px]',
        'transition-all duration-500 ease-luxe',
        'hover:-translate-y-1 hover:border-accent/35 hover:bg-surface',
        'hover:shadow-lift',
        className,
      )}
    >
      <IconChip
        icon={icon}
        size="lg"
        className="group-hover:bg-accent-button group-hover:text-accent-contrast"
      />

      {showNumber && (
        <span
          aria-hidden="true"
          className="mt-5 text-[0.7rem] font-medium tracking-[0.18em] text-accent-strong tabular-nums"
        >
          {pad2(index + 1)}
        </span>
      )}

      <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-ink text-balance">
        {t(title)}
      </h3>

      <GoldRule className="mt-5" />

      <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-muted">{t(description)}</p>
    </RevealItem>
  );
}
