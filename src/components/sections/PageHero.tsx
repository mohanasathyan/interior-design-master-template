import type { ComponentType, ReactNode } from 'react';
import { m } from 'framer-motion';
import type { ManagedImage } from '@/config/site.config.types';
import { t } from '@/lib/tokens';
import { usePrefersReducedMotion } from '@/hooks';
import { Container } from '@/components/common/Section';
import { Img } from '@/components/common/Img';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import type { Crumb } from '@/lib/schema';

/**
 * ============================================================================
 * PAGE HERO
 * ============================================================================
 * The masthead for every inner page — an editorial split rather than a dark
 * full-bleed image.
 *
 * Why the split: the home page already owns the cinematic dark hero, and
 * repeating it on all four inner pages flattens the hierarchy. Setting inner
 * pages on the light canvas with the photograph held to one side does three
 * things — it keeps the headline at maximum contrast (ink on canvas, 15:1),
 * it lets the page start reading immediately instead of after a full viewport
 * of image, and it makes arriving on the home page feel like an event by
 * comparison.
 *
 * On mobile the photograph moves above the copy and the block collapses to a
 * single column, so the headline is never pushed under the fold.
 * ============================================================================
 */
export interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  image: ManagedImage;
  crumbs: Crumb[];
  /** Buttons or meta rendered under the lead. */
  children?: ReactNode;
  /** Trust markers rendered in a row beneath a hairline. */
  assurances?: {
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    text: string;
  }[];
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
  assurances,
}: PageHeroProps) {
  const reduceMotion = usePrefersReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section aria-label={t(title)} className="relative overflow-hidden bg-canvas">
      {/* ---------------- Photograph ---------------- */}
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[46%]">
        <Img
          image={image}
          priority
          sizes="(max-width: 1024px) 100vw, 46vw"
          ratio="aspect-[4/3] lg:aspect-auto"
          className="h-full w-full"
        />
        {/*
          A canvas-to-transparent gradient feathers the photograph into the copy
          column, so the split never reads as a hard vertical seam.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas via-canvas/25 to-transparent lg:bg-linear-to-r lg:from-canvas lg:via-canvas/10 lg:to-transparent"
        />
      </div>

      {/* ---------------- Content ---------------- */}
      <Container className="relative z-10">
        <div className="max-w-2xl py-14 md:py-20 lg:min-h-[72svh] lg:max-w-[52%] lg:py-28 lg:pt-40">
          <m.div {...rise(0.05)}>
            <Breadcrumbs items={crumbs} />
          </m.div>

          <m.span {...rise(0.14)} className="eyebrow mt-8">
            {t(eyebrow)}
          </m.span>

          <m.h1 {...rise(0.22)} className="mt-5 font-display text-h1 text-balance text-ink">
            {t(title)}
          </m.h1>

          {lead && (
            <m.p {...rise(0.32)} className="mt-6 max-w-xl text-lead text-ink-muted">
              {t(lead)}
            </m.p>
          )}

          {children && (
            <m.div {...rise(0.42)} className="mt-10">
              {children}
            </m.div>
          )}

          {assurances && assurances.length > 0 && (
            <m.ul
              {...rise(0.5)}
              className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10"
            >
              {assurances.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-accent-strong"
                      strokeWidth={1.6}
                    />
                    <span className="max-w-40 text-[0.84rem] leading-snug text-ink-muted">
                      {t(item.text)}
                    </span>
                  </li>
                );
              })}
            </m.ul>
          )}
        </div>
      </Container>
    </section>
  );
}
