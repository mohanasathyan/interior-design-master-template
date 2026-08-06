import { useEffect } from 'react';
import { siteConfig } from '@/config/site.config';
import { absoluteUrl } from '@/lib/links';
import { isFilled, tClean } from '@/lib/tokens';
import { localBusinessSchema, websiteSchema } from '@/lib/schema';

/**
 * ============================================================================
 * SEO
 * ============================================================================
 * A dependency-free head manager.
 *
 * Why not react-helmet-async? For a five-page marketing site it adds a
 * provider, a context and a peer-dependency risk to do something the DOM does
 * natively in ~60 lines. Fewer dependencies is also fewer things to break when
 * this template is cloned two years from now.
 *
 * Every tag it writes is marked `data-seo="managed"`, so switching routes
 * cleanly replaces the previous page's metadata rather than accumulating it.
 * ============================================================================
 */

const MANAGED = 'data-seo';

/** Create or update a <meta> tag, keyed by `name` or `property`. */
function setMeta(key: 'name' | 'property', value: string, content: string | undefined) {
  const head = document.head;
  const selector = `meta[${key}="${value}"]`;
  let tag = head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    if (tag?.hasAttribute(MANAGED)) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, value);
    tag.setAttribute(MANAGED, 'managed');
    head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/** Create or update the canonical <link>. */
function setCanonical(href: string) {
  const head = document.head;
  let tag = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = 'canonical';
    tag.setAttribute(MANAGED, 'managed');
    head.appendChild(tag);
  }
  tag.href = href;
}

/** Replace every managed JSON-LD block with the supplied graph. */
function setJsonLd(blocks: unknown[]) {
  document
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED}="managed"]`)
    .forEach((node) => node.remove());

  blocks.forEach((block) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED, 'managed');
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  });
}

export interface SeoProps {
  /** Page title, before the site title template is applied. */
  title: string;
  description: string;
  /** Route path, e.g. `/services`. Drives the canonical URL. */
  path: string;
  /** Absolute URL of the share image. Falls back to the global OG image. */
  image?: string;
  /** Additional JSON-LD graphs for this route (breadcrumbs, FAQ, services). */
  schemas?: unknown[];
  /** Set on pages that must not be indexed (404, thank-you). */
  noindex?: boolean;
  /** `article` for blog-style pages; `website` otherwise. */
  type?: 'website' | 'article';
}

export function Seo({
  title,
  description,
  path,
  image,
  schemas = [],
  noindex = false,
  type = 'website',
}: SeoProps) {
  /*
   * Pages build their schema arrays inline, so the array identity changes on
   * every render. Keying the effect on the serialised graph means the head is
   * only rewritten when the structured data actually differs.
   */
  const schemaKey = JSON.stringify(schemas);

  useEffect(() => {
    const { seo, business, location } = siteConfig;

    /*
     * Titles are cleaned of unresolved tokens. A browser tab reading
     * "{{BUSINESS_NAME}} | {{BUSINESS_NAME}}" would undermine the entire demo,
     * so unfilled tokens are stripped rather than displayed here — unlike in
     * body copy, where their visibility is the point.
     */
    const rawTitle = tClean(title);
    const isHome = path === '/';
    const composed = isHome
      ? tClean(seo.defaultTitle) || tClean(business.name)
      : tClean(seo.titleTemplate.replace('%s', rawTitle));

    const finalTitle = composed || rawTitle || 'Interior Design Studio';
    const finalDescription = tClean(description) || tClean(seo.defaultDescription);
    const canonical = absoluteUrl(path);
    const shareImage = image ?? (isFilled(seo.ogImage) ? seo.ogImage : undefined);

    document.title = finalTitle;

    setMeta('name', 'description', finalDescription);
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    );
    setMeta('name', 'author', tClean(business.name) || undefined);
    setMeta(
      'name',
      'geo.placename',
      isFilled(location.city) ? tClean(location.city) : undefined,
    );

    setCanonical(canonical);

    /* ---- Open Graph ---- */
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDescription);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:site_name', tClean(business.name) || undefined);
    setMeta('property', 'og:locale', seo.locale);
    setMeta('property', 'og:image', shareImage);
    setMeta('property', 'og:image:alt', shareImage ? finalTitle : undefined);
    setMeta('property', 'og:image:width', shareImage ? '1200' : undefined);
    setMeta('property', 'og:image:height', shareImage ? '630' : undefined);

    /* ---- Twitter / X ---- */
    setMeta('name', 'twitter:card', shareImage ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDescription);
    setMeta('name', 'twitter:image', shareImage);
    setMeta(
      'name',
      'twitter:site',
      isFilled(seo.twitterHandle) ? seo.twitterHandle : undefined,
    );

    /* ---- Structured data: the two global nodes plus any page-specific ones ---- */
    setJsonLd([localBusinessSchema(), websiteSchema(), ...(JSON.parse(schemaKey) as unknown[])]);
  }, [title, description, path, image, noindex, type, schemaKey]);

  return null;
}
