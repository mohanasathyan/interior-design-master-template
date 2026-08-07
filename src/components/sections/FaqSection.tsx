import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, MessageSquare, Phone } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { homeSections } from '@/data/navigation';
import { siteConfig } from '@/config/site.config';
import { telLink, whatsappLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal } from '@/components/common/Reveal';
import { IconChip, GoldRule } from '@/components/common/IconChip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * FAQ
 * ============================================================================
 * Objection handling at the exact point of highest intent — a visitor who has
 * read this far is close, and usually has one specific worry left.
 *
 * Two deliberate choices:
 *  • The accordion is `type="single"` and uncontrolled, so only one answer is
 *    open at a time and the section never becomes an unreadable wall.
 *  • The pricing question is first. It is the question everyone has and few
 *    sites answer, and answering it plainly builds more trust than any
 *    amount of "every project is unique".
 *
 * The matching `FAQPage` structured data is emitted by the page, making this
 * section eligible for the expandable FAQ rich result.
 * ============================================================================
 */
export function FaqSection({
  tone = 'canvas',
  showContactPanel = true,
}: {
  tone?: 'canvas' | 'surface' | 'muted';
  showContactPanel?: boolean;
}) {
  const call = telLink();
  const whatsapp = whatsappLink();

  return (
    <Section
      id={homeSections.faqs}
      tone={tone}
      spacing="lg"
      backdrop={siteConfig.media.backdrops.soft}
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* ---------------- Heading + contact panel ---------------- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Frequently Asked"
              title="The questions worth asking before you commit."
              lead="Straight answers to what people actually ask us — including the one about cost. If yours is not here, we are happy to answer it directly."
              maxWidth="max-w-lg"
            />

            {showContactPanel && (
              <Reveal preset="up" delay={0.2}>
                <Card
                  variant="plain"
                  padding="md"
                  className="mt-10 flex flex-col items-center bg-surface/75 text-center backdrop-blur-[2px]"
                >
                  <IconChip icon={MessageSquare} size="lg" />

                  <CardTitle className="mt-6 text-xl">{t('Still have a question?')}</CardTitle>

                  <GoldRule className="mt-4" />

                  <CardDescription className="mt-4 text-[0.93rem]">
                    {t(
                      'Speak to a designer directly — no scripts, no sales pitch. Most questions take five minutes to resolve.',
                    )}
                  </CardDescription>

                  <div className="mt-7 flex w-full flex-col gap-3">
                    <Button asChild size="md" block>
                      <a href={call.href}>
                        <Phone className="size-4" strokeWidth={1.7} />
                        {t('Call us: {{PHONE}}')}
                      </a>
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
                </Card>

                {/* Tertiary route out, set as a quiet text link below the card. */}
                <Link
                  to={routes.contact}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors duration-300 hover:text-accent-strong"
                >
                  <span className="link-underline">Or send an enquiry instead</span>
                  <ArrowRight
                    className="size-3.5 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </Reveal>
            )}
          </div>
        </div>

        {/* ---------------- Accordion ---------------- */}
        <div className="lg:col-span-7">
          <Reveal preset="up">
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>
                    <span className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 shrink-0 text-[0.68rem] tracking-[0.14em] text-accent-strong tabular-nums"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="token-safe">{t(faq.question)}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/*
                      `token-safe`: the answers carry price and timeline
                      placeholders — `{{PRICE_STARTING}}`, `{{WARRANTY_YEARS}}` —
                      which are single unbreakable words far wider than a 320px
                      column, and they push the whole FAQ column past the screen.
                    */}
                    <span className="token-safe block pl-10">{t(faq.answer)}</span>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
