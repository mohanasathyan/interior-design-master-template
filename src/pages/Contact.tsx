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
import { copyConfig } from '@/config/copy.config';
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
import { format } from '@/lib/copy';
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

const copy = copyConfig.pages.contact;

export default function Contact() {
  const page = siteConfig.seo.pages.contact;
  const call = telLink();
  const whatsapp = whatsappLink();
  const mail = mailLink();
  const map = mapLink();
  const review = reviewLink();
  const socials = socialLinks();
  /* Renamed on destructure: `copy` at module scope is this page's wording. */
  const { copied, copy: copyToClipboard } = useCopyToClipboard();

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
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lead={copy.hero.lead}
        image={siteConfig.media.pageHeaders.contact}
        crumbs={CRUMBS}
      />

      {/* ================= Quick contact cards ================= */}
      <Section tone="canvas" spacing="md" backdrop={siteConfig.media.backdrops.warm}>
        <RevealGroup stagger={0.08} className="grid gap-6 md:grid-cols-3">
          <QuickCard
            icon={Phone}
            eyebrow={copy.cards.call.eyebrow}
            title={t(siteConfig.contact.phone)}
            description={copy.cards.call.description}
            action={{ label: siteConfig.cta.call, href: call.href }}
            secondary={
              isFilled(siteConfig.contact.phone)
                ? {
                    label: copied ? copy.cards.call.copied : copy.cards.call.copyNumber,
                    icon: copied ? Check : Copy,
                    onClick: () => void copyToClipboard(t(siteConfig.contact.phone)),
                  }
                : undefined
            }
          />

          <QuickCard
            icon={MessageCircle}
            eyebrow={copy.cards.whatsapp.eyebrow}
            title={copy.cards.whatsapp.title}
            description={copy.cards.whatsapp.description}
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
            eyebrow={copy.cards.email.eyebrow}
            title={t(siteConfig.contact.email)}
            description={copy.cards.email.description}
            action={{ label: copy.cards.email.action, href: mail.href }}
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
                eyebrow={copy.studio.eyebrow}
                title={copy.studio.title}
                lead={copy.studio.lead}
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
                  <DetailRow icon={MapPin} label={copy.studio.addressLabel}>
                    <p className="text-[0.95rem] leading-relaxed text-ink">
                      {t(formattedAddress())}
                    </p>
                    <a
                      href={map.href}
                      target={map.external ? '_blank' : undefined}
                      rel={map.external ? 'noopener noreferrer' : undefined}
                      className="link-underline mt-3 inline-flex items-center gap-1.5 text-[0.82rem] text-accent-strong"
                    >
                      {copy.studio.directions}
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
                  <DetailRow icon={Clock} label={copy.studio.hoursLabel}>
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
                  <DetailRow icon={Phone} label={copy.studio.linesLabel}>
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
                    <DetailRow icon={Instagram} label={copy.studio.socialLabel}>
                      <ul className="flex flex-wrap gap-2.5">
                        {socials.map((social) => {
                          const Icon = SOCIAL_ICONS[social.platform] ?? Star;
                          const pending = !isFilled(social.url);
                          /* Same resting appearance either way — only the
                             interactive affordances differ. */
                          const shell =
                            'grid size-11 place-items-center rounded-(--radius-brand) border border-border text-ink-muted';

                          /*
                            An unconfigured profile is INERT, exactly as it is in
                            the footer. It used to link to /contact while still
                            announcing itself as "…on Instagram", so a
                            screen-reader user was told where they were going and
                            then taken somewhere else — and the bare <a> threw
                            away the SPA on the way.
                          */
                          if (pending) {
                            return (
                              <li key={social.platform}>
                                <span aria-hidden="true" className={shell}>
                                  <Icon className="size-4" strokeWidth={1.5} />
                                </span>
                              </li>
                            );
                          }

                          return (
                            <li key={social.platform}>
                              <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t(
                                  format(copyConfig.ui.socialProfile, { platform: social.label }),
                                )}
                                className={cn(
                                  shell,
                                  'transition-all duration-500 ease-luxe',
                                  'hover:-translate-y-0.5 hover:border-accent hover:bg-accent-button hover:text-accent-contrast',
                                )}
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
                        {t(copy.studio.reviewSummary)}
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
            title={t(copy.map.frameTitle)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0 grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
            <IconChip icon={MapPin} size="lg" tone="outline" strokeWidth={1.3} />
            <p className="max-w-md text-ink-muted">{copyConfig.developer.mapUnconfigured}</p>
            <p className="font-display text-lg text-ink">{t(formattedAddress())}</p>
          </div>
        )}

        {/* Floating address card over the map */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-8">
          <div className="pointer-events-auto mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-(--radius-brand) border border-border bg-surface/95 p-6 text-center shadow-lift backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-lg text-ink">{t(copy.map.cardTitle)}</h2>
              <p className="mt-1.5 text-[0.86rem] text-ink-muted">{t(formattedAddress())}</p>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <a
                href={map.href}
                target={map.external ? '_blank' : undefined}
                rel={map.external ? 'noopener noreferrer' : undefined}
              >
                {copy.map.directions}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
