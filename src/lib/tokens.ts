// Relative, not the `@/` alias: this module is also imported by vite.config.ts
// (to bake real metadata into index.html at build time), where the alias is
// not available.
import { siteConfig } from '../config/site.config';

/**
 * ============================================================================
 * TOKEN ENGINE
 * ============================================================================
 * Lets marketing copy anywhere in `src/data/` embed live config values:
 *
 *     "Serving {{CITY}} since {{FOUNDING_YEAR}}"
 *
 * …which renders as "Serving Bengaluru since 2011" once the config is filled
 * in, and stays visibly unfilled (rather than silently wrong) while it is not.
 *
 * Two rules make this safe:
 *  1. A token that maps to a real config value is replaced.
 *  2. A token that maps to another *unreplaced* token is left alone, so an
 *     empty config never produces confusing half-substituted sentences.
 * ============================================================================
 */

/** Matches a whole-string placeholder, e.g. `{{HERO_IMAGE}}`. */
const WHOLE_TOKEN = /^\s*\{\{[A-Z0-9_]+\}\}\s*$/;

/** Matches any embedded placeholder within a longer string. */
const EMBEDDED_TOKEN = /\{\{([A-Z0-9_]+)\}\}/g;

/**
 * True when a value is still an unreplaced placeholder.
 * Used to render fallbacks (placeholder art, inert links, hidden sections)
 * rather than shipping broken images and dead anchors.
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return WHOLE_TOKEN.test(value);
}

/** True when a value is a usable, filled-in string. */
export function isFilled(value: string | null | undefined): value is string {
  return !isPlaceholder(value);
}

/**
 * The token registry. Every key here can be used as `{{KEY}}` inside any copy
 * string in `src/data/` or in the config itself.
 *
 * Built lazily and cached so the config object is read exactly once.
 */
let registry: Record<string, string> | null = null;

function buildRegistry(): Record<string, string> {
  const { business, contact, location, seo, brand } = siteConfig;

  return {
    BUSINESS_NAME: business.name,
    LEGAL_NAME: business.legalName,
    TAGLINE: business.tagline,
    FOUNDING_YEAR: business.foundingYear,
    MONOGRAM: brand.monogram,
    GOOGLE_RATING: business.rating,
    REVIEW_COUNT: business.reviewCount,

    PHONE: contact.phone,
    PHONE_ALT: contact.phoneAlt,
    EMAIL: contact.email,
    WHATSAPP: contact.whatsapp,

    CITY: location.city,
    STATE: location.state,
    COUNTRY: location.country,
    ADDRESS_LINE_1: location.addressLine1,
    ADDRESS_LINE_2: location.addressLine2,
    POSTAL_CODE: location.postalCode,

    SITE_URL: seo.siteUrl,

    /** Derived, always available — handy for freshness signals in copy. */
    CURRENT_YEAR: String(new Date().getFullYear()),
  };
}

function getRegistry(): Record<string, string> {
  registry ??= buildRegistry();
  return registry;
}

/**
 * Interpolate `{{TOKENS}}` inside a string using the config registry.
 *
 * @example
 *   t('Interiors for {{CITY}} homes') // → 'Interiors for Bengaluru homes'
 */
export function t(input: string): string {
  if (!input.includes('{{')) return input;

  const table = getRegistry();

  return input.replace(EMBEDDED_TOKEN, (match, key: string) => {
    const value = table[key];
    // Unknown token, or one that resolves to another placeholder → leave visible.
    if (value === undefined || isPlaceholder(value)) return match;
    return value;
  });
}

/** Interpolate every string in an array. */
export function tAll(values: string[]): string[] {
  return values.map(t);
}

/** Separators and prepositions that become meaningless once a token is removed. */
const DANGLING_TAIL = /[\s]*(?:[—–\-|·,:]|\b(?:in|for|from|at|of|by|on|with|and)\b)[\s]*$/i;
const DANGLING_HEAD = /^[\s]*[—–\-|·,:][\s]*/;

/**
 * Interpolate, then strip any tokens that could not be resolved.
 *
 * Use for machine-read values — meta descriptions, titles, schema.org, alt text
 * — where a literal `{{CITY}}` would be embarrassing rather than useful. (In
 * body copy the opposite is true: an unfilled token *should* stay visible so it
 * cannot ship by accident, which is why `t()` leaves it alone.)
 *
 * Removing a token usually orphans the punctuation around it, so the tidy-up
 * afterwards matters as much as the removal itself:
 *
 *   "{{BUSINESS_NAME}} — Luxury Interior Design in {{CITY}}"
 *     → naive strip: "— Luxury Interior Design in"
 *     → this function: "Luxury Interior Design"
 */
export function tClean(input: string): string {
  let output = t(input)
    .replace(EMBEDDED_TOKEN, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/\(\s*\)/g, '')
    .trim();

  /*
   * Removing a token mid-sentence orphans the word that governed it:
   *   "Award-winning design in {{CITY}}. {{BUSINESS_NAME}} delivers turnkey…"
   *     → "Award-winning design in. delivers turnkey…"
   * So dangling prepositions are dropped wherever they now sit against
   * punctuation or the end of the string, not only at the very end.
   */
  output = output
    .replace(/\s+\b(?:in|for|at|of|by|to|with|from|on|and)\b\s*([.,;:!?])/gi, '$1')
    .replace(/([.,;:!?])\s*\1+/g, '$1')
    .replace(/\s{2,}/g, ' ');

  /* Peel off orphaned separators at either end, e.g. "— Luxury Design in". */
  let previous: string;
  do {
    previous = output;
    output = output.replace(DANGLING_HEAD, '').replace(DANGLING_TAIL, '').trim();
  } while (output !== previous && output.length > 0);

  /*
   * Re-capitalise: a stripped token can leave a sentence starting lower-case
   * ("…design. delivers turnkey interiors"). Cheap to fix, and the difference
   * between copy that reads as finished and copy that reads as broken.
   */
  output = output
    .replace(/^([a-z])/, (letter) => letter.toUpperCase())
    .replace(/([.!?]\s+)([a-z])/g, (_, prefix: string, letter: string) => prefix + letter.toUpperCase());

  return output;
}
