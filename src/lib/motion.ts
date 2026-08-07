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
 * ============================================================================
 * DELAY, FOLDED INTO THE VARIANT
 * ============================================================================
 * Returns a copy of `variants` with `delay` merged into its `visible`
 * transition. Everything else — duration, curve, distance — is left exactly as
 * the preset declares it.
 *
 * WHY THIS IS NOT JUST `transition={{ delay }}`
 *
 * A `transition` PROP on a motion component is only a FALLBACK. When the
 * variant being animated to carries its own `transition`, that object replaces
 * the prop wholesale rather than merging with it. From `animateTarget` in
 * motion-dom:
 *
 *     let { transition, transitionEnd, ...target } = targetAndTransition;
 *     const defaultTransition = visualElement.getDefaultTransition();  // props.transition
 *     transition = transition
 *       ? resolveTransition(transition, defaultTransition)
 *       : defaultTransition;
 *
 * …and `resolveTransition` merges the two ONLY when the variant opts in with
 * `inherit: true`. Every preset above declares a `transition` — that is what
 * gives each one its duration and curve — so none of them ever reached the
 * fallback. `<m.div variants={fadeUp} transition={{ delay }} />` animated for
 * the right duration on the right curve and with NO DELAY AT ALL.
 *
 * Nothing warned, nothing threw, and each element still animated. The only
 * symptom was that everything arrived at once: a whole page of reveals firing
 * on the same frame instead of as a sequence. Folding the delay into the
 * variant puts it on the winning side of that precedence rule.
 *
 * ⚠️ THE `delay === 0` EARLY RETURN IS LOAD-BEARING — it is not an
 * optimisation, and removing it silently breaks every `<RevealGroup />`.
 *
 * A parent's `staggerChildren` reaches each child as an OPTION, and
 * `animateTarget` applies that option before spreading the variant's own
 * transition over the top:
 *
 *     const valueTransition = { delay, ...getValueTransition(transition, key) };
 *
 * So a `delay: 0` sitting in a child's variant would overwrite the stagger the
 * parent had just computed for it, and a staggered grid would collapse into a
 * single beat. Returning the preset untouched leaves the key absent, and an
 * absent key is precisely what lets the parent's value survive the spread.
 *
 * For the same reason this never mutates: the preset objects are shared with
 * `<RevealItem />`, which depends on them staying delay-free.
 */
export function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;

  const visible = variants.visible;
  /* The presets are all plain objects. A `TargetResolver` function has no
     transition to merge into, so it is handed back rather than guessed at. */
  if (typeof visible !== 'object') return variants;

  return {
    ...variants,
    visible: { ...visible, transition: { ...visible.transition, delay } },
  };
}

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
