import { siteConfig } from '@/config/site.config';

/**
 * ============================================================================
 * PLACEHOLDER ART ENGINE
 * ============================================================================
 * Generates an elegant, on-brand SVG for any image whose `src` is still a
 * `{{TOKEN}}`. This is what lets the template be demoed to a prospect on day
 * one, with zero photography, without a single broken image icon.
 *
 * The art is deterministic: the same token always produces the same motif, so
 * a page looks intentionally composed rather than randomly generated, and the
 * layout does not flicker between renders.
 *
 * Everything is drawn with the live brand palette, so re-theming the site also
 * re-themes the placeholders.
 * ============================================================================
 */

/** Cheap, stable string hash — used to pick a motif per image. */
function hash(input: string): number {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value << 5) - value + input.charCodeAt(i);
    value |= 0; // force 32-bit
  }
  return Math.abs(value);
}

/** Escape the few characters that are unsafe inside SVG text nodes. */
function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Four architectural line motifs, each evoking an interior detail:
 *  0 — arched window / alcove
 *  1 — stacked horizon planes (a room in section)
 *  2 — pendant lights over a surface
 *  3 — nested rectangles (framed composition)
 */
function motif(index: number, w: number, h: number, accent: string, ink: string): string {
  const cx = w / 2;
  const cy = h / 2;
  const unit = Math.min(w, h);
  const s = unit * 0.26;
  const stroke = `stroke="${ink}" fill="none" stroke-width="${Math.max(1, unit * 0.003)}"`;
  const strokeAccent = `stroke="${accent}" fill="none" stroke-width="${Math.max(1, unit * 0.004)}"`;

  switch (index % 4) {
    case 0:
      return `
        <path d="M ${cx - s} ${cy + s * 1.15} L ${cx - s} ${cy - s * 0.1} A ${s} ${s} 0 0 1 ${cx + s} ${cy - s * 0.1} L ${cx + s} ${cy + s * 1.15}" ${stroke} stroke-linecap="round" />
        <line x1="${cx}" y1="${cy - s * 1.1}" x2="${cx}" y2="${cy + s * 1.15}" ${stroke} opacity="0.5" />
        <line x1="${cx - s}" y1="${cy + s * 0.35}" x2="${cx + s}" y2="${cy + s * 0.35}" ${stroke} opacity="0.5" />
        <line x1="${cx - s * 1.5}" y1="${cy + s * 1.15}" x2="${cx + s * 1.5}" y2="${cy + s * 1.15}" ${strokeAccent} stroke-linecap="round" />`;
    case 1:
      return `
        <line x1="${cx - s * 1.5}" y1="${cy + s * 0.9}" x2="${cx + s * 1.5}" y2="${cy + s * 0.9}" ${strokeAccent} stroke-linecap="round" />
        <rect x="${cx - s * 1.15}" y="${cy - s * 0.25}" width="${s * 2.3}" height="${s * 1.15}" ${stroke} />
        <line x1="${cx - s * 0.75}" y1="${cy - s * 1.05}" x2="${cx - s * 0.75}" y2="${cy - s * 0.25}" ${stroke} opacity="0.55" />
        <line x1="${cx + s * 0.75}" y1="${cy - s * 1.05}" x2="${cx + s * 0.75}" y2="${cy - s * 0.25}" ${stroke} opacity="0.55" />
        <line x1="${cx - s * 1.15}" y1="${cy - s * 1.05}" x2="${cx + s * 1.15}" y2="${cy - s * 1.05}" ${stroke} opacity="0.55" />`;
    case 2:
      return `
        <line x1="${cx - s * 0.8}" y1="${cy - s * 1.2}" x2="${cx - s * 0.8}" y2="${cy - s * 0.4}" ${stroke} opacity="0.6" />
        <line x1="${cx}" y1="${cy - s * 1.2}" x2="${cx}" y2="${cy - s * 0.15}" ${stroke} opacity="0.6" />
        <line x1="${cx + s * 0.8}" y1="${cy - s * 1.2}" x2="${cx + s * 0.8}" y2="${cy - s * 0.4}" ${stroke} opacity="0.6" />
        <circle cx="${cx - s * 0.8}" cy="${cy - s * 0.26}" r="${s * 0.16}" ${strokeAccent} />
        <circle cx="${cx}" cy="${cy - s * 0.01}" r="${s * 0.16}" ${strokeAccent} />
        <circle cx="${cx + s * 0.8}" cy="${cy - s * 0.26}" r="${s * 0.16}" ${strokeAccent} />
        <line x1="${cx - s * 1.5}" y1="${cy + s * 0.85}" x2="${cx + s * 1.5}" y2="${cy + s * 0.85}" ${stroke} stroke-linecap="round" />`;
    default:
      return `
        <rect x="${cx - s * 1.25}" y="${cy - s * 0.95}" width="${s * 2.5}" height="${s * 1.9}" ${stroke} />
        <rect x="${cx - s * 0.8}" y="${cy - s * 0.58}" width="${s * 1.6}" height="${s * 1.16}" ${stroke} opacity="0.5" />
        <circle cx="${cx}" cy="${cy}" r="${s * 0.42}" ${strokeAccent} />`;
  }
}

