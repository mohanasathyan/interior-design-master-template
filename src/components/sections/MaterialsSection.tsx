import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { materials, materialsIntro } from '@/data/philosophy';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { Button } from '@/components/ui/button';
import { Card, CardDescription } from '@/components/ui/card';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * PREMIUM MATERIALS
 * ============================================================================
 * The specification section — and a quiet competitive weapon.
 *
 * Almost no interior design website publishes what sits behind the surface.
 * Doing so achieves two things at once: it reassures the careful buyer who is
 * comparing three quotes, and it silently reframes any cheaper competitor as
 * the one who would not say.
 *
 * Presented as a specification table rather than as cards, because the format
 * itself signals rigour.
 * ============================================================================
 */
const copy = copyConfig.home.materials;

export function MaterialsSection() {
  return (
    <Section id={homeSections.materials} tone="surface" spacing="lg">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------------- Intro + image ---------------- */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={materialsIntro.eyebrow}
            title={materialsIntro.title}
            lead={materialsIntro.lead}
            maxWidth="max-w-lg"
          />

          <Reveal preset="image" delay={0.1}>
            <Img
              image={siteConfig.media.materials}
              ratio="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="mt-12 rounded-(--radius-brand)"
            />
          </Reveal>

          <Reveal preset="up" delay={0.15}>
            <div className="mt-8 flex items-start gap-3.5 border-l-2 border-accent pl-5">
              <p className="text-[0.92rem] leading-relaxed text-ink-muted">{t(copy.note)}</p>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Specification list ---------------- */}
        <div className="lg:col-span-7">
          <RevealGroup stagger={0.06} className="flex flex-col">
            {materials.map((material, index) => (
              <RevealItem
                key={material.name}
                as="article"
                className="group border-t border-border py-7 transition-colors duration-500 first:border-t-0 first:pt-0 hover:border-accent/35 md:py-8"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
                  {/* Index */}
                  <span
                    aria-hidden="true"
                    className="hidden shrink-0 pt-1 font-display text-sm text-ink-muted/40 tabular-nums md:block"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-500 group-hover:text-accent-strong">
                      {t(material.name)}
                    </h3>

                    <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-muted">
                      {t(material.description)}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted">
                        {copy.usedFor} <span className="text-ink">{t(material.usedFor)}</span>
                      </span>
                    </div>
                  </div>

                  {/* The quality claim, set apart as a certification-style note */}
                  <div className="flex shrink-0 items-start gap-2.5 md:w-56">
                    <BadgeCheck
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-accent-strong"
                      strokeWidth={1.6}
                    />
                    <span className="text-[0.82rem] leading-relaxed text-ink-muted">
                      {t(material.standard)}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal preset="up">
            <Card
              variant="plain"
              padding="md"
              className="mt-12 flex flex-col gap-4 bg-canvas sm:flex-row sm:items-center sm:justify-between"
            >
              <CardDescription className="max-w-md text-[0.95rem]">
                {t(copy.scheduleOffer)}
              </CardDescription>
              <Button asChild size="md" className="shrink-0">
                <Link to={routes.contact}>{siteConfig.cta.tertiary}</Link>
              </Button>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
