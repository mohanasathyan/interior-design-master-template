import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';
import { Img } from './Img';
import { GoldRule } from './IconChip';
import { t } from '@/lib/tokens';
import type { ManagedImage } from '@/config/site.config.types';

/**
 * ============================================================================
 * LAYOUT PRIMITIVES
 * ============================================================================
 * `Container` and `Section` own every horizontal gutter and every vertical
 * rhythm decision on the site. Because nothing else sets page padding, the
 * whole layout can be re-proportioned from this one file.
 *
 * The spacing scale is deliberately large. Generous white space is the single
 * most reliable signal of a premium brand — it says the page is not trying to
 * sell you everything at once.
 * ============================================================================
 */

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  /** `narrow` for long-form prose, `wide` for full-bleed galleries. */
  size?: 'narrow' | 'default' | 'wide' | 'full' | 'hero';
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-[85rem]',
        size === 'wide' && 'max-w-[110rem]',
        size === 'full' && 'max-w-none px-0 sm:px-0 lg:px-0 xl:px-0',
        /*
         * `hero` — the header and the hero band, which in the approved design
         * sit far closer to the viewport edge than body content does.
         *
         * The gutter is proportional rather than fixed: the reference places
         * the headline about 5.25% in from the left, and a fixed padding only
         * reproduces that at one screen width. `clamp` holds it at 5vw between
         * a 24px floor (phones, where 5vw would be 19px and feel cramped) and a
         * 96px ceiling (past ~1920px, where it would start to look like a
         * margin rather than a gutter).
         *
         * Body sections deliberately keep the narrower centred container — a
         * header spanning wider than the prose beneath it is the normal
         * editorial arrangement, not an inconsistency.
         */
        size === 'hero' &&
          'max-w-none px-[clamp(1.5rem,5vw,6rem)] sm:px-[clamp(1.5rem,5vw,6rem)] lg:px-[clamp(1.5rem,5vw,6rem)] xl:px-[clamp(1.5rem,5vw,6rem)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

