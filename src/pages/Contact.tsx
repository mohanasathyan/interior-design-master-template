import { Fragment } from 'react';
import {
  Clock,
  Copy,
  Check,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { breadcrumbSchema, faqSchema, webPageSchema, type Crumb } from '@/lib/schema';
import { faqs } from '@/data/faqs';
import {
  formattedAddress,
  groupedHours,
  mailLink,
  mapLink,
  reviewLink,
  socialLinks,
  telLink,
  whatsappLink,
} from '@/lib/links';
import { isFilled, t } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks';
import { Seo } from '@/components/common/Seo';
import { Img } from '@/components/common/Img';
import { IconChip } from '@/components/common/IconChip';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { FaqSection } from '@/components/sections/FaqSection';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * CONTACT
 * ============================================================================
 * The conversion page. Its one job is to make getting in touch feel effortless
 * regardless of which channel the visitor prefers.
 *
 * The quick-contact cards come *before* the form deliberately. A large share of
 * high-intent visitors — particularly on mobile — want to call or message, not
 * to fill in fields. Making them scroll past a form to find a phone number
 * costs real enquiries.
 * ============================================================================
 */
const CRUMBS: Crumb[] = [
  { name: 'Home', path: routes.home },
  { name: 'Contact', path: routes.contact },
];

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: Star,
  x: Star,
};

