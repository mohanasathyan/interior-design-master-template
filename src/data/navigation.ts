/**
 * ============================================================================
 * NAVIGATION
 * ============================================================================
 * The single source of truth for the header, the mobile drawer, the footer and
 * the 404 page's suggested links. Add a route here and it appears everywhere.
 * ============================================================================
 */

import { aboutAnchor, homeAnchor, routes, serviceAnchor } from '@/config/routes';
import { services } from './services';

export interface NavItem {
  label: string;
  href: string;
  /** Short line shown under the label in the mobile drawer. */
  description?: string;
}

/** Primary navigation. Keep to five items — more dilutes every one of them. */
export const primaryNav: NavItem[] = [
  { label: 'Home', href: routes.home, description: 'Studio overview' },
  { label: 'Services', href: routes.services, description: 'What we design and build' },
  { label: 'Projects', href: routes.projects, description: 'Selected work' },
  { label: 'About', href: routes.about, description: 'Our story and process' },
  { label: 'Contact', href: routes.contact, description: 'Book a consultation' },
];

/**
 * Home-page section ids, used for in-page anchors and scroll-spy.
 *
 * Declared ABOVE the footer link lists on purpose: those lists build deep links
 * from these ids, and a `const` referenced before its declaration is a
 * temporal-dead-zone error at module evaluation, not a compile error.
 */
export const homeSections = {
  hero: 'hero',
  stats: 'studio-at-a-glance',
  whyUs: 'why-choose-us',
  services: 'services',
  portfolio: 'featured-projects',
  transformation: 'see-the-transformation',
  process: 'how-we-work',
  philosophy: 'design-philosophy',
  materials: 'materials',
  promise: 'our-promise',
  testimonials: 'testimonials',
  faqs: 'faqs',
  cta: 'start-your-project',
} as const;

/**
 * Shorter wording for the footer's service column, keyed by slug.
 *
 * The column is a narrow track (~170px at every desktop width, because the
 * container is capped), so a full title like "Residential Interior Design"
 * wraps to two lines and the list stops reading as a tidy index. Only the
 * services whose titles are too long need an entry here; anything not listed
 * falls back to its real title.
 *
 * Trimming the trailing "Design" is safe because the column is already headed
 * "Services" — repeating the word thirteen times under that heading is noise,
 * not information.
 */
const FOOTER_SERVICE_LABELS: Record<string, string> = {
  'residential-interior': 'Residential Interior',
  'modular-kitchen': 'Modular Kitchen',
  'bedroom-design': 'Bedroom Design',
  'false-ceiling-design': 'False Ceiling',
  'furniture-design': 'Bespoke Furniture',
  'commercial-interior': 'Commercial Interior',
  'office-interior': 'Office Interior',
};

/**
 * Deep links into the services page, used in the footer for internal linking.
 *
 * DERIVED from `services`, not hand-listed. The previous hand-written list had
 * drifted to seven of the thirteen services — six pages with no internal link
 * pointing at them, which is both a navigation gap and an SEO one. Deriving it
 * means adding a service to `services.ts` puts it in the footer automatically
 * and it can never fall out of step again.
 */
export const footerServiceLinks: NavItem[] = services.map((service) => ({
  label: FOOTER_SERVICE_LABELS[service.slug] ?? service.title,
  href: serviceAnchor(service.slug),
}));

/**
 * Legal routes. Kept separate from `primaryNav` — they belong in the footer's
 * legal bar, not in the header — but they are still real, light-background
 * routes, which is why `hasDarkHero` below has to know about them.
 */
export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: routes.privacy },
  { label: 'Terms of Service', href: routes.terms },
];

/**
 * Secondary footer column.
 *
 * The anchors are BUILT from `homeSections` rather than written out, so a
 * section id and the footer link that targets it can no longer drift apart —
 * renaming `homeSections.faqs` now moves the link with it instead of leaving a
 * hash that silently scrolls nowhere.
 */
export const footerCompanyLinks: NavItem[] = [
  { label: 'About the Studio', href: routes.about },
  { label: 'Our Process', href: aboutAnchor(homeSections.process) },
  { label: 'Design Philosophy', href: homeAnchor(homeSections.philosophy) },
  { label: 'Project Gallery', href: routes.projects },
  { label: 'Frequently Asked Questions', href: homeAnchor(homeSections.faqs) },
  { label: 'Book a Consultation', href: routes.contact },
];

/**
 * Routes whose hero is a dark, full-bleed photograph — the navbar floats over
 * these transparently with white type. Every other route opens on the light
 * canvas and needs the solid navbar from the very first frame.
 *
 * Unknown paths (the 404) also get the transparent treatment, because that page
 * carries a dark hero too.
 */
export const DARK_HERO_ROUTES: string[] = [routes.home];

/**
 * True when the navbar should start transparent on this path.
 *
 * The fallback is "anything unrecognised gets the transparent treatment",
 * because the only unrecognised route is the 404 and that page does have a dark
 * hero. That makes this function a trap for any NEW light-background route:
 * miss it here and the navbar renders white links on cream, invisible until the
 * visitor scrolls. So every light route has to be listed — hence `legalNav`
 * being consulted alongside `primaryNav`.
 */
export function hasDarkHero(pathname: string): boolean {
  if (DARK_HERO_ROUTES.includes(pathname)) return true;
  const known = [...primaryNav, ...legalNav].some((item) => item.href === pathname);
  return !known; // the 404 route
}
