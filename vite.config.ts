import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

import { siteConfig } from './src/config/site.config';
import { tClean, isFilled } from './src/lib/tokens';
import {
  IMAGE_CDN_ORIGIN,
  buildSrcSet,
  coverSizes,
  formatSrcSet,
  localVariant,
  mimeForFormat,
  primarySource,
  socialCrop,
} from './src/lib/images';

/**
 * ============================================================================
 * BUILD-TIME SEO
 * ============================================================================
 * This is a single-page app, and social scrapers (WhatsApp, Facebook, X,
 * LinkedIn, Slack) do NOT execute JavaScript. Whatever the runtime <Seo />
 * component writes is therefore invisible to them — they read the static
 * index.html and stop.
 *
 * Shipping `{{BUSINESS_NAME}}` in an og:title would mean every link anyone
 * ever shares previews as raw template tokens. So the metadata is baked into
 * the HTML at build time from exactly the same config object the runtime uses,
 * which keeps the two in sync by construction.
 *
 * The plugin also emits the LCP preload for the hero image, and generates
 * robots.txt and sitemap.xml from the config — removing two manual, easy-to-
 * forget steps from the cloning checklist.
 * ============================================================================
 */

/** HTML-escape a value destined for an attribute. */
function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The absolute origin, or an empty string while `siteUrl` is unset. */
function origin(): string {
  const url = siteConfig.seo.siteUrl.replace(/\/$/, '');
  return isFilled(url) ? url : '';
}

function absolute(pathname: string): string {
  const base = origin();
  return base ? `${base}${pathname}` : pathname;
}

/** The 1200×630 share image, falling back to the hero photograph. */
function shareImage(): string | undefined {
  const configured = siteConfig.seo.ogImage;
  if (isFilled(configured)) {
    return configured.startsWith('http') ? configured : absolute(configured);
  }

  const hero = siteConfig.media.hero.src;
  if (!isFilled(hero)) return undefined;

  const cropped = socialCrop(hero);
  if (cropped) return cropped;
  return hero.startsWith('http') ? hero : absolute(hero);
}

function buildHeadTags(): string {
  const name = tClean(siteConfig.business.name);
  const title = tClean(siteConfig.seo.defaultTitle) || name || 'Interior Design Studio';
  const description = tClean(siteConfig.seo.defaultDescription);
  const image = shareImage();
  const locale = siteConfig.seo.locale;
  const twitter = siteConfig.seo.twitterHandle;

  const lines = [
    '<!-- Generated at build time from src/config/site.config.ts — do not edit by hand. -->',
    `<title>${attr(title)}</title>`,
    `<meta name="description" content="${attr(description)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    `<meta name="theme-color" content="${attr(siteConfig.theme.colors.canvas)}" />`,
  ];

  if (name) lines.push(`<meta name="author" content="${attr(name)}" />`);
  if (origin()) lines.push(`<link rel="canonical" href="${attr(absolute('/'))}" />`);

  lines.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${attr(description)}" />`,
    `<meta property="og:locale" content="${attr(locale)}" />`,
  );
  if (name) lines.push(`<meta property="og:site_name" content="${attr(name)}" />`);
  if (origin()) lines.push(`<meta property="og:url" content="${attr(absolute('/'))}" />`);
  if (image) {
    lines.push(
      `<meta property="og:image" content="${attr(image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${attr(title)}" />`,
    );
  }

  lines.push(
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${attr(title)}" />`,
    `<meta name="twitter:description" content="${attr(description)}" />`,
  );
  if (image) lines.push(`<meta name="twitter:image" content="${attr(image)}" />`);
  if (isFilled(twitter)) lines.push(`<meta name="twitter:site" content="${attr(twitter)}" />`);

  /*
   * Preconnect to the image CDN only when the photography actually uses it.
   *
   * Tested across the whole `media` block, not just the hero: a client who
   * self-hosts their hero but keeps the stock set everywhere else still has 30+
   * CDN images below the fold, and dropping the preconnect would cost each of
   * them a fresh DNS + TLS handshake.
   */
  const usesCdn = JSON.stringify(siteConfig.media).includes(IMAGE_CDN_ORIGIN);
  if (usesCdn) {
    lines.push(
      `<link rel="preconnect" href="${IMAGE_CDN_ORIGIN}" crossorigin />`,
      `<link rel="dns-prefetch" href="${IMAGE_CDN_ORIGIN}" />`,
    );
  }

  /*
   * Preload the hero. It is the LCP element on the highest-traffic page, and
   * without this the browser cannot discover it until the JS bundle has parsed
   * and React has rendered — typically a second or more of dead time.
   * `imagesrcset` is passed so the preload matches the candidate <Img> will
   * actually choose, rather than racing it with a second download.
   */
  const hero = siteConfig.media.hero;
  if (isFilled(hero.src)) {
    const options = { quality: hero.quality, widths: hero.widths };
    /*
     * Preload the BEST format, with its `type`. A browser that cannot decode
     * AVIF skips a preload declaring `type="image/avif"` entirely and simply
     * loads the WebP through <picture> as normal — so this never wastes a
     * download, and the ~95% that can decode it get the 124 KB file on the
     * critical path instead of the 339 KB JPEG.
     *
     * Only one preload is emitted: listing both AVIF and WebP would make every
     * AVIF-capable browser fetch the WebP too, which is worse than not
     * preloading at all.
     */
    const best = hero.formats?.[0];
    const srcSet = best
      ? formatSrcSet(hero.src, hero.widths, best)
      : buildSrcSet(hero.src, hero.width, options);

    /*
     * `href` is the fallback for clients that honour `rel=preload` but not
     * `imagesrcset` — notably Safari before 17.2. Pick the largest variant up
     * to 1920 rather than the biggest available: those browsers would
     * otherwise be handed the 2560 file on every screen size, which is the
     * opposite of what a preload is for.
     */
    const preloadWidth =
      [...(hero.widths ?? [])].filter((w) => w <= 1920).pop() ??
      hero.widths?.[hero.widths.length - 1] ??
      1920;
    const href = best
      ? localVariant(hero.src, preloadWidth, best)
      : primarySource(hero.src, hero.width, options);

    /*
     * `imagesizes` MUST be byte-identical to the `sizes` the <img> renders, or
     * the preload and the element resolve to different candidates and the
     * browser downloads the hero twice — which is strictly worse than not
     * preloading. Both call `coverSizes`, so they cannot drift.
     */
    const sizes = coverSizes(hero.width, hero.height);

    lines.push(
      `<link rel="preload" as="image" href="${attr(href)}"${
        best ? ` type="${attr(mimeForFormat(best))}"` : ''
      }${
        srcSet ? ` imagesrcset="${attr(srcSet)}" imagesizes="${attr(sizes)}"` : ''
      } fetchpriority="high" />`,
    );
  }

  return lines.join('\n    ');
}

