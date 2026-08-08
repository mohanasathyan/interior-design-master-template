import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, MessageCircle, Sparkles, Users, Wallet } from 'lucide-react';
import type { Service } from '@/data/services';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { whatsappLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks';
import { Container } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { IconChip } from '@/components/common/IconChip';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * SERVICE ROW
 * ============================================================================
 * The full-width editorial block used for each service on the services page.
 *
 * Structure — image, then three distinct information layers:
 *  • WHAT YOU GET   the deliverables list. Concrete, checkable.
 *  • WHY IT MATTERS the benefits. Written about the client's life, not ours.
 *  • THE FACTS      ideal-for, timeline and starting price, as a meta rail.
 *
 * That last rail is the commercially important one. Publishing an entry price
 * and a timeline filters out mismatched enquiries before they consume studio
 * time, and signals confidence to the ones who do fit.
 *
 * Rows alternate their image side. The section carries `id={slug}` so the
 * footer and home page can deep-link straight to any service.
 * ============================================================================
 */
const copy = copyConfig.pages.services.row;

export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const flip = index % 2 === 1;
  /** True once the row is actually two columns — see the note on the reveal. */
  const sideBySide = useMediaQuery('(min-width: 64rem)');
  const whatsapp = whatsappLink(format(copy.whatsappMessage, { service: service.title }));

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-heading`}
      className={cn(
        'scroll-mt-28 border-b border-border py-16 md:py-24',
        index % 2 === 1 ? 'bg-surface' : 'bg-canvas',
      )}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Image ---------------- */}
          {/*
            The horizontal entrance belongs to the two-column layout, which only
            exists from `lg`. Below that the row is a single stack, so sliding a
            full-width image in from the side animates against a split that is
            not there and pushes the page wider than the screen while it runs.
            Mobile gets the vertical entrance instead — same curve, same
            duration, just the axis the layout actually has.
          */}
          <Reveal
            preset={sideBySide ? (flip ? 'left' : 'right') : 'up'}
            className={cn('group relative', flip && 'lg:order-2')}
          >
            <Img
              image={service.image}
              ratio="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-(--radius-brand)"
              hoverZoom
            />

            {/* Offset accent frame */}
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute -z-10 h-full w-full rounded-(--radius-brand) border border-accent/25',
                flip ? '-bottom-5 -left-5' : '-bottom-5 -right-5',
              )}
            />

            {/* Index numeral */}
            <span
              aria-hidden="true"
              className="absolute -top-6 left-0 font-display text-6xl leading-none text-ink/6 md:text-7xl"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </Reveal>

          {/* ---------------- Content ---------------- */}
          <div className={cn(flip && 'lg:order-1')}>
            <Reveal preset="tight">
              <span className="flex items-center gap-3.5">
                <IconChip icon={Icon} size="md" tone="outline" />
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
                  {t(service.category)}
                </span>
              </span>
            </Reveal>

            <Reveal preset="up" delay={0.06}>
              <h2
                id={`${service.slug}-heading`}
                className="mt-6 font-display text-h2 text-ink"
              >
                {t(service.title)}
              </h2>
            </Reveal>

            <Reveal preset="up" delay={0.1}>
              <p className="mt-5 max-w-xl text-lead text-ink-muted">{t(service.description)}</p>
            </Reveal>

            {/* ---- What you get ---- */}
            <Reveal preset="up" delay={0.14}>
              <h3 className="mt-10 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-ink">
                {copy.included}
              </h3>
            </Reveal>

            <RevealGroup
              stagger={0.05}
              as="ul"
              className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2"
            >
              {service.features.map((feature) => (
                <RevealItem
                  key={feature}
                  as="li"
                  preset="tight"
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-accent/12">
                    <Check className="size-2.5 text-accent-strong" strokeWidth={2.6} />
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-ink-muted">
                    {t(feature)}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* ---- Why it matters ---- */}
            <Reveal preset="up" delay={0.16}>
              <div className="mt-9 rounded-(--radius-brand) border border-border bg-surface-muted/60 p-6">
                <h3 className="flex items-center gap-2.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-ink">
                  <Sparkles className="size-3.5 text-accent-strong" strokeWidth={1.8} />
                  {copy.whyItMatters}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                      />
                      {t(benefit)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ---- The facts ---- */}
            <Reveal preset="up" delay={0.2}>
              {/*
               * `sm:grid-cols-3` splits a ~600px column three ways, so each
               * track is only ~180px. That is comfortable for real values but
               * not for an unfilled `{{TIMELINE_RESIDENTIAL}}`, so every cell
               * is a `token-safe` wrapping context — see `.token-safe`.
               */}
              <dl className="mt-8 grid gap-x-6 gap-y-6 border-t border-border pt-7 sm:grid-cols-3">
                <Fact icon={Users} label={copy.idealFor} value={service.idealFor} />
                <Fact icon={Clock} label={copy.timeline} value={service.timeline} />
                <Fact icon={Wallet} label={copy.startingFrom} value={service.startingFrom} accent />
              </dl>
            </Reveal>

            {/* ---- Actions ---- */}
            <Reveal preset="up" delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="md">
                  <Link to={routes.contact} state={{ service: service.title }}>
                    {siteConfig.cta.tertiary}
                    <ArrowRight
                      className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                      strokeWidth={1.7}
                    />
                  </Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <a
                    href={whatsapp.href}
                    target={whatsapp.external ? '_blank' : undefined}
                    rel={whatsapp.external ? 'noopener noreferrer' : undefined}
                  >
                    <MessageCircle className="size-4" strokeWidth={1.7} />
                    {copy.askAction}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** One item in the meta rail beneath a service. */
function Fact({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="token-safe">
      <dt className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
        <Icon aria-hidden="true" className="size-3.5 shrink-0 text-accent-strong" strokeWidth={1.7} />
        <span className="token-safe">{label}</span>
      </dt>
      <dd
        className={cn(
          'token-safe mt-2 text-[0.9rem]',
          accent ? 'font-display text-lg text-accent-strong' : 'text-ink',
          /* After the size classes — see the note in Stat.tsx. `text-lg` in the
             accent branch would otherwise delete this. */
          'leading-relaxed',
        )}
      >
        {t(value)}
      </dd>
    </div>
  );
}