const sectionVariants = cva('relative w-full', {
  variants: {
    /** Vertical rhythm. `hero` removes padding for full-bleed sections. */
    spacing: {
      none: 'py-0',
      sm: 'py-14 md:py-20',
      md: 'py-20 md:py-28',
      lg: 'py-24 md:py-36',
      xl: 'py-28 md:py-44',
    },
    /** Background treatment. */
    tone: {
      canvas: 'bg-canvas text-ink',
      surface: 'bg-surface text-ink',
      muted: 'bg-surface-muted text-ink',
      contrast: 'bg-contrast text-contrast-ink',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: { spacing: 'lg', tone: 'canvas' },
});

export interface SectionProps
  extends VariantProps<typeof sectionVariants> {
  children: ReactNode;
  className?: string;
  /** Anchor id — also used as the scroll-spy target. */
  id?: string;
  /** Container width for the section's inner content. */
  container?: 'narrow' | 'default' | 'wide' | 'full';
  /** Adds the barely-visible film grain over the background. */
  grain?: boolean;
  /**
   * A soft full-bleed photograph behind the band, washed back so the content
   * stays fully legible. Keeps large light sections from reading as flat
   * colour — which is what separates the approved design from a plain page.
   */
  backdrop?: ManagedImage;
  /** How heavily the backdrop is washed out. Higher = paler image. */
  backdropWash?: 'soft' | 'strong';
  /** Accessible label when the section has no visible heading. */
  ariaLabel?: string;
  /** Id of the heading element that labels this section. */
  ariaLabelledBy?: string;
}

export function Section({
  children,
  className,
  id,
  spacing,
  tone,
  container = 'default',
  grain = false,
  backdrop,
  backdropWash = 'strong',
  ariaLabel,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(sectionVariants({ spacing, tone }), backdrop && 'isolate', className)}
    >
      {backdrop && (
        <>
          {/*
            Decorative only — `alt=""` and aria-hidden, because the photograph
            carries no information the copy does not already state. It is also
            never `priority`, so it can never compete with the hero for
            bandwidth on first paint.
          */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <Img
              image={backdrop}
              sizes="100vw"
              className="h-full w-full"
              imgClassName="object-cover"
            />
            <div
              className={cn(
                'absolute inset-0',
                backdropWash === 'strong' ? 'bg-canvas/90' : 'bg-canvas/80',
              )}
            />
            {/* Feathers the photograph into the neighbouring bands. */}
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-canvas to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-canvas to-transparent" />
          </div>
        </>
      )}
      {grain && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22140%22%20height=%22140%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.85%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22140%22%20height=%22140%22%20filter=%22url(%23n)%22%20opacity=%220.05%22/%3E%3C/svg%3E')]"
        />
      )}
      <Container size={container} className="relative">
        {children}
      </Container>
    </section>
  );
}

/**
 * ============================================================================
 * SECTION HEADING
 * ============================================================================
 * Every section opens the same way: an accent eyebrow, a display headline and
 * an optional lead paragraph. Centralising it guarantees the typographic
 * hierarchy is identical on all five pages — one of the clearest tells of a
 * professionally designed site versus an assembled one.
 *
 * `as` controls the semantic level so heading order stays valid (one <h1> per
 * page, no skipped levels) independently of the visual size.
 */
export interface SectionHeadingProps {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  /** The headline. May contain `{{TOKENS}}`. */
  title: ReactNode;
  /** Supporting paragraph below the headline. */
  lead?: string;
  align?: 'left' | 'center';
  /** Semantic level. Visual size is controlled by `size`. */
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display' | 'h1' | 'h2' | 'h3';
  /** Colour treatment for dark sections. */
  tone?: 'default' | 'light';
  className?: string;
  /** Passes an id to the heading so a <Section> can be `aria-labelledby` it. */
  id?: string;
  /** Extra content rendered under the lead (buttons, meta). */
  children?: ReactNode;
  /** Constrain the lead's measure for readability. */
  maxWidth?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Heading = 'h2',
  size = 'h2',
  tone = 'default',
  className,
  id,
  children,
  maxWidth = 'max-w-2xl',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const light = tone === 'light';

  return (
    <div
      className={cn(
        'flex flex-col',
        isCenter && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal preset="tight">
          {/*
            `.eyebrow` defaults to the AA-safe gold for light surfaces; on dark
            bands the brand gold has plenty of contrast, so the modifier
            restores it.
          */}
          <span className={cn('eyebrow', isCenter && 'eyebrow--center', light && 'eyebrow--light')}>
            {t(eyebrow)}
          </span>
        </Reveal>
      )}

      {/*
        Centred headings drop the eyebrow's leading dash (it only reads
        correctly flush-left) and take a short rule beneath instead. Same
        typographic signature, correct for the alignment.
      */}
      {eyebrow && isCenter && (
        <Reveal preset="tight" delay={0.04}>
          <GoldRule className="mt-5" />
        </Reveal>
      )}

      <Reveal preset="up" delay={eyebrow ? 0.06 : 0}>
        <Heading
          id={id}
          className={cn(
            'mt-5 font-display',
            size === 'display' && 'text-display',
            size === 'h1' && 'text-h1',
            size === 'h2' && 'text-h2',
            size === 'h3' && 'text-h3',
            light ? 'text-contrast-ink' : 'text-ink',
          )}
        >
          {typeof title === 'string' ? t(title) : title}
        </Heading>
      </Reveal>

      {lead && (
        <Reveal preset="up" delay={0.12}>
          <p
            className={cn(
              'mt-6 text-lead',
              maxWidth,
              isCenter && 'mx-auto',
              light ? 'text-contrast-ink/72' : 'text-ink-muted',
            )}
          >
            {t(lead)}
          </p>
        </Reveal>
      )}

      {children && (
        <Reveal preset="up" delay={0.18}>
          <div className={cn('mt-9', isCenter && 'flex justify-center')}>{children}</div>
        </Reveal>
      )}
    </div>
  );
}