export interface PlaceholderOptions {
  /** Stable seed — pass the original `{{TOKEN}}` so art is consistent. */
  seed: string;
  /** Short caption drawn under the motif, e.g. "Hero". */
  label?: string;
  /** Intrinsic width of the generated SVG. */
  width?: number;
  /** Intrinsic height of the generated SVG. */
  height?: number;
  /** Renders a darker, photographic-feeling variant for hero/CTA backdrops. */
  tone?: 'light' | 'dark';
}

/**
 * Build a `data:` URI containing the placeholder artwork.
 * Inlined as a data URI so it costs zero network requests and cannot 404.
 */
export function placeholderImage({
  seed,
  label,
  width = 1200,
  height = 900,
  tone = 'light',
}: PlaceholderOptions): string {
  const { colors } = siteConfig.theme;
  const seedValue = hash(seed || label || 'image');

  const isDark = tone === 'dark';
  const from = isDark ? colors.contrast : colors.surfaceMuted;
  const to = isDark ? colors.ink : colors.canvas;
  const ink = isDark ? colors.contrastInk : colors.inkMuted;
  const accent = colors.accent;
  const unit = Math.min(width, height);

  const token = seed.replace(/[{}]/g, '');
  const caption = escapeXml((label ?? 'Image').toUpperCase());
  const tokenLabel = escapeXml(token);
  const monogram = escapeXml(siteConfig.brand.monogram.replace(/[{}]/g, '').slice(0, 2) || '—');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)" />
  <rect width="${width}" height="${height}" fill="url(#v)" />
  <rect x="${unit * 0.035}" y="${unit * 0.035}" width="${width - unit * 0.07}" height="${height - unit * 0.07}" fill="none" stroke="${accent}" stroke-opacity="0.28" stroke-width="1" />
  ${motif(seedValue, width, height, accent, ink)}
  <text x="${width / 2}" y="${height / 2 + unit * 0.34}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${unit * 0.052}" letter-spacing="${unit * 0.012}" fill="${ink}" fill-opacity="0.85">${caption}</text>
  <text x="${width / 2}" y="${height / 2 + unit * 0.41}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${unit * 0.026}" letter-spacing="${unit * 0.006}" fill="${ink}" fill-opacity="0.45">${tokenLabel}</text>
  <text x="${unit * 0.085}" y="${unit * 0.115}" font-family="Georgia, 'Times New Roman', serif" font-size="${unit * 0.045}" fill="${accent}" fill-opacity="0.7">${monogram}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`;
}

/**
 * A 1-pixel warm blur-up placeholder used as the `background-image` behind
 * real photography while it decodes — prevents a flash of empty box.
 */
export function shimmerBackground(): string {
  const { colors } = siteConfig.theme;
  return `linear-gradient(110deg, ${colors.surfaceMuted} 8%, ${colors.canvas} 18%, ${colors.surfaceMuted} 33%)`;
}
