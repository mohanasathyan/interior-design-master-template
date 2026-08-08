import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { differentiators } from '@/data/differentiators';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup } from '@/components/common/Reveal';
import { FeatureCard } from '@/components/common/FeatureCard';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

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
const copy = copyConfig.home.whyUs;

export function WhyChooseUs() {
  return (
    <Section
      id={homeSections.whyUs}
      tone="canvas"
      spacing="lg"
      backdrop={siteConfig.media.backdrops.soft}
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        align="center"
        maxWidth="max-w-3xl"
      />

      {/*
        The closing sentence is set in gold so the eye lands on the promise
        rather than on the list of fears that precedes it.
      */}
      <Reveal preset="up" delay={0.12}>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lead text-ink-muted">
          {t(copy.lead)}{' '}
          <span className="text-accent-strong">{t(copy.leadEmphasis)}</span>
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
          <p className="max-w-2xl text-ink-muted">{t(copy.closing)}</p>
          <Button asChild size="lg">
            <Link to={routes.contact}>
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
