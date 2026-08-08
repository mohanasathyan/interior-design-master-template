/**
 * ============================================================================
 * DOCUMENT SHELL COPY
 * ============================================================================
 * The three sentences a visitor can see BEFORE any of this application's
 * JavaScript has run — the boot splash's failsafe message and the `<noscript>`
 * notice. They are injected into `index.html` at build time (and in dev) by the
 * plugin in `vite.config.ts`.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS IS ITS OWN FILE AND NOT PART OF copy.config.ts
 * ---------------------------------------------------------------------------
 * Two reasons, and both matter:
 *
 *  1. TIMING. Everything in `copy.config.ts` is rendered by React. These lines
 *     exist precisely for the cases where React never got there — a bundle that
 *     404s after a redeploy, a blocked script, a browser with JavaScript off.
 *     Copy that has to survive the app not loading cannot live in the app.
 *
 *  2. THE BUILD IMPORTS IT. `vite.config.ts` runs in Node, so anything it pulls
 *     in is evaluated by the config loader. `copy.config.ts` imports icon
 *     components for the assurance list; this file deliberately imports nothing
 *     at all, so injecting the shell costs the build nothing.
 *
 * Keep these SHORT and self-contained. They are read by someone who is already
 * looking at a page that is not working, and they render in the system font
 * with none of the site's own styling available.
 * ============================================================================
 */

export interface ShellCopy {
  /**
   * The document title of last resort, used only when `seo.defaultTitle` AND
   * `business.name` are both still placeholders — so in practice only during a
   * pre-configuration review.
   *
   * It lives here because BOTH the runtime `<Seo />` component and the
   * build-time head injector need it, and it used to be written out separately
   * in each. Two copies of the same fallback is how a clone ends up with one
   * title in the browser tab and a different one on the share card. It is also
   * the one string that names the vertical, so a clone of this template for a
   * different trade has exactly one place to change it.
   */
  fallbackTitle: string;
  /**
   * Shown under the boot spinner after ten seconds, and only then — a healthy
   * page removes the whole splash long before it appears.
   */
  bootFallback: string;
  /** The reload link that follows it. Two or three words. */
  bootFallbackLink: string;
  /**
   * Shown to a browser with JavaScript disabled. This is the one place on the
   * site where a visitor is asked to fall back to a phone call, so say who they
   * would be calling — it is otherwise the only page they will ever see.
   */
  noscript: string;
}

export const shellCopy: ShellCopy = {
  fallbackTitle: 'Interior Design Studio',
  bootFallback: 'This is taking longer than expected.',
  bootFallbackLink: 'Reload the page',
  noscript:
    'This website needs JavaScript to display fully. Please call or email our design studio and we will be glad to help.',
};

export default shellCopy;
