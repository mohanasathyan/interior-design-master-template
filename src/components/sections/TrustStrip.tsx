import { Check } from 'lucide-react';
import { trustMarkers } from '@/data/stats';
import { t } from '@/lib/tokens';

/**
 * ============================================================================
 * TRUST STRIP
 * ============================================================================
 * A slow, continuous marquee of reassurance points directly beneath the hero.
 *
 * It occupies almost no vertical space yet lands six credibility signals at the
 * exact moment a visitor is deciding whether to keep scrolling. The list is
 * duplicated once so the loop is seamless, and it pauses on hover so anyone who
 * wants to read it can.
 *
 * `aria-hidden` on the duplicate keeps screen readers from hearing everything
 * twice; the first copy carries the real content.
 * ============================================================================
 */
export function TrustStrip() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-5">
      {/* Edge fades, so items dissolve rather than being clipped at the sides. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-surface to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-surface to-transparent"
      />

      <div className="group flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center"
          >
            {trustMarkers.map((marker) => (
              <li
                key={`${copy}-${marker}`}
                className="flex items-center gap-3 whitespace-nowrap px-8"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/12">
                  <Check className="size-3 text-accent-strong" strokeWidth={2.4} />
                </span>
                <span className="text-[0.74rem] font-medium uppercase tracking-[0.17em] text-ink-muted">
                  {t(marker)}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
