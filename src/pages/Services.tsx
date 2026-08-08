import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { services } from '@/data/services';
import { breadcrumbSchema, serviceSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { telLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { Seo } from '@/components/common/Seo';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceRow } from '@/components/sections/ServiceRow';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * SERVICES
 * ============================================================================
 * A full catalogue, presented as an editorial sequence rather than a grid of
 * thirteen identical tiles.
 *
 * The index rail near the top does real work: it lets a visitor who arrived
 * looking for one specific service — "modular kitchen" — reach it in a single
 * tap, while everyone else simply keeps scrolling. It also gives the page a
 * genuine internal link structure, which helps every service rank on its own.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: routes.home },
  { name: 'Services', path: routes.services },
];

const copy = copyConfig.pages.services;

export default function Services() {
  const page = siteConfig.seo.pages.services;
  const call = telLink();

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        schemas={[
          webPageSchema(page.title, page.description, page.path),
          breadcrumbSchema(CRUMBS),
          serviceSchema(services),
        ]}
      />

      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        image={siteConfig.media.pageHeaders.services}
        crumbs={CRUMBS}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to={routes.contact}>{siteConfig.cta.primary}</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={call.href}>
              <Phone className="size-4" strokeWidth={1.7} />
              {t(siteConfig.contact.phone)}
            </a>
          </Button>
        </div>
      </PageHero>

      {/* ================= Index rail ================= */}
      <Section tone="surface" spacing="sm">
        <SectionHeading
          eyebrow={copy.index.eyebrow}
          title={copy.index.title}
          lead={copy.index.lead}
          maxWidth="max-w-2xl"
        />

        {/*
          A GRID, not a wrapping row.

          `flex flex-wrap` sizes every chip to its own label, so the rail packed
          opportunistically and the arrangement changed with the copy: at 390px
          the chips measured 148–217px in a 342px column, which left twelve of
          them alone on a row and exactly one pair — "False Ceiling" and
          "Lighting Design" — sharing one, because those two happened to be the
          only combination that fitted. It read as a single misaligned item
          rather than as a deliberate rail.

          Equal columns fix it at the cause: every chip now occupies one cell,
          so widths, heights and gutters are identical and the arrangement is a
          property of the breakpoint rather than of how long a service happens
          to be named. `auto-rows-fr` keeps every ROW the same height too, so a
          label that wraps can never make its row taller than the others.

          The column counts are set so the longest label ("Commercial Interior
          Design", 217px) always fits on one line: 1 column below `sm`, then
          291px / 302px / 300px per cell at `sm` / `lg` / `xl`.
        */}
        <RevealGroup
          stagger={0.03}
          as="ul"
          className="mt-10 grid auto-rows-fr grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label={copy.index.listLabel}
        >
          {services.map((service, index) => (
            <RevealItem key={service.slug} as="li" preset="tight">
              <a
                href={`#${service.slug}`}
                className="group flex h-full w-full items-center gap-2.5 rounded-(--radius-brand) border border-border bg-canvas px-4 py-2.5 text-[0.78rem] text-ink transition-all duration-400 ease-luxe hover:border-accent hover:bg-accent-button hover:text-accent-contrast"
              >
                <span
                  aria-hidden="true"
                  className="text-[0.62rem] text-ink-muted tabular-nums transition-colors duration-400 group-hover:text-accent-contrast/70"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {t(service.title)}
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ================= The catalogue ================= */}
      <div>
        {services.map((service, index) => (
          <ServiceRow key={service.slug} service={service} index={index} />
        ))}
      </div>

      {/* ================= Not listed? ================= */}
      <Section tone="muted" spacing="md">
        <Reveal preset="up">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-h2 text-ink">{t(copy.closing.title)}</h2>
            <p className="max-w-xl text-lead text-ink-muted">{t(copy.closing.lead)}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to={routes.contact}>
                  {siteConfig.cta.primary}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={routes.projects}>{copy.closing.secondaryAction}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <ProcessTimeline />
      <FaqSection tone="canvas" />
      <FinalCta />
    </>
  );
}
