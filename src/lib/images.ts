/**
 * ============================================================================
 * IMAGE SOURCES
 * ============================================================================
 * One place that decides how image URLs are built, so photography can be
 * swapped per client without touching a single component.
 *
 * Three kinds of `src` are supported anywhere in the config or data files:
 *
 *   photo('photo-1680503397667-3877494708a1')   → CDN photo, auto-responsive
 *   '/images/hero.jpg'                          → self-hosted, served as-is
 *   '{{HERO_IMAGE}}'                            → unfilled, renders placeholder art
 *
 * The default photography ships from the Unsplash CDN. That buys three things
 * a local file cannot: automatic AVIF/WebP negotiation via `auto=format`,
 * on-the-fly resizing (so `<Img>` can emit a real `srcset` rather than sending
 * a 2400px file to a phone), and a global edge cache — with no image bytes in
 * the repository, which keeps cloning fast.
 *
 * ---------------------------------------------------------------------------
 * LICENSING — read before going live
 * ---------------------------------------------------------------------------
 * Unsplash photographs are free for commercial use with no attribution
 * required. They are, however, STOCK. The demo set exists so the template can
 * be presented before a client has supplied anything.
 *
 * The PROJECT images especially must be replaced with the client's own
 * completed work before launch — presenting someone else's interiors as your
 * portfolio is misrepresentation, whatever the licence allows.
 *
 * To self-host instead: drop files into `public/images/` and change the `src`
 * to `/images/your-file.jpg`. Everything else keeps working; `<Img>` simply
 * stops emitting a `srcset` and uses the file as given.
 * ============================================================================
 */

/** Origin of the responsive image CDN. Change this to move providers. */
export const IMAGE_CDN_ORIGIN = 'https://images.unsplash.com';

/** Widths offered in `srcset`. Chosen to cover phone → 2× desktop. */
export const SRCSET_WIDTHS = [480, 768, 1024, 1440, 1920, 2400] as const;

/** Compression level. 72–78 is the sweet spot for photography of interiors. */
const DEFAULT_QUALITY = 74;

/**
 * Build a CDN image reference from a photo id.
 *
 * @example photo('photo-1680503397667-3877494708a1')
 */
export function photo(id: string): string {
  return `${IMAGE_CDN_ORIGIN}/${id}`;
}

/** True when the CDN can resize this source, i.e. a `srcset` is worth emitting. */
export function isResponsiveSource(src: string): boolean {
  return src.startsWith(IMAGE_CDN_ORIGIN);
}

/**
 * Append sizing/format parameters to a CDN source.
 * Non-CDN sources (local files, other hosts) are returned untouched.
 */
