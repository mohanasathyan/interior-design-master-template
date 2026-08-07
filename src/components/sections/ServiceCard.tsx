import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';
import { t } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { Img } from '@/components/common/Img';
import { IconChip } from '@/components/common/IconChip';
import { RevealItem } from '@/components/common/Reveal';
import { serviceAnchor } from '@/config/routes';

/**
 * ============================================================================
 * SERVICE CARD
 * ============================================================================
 * The compact service tile used on the home page and in the services index.
 *
 * The whole card is one link. A card with a separate "Learn more" anchor forces
 * the visitor to aim at a 90px target; making the entire surface clickable is
 * both better UX and better for conversion — while `focus-within` styling keeps
 * the keyboard experience identical to the mouse one.
 * ============================================================================
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <RevealItem as="article" className="group relative">
      <Link
        to={serviceAnchor(service.slug)}
        className="flex h-full flex-col overflow-hidden rounded-(--radius-brand) border border-border bg-surface transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
      >
        {/* ---- Image ---- */}
        <div className="relative overflow-hidden">
          <Img
            image={service.image}
            ratio="aspect-[4/3]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            hoverZoom
          />

          {/* Category chip */}
          <span className="absolute left-4 top-4 rounded-(--radius-brand) bg-white/92 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
            {t(service.category)}
          </span>

          {/* Index numeral, bottom-right over the image */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-4 font-display text-3xl leading-none text-white/45 transition-colors duration-500 group-hover:text-white/85"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* ---- Body ---- */}
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <IconChip
              icon={Icon}
              size="sm"
              className="group-hover:bg-accent-button group-hover:text-accent-contrast"
            />

            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-ink-muted transition-all duration-500 ease-luxe group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-strong"
              strokeWidth={1.4}
            />
          </div>

          <h3 className="mt-6 font-display text-[1.35rem] leading-snug text-ink transition-colors duration-500 group-hover:text-accent-strong">
            {t(service.title)}
          </h3>

          <p className="mt-3.5 flex-1 text-[0.93rem] leading-relaxed text-ink-muted">
            {t(service.summary)}
          </p>

          {/* Three-feature teaser — enough detail to feel substantive */}
          <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
            {service.features.slice(0, 3).map((feature) => (
              <li
                key={feature}
                className={cn(
                  'flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-ink-muted',
                )}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                />
                {t(feature)}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </RevealItem>
  );
}
