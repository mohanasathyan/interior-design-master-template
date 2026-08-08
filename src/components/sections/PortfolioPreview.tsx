import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProjects, projects, type Project } from '@/data/projects';
import { homeSections } from '@/data/navigation';
import { copyConfig } from '@/config/copy.config';
import { t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * PORTFOLIO PREVIEW
 * ============================================================================
 * On an interior design site the portfolio is the product. This section exists
 * to get the visitor to the gallery, so it shows just enough to create the
 * pull and then points decisively at the full body of work.
 *
 * The masonry uses CSS multi-column layout, which produces genuinely uneven
 * column heights driven by each image's aspect ratio. A perfectly even grid of
 * identical tiles is the single fastest way to make a portfolio look like a
 * template.
 * ============================================================================
 */
const copy = copyConfig.home.portfolio;

export function PortfolioPreview() {
  /** The project whose case study is open, or `null`. */
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section id={homeSections.portfolio} tone="canvas" spacing="lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          maxWidth="max-w-2xl"
        />

        <Reveal preset="up" delay={0.15} className="shrink-0">
          <Button asChild variant="outline" size="md">
            <Link to={routes.projects}>
              {format(copy.viewAll, { count: projects.length })}
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                strokeWidth={1.7}
              />
            </Link>
          </Button>
        </Reveal>
      </div>

      <RevealGroup
        stagger={0.09}
        className="mt-16 gap-7 sm:columns-2 lg:columns-3 [&>*]:mb-7"
      >
        {featuredProjects.map((project) => (
          <RevealItem key={project.slug} className="break-inside-avoid">
            <ProjectCard project={project} onSelect={setSelected} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Closing prompt — invites a conversation rather than another click. */}
      <Reveal preset="up">
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-border pt-12 text-center">
          <p className="max-w-2xl text-lead text-ink-muted">{t(copy.closing)}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={routes.contact}>{copy.discuss}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={routes.projects}>{copy.browse}</Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </Section>
  );
}
