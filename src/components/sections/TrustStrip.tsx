import { useState } from 'react';
import { Check, Pause, Play } from 'lucide-react';
import { trustMarkers } from '@/data/stats';
import { copyConfig } from '@/config/copy.config';
import { t } from '@/lib/tokens';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * TRUST STRIP
 * ============================================================================
 * A slow, continuous marquee of reassurance points directly beneath the hero.
 *
 * It occupies almost no vertical space yet lands six credibility signals at the
 * exact moment a visitor is deciding whether to keep scrolling.
 *
 * ---------------------------------------------------------------------------
 * ACCESSIBILITY — TWO THINGS THIS HAS TO GET RIGHT
 * ---------------------------------------------------------------------------
 * 1. WCAG 2.2.2 (Pause, Stop, Hide) — Level A.
 *    Anything that moves automatically for more than five seconds needs a
 *    mechanism to stop it. `:hover` is NOT that mechanism: it does not exist
 *    for a keyboard user and it does not exist on a touch screen, which is
 *    where most of this site's traffic is. So there is a real button, in the
 *    tab order, with a label that reflects its state. Hover-to-pause is kept
 *    as well, because it is a genuine convenience for mouse users — it simply
 *    is not the compliance story.
 *
 * 2. `prefers-reduced-motion` must not cost content.
 *    Switching the animation off is only half the job. The track is laid out
 *    `w-max` — as wide as its contents — inside an `overflow-hidden` parent, so
 *    a stopped marquee is a CLIPPED marquee: the markers past the fold are
 *    unreachable, with no animation and no scrollbar to bring them into view.
 *    Reduced motion therefore also switches the track to `w-full` and lets it
 *    WRAP, drops the duplicated copy, and hides the edge fades that would
 *    otherwise wash out a wrapped row. Every marker is readable, nothing moves.
 *
 * The duplicate list is `aria-hidden`, so a screen reader hears the six markers
 * exactly once in both modes.
 * ============================================================================
 */
export function TrustStrip() {
  /*
   * Explicit user intent, and it is deliberately independent of the hover
   * pause: someone who has pressed Pause expects it to stay paused when the
   * pointer happens to cross the strip and then leaves again.
   */
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-5">
      {/*
        Edge fades, so items dissolve rather than being clipped at the sides.
        Hidden under reduced motion, where the row wraps instead of scrolling
        and there is no longer an edge for anything to dissolve into.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-surface to-transparent motion-reduce:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-surface to-transparent motion-reduce:hidden"
      />

      <div
        className={cn(
          'group flex w-max animate-[marquee_38s_linear_infinite]',
          'hover:[animation-play-state:paused]',
          /* The explicit control. Declared after the hover rule so a deliberate
             pause is not undone by the pointer leaving the strip. */
          paused && '[animation-play-state:paused]',
          /*
             Reduced motion: stop moving AND stop clipping. `w-full` is the
             load-bearing part — `flex-wrap` cannot wrap a track that is sized
             to its own content.
          */
          'motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center',
        )}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={cn(
              'flex shrink-0 items-center',
              /*
               * Three things have to give way for the row to wrap, and missing
               * any one of them still clips content:
               *   w-full    the list must fill the track, not its own contents
               *   shrink    `shrink-0` pins it to max-content however wide that is
               *   flex-wrap the items themselves need permission to break
               */
              'motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center',
              /* The second copy exists only to make the loop seamless. With no
                 loop it is duplicated content, so it goes. */
              copy === 1 && 'motion-reduce:hidden',
            )}
          >
            {trustMarkers.map((marker) => (
              <li
                key={`${copy}-${marker}`}
                className={cn(
                  'flex items-center gap-3 whitespace-nowrap px-8',
                  /*
                   * A single marker can be wider than a 390px phone once the
                   * uppercase tracking is added — and while the template is
                   * unfilled, `{{GOOGLE_RATING}} rated on Google` is wider still.
                   * Letting the label wrap and trimming the gutter is what makes
                   * "every marker readable" true at the narrowest breakpoint
                   * rather than just at desktop.
                   */
                  'motion-reduce:whitespace-normal motion-reduce:px-4 motion-reduce:py-1.5',
                )}
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

      {/*
        The pause control.

        It sits over the right-hand fade, which is already almost solid
        `surface` at that edge, so it reads as a control rather than as another
        marker. `z-20` puts it above the fade; its own `bg-surface` keeps the
        glyph legible on the frame where a marker passes beneath it.

        Hidden under reduced motion — there is nothing left to pause, and an
        inert control is worse than no control.
      */}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        className={cn(
          'absolute right-2 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center',
          'rounded-full border border-border bg-surface text-ink-muted',
          'transition-colors duration-300 ease-luxe',
          'hover:border-accent/45 hover:text-accent-strong',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'motion-reduce:hidden sm:right-4',
        )}
      >
        <span className="sr-only">
          {paused ? copyConfig.home.trustStrip.play : copyConfig.home.trustStrip.pause}
        </span>
        {paused ? (
          <Play aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        ) : (
          <Pause aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
}