/** Replaces the `<!-- SEO:INJECT -->` marker and sets <html lang>. */
function seoHtmlPlugin(): Plugin {
  return {
    name: 'luxe:seo-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const lang = siteConfig.seo.locale.replace('_', '-') || 'en';
        return html
          .replace('<html lang="en">', `<html lang="${attr(lang)}">`)
          .replace('<!-- SEO:INJECT -->', buildHeadTags());
      },
    },
  };
}

function robotsTxt(): string {
  const sitemap = origin() ? `${origin()}/sitemap.xml` : '/sitemap.xml';
  return [
    `# ${tClean(siteConfig.business.name) || 'Interior design studio'}`,
    '# Generated at build time from src/config/site.config.ts',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Build artefacts are of no use to a crawler.',
    'Disallow: /assets/*.map$',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
}

function sitemapXml(): string {
  /* Commercial value, not page depth, drives priority. */
  const PRIORITY: Record<string, string> = {
    home: '1.0',
    projects: '0.9',
    contact: '0.9',
    services: '0.8',
    about: '0.7',
  };
  const CHANGEFREQ: Record<string, string> = {
    home: 'monthly',
    projects: 'monthly',
    services: 'monthly',
    about: 'yearly',
    contact: 'yearly',
  };

  const today = new Date().toISOString().split('T')[0];

  const urls = Object.entries(siteConfig.seo.pages)
    .filter(([key]) => key !== 'notFound')
    .map(([key, page]) => {
      const loc = absolute(page.path === '/' ? '/' : page.path);
      return [
        '  <url>',
        `    <loc>${attr(loc)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${CHANGEFREQ[key] ?? 'monthly'}</changefreq>`,
        `    <priority>${PRIORITY[key] ?? '0.6'}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Emits robots.txt and sitemap.xml into the build, and serves them in dev so
 * the two environments agree. Generating them removes the risk of shipping a
 * sitemap that still points at the previous client's domain.
 */
function crawlFilesPlugin(): Plugin {
  return {
    name: 'luxe:crawl-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(robotsTxt());
          return;
        }
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemapXml());
          return;
        }
        next();
      });
    },
    generateBundle() {
      /*
       * A sitemap needs absolute URLs to be usable, and a canonical tag cannot
       * be emitted at all without an origin. Rather than shipping a silently
       * useless sitemap, fail loudly at build time — this is the single most
       * commonly forgotten step when cloning the template.
       */
      if (!origin()) {
        this.warn(
          'seo.siteUrl is still a placeholder. robots.txt and sitemap.xml have been generated ' +
            'with relative URLs, which search engines will reject, and no canonical tag was ' +
            'emitted. Set `seo.siteUrl` in src/config/site.config.ts before going live.',
        );
      }

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
    },
  };
}

/**
 * Vite configuration.
 *
 * Performance notes:
 * - `manualChunks` isolates only the three genuinely global libraries; Rollup
 *   places everything else in the route chunk that uses it.
 * - Route-level code splitting is handled with `React.lazy` in `src/App.tsx`.
 * - CSS + JS are minified by esbuild in `vite build`.
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), seoHtmlPlugin(), crawlFilesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        /**
         * Only the three genuinely global libraries are pinned to their own
         * chunks. Everything else — Radix primitives, Lucide icons — is left
         * to Rollup, which places each module in the route chunk that uses it
         * and hoists anything shared into a common chunk automatically.
         *
         * This matters: forcing all Radix packages into one bundle made the
         * home page download the Select primitive, which is only ever used by
         * the contact form.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) {
            return 'vendor-motion';
          }

          if (/[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/.test(id)) {
            return 'vendor-router';
          }

          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react';
          }

          return undefined;
        },
      },
    },
  },
});