export default function Contact() {
  const page = siteConfig.seo.pages.contact;
  const call = telLink();
  const whatsapp = whatsappLink();
  const mail = mailLink();
  const map = mapLink();
  const review = reviewLink();
  const socials = socialLinks();
  const { copied, copy } = useCopyToClipboard();

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={page.path}
        schemas={[
          webPageSchema(page.title, page.description, page.path),
          breadcrumbSchema(CRUMBS),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="Get in Touch"
        title="Let’s talk about your space."
        lead="Call, message or send an enquiry — whichever suits you. The first consultation is free, carries no obligation, and usually tells you more in twenty minutes than a week of research."
        image={siteConfig.media.pageHeaders.contact}
        crumbs={CRUMBS}
      />

      {/* ================= Quick contact cards ================= */}
      <Section tone="canvas" spacing="md" backdrop={siteConfig.media.backdrops.warm}>
        <RevealGroup stagger={0.08} className="grid gap-6 md:grid-cols-3">
          <QuickCard
            icon={Phone}
            eyebrow="Call the studio"
            title={t(siteConfig.contact.phone)}
            description="Speak to a designer directly. Fastest way to get an answer."
            action={{ label: siteConfig.cta.call, href: call.href }}
            secondary={
              isFilled(siteConfig.contact.phone)
                ? {
                    label: copied ? 'Copied' : 'Copy number',
                    icon: copied ? Check : Copy,
                    onClick: () => void copy(t(siteConfig.contact.phone)),
                  }
                : undefined
            }
          />

          <QuickCard
            icon={MessageCircle}
            eyebrow="Message us"
            title="WhatsApp"
            description="Send photos of your space and we will reply with initial thoughts."
            action={{
              label: siteConfig.cta.whatsapp,
              href: whatsapp.href,
              external: whatsapp.external,
              icon: MessageCircle,
            }}
            highlight
          />

          <QuickCard
            icon={Mail}
            eyebrow="Email the team"
            title={t(siteConfig.contact.email)}
            description="Best for drawings, floor plans and detailed briefs."
            action={{ label: 'Send an email', href: mail.href }}
          />
        </RevealGroup>
      </Section>

      {/* ================= Form + details ================= */}
      <Section tone="muted" spacing="lg">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---- Form ---- */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* ---- Studio details ---- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Visit the Studio"
                title="Come and see the materials in person."
                lead="Samples, finishes and hardware are all on display at our {{CITY}} studio. Drop in during opening hours, or book a slot so a designer is free to walk you through."
                maxWidth="max-w-lg"
              />

              {/*
                A photograph here does real work: this column is otherwise a
                wall of addresses and opening hours, and the copy above it
                invites people to come and handle the materials in person.
              */}
              <Reveal preset="image" delay={0.1}>
                <Img
                  image={siteConfig.media.studioDetail}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="mt-10 rounded-(--radius-brand)"
                />
              </Reveal>

              <Reveal preset="up" delay={0.14}>
                <div className="mt-6 flex flex-col divide-y divide-border rounded-(--radius-brand) border border-border bg-surface">
                  {/* Address */}
                  <DetailRow icon={MapPin} label="Studio address">
                    <p className="text-[0.95rem] leading-relaxed text-ink">
                      {t(formattedAddress())}
                    </p>
                    <a
                      href={map.href}
                      target={map.external ? '_blank' : undefined}
                      rel={map.external ? 'noopener noreferrer' : undefined}
                      className="link-underline mt-3 inline-flex items-center gap-1.5 text-[0.82rem] text-accent-strong"
                    >
                      Get directions
                      <ExternalLink className="size-3" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </DetailRow>

                  {/* Hours */}
                  {/*
                    Grouped, from the same helper the footer uses. This listed
                    all seven days one at a time, so the two places on the site
                    that publish opening hours disagreed about how to present
                    them — and five identical Monday-to-Friday rows is four rows
                    of nothing a visitor needs to read.
                  */}
                  <DetailRow icon={Clock} label="Opening hours">
                    {/*
                      A CONTAINER query, not a viewport one. Whether the day and
                      its hours fit side by side depends on this card's width —
                      and the card is narrower than the footer's column at the
                      same viewport, because it also carries an icon rail and
                      card padding. Keyed to the viewport, the two would flip at
                      different useful widths and one of them would always be
                      wrong. 17rem is the measured threshold: "Monday – Friday"
                      (~110px) plus the gap plus "10:00 AM – 7:00 PM" (~135px).
                    */}
                    <div className="@container min-w-0">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-[0.9rem] @[17rem]:grid-cols-[auto_1fr]">
                        {groupedHours().map((group) => (
                          <Fragment key={group.days}>
                            <dt className="text-ink">{group.days}</dt>
                            <dd
                              className={cn(
                                'tabular-nums text-ink-muted',
                                group.closed && 'text-ink-muted/80',
                                'pl-3 @[17rem]:pl-0',
                              )}
                            >
                              {group.label}
                            </dd>
                          </Fragment>
                        ))}
                      </dl>
                    </div>
                  </DetailRow>

                  {/* Phone + email */}
                  <DetailRow icon={Phone} label="Direct lines">
                    <a
                      href={call.href}
                      className="block text-[0.95rem] tabular-nums text-ink transition-colors duration-300 hover:text-accent-strong"
                    >
                      {t(siteConfig.contact.phone)}
                    </a>
                    {isFilled(siteConfig.contact.phoneAlt) && (
                      <span className="mt-1.5 block text-[0.95rem] tabular-nums text-ink-muted">
                        {t(siteConfig.contact.phoneAlt)}
                      </span>
                    )}
                    <a
                      href={mail.href}
                      className="mt-3 block break-all text-[0.9rem] text-ink-muted transition-colors duration-300 hover:text-accent-strong"
                    >
                      {t(siteConfig.contact.email)}
                    </a>
                  </DetailRow>

                  {/* Social */}
                  {socials.length > 0 && (
                    <DetailRow icon={Instagram} label="Follow our work">
                      <ul className="flex flex-wrap gap-2.5">
                        {socials.map((social) => {
                          const Icon = SOCIAL_ICONS[social.platform] ?? Star;
                          const pending = !isFilled(social.url);
                          return (
                            <li key={social.platform}>
                              <a
                                href={pending ? '/contact' : social.url}
                                target={pending ? undefined : '_blank'}
                                rel={pending ? undefined : 'noopener noreferrer'}
                                aria-label={`${t(siteConfig.business.name)} on ${social.label}`}
                                className="grid size-11 place-items-center rounded-(--radius-brand) border border-border text-ink-muted transition-all duration-500 ease-luxe hover:-translate-y-0.5 hover:border-accent hover:bg-accent-button hover:text-accent-contrast"
                              >
                                <Icon className="size-4" strokeWidth={1.5} />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </DetailRow>
                  )}
                </div>
              </Reveal>

              {/* Review prompt */}
              {isFilled(siteConfig.location.reviewLink) && (
                <Reveal preset="up" delay={0.2}>
                  <a
                    href={review.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 flex items-center justify-between gap-4 rounded-(--radius-brand) border border-border bg-surface p-6 transition-all duration-500 ease-luxe hover:border-accent/40"
                  >
                    <div>
                      <span aria-hidden="true" className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="size-3.5 fill-accent text-accent-strong" />
                        ))}
                      </span>
                      <p className="mt-2.5 text-[0.9rem] text-ink">
                        {t('{{GOOGLE_RATING}} from {{REVIEW_COUNT}} reviews on Google')}
                      </p>
                    </div>
                    <ExternalLink
                      className="size-4 shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-accent-strong"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ================= Map ================= */}
      {siteConfig.features.mapEmbed && <MapSection />}

      <FaqSection tone="canvas" showContactPanel={false} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

/** One of the three quick-contact cards at the top of the page. */
function QuickCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
  secondary,
  highlight = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  action: { label: string; href: string; external?: boolean; icon?: LucideIcon };
  secondary?: { label: string; icon: LucideIcon; onClick: () => void };
  highlight?: boolean;
}) {
  const SecondaryIcon = secondary?.icon;

  return (
    <RevealItem
      as="article"
      className={cn(
        'group flex flex-col items-center rounded-(--radius-brand) border p-8 text-center backdrop-blur-[2px] md:p-10',
        'transition-all duration-500 ease-luxe',
        'hover:-translate-y-1.5 hover:shadow-lift',
        highlight
          ? 'border-accent/35 bg-accent/8 hover:border-accent'
          : 'border-border/80 bg-surface/78 hover:border-accent/35 hover:bg-surface',
      )}
    >
      <IconChip
        icon={Icon}
        size="lg"
        className="group-hover:bg-accent-button group-hover:text-accent-contrast"
      />

      <span className="mt-7 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
        {eyebrow}
      </span>

      <h2 className="token-safe mt-3 font-display text-2xl leading-snug text-ink">{title}</h2>

      <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-ink-muted">{t(description)}</p>

      <div className="mt-8 flex w-full flex-col items-center gap-3">
        <Button asChild size="md" variant={highlight ? 'primary' : 'outline'} block>
          <a
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
          >
            {action.label}
            {action.icon && <action.icon className="size-4" strokeWidth={1.7} />}
          </a>
        </Button>

        {secondary && SecondaryIcon && (
          <button
            type="button"
            onClick={secondary.onClick}
            className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 hover:text-accent-strong"
          >
            <SecondaryIcon className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            {secondary.label}
          </button>
        )}
      </div>
    </RevealItem>
  );
}

/** A labelled row inside the studio-details panel. */
function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5 p-7">
      <IconChip icon={Icon} size="sm" strokeWidth={1.5} />
      <div className="flex-1">
        <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

/**
 * The Google Maps embed.
 *
 * Loaded with `loading="lazy"` so a third-party iframe never blocks the page's
 * own interactivity — an embedded map is one of the heaviest things a small
 * business site loads. When the embed URL is still a placeholder, an on-brand
 * panel is shown in its place rather than an empty grey rectangle.
 */
function MapSection() {
  const hasEmbed = isFilled(siteConfig.location.mapEmbedUrl);
  const map = mapLink();

  return (
    <Section tone="surface" spacing="none" container="full" className="relative">
      <div className="relative h-[420px] w-full overflow-hidden bg-surface-muted md:h-[520px]">
        {hasEmbed ? (
          <iframe
            src={siteConfig.location.mapEmbedUrl}
            title={`Map showing the location of ${t(siteConfig.business.name)}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0 grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
            <IconChip icon={MapPin} size="lg" tone="outline" strokeWidth={1.3} />
            <p className="max-w-md text-ink-muted">
              {t(
                'Add your Google Maps embed URL to `location.mapEmbedUrl` in site.config.ts to display the studio location here.',
              )}
            </p>
            <p className="font-display text-lg text-ink">{t(formattedAddress())}</p>
          </div>
        )}

        {/* Floating address card over the map */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-8">
          <div className="pointer-events-auto mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-(--radius-brand) border border-border bg-surface/95 p-6 text-center shadow-lift backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-lg text-ink">
                {t('{{BUSINESS_NAME}} — {{CITY}} Studio')}
              </h2>
              <p className="mt-1.5 text-[0.86rem] text-ink-muted">{t(formattedAddress())}</p>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <a
                href={map.href}
                target={map.external ? '_blank' : undefined}
                rel={map.external ? 'noopener noreferrer' : undefined}
              >
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
