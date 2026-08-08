import { useMemo, useState } from 'react';
import type { ManagedImage } from '@/config/site.config.types';
import { copyConfig } from '@/config/copy.config';
import { isPlaceholder, tClean } from '@/lib/tokens';
import { placeholderImage } from '@/lib/placeholder';
import { buildSrcSet, formatSrcSet, mimeForFormat, primarySource } from '@/lib/images';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * IMG
 * ============================================================================
 * The only way images are rendered on this site. It handles, in one place:
 *
 *  1. RESPONSIVE DELIVERY — for CDN-backed photography it emits a full
 *     `srcset` (480→2400px) so a phone downloads a phone-sized file. This is
 *     the single biggest performance lever on an image-led site: without it a
 *     hero costs ~900 KB on a handset instead of ~60 KB.
 *  2. PLACEHOLDERS — if `src` is still `{{HERO_IMAGE}}`, generates branded SVG
 *     art instead of a broken image, so the template demos with zero assets.
 *  3. LAZY LOADING — everything below the fold defers; `priority` images
 *     (the hero) load eagerly with a high fetch priority for a fast LCP.
 *  4. CLS PREVENTION — width/height are always emitted and the wrapper holds
 *     an aspect ratio, so nothing reflows as images arrive.
 *  5. GRACEFUL DECODE — a warm tint holds the space, then the photograph fades
 *     in over 700ms rather than snapping.
 *  6. ALT TEXT — interpolated through the token engine, so alt text reads
 *     "Modular kitchen by Studio Verde in Bengaluru", not "{{BUSINESS_NAME}}".
 *  7. ERROR RECOVERY — a 404 on a real photo degrades to placeholder art
 *     rather than a broken-image icon in front of a paying client.
 * ============================================================================
 */
export interface ImgProps {
  /** The managed image record from `site.config.ts` or a data file. */
  image: ManagedImage;
  /** Classes for the wrapper element (sizing, ratio, radius, overflow). */
  className?: string;
  /** Classes for the <img> itself (object-fit, object-position, transforms). */
  imgClassName?: string;
  /**
   * Load immediately at high priority. Use for the hero and any image above
   * the fold — and only for those, or the benefit is lost.
   */
  priority?: boolean;
  /**
   * Responsive `sizes` hint. This matters as much as the `srcset` itself: it
   * is what lets the browser choose a candidate before layout is known.
   */
  sizes?: string;
  /** Tailwind aspect-ratio class, e.g. `aspect-[4/5]`. */
  ratio?: string;
  /** Darker placeholder art, for images that sit under white text. */
  tone?: 'light' | 'dark';
  /** Adds a slow zoom on hover of the nearest `.group` ancestor. */
  hoverZoom?: boolean;
}

