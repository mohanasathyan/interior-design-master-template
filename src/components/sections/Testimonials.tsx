import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { reviewLink } from '@/lib/links';
import { isFilled, t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';

/**
 * ============================================================================
 * TESTIMONIALS
 * ============================================================================
 * Social proof, laid out as a staggered three-column wall rather than a
 * carousel.
 *
 * Carousels hide most of their content behind an interaction that the majority
 * of visitors never perform, and they compete with the page's own scroll. A
 * static wall shows every quote at once — which is the entire purpose of
 * social proof.
 *
 * The quotes are ordered so that consecutive cards answer different objections
 * (cost, timeline, quality, project management), rather than repeating the
 * same reassurance six times.
 * ============================================================================
 */
export function Testimonials() {
  if (!siteConfig.features.testimonials) return null;

  const review = reviewLink();
  const hasReviewLink = isFilled(siteConfig.location.reviewLink);

  return (
    <Section id={homeSections.testimonials} tone="canvas" spacing="lg">
      <SectionHeading
        eyebrow="Client Experiences"
        title="What our clients say once the dust has settled."
        lead="The reviews below were chosen because each one addresses something different — pricing, timelines, build quality and project management. Together they describe what it is actually like to work with us."
        align="center"
        maxWidth="max-w-3xl"
      />

      <RevealGroup
        stagger={0.07}
        className="mt-16 gap-6 sm:columns-2 lg:columns-3 lg:gap-8 [&>*]:mb-6 lg:[&>*]:mb-8"
      >
        {testimonials.map((testimonial) => (
          <RevealItem key={testimonial.name} className="break-inside-avoid">
            <figure className="group relative flex flex-col rounded-(--radius-brand) border border-border bg-surface p-8 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
              <Quote
                aria-hidden="true"
                className="size-7 text-accent-strong/28 transition-colors duration-500 group-hover:text-accent-strong/55"
                strokeWidth={1.2}
              />

              {/* Rating */}
              <div
                className="mt-5 flex gap-1"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={
                      index < testimonial.rating
                        ? 'size-3.5 fill-accent text-accent-strong'
                        : 'size-3.5 text-border'
                    }
                  />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 text-[0.97rem] leading-relaxed text-ink">
                “{t(testimonial.quote)}”
              </blockquote>

              <figcaption className="mt-7 border-t border-border pt-6">
                <span className="block font-display text-base text-ink">{t(testimonial.name)}</span>
                <span className="mt-1.5 block text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                  {t(testimonial.role)} · {t(testimonial.location)}
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ---- Review CTA ---- */}
      <Reveal preset="up">
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-border pt-12 text-center">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-accent text-accent-strong" />
              ))}
            </span>
            <span className="text-sm text-ink-muted">
              {t('{{GOOGLE_RATING}} average from {{REVIEW_COUNT}} client reviews')}
            </span>
          </div>

          {hasReviewLink && (
            <Button asChild variant="outline" size="md">
              <a href={review.href} target="_blank" rel="noopener noreferrer">
                Read All Reviews on Google
              </a>
            </Button>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
