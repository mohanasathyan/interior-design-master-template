import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, MapPin, Maximize, MessageCircle, Wallet } from 'lucide-react';
import type { Project } from '@/data/projects';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { whatsappLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { Img } from '@/components/common/Img';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * PROJECT DIALOG
 * ============================================================================
 * The case study behind each portfolio tile.
 *
 * Sending someone from a project they liked straight to a blank contact form
 * throws away the moment of interest. This keeps them in the gallery, answers
 * the questions the tile only teased — full brief, scope, area, timeline,
 * budget band — and only then asks, with the project already attached to the
 * enquiry so the studio knows exactly what caught their eye.
 *
 * Radix supplies the focus trap, focus restoration, Escape handling and
 * scroll lock, so the modal is fully keyboard- and screen-reader-correct.
 * ============================================================================
 */
const copy = copyConfig.pages.projects.dialog;
const cardCopy = copyConfig.pages.projects.card;

export function ProjectDialog({
  project,
  onOpenChange,
}: {
  /** The selected project, or `null` when the dialog is closed. */
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  /* Keep the panel mounted only while a project is selected. */
  if (!project) return null;

  const whatsapp = whatsappLink(format(copy.whatsappMessage, { project: project.name }));

  const facts = [
    { icon: Maximize, label: cardCopy.area, value: project.area },
    { icon: Clock, label: cardCopy.duration, value: project.duration },
    { icon: Wallet, label: copy.budget, value: project.budget },
    { icon: Calendar, label: copy.completed, value: project.year },
  ];

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent closeLabel={format(copy.closeLabel, { name: t(project.name) })}>
        <article className="flex flex-col">
          {/* ---------------- Image ---------------- */}
          <div className="relative">
            <Img
              image={project.image}
              ratio="aspect-[16/10] sm:aspect-[2/1]"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-black/25"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <Badge variant="light" size="sm">
                {t(project.category)}
              </Badge>
              <DialogTitle className="mt-4 text-white">{t(project.name)}</DialogTitle>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-white/85">
                <span>{t(project.type)}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                  {t(project.location)}
                </span>
              </p>
            </div>
          </div>

          {/* ---------------- Body ---------------- */}
          <div className="p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <h3 className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
                  {copy.brief}
                </h3>
                <DialogDescription className="mt-4 text-[1.02rem]">
                  {t(project.description)}
                </DialogDescription>

                <h3 className="mt-9 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
                  {copy.scope}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <li key={item}>
                      <Badge variant="outline" size="md">
                        {t(item)}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---------------- Facts + CTA ---------------- */}
              <div className="lg:col-span-5">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-brand) border border-border bg-border">
                  {facts.map((fact) => {
                    const Icon = fact.icon;
                    return (
                      <div key={fact.label} className="token-safe bg-surface p-5">
                        <dt className="flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
                          <Icon
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-accent-strong"
                            strokeWidth={1.7}
                          />
                          <span className="token-safe">{fact.label}</span>
                        </dt>
                        <dd className="token-safe mt-2 font-display text-lg text-ink">
                          {t(fact.value)}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-7 rounded-(--radius-brand) border border-border bg-surface p-6">
                  <p className="text-[0.93rem] leading-relaxed text-ink-muted">
                    {t(copy.invitation)}
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button asChild size="md" block>
                      {/* The project travels with the enquiry, so the studio
                          already knows what the visitor responded to. */}
                      <Link to={routes.contact} state={{ project: project.slug }}>
                        {siteConfig.cta.tertiary}
                        <ArrowRight
                          className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                          strokeWidth={1.7}
                        />
                      </Link>
                    </Button>
                    <Button asChild size="md" variant="outline" block>
                      <a
                        href={whatsapp.href}
                        target={whatsapp.external ? '_blank' : undefined}
                        rel={whatsapp.external ? 'noopener noreferrer' : undefined}
                      >
                        <MessageCircle className="size-4" strokeWidth={1.7} />
                        {siteConfig.cta.whatsapp}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
}
