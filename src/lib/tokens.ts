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
  const { business, contact, location, seo, brand, facts } = siteConfig;

  return {
    BUSINESS_NAME: business.name,
    LEGAL_NAME: business.legalName,
    TAGLINE: business.tagline,
    FOUNDING_YEAR: business.foundingYear,
    MONOGRAM: brand.monogram,
    GOOGLE_RATING: business.rating,
    REVIEW_COUNT: business.reviewCount,

    FOUNDER_NAME: business.founder.name,
    FOUNDER_ROLE: business.founder.role,
    FOUNDER_CREDENTIAL: business.founder.credential,

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

    WARRANTY_YEARS: facts.warrantyYears,
    PRICE_STARTING: facts.priceStarting,
    PRICE_FULL_HOME: facts.priceFullHome,
    TIMELINE_ROOM: facts.timelineRoom,
    TIMELINE_HOME: facts.timelineHome,
    TIMELINE_DESIGN: facts.timelineDesign,

    /** Derived, always available — handy for freshness signals in copy. */
    CURRENT_YEAR: String(new Date().getFullYear()),
    CURRENT_SEASON: currentSeason(),
  };
}

/**
 * Meteorological season for the current month, Northern hemisphere.
 *
 * Derived rather than configured, for the same reason as `CURRENT_YEAR`: a
 * seasonal line in the announcement bar is a freshness signal, and a freshness
 * signal that has to be remembered and updated by hand is one that goes stale.
 *
 * Southern-hemisphere or monsoon-calendar clients should not fight this —
 * `features.announcementText` is ordinary editable copy, so write the season
 * into the sentence directly and drop the token.
 */
function currentSeason(): string {
  const month = new Date().getMonth(); // 0 = January
  if (month <= 1 || month === 11) return 'Winter';
  if (month <= 4) return 'Spring';
  if (month <= 7) return 'Summer';
  return 'Autumn';
}

function getRegistry(): Record<string, string> {
  registry ??= buildRegistry();
  return registry;
}

/**
 * Every token key the registry knows how to resolve.
 *
 * Exported for the build-time validator in `vite.config.ts`, which uses it to
 * prove that no string of copy references a token that can never be filled in.
 * Values are irrelevant here — only the set of keys.
 */
export function tokenKeys(): string[] {
  return Object.keys(getRegistry());
}

/**
 * The substitution itself. Shared by `t` and `tClean` so there is exactly one
 * implementation of "what does this token resolve to".
 */
function interpolate(input: string): string {
  if (!input.includes('{{')) return input;

  const table = getRegistry();

  return input.replace(EMBEDDED_TOKEN, (match, key: string) => {
    const value = table[key];
    // Unknown token, or one that resolves to another placeholder → leave visible.
    if (value === undefined || isPlaceholder(value)) return match;
    return value;
  });
}

/**
 * True only under `vite dev`.
 *
 * ⚠️ `import.meta.env` MUST be written out literally here.
 *
 * Vite resolves it by static TEXT replacement, not at runtime, so assigning it
 * to a local first — `const meta = import.meta; meta.env?.DEV` — leaves nothing
 * for Vite to match. The expression then evaluates to `undefined` in the dev
 * server too, `t()` silently takes its production path, and unfilled tokens
 * stop being visible during review: the exact affordance this function exists
 * to protect, disabled by the check meant to protect it.
 *
 * The `?.` and the `try` are for the other consumer: this module is also
 * imported by `vite.config.ts`, which runs in Node where there is no
 * `import.meta.env` at all. Both degrade to `false`, which is the correct
 * answer in a build context.
 */
function isDevRuntime(): boolean {
  try {
    return import.meta.env?.DEV === true;
  } catch {
    return false;
  }
}

/** Warn once per token per session, so a re-render cannot flood the console. */
const warned = new Set<string>();

function warnUnresolved(source: string): void {
  if (!isDevRuntime()) return;

  for (const [, key] of source.matchAll(EMBEDDED_TOKEN)) {
    if (warned.has(key)) continue;
    warned.add(key);
    console.warn(
      `[tokens] {{${key}}} could not be resolved.\n` +
        `  In development it stays visible so it cannot ship unnoticed.\n` +
        `  In a production build it is stripped, and \`npm run build\` fails if\n` +
        `  the token has no home in site.config.ts at all.\n` +
        `  Fix: fill the matching field in src/config/site.config.ts, or add the\n` +
        `  key to the registry in src/lib/tokens.ts if it is a new one.`,
    );
  }
}

/**
 * Interpolate `{{TOKENS}}` inside a string using the config registry.
 *
 * @example
 *   t('Interiors for {{CITY}} homes') // → 'Interiors for Bengaluru homes'
 *
 * ---------------------------------------------------------------------------
 * WHAT HAPPENS TO A TOKEN THAT DOES NOT RESOLVE
 * ---------------------------------------------------------------------------
 * It depends on where you are, and the difference is the point:
 *
 *   DEVELOPMENT  it stays visible, exactly as before, and logs a one-time
 *                console warning. An unfilled field must be impossible to miss
 *                during a client review — that is the whole reason the token
 *                system renders them rather than hiding them.
 *
 *   PRODUCTION   it is stripped and the surrounding punctuation tidied, via the
 *                same `cleanup` the metadata path has always used. A live site
 *                shows slightly shorter copy instead of `{{FOUNDER_NAME}}`.
 *
 * This is a safety net, not the mechanism. The real guarantee is the build-time
 * validator in `vite.config.ts`, which fails the build when copy references a
 * token that has no home in the config at all — the one class of failure a
 * client can never fix by filling anything in.
 */
export function t(input: string): string {
  if (!input.includes('{{')) return input;

  const output = interpolate(input);
  if (!output.includes('{{')) return output;

  warnUnresolved(output);
  return isDevRuntime() ? output : cleanup(output);
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
  return cleanup(interpolate(input));
}

/**
 * Strip whatever tokens are left and repair the punctuation around the hole.
 *
 * Split out of `tClean` so `t`'s production path can reuse it. It deliberately
 * takes an ALREADY-interpolated string and never calls `t` itself — `t` calls
 * this, so the two would otherwise recurse into each other.
 */
function cleanup(interpolated: string): string {
  let output = interpolated
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
