import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/data/process';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { cn } from '@/lib/utils';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * HOW WE WORK — SIX-STEP TIMELINE
 * ============================================================================
 * The section that most reliably converts a browser into an enquiry.
 *
 * A published process answers the unspoken question — "what actually happens
 * after I pay?" — which is the real blocker on a high-ticket, high-trust
 * purchase. Naming the deliverable and the duration of every stage turns an
 * abstract worry into a schedule the visitor can picture.
 *
 * Layout:
 *   mobile/tablet  →  [marker | content]        a left rail
 *   desktop        →  [content | marker | content]  alternating either side
 *
 * The vertical rule fills as the visitor scrolls, driven by one scroll-linked
 * spring on a single element rather than per-item animations — so the effect
 * costs one transform no matter how many steps are added.
 * ============================================================================
 */
const copy = copyConfig.home.process;

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  /*
   * The steps only alternate left/right from `lg`. Below that they are a single
   * left rail, so sliding them in horizontally animates against a layout that
   * is not there — and, worse, the 28px entrance offset is applied to an
   * element that already spans the full column, pushing the page wider than the
   * screen for the duration of every reveal.
   *
   * So the horizontal entrance is kept for the alternating desktop layout, and
   * below it the steps rise instead. Same motion vocabulary, same timing, same
   * curve — just the axis that matches the layout the visitor is actually
   * looking at. Mobile keeps a full entrance animation either way.
   */
  const alternates = useMediaQuery('(min-width: 64rem)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 65%'],
  });

  const smoothed = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleY = useTransform(smoothed, [0, 1], [0, 1]);

  return (
    <Section id={homeSections.process} tone="contrast" spacing="xl" grain>
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        align="center"
        tone="light"
        maxWidth="max-w-3xl"
      />

      <div ref={containerRef} className="relative mt-20">
        {/* ---------------- The rule ---------------- */}
        <div
          aria-hidden="true"
          className="absolute top-3 h-[calc(100%-3rem)] w-px bg-white/10 left-[1.4375rem] lg:left-1/2 lg:-translate-x-1/2"
        >
          <m.div
            style={reduceMotion ? { scaleY: 1 } : { scaleY }}
            className="h-full w-full origin-top bg-linear-to-b from-accent via-accent to-accent/20"
          />
        </div>

        <ol className="flex flex-col gap-12 md:gap-16">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            /* Odd-numbered steps sit on the right at desktop width. */
            const right = index % 2 === 1;

            return (
              <li
                key={step.number}
                /*
                 * `minmax(0,1fr)`, not `1fr`. A bare `1fr` track is
                 * `minmax(auto,1fr)`, so its floor is the MIN-CONTENT of its
                 * contents — and the stage duration is an unfilled placeholder
                 * (`{{STAGE_1_DURATION}}`, twenty unbreakable characters), which
                 * makes that floor wider than a phone. The track then refuses to
                 * shrink and the step title and body are pushed off-screen.
                 * `minmax(0,…)` lets the track shrink; `token-safe` below lets
                 * the token itself wrap rather than be clipped.
                 */
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-6 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] lg:gap-x-10"
              >
                {/* ---- Marker ---- */}
                <span
                  aria-hidden="true"
                  className="col-start-1 row-start-1 grid size-12 place-items-center rounded-full border border-white/15 bg-contrast text-accent transition-colors duration-500 lg:col-start-2 lg:size-14"
                >
                  <Icon className="size-5 lg:size-6" strokeWidth={1.3} />
                </span>

                {/* ---- Content ---- */}
                <Reveal
                  preset={alternates ? (right ? 'left' : 'right') : 'up'}
                  className={cn(
                    'col-start-2 row-start-1 pt-0.5',
                    right ? 'lg:col-start-3 lg:pl-2' : 'lg:col-start-1 lg:pr-2 lg:text-right',
                  )}
                >
                  <div className={cn(right ? '' : 'lg:flex lg:flex-col lg:items-end')}>
                    <span
                      className={cn(
                        'flex flex-wrap items-center gap-3 text-[0.64rem] font-medium uppercase tracking-[0.22em] text-accent',
                        !right && 'lg:justify-end',
                      )}
                    >
                      <span className="tabular-nums">
                        {format(copy.step, { number: step.number })}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                      <span className="token-safe text-contrast-ink/60">{t(step.duration)}</span>
                    </span>

                    <h3 className="token-safe mt-5 font-display text-h3 text-contrast-ink">
                      {t(step.title)}
                    </h3>

                    <p className="token-safe mt-4 max-w-lg text-[0.97rem] leading-relaxed text-contrast-ink/62">
                      {t(step.description)}
                    </p>

                    {/* The tangible artefact for this stage. */}
                    <p
                      className={cn(
                        'token-safe mt-6 max-w-lg border-l-2 border-accent/40 pl-4 text-[0.86rem] leading-relaxed text-contrast-ink/70',
                        !right && 'lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-4',
                      )}
                    >
                      <span className="font-medium text-contrast-ink">{copy.deliverable}</span>
                      {t(step.deliverable)}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------------- Closing CTA ---------------- */}
      <Reveal preset="up">
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-14 text-center">
          <h3 className="max-w-2xl font-display text-h3 text-contrast-ink">
            {t(copy.closingTitle)}
          </h3>
          <p className="max-w-xl text-contrast-ink/62">{t(copy.closingLead)}</p>
          <Button asChild size="lg" variant="inverse">
            <Link to={routes.contact}>
              {siteConfig.cta.primary}
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                strokeWidth={1.7}
              />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
