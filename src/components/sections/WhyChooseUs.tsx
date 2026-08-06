import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { differentiators } from '@/data/differentiators';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup } from '@/components/common/Reveal';
import { FeatureCard } from '@/components/common/FeatureCard';
import { Button } from '@/components/ui/button';

/**
 * ============================================================================
 * WHY CHOOSE US
 * ============================================================================
 * Eight objection-handling cards in a 4×2 grid.
 *
 * Every prospective interior client carries the same four fears: the cost will
 * climb, the timeline will slip, the finish will not match the render, and
 * nobody will answer the phone once the deposit clears. Each card answers one
 * of those directly — which is why this section converts, rather than because
 * it says "quality" and "trust".
 *
 * The tiles are `FeatureCard`, shared with Our Values and Quality Standards,
 * so all three grids stay typographically identical.
 * ============================================================================
 */
export function WhyChooseUs() {
  return (
    <Section
      id={homeSections.whyUs}
      tone="canvas"
      spacing="lg"
      backdrop={siteConfig.media.backdrops.soft}
    >
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Every reason an interior project goes wrong — and how we prevent it."
        align="center"
        maxWidth="max-w-3xl"
      />

      {/*
        The closing sentence is set in gold so the eye lands on the promise
        rather than on the list of fears that precedes it.
      */}
      <Reveal preset="up" delay={0.12}>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lead text-ink-muted">
          {t(
            'Most people approaching an interior studio are carrying the same four worries: the cost will climb, the timeline will slip, the finish will not match the render, and nobody will pick up the phone afterwards.',
          )}{' '}
          <span className="text-accent-strong">
            {t('Here is precisely how we handle each of them.')}
          </span>
        </p>
      </Reveal>

      <RevealGroup
        stagger={0.06}
        className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {differentiators.map((item, index) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </RevealGroup>

      {/* Small ornament, then the ask — the section has earned it by now. */}
      <Reveal preset="up">
        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent/60" />
          <p className="max-w-2xl text-ink-muted">
            {t(
              'Have a project in mind? A short conversation is usually enough to tell you what is realistic for your space and your budget.',
            )}
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              {siteConfig.cta.primary}
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                strokeWidth={1.7}
              />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
