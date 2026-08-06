import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Phone, SlidersHorizontal } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { projectCategories, projects, type Project } from '@/data/projects';
import { studioStats } from '@/data/stats';
import { breadcrumbSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { telLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks';
import { Seo } from '@/components/common/Seo';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal } from '@/components/common/Reveal';
import { Stat } from '@/components/common/Stat';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { ProjectDialog } from '@/components/sections/ProjectDialog';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 * The portfolio gallery — the page that does the persuading on an interior
 * design site.
 *
 * Implementation notes:
 *  • The masonry is CSS multi-column. Genuinely uneven column heights are what
 *    make a gallery look curated; a rigid equal-height grid looks like a
 *    product listing.
 *  • Filtering is client-side over a small in-memory list, so it is instant
 *    with no network round-trip and no loading state to design.
 *  • The filter is a `radiogroup`, not a row of buttons, so a screen-reader
 *    user hears "Residential, 2 of 6 selected" instead of six unrelated
 *    buttons.
 *  • The result count is announced with `aria-live`, so filtering is
 *    perceivable without sight.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
];

export default function Projects() {
  const page = siteConfig.seo.pages.projects;
  const call = telLink();
  const reduceMotion = usePrefersReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  /**
   * Arrow-key navigation for the filter radiogroup.
   *
   * A `radiogroup` is a single tab stop: Tab moves past the whole set and the
   * arrow keys move between options. Without this the ARIA roles would be
   * announcing a contract the component does not honour, which is worse for a
   * screen-reader user than plain buttons would have been.
   */
  const handleFilterKeys = (event: React.KeyboardEvent, index: number) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const count = projectCategories.length;

    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;

    setActiveCategory(projectCategories[next]);
    filterRefs.current[next]?.focus();
  };

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        schemas={[
          webPageSchema(page.title, page.description, page.path),
          breadcrumbSchema(CRUMBS),
        ]}
      />

      <PageHero
        eyebrow="Selected Work"
        title="Projects we have designed, built and handed over."
        lead="Homes, workplaces and retail spaces across {{CITY}}. Every project below lists its area, delivery time and budget band — so you can judge the fit before you get in touch."
        image={siteConfig.media.pageHeaders.projects}
        crumbs={CRUMBS}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/contact">Start a Similar Project</Link>
          </Button>
          <Button asChild size="lg" variant="outlineInk">
            <a href={call.href}>
              <Phone className="size-4" strokeWidth={1.7} />
              {t(siteConfig.contact.phone)}
            </a>
          </Button>
        </div>
      </PageHero>

      {/* ================= Gallery ================= */}
      <Section tone="canvas" spacing="lg">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Real projects, real numbers."
            lead="We publish the area, the timeline and the budget band for every project. Very few studios do — and it is the fastest way for you to tell whether we are the right fit."
            maxWidth="max-w-2xl"
          />
        </div>

        {/* ---- Filters ---- */}
        <Reveal preset="up">
          <div className="mt-12 flex flex-col gap-5 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
            <div
              role="radiogroup"
              aria-label="Filter projects by category"
              className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1"
            >
              <span className="mr-2 hidden shrink-0 items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-ink-muted md:flex">
                <SlidersHorizontal className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                Filter
              </span>

              {projectCategories.map((category, index) => {
                const active = category === activeCategory;
                return (
                  <button
                    key={category}
                    ref={(node) => {
                      filterRefs.current[index] = node;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    /* Roving tabindex: only the selected option is tabbable. */
                    tabIndex={active ? 0 : -1}
                    onKeyDown={(event) => handleFilterKeys(event, index)}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'shrink-0 rounded-(--radius-brand) border px-4 py-2.5',
                      'text-[0.74rem] font-medium uppercase tracking-[0.14em]',
                      'transition-all duration-400 ease-luxe',
                      active
                        ? 'border-accent bg-accent-button text-accent-contrast'
                        : 'border-border bg-surface text-ink-muted hover:border-ink/35 hover:text-ink',
                    )}
                  >
                    {t(category)}
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="shrink-0 text-[0.78rem] text-ink-muted">
              Showing <span className="text-ink tabular-nums">{visible.length}</span> of{' '}
              <span className="tabular-nums">{projects.length}</span> projects
            </p>
          </div>
        </Reveal>

        {/* ---- Masonry ---- */}
        <div className="mt-12 gap-7 sm:columns-2 lg:columns-3 lg:gap-8 [&>*]:mb-7 lg:[&>*]:mb-8">
          {/*
            No `layout` prop and no `popLayout` mode here on purpose: both
            measure element boxes, which CSS multi-column layout reflows
            unpredictably. A plain fade in and out is stable in every browser.
          */}
          <AnimatePresence initial={false}>
            {visible.map((project) => (
              <m.div
                key={project.slug}
                initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid"
              >
                <ProjectCard project={project} onSelect={setSelected} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-ink-muted">
            {t('No projects in this category yet — but we would be glad to discuss yours.')}
          </p>
        )}
      </Section>

      {/* ================= Numbers band ================= */}
      <Section tone="contrast" spacing="md" grain>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="By the Numbers"
              title="What our track record looks like."
              tone="light"
              maxWidth="max-w-md"
            />
          </div>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-8 lg:grid-cols-4">
            {studioStats.map((stat) => (
              <li key={stat.label}>
                <Stat {...stat} tone="light" size="sm" rule detail={undefined} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ================= Similar project CTA ================= */}
      <Section tone="surface" spacing="md">
        <Reveal preset="up">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-h2 text-ink">
              {t('Want something like one of these?')}
            </h2>
            <p className="max-w-2xl text-lead text-ink-muted">
              {t(
                'Send us the project that caught your eye along with your floor plan or room dimensions. We will come back with a realistic scope, timeline and budget for your space.',
              )}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/contact">
                  {siteConfig.cta.primary}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Testimonials />
      <FinalCta />

      <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}
