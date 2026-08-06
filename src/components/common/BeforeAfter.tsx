import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ManagedImage } from '@/config/site.config.types';
import { usePrefersReducedMotion } from '@/hooks';
import { clamp, cn } from '@/lib/utils';
import { t } from '@/lib/tokens';
import { Img } from './Img';

/**
 * ============================================================================
 * BEFORE / AFTER
 * ============================================================================
 * A draggable comparison of two photographs of the same room — the empty shell
 * and the finished interior — stacked in one frame and revealed by a divider.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS RENDERS EXACTLY ONCE
 * ---------------------------------------------------------------------------
 * The obvious implementation puts the divider position in React state. It also
 * re-renders the entire component — including both `<Img>` subtrees — on every
 * `pointermove`, which on a phone fires at the display's refresh rate. That is
 * 60–120 React reconciliations per second to move one line, and it is why so
 * many comparison sliders feel like they lag a finger.
 *
 * Here the position lives in two CSS custom properties written straight to the
 * DOM node. Nothing in the React tree depends on it, so a drag costs no
 * reconciliation at all — the browser only has to repaint a clip and composite
 * a transform. No gesture of any length, at any frame rate, renders this
 * component even once. (It re-renders only if the OS reduced-motion preference
 * is toggled mid-session, and the effect below re-applies the position when
 * that happens, so the two never fall out of step.)
 *
 * The trade is that the position is not React state, so anything that needs to
 * observe it must be updated imperatively. Exactly two things do: the visual
 * position, and `aria-valuenow`/`aria-valuetext` on the handle. Both are
 * written together in `apply()`, so they can never disagree.
 *
 * ---------------------------------------------------------------------------
 * WHY TWO CUSTOM PROPERTIES AND NOT ONE
 * ---------------------------------------------------------------------------
 * `--ba-pos` drives the handle, `--ba-clip` drives the reveal, and they are
 * complements (`clip = 100 − pos`). Deriving one from the other in CSS would
 * mean `clip-path: inset(0 calc(100% - var(--ba-pos)) 0 0)`, which asks the
 * browser to interpolate a `calc()` inside a basic shape during the entrance
 * transition. Setting both from JS keeps every transitioned value a plain
 * percentage, which every engine interpolates identically.
 *
 * ---------------------------------------------------------------------------
 * WHAT MAKES THE TWO IMAGES LINE UP
 * ---------------------------------------------------------------------------
 * Nothing in this component aligns them. Both layers are the same absolutely
 * positioned box with the same `object-fit: cover` and the same
 * `object-position`, so if the two source files share their intrinsic
 * dimensions the alignment is exact — and if they do not, no amount of CSS here
 * will rescue it. See the note on `media.transformation` in
 * `site.config.types.ts`.
 * ============================================================================
 */

/** Arrow-key increment, in percent. Small enough to be precise, large enough
 *  that crossing the frame does not take fifty presses. */
const STEP = 2;
/** PageUp/PageDown increment. */
const PAGE_STEP = 10;

export interface BeforeAfterProps {
  /** The empty / unfinished space. Revealed to the LEFT of the divider. */
  before: ManagedImage;
  /** The completed interior. Revealed to the RIGHT of the divider. */
  after: ManagedImage;
  /** Badge pinned over the left half of the frame. */
  beforeLabel: string;
  /** Badge pinned over the right half of the frame. */
  afterLabel: string;
  /** Accessible name for the handle. */
  handleLabel: string;
  /** Resting divider position, 0–100. */
  initial?: number;
  /** Responsive `sizes` for both layers. They must match, or the browser
   *  resolves two different candidates and the seam softens on one side. */
  sizes?: string;
  /** Aspect-ratio classes for the frame. */
  ratio?: string;
  className?: string;
}

