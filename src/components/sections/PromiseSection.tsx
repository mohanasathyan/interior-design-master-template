import { Link } from 'react-router-dom';
import { Check, ShieldCheck } from 'lucide-react';
import { promiseIntro, promises } from '@/data/philosophy';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { t } from '@/lib/tokens';
import { pad2 } from '@/lib/utils';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { IconChip } from '@/components/common/IconChip';
import { Button } from '@/components/ui/button';

/**
 * ============================================================================
 * OUR PROMISE
 * ============================================================================
 * Five written commitments, framed as a guarantee rather than as marketing.
 *
 * The framing is the whole point. "We are committed to quality" is noise; "the
 * price we quote is the price you pay" is a contract term a client can hold
 * you to. Specific, falsifiable promises are what make a premium fee feel like
 * lower risk rather than higher cost.
 *
 * The layout borrows from a certificate — a bordered panel, a seal, generous
 * internal margins — so the format reinforces the content.
 * ============================================================================
 */
export function PromiseSection() {
  return (
    <Section
      id={homeSections.promise}
      tone="muted"
      spacing="lg"
      backdrop={siteConfig.media.backdrops.warm}
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Certificate frame: a double hairline, offset. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-(--radius-brand) border border-border"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-(--radius-brand) border border-accent/22 md:inset-4"
        />

        <div className="relative px-7 py-14 md:px-16 md:py-20">
          {/* Seal */}
          <Reveal preset="scale" className="flex justify-center">
            <IconChip icon={ShieldCheck} size="xl" tone="outline" strokeWidth={1.2} />
          </Reveal>

          <SectionHeading
            eyebrow={promiseIntro.eyebrow}
            title={promiseIntro.title}
            lead={promiseIntro.lead}
            align="center"
            className="mt-8"
            maxWidth="max-w-2xl"
          />

          {/*
            Each commitment is its own bordered panel rather than a row in a
            list. Giving a promise its own frame makes it read as a clause you
            could hold the studio to, which is the whole point of the section.
          */}
          <RevealGroup stagger={0.08} className="mt-14 flex flex-col gap-4">
            {promises.map((promise, index) => (
              <RevealItem
                key={promise.title}
                as="article"
                className="group flex items-start gap-5 rounded-(--radius-brand) border border-border bg-surface/70 p-6 text-left backdrop-blur-[2px] transition-all duration-500 ease-luxe hover:border-accent/35 hover:bg-surface md:gap-7 md:p-8"
              >
                <IconChip
                  icon={Check}
                  size="md"
                  className="mt-0.5 group-hover:bg-accent-button group-hover:text-accent-contrast"
                  strokeWidth={2.2}
                />

                <span
                  aria-hidden="true"
                  className="mt-3.5 hidden text-[0.72rem] tracking-[0.16em] text-accent-strong tabular-nums sm:block"
                >
                  {pad2(index + 1)}
                </span>

                {/* Hairline that ties the ordinal to the copy. */}
                <span
                  aria-hidden="true"
                  className="hidden w-px self-stretch bg-border sm:block"
                />

                <div className="flex-1">
                  <h3 className="font-display text-lg leading-snug text-ink md:text-xl">
                    {t(promise.title)}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-muted">
                    {t(promise.description)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up">
            <div className="mt-14 flex flex-col items-center gap-5 border-t border-border pt-12 text-center">
              <p className="max-w-xl text-[0.95rem] text-ink-muted">
                {t(
                  'These commitments appear in the agreement we sign with you — not only on this page.',
                )}
              </p>
              <Button asChild size="lg">
                <Link to="/contact">{siteConfig.cta.primary}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
