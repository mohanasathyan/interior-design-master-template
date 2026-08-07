/**
 * ============================================================================
 * ROUTE REGISTRY
 * ============================================================================
 * Every internal URL the site can link to, declared once.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS SEPARATE FROM `site.config.ts`
 * ---------------------------------------------------------------------------
 * `site.config.ts` is the file a client edits. Routes are NOT client data —
 * they are application structure, wired to the `<Route>` definitions in
 * `App.tsx`. A client who "helpfully" renamed `/contact` in the config would
 * silently break every call to action on the site, because the route element
 * would no longer be mounted at the path the links point to.
 *
 * So routes live here: one place, imported by the router, the navigation data,
 * the SEO metadata, the analytics classifier and every component that links.
 * Rename a path here and the router, the links, the breadcrumbs, the sitemap
 * and the conversion tracking all follow together.
 *
 * ---------------------------------------------------------------------------
 * ADDING A ROUTE
 * ---------------------------------------------------------------------------
 *  1. Add it here.
 *  2. Mount it in `App.tsx` with `path={routes.yourRoute}`.
 *  3. If it is a light-background page, add it to `primaryNav` or `legalNav` in
 *     `src/data/navigation.ts` — `hasDarkHero()` treats anything it does not
 *     recognise as the dark-hero 404 and would render white nav links on cream.
 *  4. Add a `seo.pages` entry so it reaches the generated sitemap.
 * ============================================================================
 */

/** Application routes. Values are absolute paths, always with a leading slash. */
export const routes = {
  home: '/',
  services: '/services',
  projects: '/projects',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  /** Canonical path for the 404 view. Not mounted — the catch-all renders it. */
  notFound: '/404',
} as const;

export type RouteKey = keyof typeof routes;
export type RoutePath = (typeof routes)[RouteKey];

/**
 * Static files emitted by the build, not React routes.
 *
 * These must be linked with a plain `<a>`, never a router `<Link>` — the
 * router would try to resolve them client-side and land on the 404 view
 * instead of letting the server return the file.
 */
export const staticFiles = {
  sitemap: '/sitemap.xml',
  robots: '/robots.txt',
} as const;

/** Deep link to one service on the services page, e.g. `/services#modular-kitchen`. */
export function serviceAnchor(slug: string): string {
  return `${routes.services}#${slug}`;
}

/** Deep link to a section of the home page, e.g. `/#faqs`. */
export function homeAnchor(sectionId: string): string {
  return `${routes.home}#${sectionId}`;
}

/** Deep link to a section of the about page, e.g. `/about#how-we-work`. */
export function aboutAnchor(sectionId: string): string {
  return `${routes.about}#${sectionId}`;
}

/**
 * True when `href` targets `route`, allowing for a query string or a hash.
 *
 * Used by the analytics click classifier, which has to recognise a lead-
 * generation CTA from its destination — including the ones that carry router
 * state, a `?utm_…` tail or a section anchor.
 */
export function isRoute(href: string, route: RoutePath): boolean {
  return href === route || href.startsWith(`${route}?`) || href.startsWith(`${route}#`);
}