export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  handleLabel,
  initial = 50,
  sizes = '100vw',
  ratio = 'aspect-[4/3] sm:aspect-[3/2] lg:aspect-video',
  className,
}: BeforeAfterProps) {
  const reduceMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  /** The authoritative divider position. Not state — see the note above. */
  const positionRef = useRef(initial);
  /** Latest position awaiting a frame, and the pending rAF id. */
  const pendingRef = useRef(initial);
  const frameIdRef = useRef(0);
  const draggingRef = useRef(false);

  /**
   * The single place the position is written. Moves the visuals and updates
   * the ARIA value in one step so they cannot drift apart.
   *
   * @param ms transition duration. 0 while dragging — a transition during a
   *           drag is precisely what makes a slider feel like it is lagging
   *           behind the finger, because it is.
   */
  const apply = useCallback((next: number, ms: number) => {
    const position = clamp(next, 0, 100);
    positionRef.current = position;

    const root = rootRef.current;
    if (root) {
      root.style.setProperty('--ba-transition', `${ms}ms`);
      root.style.setProperty('--ba-pos', `${position}%`);
      root.style.setProperty('--ba-clip', `${100 - position}%`);
    }

    const handle = handleRef.current;
    if (handle) {
      const rounded = Math.round(position);
      handle.setAttribute('aria-valuenow', String(rounded));
      handle.setAttribute('aria-valuetext', `${rounded}% before, ${100 - rounded}% after`);
    }
  }, []);

  /** Coalesces pointer moves to one write per animation frame. Pointer events
   *  can outpace the display; without this we would write styles the browser
   *  never gets a chance to paint. */
  const schedule = useCallback(
    (next: number) => {
      pendingRef.current = next;
      if (frameIdRef.current) return;
      frameIdRef.current = requestAnimationFrame(() => {
        frameIdRef.current = 0;
        apply(pendingRef.current, 0);
      });
    },
    [apply],
  );

  const positionFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect?.width) return positionRef.current;
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  /**
   * `will-change` is applied only for the duration of a gesture. Left on
   * permanently it would hold a compositor layer for a full-bleed photograph
   * for the whole session — real memory, spent on an element that is static
   * almost all of the time.
   */
  const setDragging = useCallback((dragging: boolean) => {
    draggingRef.current = dragging;
    const root = rootRef.current;
    if (!root) return;
    root.dataset.dragging = String(dragging);
    root.style.setProperty('--ba-will-change', dragging ? 'clip-path, transform' : 'auto');
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    /* Secondary buttons open context menus; they should not grab the divider. */
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    setDragging(true);
    /* Capture keeps the drag alive when the pointer leaves the frame, so
       dragging past the edge pins to 0/100 instead of silently stopping. */
    event.currentTarget.setPointerCapture(event.pointerId);
    apply(positionFromClientX(event.clientX), 0);
    /* A pointerdown anywhere on the frame is also a jump-to-here, so move the
       keyboard focus with it — the handle is now where the user just pointed. */
    handleRef.current?.focus({ preventScroll: true });
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    schedule(positionFromClientX(event.clientX));
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = positionRef.current;
    /* Keyboard steps are discrete, so they get a short glide — without one the
       divider teleports and the eye loses track of which side moved. */
    const glide = reduceMotion ? 0 : 180;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        apply(current - (event.shiftKey ? PAGE_STEP : STEP), glide);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        apply(current + (event.shiftKey ? PAGE_STEP : STEP), glide);
        break;
      case 'PageDown':
        apply(current - PAGE_STEP, glide);
        break;
      case 'PageUp':
        apply(current + PAGE_STEP, glide);
        break;
      case 'Home':
        apply(0, glide);
        break;
      case 'End':
        apply(100, glide);
        break;
      default:
        return;
    }
    /* Only reached for keys we handled — the arrows and Page keys would
       otherwise scroll the page out from under the control. */
    event.preventDefault();
  };

  /**
   * THE ENTRANCE
   *
   * The frame starts fully "before" — an empty shell — and wipes across to the
   * resting position as the section arrives. It is the one animation in this
   * component, and it earns its place twice over: it *is* the transformation
   * the section is about, and it demonstrates the gesture without a word of
   * instruction. Nothing repeats it; scrolling back does not re-run it.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      apply(initial, 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        apply(initial, 1100);
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [apply, initial, reduceMotion]);

  /* A drag interrupted by an unmount would otherwise leave a frame queued. */
  useEffect(() => () => cancelAnimationFrame(frameIdRef.current), []);

  /*
   * The pre-paint values, inline so the frame is never briefly wrong. Reduced
   * motion opens at the resting position; everyone else opens fully "before"
   * and is wiped to it by the observer above.
   */
  const openAt = reduceMotion ? initial : 100;

  return (
    <div
      ref={rootRef}
      className={cn('group/ba relative select-none', className)}
      style={
        {
          '--ba-pos': `${openAt}%`,
          '--ba-clip': `${100 - openAt}%`,
          '--ba-transition': '0ms',
          '--ba-will-change': 'auto',
        } as CSSProperties
      }
    >
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          'relative overflow-hidden rounded-(--radius-brand) bg-contrast',
          ratio,
          /*
           * `pan-y`, not `none`. `none` would hand every touch to this
           * component — including the vertical swipe someone uses to scroll
           * past it, trapping the page behind a photograph. `pan-y` gives
           * vertical gestures back to the browser and keeps horizontal ones,
           * which is exactly the split this control wants.
           */
          'touch-pan-y',
          'cursor-ew-resize',
        )}
      >
        {/* ---------------- AFTER — the base layer ---------------- */}
        <Img
          image={after}
          sizes={sizes}
          tone="dark"
          className="absolute inset-0 h-full w-full"
          imgClassName="object-center"
        />

        {/* ----------------
            BEFORE — clipped over the top.

            `clip-path` rather than a wrapper with an animated `width`: clipping
            never re-lays-out the image inside it, so the photograph is not
            re-rasterised as the divider moves. A width-based reveal reflows its
            child on every frame, which is the other common reason these
            sliders stutter on large images.
        ---------------- */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            '[clip-path:inset(0_var(--ba-clip)_0_0)]',
            '[will-change:var(--ba-will-change)]',
            'transition-[clip-path] ease-luxe [transition-duration:var(--ba-transition)]',
          )}
        >
          <Img
            image={before}
            sizes={sizes}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-center"
          />
        </div>

        {/* ----------------
            SIDE LABELS

            Each label is clipped to the half it names, using the same two
            custom properties as the reveal. A label that stayed put would end
            up contradicting the picture at the extremes — "Before" pinned over
            a frame showing nothing but the finished room. Wiping it away with
            its own half is both honest and free: it is the same compositor
            work already being done for the photograph.

            Dark glass rather than plain white text, because these sit over a
            near-white empty room on one side and dark timber on the other, and
            only one treatment reads on both.
        ---------------- */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20',
            '[clip-path:inset(0_var(--ba-clip)_0_0)]',
            'transition-[clip-path] ease-luxe [transition-duration:var(--ba-transition)]',
          )}
        >
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-[0.68rem]">
            {t(beforeLabel)}
          </span>
        </div>
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20',
            '[clip-path:inset(0_0_0_var(--ba-pos))]',
            'transition-[clip-path] ease-luxe [transition-duration:var(--ba-transition)]',
          )}
        >
          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md sm:right-5 sm:top-5 sm:text-[0.68rem]">
            {t(afterLabel)}
          </span>
        </div>

        {/* ----------------
            THE DIVIDER

            This layer is the full width of the frame and is translated by a
            PERCENTAGE OF ITSELF — so `translateX(50%)` lands on the frame's
            midpoint. That keeps the divider on a pure compositor transform
            instead of animating `left`, which would relayout the box on every
            frame of a drag.
        ---------------- */}
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-full',
            '[transform:translateX(var(--ba-pos))]',
            '[will-change:var(--ba-will-change)]',
            'transition-transform ease-luxe [transition-duration:var(--ba-transition)]',
          )}
        >
          {/*
            The line is white with a dark hairline either side. On the empty
            room — near-white marble and white walls — a plain white line is
            invisible; the outline is what guarantees it reads on both halves
            without resorting to a colour that would fight the photography.
          */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.22),0_0_16px_rgb(0_0_0/0.45)]"
          />

          <div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-label={t(handleLabel)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(openAt)}
            aria-valuetext={`${Math.round(openAt)}% before, ${100 - Math.round(openAt)}% after`}
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            className={cn(
              'pointer-events-auto absolute left-0 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center',
              /* 56px clears the 44px minimum touch target with room to spare;
                 the frame can be short on a phone, so the handle must not be. */
              'size-14 rounded-full sm:size-15',
              'cursor-ew-resize touch-none',
              /* White glass with a hairline, so it holds its shape against the
                 white wall on the left and the dark timber on the right. */
              'border border-white/70 bg-white/92 text-contrast backdrop-blur-md',
              'shadow-[0_2px_10px_rgb(0_0_0/0.26),0_12px_30px_-10px_rgb(0_0_0/0.5)]',
              /* The glow: a soft gold halo, brand-derived, that only warms on
                 interaction. No pulse, nothing running on idle.
                 `ring` compiles to a box-shadow layer in v4, so transitioning
                 `box-shadow` animates the halo and the ring together. */
              'ring-1 ring-accent/0 transition-[box-shadow,transform] duration-300 ease-luxe',
              'hover:ring-accent/45 focus-visible:ring-accent/60',
              'hover:shadow-[0_2px_10px_rgb(0_0_0/0.26),0_16px_38px_-10px_rgb(0_0_0/0.55),0_0_26px_-2px_color-mix(in_srgb,var(--color-accent)_55%,transparent)]',
              'focus-visible:shadow-[0_2px_10px_rgb(0_0_0/0.26),0_16px_38px_-10px_rgb(0_0_0/0.55),0_0_26px_-2px_color-mix(in_srgb,var(--color-accent)_65%,transparent)]',
              'active:scale-95',
            )}
          >
            <span aria-hidden="true" className="flex items-center -space-x-1">
              <ChevronLeft className="size-4.5" strokeWidth={2} />
              <ChevronRight className="size-4.5" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
