import type { Variants, Transition } from 'framer-motion';

/**
 * ============================================================================
 * MOTION LANGUAGE
 * ============================================================================
 * One shared vocabulary of easings, durations and variants so that every
 * animation on the site feels like it came from the same studio.
 *
 * Principles for a luxury brand:
 *  • Nothing bounces. Springs read as playful; luxury reads as controlled.
 *  • Movement is short (16–28px) and slow-ish (0.6–0.9s) — confident, not eager.
 *  • Everything eases out. Motion arrives and settles; it never overshoots.
 *  • Stagger is small (60–90ms) so groups feel composed, not sequential.
 * ============================================================================
 */

/** The house easing curve — a long, quiet deceleration. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** A slightly sharper curve for interactive feedback (hover, tap). */
export const EASE_SNAP = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  editorial: 1.2,
} as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

/** Fade + rise. The default reveal for almost everything. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

/** A smaller rise for dense content such as list items. */
export const fadeUpTight: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { ...transition, duration: DURATION.fast } },
};

/** Pure fade — for backdrops and overlays where movement would be noisy. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ...transition, duration: DURATION.slow } },
};

/** Enters from the left. Used for editorial two-column splits. */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition },
};

/** Enters from the right. */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition },
};

/** A restrained scale-in for imagery and cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { ...transition, duration: DURATION.slow } },
};

/**
 * A slow "reveal" where the image itself over-scales and settles — the classic
 * editorial photography entrance.
 */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.editorial, ease: EASE },
  },
};

/** A hairline rule that draws itself horizontally. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

/**
 * Parent container that staggers its children.
 * @param stagger seconds between each child
 * @param delay   seconds before the first child
 */
export function staggerContainer(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/**
 * Standard viewport options: fire once, slightly before the element is fully in.
 *
 * The asymmetry is the important part, and it is what makes these reveals
 * survive a phone.
 *
 * `whileInView` is an IntersectionObserver, and an observer only samples at
 * frame boundaries. A flick-scroll on a touch screen covers 3000–6000px per
 * second, so an element can pass from below the viewport to above it between
 * two samples and never once be reported as intersecting. Paired with
 * `once: true` that is unrecoverable: the element stays at `opacity: 0`
 * forever, and the visitor scrolls past a blank band. The previous
 * `-80px 0px -80px 0px` narrowed the detection band at BOTH edges, which made
 * exactly this more likely — and it is why the site felt un-animated on mobile
 * while looking perfect on the desktop it was built on.
 *
 * So the top edge is expanded far past the viewport instead. Anything at or
 * above the current scroll position is always intersecting, which means an
 * element that got skipped still resolves to `visible` the moment the observer
 * next reports — it can never be stranded. The bottom edge keeps its ~80px
 * inset (as a percentage, so it scales with the device) so entrances still fire
 * just before the element is comfortably in view, exactly as before.
 *
 * Net effect: identical timing when scrolling normally, no blank bands when
 * scrolling fast.
 */
export const viewportOnce = { once: true, margin: '9999px 0px -10% 0px' } as const;

/**
 * For reveals that REPLAY on every entry (`<Reveal repeat />`).
 *
 * These cannot use `viewportOnce`: its expanded top edge means an element that
 * has scrolled above the viewport is still considered in view, so it would
 * never leave, never reset, and never play a second time. A replaying reveal
 * needs a genuine exit, so the margin is symmetric — it only trades the
 * stranding protection away because, unlike a one-shot, scrolling back is
 * guaranteed to fire it again.
 */
export const viewportRepeat = { margin: '0px 0px -10% 0px' } as const;
