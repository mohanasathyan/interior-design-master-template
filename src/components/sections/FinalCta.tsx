import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { homeSections } from '@/data/navigation';
import { telLink, whatsappLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { Section } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { Img } from '@/components/common/Img';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * FINAL CTA
 * ============================================================================
 * The closing ask, and the most important block on the page after the hero.
 *
 * Three principles are at work:
 *  1. Remove risk before asking. The three assurances below the buttons —
 *     free, no obligation, one working day — cost nothing to state and remove
 *     the three reasons someone hesitates at the last moment.
 *  2. Offer more than one channel. Some visitors will call, some will only
 *     ever message, and some want a form. All three are one tap away here.
 *  3. Be specific about what happens next. "Book a consultation" is vague;
 *     "we will call you back within one working day" is a commitment.
 * ============================================================================
 */

const ASSURANCES = [
  { icon: Sparkles, text: 'Free consultation and site visit' },
  { icon: ShieldCheck, text: 'No obligation, no pressure' },
  { icon: Clock, text: 'A reply within one working day' },
];

export function FinalCta() {
  const call = telLink();
  const whatsapp = whatsappLink();

  return (
    <Section
      id={homeSections.cta}
      tone="contrast"
      spacing="none"
      container="full"
      className="relative overflow-hidden"
    >
      {/* ---------------- Backdrop ---------------- */}
      <div className="absolute inset-0">
        <Img
          image={siteConfig.media.ctaBackdrop}
          tone="dark"
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-contrast/86" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-contrast via-contrast/72 to-contrast/35"
      />

      <div className="relative mx-auto w-full max-w-[85rem] px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-16">
        <div className="max-w-3xl">
          <Reveal preset="tight">
            <span className="eyebrow eyebrow--light">Start Your Project</span>
          </Reveal>

          <Reveal preset="up" delay={0.06}>
            <h2 className="mt-6 font-display text-h1 text-contrast-ink">
              {t('Let’s design a home you will')}{' '}
              <span className="italic text-accent">never want to leave.</span>
            </h2>
          </Reveal>

          {/* Gold rule under the headline — the same signature as the hero. */}
          <Reveal preset="up" delay={0.09}>
            <span aria-hidden="true" className="mt-8 block h-px w-20 bg-accent" />
          </Reveal>

          <Reveal preset="up" delay={0.12}>
            <p className="mt-7 max-w-2xl text-lead text-contrast-ink/70">
              {t(
                'Tell us about your space, your timeline and your budget. We will come back with a clear view of what is achievable — and an honest opinion on where your money is best spent.',
              )}
            </p>
          </Reveal>

          {/* ---------------- Actions ---------------- */}
          <Reveal preset="up" delay={0.18}>
            <div className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild size="xl">
                <Link to={routes.contact}>
                  {siteConfig.cta.primary}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </Button>

              <Button asChild size="xl" variant="light">
                <a href={call.href}>
                  <Phone className="size-4" strokeWidth={1.7} />
                  {t(siteConfig.contact.phone)}
                </a>
              </Button>

              <Button asChild size="xl" variant="light">
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
          </Reveal>

          {/* ---------------- Risk reversal ---------------- */}
          <RevealGroup
            stagger={0.08}
            delay={0.25}
            as="ul"
            className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-9 sm:flex-row sm:flex-wrap sm:gap-x-10"
          >
            {ASSURANCES.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.text} as="li" className="flex items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent"
                    strokeWidth={1.6}
                  />
                  <span className="text-[0.86rem] text-contrast-ink/72">{t(item.text)}</span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