export function Img({
  image,
  className,
  imgClassName,
  priority = false,
  sizes = '100vw',
  ratio,
  tone = 'light',
  hoverZoom = false,
}: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const pending = isPlaceholder(image.src) || failed;

  /**
   * Memoised: building the placeholder SVG is not cheap, and this component
   * renders once per card in a twelve-item gallery.
   */
  const { src, srcSet, sources } = useMemo(() => {
    if (pending) {
      return {
        src: placeholderImage({
          seed: image.src,
          label: image.label ?? copyConfig.ui.imagePlaceholder,
          width: image.width ?? 1200,
          height: image.height ?? 900,
          tone,
        }),
        srcSet: undefined as string | undefined,
        sources: [] as { type: string; srcSet: string }[],
      };
    }

    const options = { quality: image.quality, widths: image.widths };
    return {
      src: primarySource(image.src, image.width, options),
      srcSet: buildSrcSet(image.src, image.width, options),
      /*
       * One `<source>` per modern format, in the order declared — the browser
       * takes the first `type` it can decode and never downloads the rest.
       */
      sources: (image.formats ?? [])
        .map((format) => ({
          type: mimeForFormat(format),
          srcSet: formatSrcSet(image.src, image.widths, format),
        }))
        .filter((entry): entry is { type: string; srcSet: string } => Boolean(entry.srcSet)),
    };
  }, [
    pending,
    image.src,
    image.label,
    image.width,
    image.height,
    image.quality,
    image.widths,
    image.formats,
    tone,
  ]);

  const alt = tClean(image.alt);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        /*
         * The backdrop behind the photograph, visible only while it decodes.
         * It follows `tone` rather than always being the warm cream: on a dark
         * hero a cream backdrop reads as a white gap for the split second
         * before the bitmap paints, and would make any sizing problem look far
         * worse than it is.
         */
        tone === 'dark' ? 'bg-contrast' : 'bg-surface-muted',
        ratio,
        className,
      )}
      data-placeholder={pending || undefined}
    >
      {/*
        Warm tint that holds the space until the bitmap has decoded.
        Skipped for `priority` images — see the note on the fade below.
      */}
      {!priority && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-luxe',
            tone === 'dark' ? 'bg-contrast' : 'bg-surface-muted',
            loaded || pending ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}

      {/*
        `<picture>` only when there are modern formats to offer. Wrapping every
        image in one unconditionally would add a DOM node per card for nothing —
        `<picture>` with no `<source>` is just an `<img>` with extra steps.

        Note the wrapper is `contents`, so it introduces no box of its own and
        the existing `absolute`/`object-cover` layout is untouched.
      */}
      <Picture sources={sources} sizes={srcSet ? sizes : undefined}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => {
          // A missing real asset degrades to placeholder art, never a broken icon.
          if (!pending) setFailed(true);
        }}
        className={cn(
          'h-full w-full object-cover',
          'transition-[opacity,transform,filter] duration-700 ease-luxe',
          /*
           * `priority` images paint at full opacity immediately.
           *
           * The fade is right for a photograph scrolling into view, but the
           * priority image is the hero — the LCP element. An element at
           * `opacity: 0` has not "painted" as far as the Largest Contentful
           * Paint algorithm is concerned, so fading it in hands Lighthouse the
           * *end* of a 700ms transition as the LCP timestamp instead of the
           * moment the bitmap decoded. That is up to 0.7s of pure scoring loss
           * for an effect nobody sees on a first paint anyway.
           */
          priority || loaded || pending ? 'opacity-100' : 'opacity-0',
          /*
           * The zoom is paired with a whisper of extra brightness and contrast.
           * Scale alone reads as a mechanical crop; lifting the tone at the same
           * time makes the photograph itself feel like it responds. Both are
           * composited on the GPU, so this stays free at 60fps.
           */
          hoverZoom && 'group-hover:scale-[1.045] group-hover:brightness-[1.03] group-hover:contrast-[1.02]',
          imgClassName,
        )}
      />
      </Picture>
    </div>
  );
}

/**
 * Wraps the `<img>` in a `<picture>` when modern formats are available, and
 * gets out of the way entirely when they are not.
 *
 * `block h-full w-full`, NOT `display: contents`.
 *
 * A `<picture>` is `display: inline` by default, and the `<img>` inside it is
 * sized with `height: 100%`. A percentage height only resolves against a
 * containing block with a definite height — an inline box has none, so the
 * height falls back to `auto`, the image sizes to its own aspect ratio, and it
 * stops filling the container. On a full-bleed hero that shows up as a band of
 * background down one side.
 *
 * `display: contents` looks like the tidy fix — no box at all, nothing in the
 * surrounding layout has to change — but it makes the same percentage
 * resolution depend on how a given engine handles a boxless replaced-content
 * parent, which is not something to gamble a hero image on. Giving the
 * `<picture>` a real block box that fills its parent makes the chain explicit
 * and identical everywhere:
 *
 *   wrapper (definite height) → picture (h-full) → img (h-full, object-cover)
 */
function Picture({
  sources,
  sizes,
  children,
}: {
  sources: { type: string; srcSet: string }[];
  /* Must mirror the <img>'s own `sizes`, or the browser picks a candidate for
     the source using the 100vw default and can download the wrong width. */
  sizes?: string;
  children: React.ReactNode;
}) {
  if (sources.length === 0) return <>{children}</>;

  return (
    <picture className="block h-full w-full">
      {sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      {children}
    </picture>
  );
}
