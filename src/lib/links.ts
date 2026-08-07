import { siteConfig } from '@/config/site.config';
import { routes } from '@/config/routes';
import { isFilled, t } from './tokens';
import { formatTime } from './utils';

/**
 * ============================================================================
 * LINK BUILDERS
 * ============================================================================
 * Every outbound contact link on the site is produced here, so that:
 *  • the tel: / mailto: / wa.me formats are correct in exactly one place, and
 *  • an unfilled placeholder degrades to the contact page instead of shipping
 *    a dead `tel:{{PHONE}}` link that silently loses a lead.
 * ============================================================================
 */

/** Fallback target used whenever a contact channel has not been configured. */
const FALLBACK = routes.contact;

export interface ResolvedLink {
  href: string;
  /** True when the underlying config value is still a placeholder. */
  pending: boolean;
  /** True for links that leave the site and need rel="noopener". */
  external: boolean;
}

/** `tel:` link for the primary phone number. */
export function telLink(): ResolvedLink {
  const raw = siteConfig.contact.phoneHref;
  if (!isFilled(raw)) return { href: FALLBACK, pending: true, external: false };
  return { href: `tel:${raw.replace(/[^\d+]/g, '')}`, pending: false, external: false };
}

/** `mailto:` link with a pre-filled, high-intent subject line. */
export function mailLink(subject?: string): ResolvedLink {
  const raw = siteConfig.contact.email;
  if (!isFilled(raw)) return { href: FALLBACK, pending: true, external: false };
  const line = subject ?? `Interior design enquiry — ${t('{{BUSINESS_NAME}}')}`;
  return {
    href: `mailto:${raw}?subject=${encodeURIComponent(line)}`,
    pending: false,
    external: false,
  };
}

/**
 * WhatsApp deep link with a pre-written message.
 * Pre-filling the message measurably lifts reply rates — the visitor never has
 * to work out what to type.
 */
export function whatsappLink(message?: string): ResolvedLink {
  const raw = siteConfig.contact.whatsapp;
  if (!isFilled(raw)) return { href: FALLBACK, pending: true, external: false };
  const body = t(message ?? siteConfig.contact.whatsappMessage);
  const number = raw.replace(/\D/g, '');
  return {
    href: `https://wa.me/${number}?text=${encodeURIComponent(body)}`,
    pending: false,
    external: true,
  };
}

/** "Get directions" link. */
export function mapLink(): ResolvedLink {
  const raw = siteConfig.location.mapLink;
  if (!isFilled(raw)) return { href: FALLBACK, pending: true, external: false };
  return { href: raw, pending: false, external: true };
}

/** Google review link. */
export function reviewLink(): ResolvedLink {
  const raw = siteConfig.location.reviewLink;
  if (!isFilled(raw)) return { href: FALLBACK, pending: true, external: false };
  return { href: raw, pending: false, external: true };
}

/** Social profile links, with unconfigured platforms filtered out. */
export function socialLinks() {
  return siteConfig.social.filter((item) => item.url.trim().length > 0);
}

/** Absolute URL for a route — used for canonical tags and schema.org. */
export function absoluteUrl(path: string): string {
  const base = siteConfig.seo.siteUrl.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  if (!isFilled(base)) return suffix;
  return `${base}${suffix === '/' ? '/' : suffix}`;
}

/** The single-line postal address, with unfilled parts omitted. */
export function formattedAddress(): string {
  const { addressLine1, addressLine2, city, state, postalCode } = siteConfig.location;
  return [addressLine1, addressLine2, city, state, postalCode]
    .filter((part) => part && part.trim().length > 0)
    .join(', ');
}

export interface HoursGroup {
  /** e.g. "Monday – Friday", or "Saturday" for a single day. */
  days: string;
  /** e.g. "10:00 AM – 7:00 PM", or "Closed". */
  label: string;
  closed: boolean;
}

/**
 * ============================================================================
 * OPENING HOURS, GROUPED
 * ============================================================================
 * Collapses consecutive days that share the same hours, so the seven rows in
 * `siteConfig.hours` present as the three a visitor actually needs:
 *
 *   Monday – Friday   10:00 AM – 7:00 PM
 *   Saturday          10:00 AM – 5:00 PM
 *   Sunday            Closed
 *
 * This lives here rather than inside a component because BOTH the footer and
 * the contact page display opening hours, and they had drifted: the footer
 * grouped them, the contact page listed all seven days one at a time. Two
 * renderings of the same fact is how a site ends up contradicting itself after
 * a client edits the config — so there is now one function and one format.
 *
 * Grouping is positional, not calendar-aware: it merges RUNS of adjacent days
 * in config order. Re-ordering the `hours` array therefore changes the
 * grouping, which is the sane behaviour — a studio that closes on Wednesday
 * gets "Mon – Tue", "Wed", "Thu – Fri" without any special-casing here.
 * ============================================================================
 */
export function groupedHours(): HoursGroup[] {
  const groups: { days: string[]; label: string; closed: boolean }[] = [];

  for (const entry of siteConfig.hours) {
    const closed = !entry.opens || !entry.closes;
    const label = closed ? 'Closed' : `${formatTime(entry.opens!)} – ${formatTime(entry.closes!)}`;

    const last = groups.at(-1);
    if (last && last.label === label) last.days.push(entry.day);
    else groups.push({ days: [entry.day], label, closed });
  }

  return groups.map((group) => ({
    label: group.label,
    closed: group.closed,
    /* Full day names, not abbreviations. "Monday – Friday" is what the studio
       would write on its door, and the column is wide enough to carry it. */
    days:
      group.days.length === 1 ? group.days[0] : `${group.days[0]} – ${group.days.at(-1)!}`,
  }));
}
