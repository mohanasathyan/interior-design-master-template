import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
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
import { footerCompanyLinks, footerServiceLinks } from '@/data/navigation';
import { formattedAddress, groupedHours, mailLink, mapLink, reviewLink, socialLinks, telLink, whatsappLink } from '@/lib/links';
import { isFilled, t } from '@/lib/tokens';
import { cn } from '@/lib/utils';
import { Container } from '@/components/common/Section';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

/**
 * ============================================================================
 * FOOTER
 * ============================================================================
 * The footer is doing real commercial work here, not just closing the page:
 *
 *  • It repeats every contact channel, because a meaningful share of visitors
 *    scroll straight to the bottom looking for a phone number.
 *  • It carries NAP (name, address, phone) consistently, which is a direct
 *    local-SEO ranking input.
 *  • It links deep into the services page, distributing internal link equity.
 *  • It lists service areas — the cheapest, most durable local-SEO surface on
 *    any service business website.
 * ============================================================================
 */

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: Star,
  x: Star,
};

/* `groupedHours` now lives in `@/lib/links` so the footer and the contact page
   render opening hours from one implementation in one format. */

export function Footer() {
  const call = telLink();
  const mail = mailLink();
  const whatsapp = whatsappLink();
  const map = mapLink();
  const review = reviewLink();
  const socials = socialLinks();
  const hours = groupedHours();
  const year = new Date().getFullYear();
  const areas = siteConfig.location.serviceAreas.filter(isFilled);

  return (
    <footer className="relative bg-contrast text-contrast-ink no-print">
      {/* Hairline accent that ties the footer back to the brand colour. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-accent/50 to-transparent"
      />

      <Container>
        {/* ================= Top: identity + link columns ================= */}
        <div className="grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
          {/* ---- Identity ---- */}
          <div className="lg:col-span-4">
            <Logo tone="light" />

            <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-contrast-ink/62">
              {t(siteConfig.business.description)}
            </p>

            {socials.length > 0 && (
              <div className="mt-8">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-contrast-ink/60">
                  Follow our work
                </span>
                <ul className="mt-4 flex flex-wrap items-center gap-3">
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
                          className={cn(
                            'grid size-11 place-items-center rounded-(--radius-brand)',
                            'border border-white/12 text-contrast-ink/70',
                            'transition-all duration-500 ease-luxe',
                            'hover:-translate-y-0.5 hover:border-accent hover:bg-accent-button hover:text-white',
                          )}
                        >
                          <Icon className="size-[1.05rem]" strokeWidth={1.5} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {isFilled(siteConfig.location.reviewLink) && (
              <a
                href={review.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 text-sm text-contrast-ink/70 transition-colors duration-300 hover:text-accent"
              >
                <span aria-hidden="true" className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3.5 fill-accent text-accent" />
                  ))}
                </span>
                <span className="link-underline">Read our Google reviews</span>
              </a>
            )}
          </div>

          {/* ---- Services ---- */}
          <nav aria-label="Services" className="min-w-0 lg:col-span-2">
            <h2 className="font-body text-[0.62rem] font-medium uppercase tracking-[0.22em] text-accent">
              Services
            </h2>
            {/*
              All thirteen services, so every service page has an internal link
              pointing at it from every page on the site.

              The column count follows the space available rather than staying
              fixed. Below `lg` the whole footer collapses to ONE full-width
              stack, so thirteen items in a single file would run to roughly
              470px of nothing but links — a wall a thumb has to scroll past.
              Two columns on a phone and three on a tablet use width that is
              already there and cut that to a third. From `lg` the footer becomes
              the twelve-column grid and this nav is a ~170px track, which fits
              exactly one label, so it returns to a single column.
            */}
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3 lg:grid-cols-1">
              {footerServiceLinks.map((item) => (
                <li key={item.href} className="min-w-0">
                  <Link
                    to={item.href}
                    className="link-underline text-[0.9rem] text-contrast-ink/62 transition-colors duration-300 hover:text-contrast-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Studio ---- */}
          <nav aria-label="Studio" className="min-w-0 lg:col-span-2">
            <h2 className="font-body text-[0.62rem] font-medium uppercase tracking-[0.22em] text-accent">
              Studio
            </h2>
            {/* Two columns on a tablet only: these labels are long enough
                ("Frequently Asked Questions") that a phone-width pair would
                wrap every one of them. */}
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1">
              {footerCompanyLinks.map((item) => (
                <li key={item.href} className="min-w-0">
                  <Link
                    to={item.href}
                    className="link-underline text-[0.9rem] text-contrast-ink/62 transition-colors duration-300 hover:text-contrast-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div className="lg:col-span-4">
            <h2 className="font-body text-[0.62rem] font-medium uppercase tracking-[0.22em] text-accent">
              Visit or call us
            </h2>

            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <a
                  href={map.href}
                  target={map.external ? '_blank' : undefined}
                  rel={map.external ? 'noopener noreferrer' : undefined}
                  className="text-[0.92rem] leading-relaxed text-contrast-ink/62 transition-colors duration-300 hover:text-contrast-ink"
                >
                  {t(formattedAddress())}
                </a>
              </li>

              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <div className="flex flex-col gap-1">
                  <a
                    href={call.href}
                    className="text-[0.92rem] tabular-nums text-contrast-ink/62 transition-colors duration-300 hover:text-contrast-ink"
                  >
                    {t(siteConfig.contact.phone)}
                  </a>
                  {isFilled(siteConfig.contact.phoneAlt) && (
                    <span className="text-[0.92rem] tabular-nums text-contrast-ink/60">
                      {t(siteConfig.contact.phoneAlt)}
                    </span>
                  )}
                </div>
              </li>

              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                <a
                  href={mail.href}
                  className="text-[0.92rem] break-all text-contrast-ink/62 transition-colors duration-300 hover:text-contrast-ink"
                >
                  {t(siteConfig.contact.email)}
                </a>
              </li>

              <li className="flex gap-3.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                {/*
                  ONE grid for all three rows, with `dt`/`dd` as direct children
                  rather than a wrapper div per row. That is what makes the
                  times line up: the `auto` column resolves to the widest day
                  name across every row, so the second column starts at the same
                  x on all of them — without hard-coding a width that would
                  either waste space or force a wrap at 320px.
                */}
                {/*
                  `flex-1` is load-bearing. `container-type: inline-size` also
                  applies inline-size containment, so the box can no longer be
                  sized BY its contents — as a plain flex item it collapsed to
                  almost nothing, the `@[17rem]` query never matched, and the
                  hours stacked and wrapped at every width. Claiming the rest of
                  the row gives the container a real width to be queried.
                */}
                <div className="@container min-w-0 flex-1">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[0.92rem] text-contrast-ink/62 @[17rem]:grid-cols-[auto_1fr]">
                    {hours.map((group) => (
                      <Fragment key={group.days}>
                        <dt className="@[17rem]:font-normal">{group.days}</dt>
                        <dd
                          className={cn(
                            'tabular-nums',
                            group.closed && 'text-contrast-ink/55',
                            /* Stacked: indent the time so it reads as belonging
                               to the day above rather than as a new row. */
                            'pl-3 @[17rem]:pl-0',
                          )}
                        >
                          {group.label}
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="primary">
                <a href={call.href}>
                  <Phone className="size-3.5" strokeWidth={1.7} />
                  {siteConfig.cta.call}
                </a>
              </Button>
              <Button asChild size="sm" variant="light">
                <a
                  href={whatsapp.href}
                  target={whatsapp.external ? '_blank' : undefined}
                  rel={whatsapp.external ? 'noopener noreferrer' : undefined}
                >
                  <MessageCircle className="size-3.5" strokeWidth={1.7} />
                  {siteConfig.cta.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ================= Service areas (local SEO) ================= */}
        {areas.length > 0 && (
          <div className="border-t border-white/8 py-8">
            <h2 className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-contrast-ink/60">
              Interior designers serving
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-contrast-ink/55">
              {areas.map((area, index) => (
                <span key={area}>
                  {t(area)}
                  {index < areas.length - 1 && <span aria-hidden="true"> · </span>}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* ================= Legal bar ================= */}
        <div className="flex flex-col gap-4 border-t border-white/8 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8rem] text-contrast-ink/60">
            © {year} {t(siteConfig.business.legalName)}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.8rem] text-contrast-ink/60">
            <li>
              <Link to="/contact" className="link-underline transition-colors hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link-underline transition-colors hover:text-accent">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/projects" className="link-underline transition-colors hover:text-accent">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
