import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { studioStats } from '@/data/stats';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Stat } from '@/components/common/Stat';
import { Button } from '@/components/ui/button';

/**
 * ============================================================================
 * STATISTICS BAND
 * ============================================================================
 * The second impression. The hero establishes taste; this establishes track
 * record — the two questions every prospect is weighing simultaneously.
 *
 * Laid out as an editorial split rather than a centred row: the heading holds
 * the left column while the numbers run as a 2×2 grid on the right. It reads
 * as a considered composition instead of a dashboard.
 * ============================================================================
 */
export function StatsBand() {
  return (
    <Section
      id={homeSections.stats}
      tone="surface"
      spacing="lg"
      backdrop={siteConfig.media.backdrops.warm}
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---- Left: framing ---- */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The Studio at a Glance"
            title="A decade of homes, delivered on time and on budget."
            lead="Numbers are the shortest route to trust in this profession. These are ours — and every one of them is verifiable in the projects we have completed across {{CITY}}."
            maxWidth="max-w-xl"
          >
            <Button asChild variant="outline" size="md">
              <Link to="/about">
                Read Our Story
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                  strokeWidth={1.7}
                />
              </Link>
            </Button>
          </SectionHeading>
        </div>

        {/* ---- Right: the numbers ---- */}
        <RevealGroup className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:col-span-7">
          {studioStats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="bg-surface/78 p-8 backdrop-blur-[2px] transition-colors duration-500 hover:bg-surface md:p-10"
            >
              <Stat {...stat} size="md" rule />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* A quiet line of reassurance beneath, rather than another CTA button. */}
      <p className="mt-14 border-t border-border pt-8 text-sm text-ink-muted">
        {t(
          'Every project is delivered by our own in-house team — designers, project managers and craftspeople on our payroll, not subcontracted out. Questions? Call {{PHONE}} and speak to a designer directly.',
        )}
      </p>

      {/* Screen-reader-only context for the figures above. */}
      <span className="sr-only">
        {t(`Statistics for ${siteConfig.business.name}, interior designers in {{CITY}}.`)}
      </span>
    </Section>
  );
}
