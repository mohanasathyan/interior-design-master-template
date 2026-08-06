import { siteConfig } from '@/config/site.config';
import { absoluteUrl, socialLinks } from './links';
import { isFilled, tClean } from './tokens';

/**
 * ============================================================================
 * STRUCTURED DATA (JSON-LD)
 * ============================================================================
 * Rich results are one of the highest-leverage SEO wins available to a local
 * service business: star ratings, opening hours, the call button in the SERP
 * and the FAQ dropdowns all come from here.
 *
 * Every builder strips unresolved `{{TOKENS}}` and omits fields that are not
 * yet configured — invalid structured data is worse than none at all, so the
 * template never emits half-filled markup to Google.
 * ============================================================================
 */

type Json = Record<string, unknown>;

/** Remove undefined/empty values so we never emit hollow properties. */
function compact(input: Json): Json {
  const output: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    output[key] = value;
  }
  return output;
}

/** Only pass through values that have actually been configured. */
function filled(value: string): string | undefined {
  return isFilled(value) ? tClean(value) : undefined;
}

/** Stable @id for the business node, referenced by every other node. */
const BUSINESS_ID = `${siteConfig.seo.siteUrl}#business`;

/**
 * LocalBusiness → `InteriorDesign` is a recognised schema.org type and is the
 * most specific match for this vertical.
 */
export function localBusinessSchema(): Json {
  const { business, contact, location, hours } = siteConfig;

  const openingHours = hours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) =>
      compact({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      }),
    );

  const geo =
    isFilled(location.latitude) && isFilled(location.longitude)
      ? {
          '@type': 'GeoCoordinates',
          latitude: location.latitude,
          longitude: location.longitude,
        }
      : undefined;

  /*
   * Emitted only when both a rating and a review count are configured.
   * Google treats invented aggregateRating markup as a manual-action risk, so
   * the template refuses to guess.
   */
  const aggregateRating =
    isFilled(business.rating) && isFilled(business.reviewCount)
      ? {
          '@type': 'AggregateRating',
          ratingValue: business.rating,
          reviewCount: business.reviewCount,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined;

  return compact({
    '@context': 'https://schema.org',
    '@type': ['InteriorDesign', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: filled(business.name),
    legalName: filled(business.legalName),
    description: tClean(business.description),
    slogan: filled(business.tagline),
    url: filled(siteConfig.seo.siteUrl),
    telephone: filled(contact.phoneHref),
    email: filled(contact.email),
    priceRange: business.priceRange,
    foundingDate: filled(business.foundingYear),
    image: filled(siteConfig.seo.ogImage),
    logo: filled(siteConfig.brand.logo.src),
    address: compact({
      '@type': 'PostalAddress',
      streetAddress: [filled(location.addressLine1), filled(location.addressLine2)]
        .filter(Boolean)
        .join(', '),
      addressLocality: filled(location.city),
      addressRegion: filled(location.state),
      postalCode: filled(location.postalCode),
      addressCountry: filled(location.countryCode),
    }),
    geo,
    areaServed: location.serviceAreas
      .filter(isFilled)
      .map((area) => ({ '@type': 'City', name: area })),
    openingHoursSpecification: openingHours,
    aggregateRating,
    sameAs: socialLinks()
      .map((item) => item.url)
      .filter(isFilled),
    hasMap: filled(location.mapLink),
  });
}

/** WebSite node — enables the sitelinks search box and names the publisher. */
export function websiteSchema(): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.seo.siteUrl}#website`,
    url: filled(siteConfig.seo.siteUrl),
    name: filled(siteConfig.business.name),
    description: tClean(siteConfig.seo.defaultDescription),
    publisher: { '@id': BUSINESS_ID },
    inLanguage: siteConfig.seo.locale.replace('_', '-'),
  });
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList — renders the path hierarchy directly in the search result. */
export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tClean(crumb.name),
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQPage — eligible for the expandable FAQ rich result. */
export function faqSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: tClean(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tClean(item.answer),
      },
    })),
  };
}

/** Service nodes for the services page — one per offering. */
export function serviceSchema(items: { title: string; summary: string; slug: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: compact({
        '@type': 'Service',
        name: tClean(item.title),
        description: tClean(item.summary),
        url: absoluteUrl(`/services#${item.slug}`),
        serviceType: tClean(item.title),
        provider: { '@id': BUSINESS_ID },
        areaServed: filled(siteConfig.location.city),
      }),
    })),
  };
}

/** A single page node, tying the route back to the business. */
export function webPageSchema(title: string, description: string, path: string): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tClean(title),
    description: tClean(description),
    url: absoluteUrl(path),
    isPartOf: { '@id': `${siteConfig.seo.siteUrl}#website` },
    about: { '@id': BUSINESS_ID },
    inLanguage: siteConfig.seo.locale.replace('_', '-'),
  });
}
