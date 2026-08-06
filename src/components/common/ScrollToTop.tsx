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
    if (hash) {
      /* Wait a frame so the target section has been committed to the DOM. */
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash, key]);

  return null;
}
