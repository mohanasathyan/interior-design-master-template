import { Quote } from 'lucide-react';
import { philosophyIntro, principles } from '@/data/philosophy';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { t } from '@/lib/tokens';
import { Section } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { IconChip } from '@/components/common/IconChip';

/**
 * ============================================================================
 * DESIGN PHILOSOPHY
 * ============================================================================
 * The section that justifies a premium fee.
 *
 * A studio with a stated point of view is buying on value; one without is
 * buying on price. This block is deliberately unhurried — a tall sticky image,
 * a pull quote and six principles in a two-column rhythm — because slowing the
 * visitor down here is the point.
 *
 * The image is `sticky` on desktop, so it holds while the principles scroll
 * past it. It is one of the few scroll effects that feels editorial rather
 * than gimmicky, and it costs nothing in JavaScript.
 * ============================================================================
 */
export function DesignPhilosophy() {
  return (
    <Section id={homeSections.philosophy} tone="canvas" spacing="xl">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------------- Sticky image column ---------------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal preset="image">
              <div className="relative">
                <Img
                  image={siteConfig.media.philosophy}
                  ratio="aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="rounded-(--radius-brand)"
                />

                {/*
                  A thin accent frame, offset behind the photograph.

                  The offset is smaller until `lg`. It is drawn OUTSIDE the
                  photograph, so at 20px it eats most of the 24px page gutter on
                  a phone and pushes the document wider than the screen. From
                  `lg` the image sits in a five-column track with room to spare
                  either side, so the full offset is kept exactly as designed.
                */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-2.5 -right-2.5 -z-10 h-full w-full rounded-(--radius-brand) border border-accent/28 lg:-bottom-5 lg:-right-5"
                />
              </div>
            </Reveal>

            {/* Pull quote — the studio's position, stated plainly. */}
            <Reveal preset="up" delay={0.15}>
              <figure className="mt-10 border-l-2 border-accent pl-6">
                <Quote className="size-6 text-accent-strong/45" strokeWidth={1.3} aria-hidden="true" />
                <blockquote className="mt-4 font-display text-xl leading-snug text-ink md:text-2xl">
                  {t(
                    '“A home should not look like it was decorated. It should look like it was always meant to be this way.”',
                  )}
                </blockquote>
                <figcaption className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-ink-muted">
                  {t('{{FOUNDER_NAME}} — {{FOUNDER_ROLE}}')}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Principles column ---------------- */}
        <div className="lg:col-span-7">
          <Reveal preset="tight">
            <span className="eyebrow">{philosophyIntro.eyebrow}</span>
          </Reveal>

          <Reveal preset="up" delay={0.06}>
            <h2 className="mt-5 font-display text-h2 text-ink">{t(philosophyIntro.title)}</h2>
          </Reveal>

          <Reveal preset="up" delay={0.12}>
            <p className="mt-6 max-w-xl text-lead text-ink-muted">{t(philosophyIntro.lead)}</p>
          </Reveal>

          <RevealGroup stagger={0.07} className="mt-14 grid gap-x-10 gap-y-11 sm:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <RevealItem key={principle.title} as="article" className="group">
                  <div className="flex items-center gap-4">
                    <IconChip
                      icon={Icon}
                      size="md"
                      className="group-hover:bg-accent-button group-hover:text-accent-contrast"
                    />
                    <span
                      aria-hidden="true"
                      className="font-display text-sm text-ink-muted/45 tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg leading-snug text-ink">
                    {t(principle.title)}
                  </h3>

                  <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-muted">
                    {t(principle.description)}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