export function withWidth(src: string, width: number, quality = DEFAULT_QUALITY): string {
  if (!isResponsiveSource(src)) return src;
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}auto=format&fit=crop&q=${quality}&w=${width}`;
}

/**
 * Rewrite `/images/hero.jpg` → `/images/hero-1280.jpg` for a self-hosted
 * responsive variant, optionally swapping the extension for another format:
 * `localVariant('/images/hero.jpg', 1280, 'avif')` → `/images/hero-1280.avif`.
 * The query string and hash, if any, are preserved.
 */
export function localVariant(src: string, width: number, format?: string): string {
  const [pathPart, ...rest] = src.split(/(?=[?#])/);
  const dot = pathPart.lastIndexOf('.');
  if (dot <= pathPart.lastIndexOf('/')) return src; // no extension — leave alone
  const extension = format ? `.${format}` : pathPart.slice(dot);
  return `${pathPart.slice(0, dot)}-${width}${extension}${rest.join('')}`;
}

/**
 * A `srcset` for one self-hosted format, e.g. every AVIF variant. Returns
 * `undefined` when there is nothing honest to offer.
 */
export function formatSrcSet(
  src: string,
  widths: number[] | undefined,
  format: string,
): string | undefined {
  if (!widths?.length || isResponsiveSource(src)) return undefined;
  return [...widths]
    .sort((a, b) => a - b)
    .map((width) => `${localVariant(src, width, format)} ${width}w`)
    .join(', ');
}

/** MIME type for a `<source type="…">`, so the browser can skip what it cannot decode. */
export function mimeForFormat(format: string): string {
  return `image/${format === 'jpg' ? 'jpeg' : format}`;
}

/**
 * Build a `srcset`, capped at the image's intrinsic width so the browser is
 * never offered an upscale.
 *
 * Two paths, because the two source kinds resize differently:
 *  • CDN sources are resized by URL parameter, so any width is available.
 *  • Self-hosted files can only offer the widths that were actually exported,
 *    which is what `widths` declares. Without it there is nothing honest to
 *    put in a `srcset`, so `undefined` is returned and the single file is used.
 */
export function buildSrcSet(
  src: string,
  intrinsicWidth?: number,
  options: { quality?: number; widths?: number[] } = {},
): string | undefined {
  const { quality, widths: localWidths } = options;

  if (!isResponsiveSource(src)) {
    if (!localWidths?.length) return undefined;
    return [...localWidths]
      .sort((a, b) => a - b)
      .map((width) => `${localVariant(src, width)} ${width}w`)
      .join(', ');
  }

  const max = intrinsicWidth ?? SRCSET_WIDTHS[SRCSET_WIDTHS.length - 1];
  const widths = SRCSET_WIDTHS.filter((width) => width <= max);

  /* Always offer at least one candidate, even for small intrinsic sizes. */
  if (widths.length === 0) widths.push(SRCSET_WIDTHS[0]);

  return widths.map((width) => `${withWidth(src, width, quality)} ${width}w`).join(', ');
}

/**
 * A 1200×630 crop for Open Graph / Twitter share cards.
 * Social scrapers do not run JavaScript and ignore `srcset`, so they need one
 * fixed, correctly-proportioned URL.
 */
export function socialCrop(src: string, quality = 78): string | undefined {
  if (!isResponsiveSource(src)) return undefined;
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}auto=format&fit=crop&w=1200&h=630&q=${quality}`;
}

/**
 * The single URL used for `src` (the fallback for browsers ignoring `srcset`)
 * and for the LCP `<link rel="preload">`.
 */
export function primarySource(
  src: string,
  intrinsicWidth?: number,
  options: { quality?: number; widths?: number[] } = {},
): string {
  /*
   * For a self-hosted file the plain `src` IS the fallback — the file at that
   * exact path should be a mid-size export, not the full-resolution master.
   * Returning the largest variant instead would hand a 3840px, 1.5 MB file to
   * the one class of client that cannot cope with it: whatever ignored the
   * `srcset` in the first place.
   */
  if (!isResponsiveSource(src)) return src;
  const target = Math.min(intrinsicWidth ?? 1440, 1440);
  return withWidth(src, target, options.quality);
}

/**
 * The `sizes` value for a FULL-BLEED image laid out with `object-fit: cover`.
 *
 * `sizes="100vw"` is wrong for these, and wrong in a way that only shows up on
 * phones. `cover` scales the image until it fills BOTH axes, so on a viewport
 * taller than the image's own ratio it scales by HEIGHT — and the image is
 * then laid out far wider than the screen, with the overflow cropped away.
 *
 * On a 390×844 phone with a 16:9 image that is 844 × 1.776 = 1499 CSS px of
 * laid-out width. `100vw` claims 390px, so the browser picks a small candidate
 * and stretches it across 1499px — a 2.3× upscale at 2× DPR, 3.5× at 3×. The
 * result looks soft on exactly the devices where people notice most, while
 * desktop (where the viewport ratio is close to the image's) looks perfect and
 * hides the problem.
 *
 * Expressed as a media condition so the browser evaluates it per viewport:
 *
 *   (max-aspect-ratio: W/H) <ratio*100>vh, 100vw
 *
 * Taller than the image → the laid-out width is `ratio × 100vh`. Wider → cover
 * scales by width and plain `100vw` is correct again. A browser that cannot
 * parse the condition falls through to `100vw`, i.e. today's behaviour.
 *
 * Pass the image's intrinsic dimensions so this tracks the file rather than a
 * hard-coded ratio — swap the hero for a 3:2 photograph and it follows.
 */
export function coverSizes(width?: number, height?: number): string {
  if (!width || !height) return '100vw';
  /* Rounded UP: over-requesting by a pixel costs nothing, under-requesting is
     the whole bug this function exists to fix. */
  const vh = Math.ceil((width / height) * 100);
  return `(max-aspect-ratio: ${width}/${height}) ${vh}vh, 100vw`;
}
