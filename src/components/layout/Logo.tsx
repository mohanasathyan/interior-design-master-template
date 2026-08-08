import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { isFilled, t } from '@/lib/tokens';
import { format } from '@/lib/copy';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * LOGO
 * ============================================================================
 * Renders the client's logo image when one has been supplied, and an elegant
 * typographic wordmark when it has not.
 *
 * The fallback is deliberately not a placeholder box. A serif wordmark with a
 * monogram rule is a legitimate luxury identity in its own right — many high-
 * end studios use exactly this — so the site never looks unfinished, and some
 * clients will simply choose to keep it.
 * ============================================================================
 */
export function Logo({
  tone = 'default',
  className,
  linkTo = routes.home,
  compact = false,
}: {
  /** `light` for use over dark photography and the footer. */
  tone?: 'default' | 'light';
  className?: string;
  /** Set to `null` to render the mark without wrapping it in a link. */
  linkTo?: string | null;
  /**
   * Hold the tagline back until `xl` instead of showing it from `sm`.
   *
   * For the HEADER only. Between `lg` and `xl` the bar has to fit the wordmark,
   * five navigation links and the call to action across as little as 912px of
   * usable width, and the tagline is the one part of the mark that carries no
   * navigational weight. The footer keeps it from `sm`, where there is room.
   */
  compact?: boolean;
}) {
  const light = tone === 'light';
  const asset = light ? siteConfig.brand.logoLight : siteConfig.brand.logo;
  const hasImage = isFilled(asset.src);

  const wordmark = t(siteConfig.brand.wordmark);
  const monogram = t(siteConfig.brand.monogram);

  const content = hasImage ? (
    <img
      src={asset.src}
      alt={t(asset.alt)}
      width={asset.width}
      height={asset.height}
      className="h-9 w-auto object-contain md:h-10"
      loading="eager"
      decoding="sync"
    />
  ) : (
    <span className="flex items-baseline gap-2.5">
      {/* Monogram: only shown once the config supplies one. */}
      {isFilled(siteConfig.brand.monogram) && (
        <span
          aria-hidden="true"
          className={cn(
            'font-display text-lg leading-none tracking-tight',
            // Brand gold on dark; the AA-safe gold when set on the light navbar.
            light ? 'text-accent' : 'text-accent-strong',
          )}
        >
          {monogram}
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.15rem] leading-none tracking-[0.02em] md:text-[1.3rem]',
            /*
             * Brand gold on dark, ink on light. Gold is what the approved
             * header draws, and it measures 4.89:1 against the scrimmed hero
             * and the footer band — comfortably past AA, and a far stronger
             * brand signal than plain white in the one place the studio's own
             * name appears.
             */
            light ? 'text-accent' : 'text-ink',
          )}
        >
          {wordmark}
        </span>
        {isFilled(siteConfig.business.tagline) && (
          <span
            className={cn(
              'mt-1.5 hidden text-[0.55rem] font-medium uppercase tracking-[0.3em]',
              compact ? 'xl:block' : 'sm:block',
              light ? 'text-white/70' : 'text-ink-muted',
            )}
          >
            {t(siteConfig.business.tagline)}
          </span>
        )}
      </span>
    </span>
  );

  if (linkTo === null) {
    return <span className={cn('inline-flex items-center', className)}>{content}</span>;
  }

  return (
    <Link
      to={linkTo}
      aria-label={format(copyConfig.ui.logoHome, { name: wordmark })}
      className={cn(
        'inline-flex items-center transition-opacity duration-300 hover:opacity-75',
        className,
      )}
    >
      {content}
    </Link>
  );
}
