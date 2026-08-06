import { ArrowUpRight, Clock, Maximize, MapPin, Wallet } from 'lucide-react';
import type { Project } from '@/data/projects';
import { t } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { Img } from '@/components/common/Img';
import { Badge } from '@/components/ui/badge';

/**
 * ============================================================================
 * PROJECT CARD
 * ============================================================================
 * A portfolio tile that sells as well as it shows.
 *
 * Most interior galleries stop at a photograph and a name. This one surfaces
 * area, duration and budget band on hover — the three questions a serious
 * prospect asks within the first minute. Publishing them converts idle
 * browsing into self-qualification, so the enquiries that arrive are warmer.
 *
 * On touch devices there is no hover, so the metadata renders permanently
 * beneath the image instead of being hidden behind an interaction that will
 * never happen.
 * ============================================================================
 */

/** Aspect ratio per masonry footprint — the variation is what makes it read as a gallery. */
const RATIO: Record<Project['span'], string> = {
  tall: 'aspect-[3/4]',
  standard: 'aspect-[4/3]',
  wide: 'aspect-[16/10]',
};

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  /** Opens the project's case-study dialog. */
  onSelect: (project: Project) => void;
}) {
  return (
    <article className="group break-inside-avoid">
      {/*
        A button, not a link: this opens an in-page dialog rather than
        navigating, and using an anchor for that would lie to assistive tech
        and break middle-click expectations.
      */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-haspopup="dialog"
        aria-label={`${t(project.name)} — ${t(project.category)} project. View project details.`}
        className="block w-full cursor-pointer text-left overflow-hidden rounded-(--radius-brand) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {/* ---------------- Image ---------------- */}
        <div className="relative overflow-hidden bg-surface-muted">
          <Img
            image={project.image}
            ratio={RATIO[project.span]}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            hoverZoom
          />

          {/* Scrim: only appears on hover, so the photograph is never dulled at rest. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-600 ease-luxe group-hover:opacity-100"
          />

          <Badge
            variant="light"
            size="sm"
            className="absolute left-4 top-4 transition-all duration-500 group-hover:bg-accent-button group-hover:text-accent-contrast"
          >
            {t(project.category)}
          </Badge>

          <span
            aria-hidden="true"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-500 ease-luxe group-hover:opacity-100"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </span>

          {/*
            Hover-revealed metadata — gated on whether the device can HOVER,
            not on how wide it is.

            `md:block` was the wrong test. An iPad in landscape, a Surface, any
            touch laptop: all are past `md`, so this panel was displayed, and all
            of them lack hover, so it stayed at `opacity: 0` permanently. The
            always-visible fallback beneath the image was `md:hidden`, so it was
            gone too — which left the description, area, duration and budget
            unreachable on those devices rather than merely un-animated.

            `pointer-fine` is a media query for a precise pointing device, so the
            panel now appears only where a hover can actually reveal it. Every
            touch device of any size gets the permanent version below instead.
          */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-4 p-6 opacity-0 transition-all duration-600 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 [@media(pointer:fine)]:md:block">
            <p className="text-[0.86rem] leading-relaxed text-white/85 line-clamp-3">
              {t(project.description)}
            </p>

            <dl className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-4 text-white/80">
              <MetaItem icon={Maximize} label="Area" value={project.area} tone="light" />
              <MetaItem icon={Clock} label="Duration" value={project.duration} tone="light" />
              <MetaItem icon={Wallet} label="Budget" value={project.budget} tone="light" />
            </dl>
          </div>
        </div>

        {/* ---------------- Caption ---------------- */}
        <div className="pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-500 group-hover:text-accent-strong">
              {t(project.name)}
            </h3>
            <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted tabular-nums">
              {t(project.year)}
            </span>
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.82rem] text-ink-muted">
            <span>{t(project.type)}</span>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3" strokeWidth={1.6} />
              {t(project.location)}
            </span>
          </p>

          {/* The permanent counterpart: shown wherever the hover panel is not. */}
          <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 [@media(pointer:fine)]:md:hidden">
            <MetaItem icon={Maximize} label="Area" value={project.area} />
            <MetaItem icon={Clock} label="Duration" value={project.duration} />
            <MetaItem icon={Wallet} label="Budget" value={project.budget} />
          </dl>
        </div>
      </button>
    </article>
  );
}

/** A single icon + label + value pair inside the metadata row. */
function MetaItem({
  icon: Icon,
  label,
  value,
  tone = 'default',
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  tone?: 'default' | 'light';
}) {
  return (
    <div className="token-safe flex items-center gap-2">
      <Icon
        aria-hidden="true"
        // `light` here means "sitting on the dark hover scrim", where the brand
        // gold reads well; the caption version sits on canvas and needs the
        // AA-safe variant.
        className={cn('size-3.5 shrink-0', tone === 'light' ? 'text-accent' : 'text-accent-strong')}
        strokeWidth={1.6}
      />
      <dt className="sr-only">{label}</dt>
      <dd
        className={cn(
          'token-safe text-[0.78rem] tracking-[0.02em]',
          tone === 'light' ? 'text-white/85' : 'text-ink-muted',
        )}
      >
        {t(value)}
      </dd>
    </div>
  );
}
