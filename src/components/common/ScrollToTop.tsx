import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on route change — the browser does not do this for a
 * client-side router, and landing halfway down a new page is disorienting.
 *
 * Two deliberate exceptions:
 *  • A hash in the URL (`/services#modular-kitchen`) scrolls to that section.
 *  • Back/forward navigation is left to the browser's own scroll restoration.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    /*
     * KEEP LOOKING FOR THE TARGET, DO NOT ASSUME IT IS THERE.
     *
     * This waited exactly one animation frame, which is enough only when the
     * destination page is already rendered. Every route except the home page is
     * `React.lazy`, so following a footer link like `/services#modular-kitchen`
     * from another page runs this while `RouteFallback` is still on screen and
     * the services chunk is still downloading. `getElementById` returned null,
     * the frame passed, and the scroll silently never happened — the visitor
     * landed at the top of a thirteen-service page having asked for one of them.
     *
     * It then worked on the second attempt, because the chunk was cached by
     * then. That is exactly the shape of bug that survives manual testing.
     *
     * So it polls per frame until the section exists, giving up after a
     * generous window so a genuinely missing id cannot spin forever.
     */
    const id = hash.slice(1);
    const deadline = performance.now() + 3000;
    let frame = 0;

    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(attempt);
    };

    frame = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
