import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { featuredServices, services } from '@/data/services';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { telLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { Section, SectionHeading } from '@/components/common/Section';
import { RevealGroup, Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { ServiceCard } from './ServiceCard';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * SERVICES OVERVIEW
 * ============================================================================
 * The home page shows six services, not thirteen. A wall of options makes a
 * visitor feel they have to research; a curated six makes them feel guided —
 * and the full list is one click away for anyone who wants it.
 *
 * The section closes with a two-route CTA: browse everything, or skip the
 * research entirely and talk to a designer. Serving both the self-directed and
 * the impatient visitor in the same block reliably lifts contact rates.
 * ============================================================================
 */
const copy = copyConfig.home.services;

export function ServicesOverview() {
  const call = telLink();
  const remaining = services.length - featuredServices.length;

  return (
    <Section id={homeSections.services} tone="muted" spacing="lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          maxWidth="max-w-2xl"
          className="lg:max-w-3xl"
        />

        <Reveal preset="up" delay={0.15} className="shrink-0">
          <Button asChild variant="outline" size="md">
            <Link to={routes.services}>
              {format(copy.allServices, { count: services.length })}
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                strokeWidth={1.7}
              />
            </Link>
          </Button>
        </Reveal>
      </div>

      <RevealGroup
        stagger={0.08}
        className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {featuredServices.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </RevealGroup>

      {/* ---- Closing band ---- */}
      <Reveal preset="up">
        <div className="mt-16 flex flex-col items-center gap-7 border-t border-border pt-14 text-center md:flex-row md:justify-between md:text-left">
          <div className="max-w-xl">
            <h3 className="font-display text-h3 text-ink">
              {t(format(copy.moreTitle, { count: remaining }))}
            </h3>
            <p className="mt-3 text-ink-muted">{t(copy.moreLead)}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={routes.services}>{copy.exploreAll}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={call.href}>
                <Phone className="size-4" strokeWidth={1.7} />
                {siteConfig.cta.call}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
