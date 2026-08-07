import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initAnalytics,
  isAnalyticsEnabled,
  startClickTracking,
  trackPageView,
} from '@/lib/analytics';

/**
 * ============================================================================
 * ANALYTICS MOUNT POINT
 * ============================================================================
 * Renders nothing. Its whole job is to own the three side effects measurement
 * needs, in a component that sits inside the router and survives every route
 * change.
 *
 *  1. Load the provider scripts — deferred, see below.
 *  2. Attach the delegated click listener that classifies conversions.
 *  3. Report a page view on the first load and on each client-side navigation.
 *
 * ---------------------------------------------------------------------------
 * WHY THE LOAD IS DEFERRED
 * ---------------------------------------------------------------------------
 * `gtm.js` and `gtag.js` are roughly 50–100 KB of third-party JavaScript that
 * contributes nothing a visitor can see. Requested during the initial render
 * they compete for bandwidth and main-thread time with the hero image, which is
 * the LCP element on the highest-traffic page.
 *
 * So the injection waits for the browser to be idle. Nothing is lost by
 * waiting: `trackEvent` writes into `window.dataLayer`, which is a plain array
 * until the script arrives and drains it — a visitor who taps "call" before
 * then still has the event recorded. `requestIdleCallback` is not available in
 * every engine (Safari only added it in 17), so a timeout backs it up.
 *
 * ---------------------------------------------------------------------------
 * WHEN ANALYTICS IS OFF
 * ---------------------------------------------------------------------------
 * Which is every clone until a client supplies an ID. The guard is the first
 * thing each effect does, so nothing is scheduled, no listener is attached and
 * no queue is created. The cost of the whole system in that state is this
 * component mounting and returning `null`.
 * ============================================================================
 */
export function Analytics() {
  const { pathname, search } = useLocation();
  const lastPath = useRef<string | null>(null);

  /* ---- Load the providers, once, when the browser is free ---- */
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const idle = window.requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(() => initAnalytics(), { timeout: 4000 });
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(initAnalytics, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  /* ---- Delegated conversion tracking ---- */
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    return startClickTracking();
  }, []);

  /*
   * ---- Page views ----
   *
   * Sent from here for the initial load as well as for route changes, which is
   * why `gtag('config')` sets `send_page_view: false`. One source for the
   * measurement means the landing page cannot be counted twice.
   *
   * `lastPath` guards against a re-render with an unchanged location — React
   * StrictMode replays effects in development, and a duplicated page view is
   * exactly the kind of error that is invisible until the numbers look wrong.
   */
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const path = `${pathname}${search}`;
    if (lastPath.current === path) return;
    lastPath.current = path;

    /* A frame's grace so `<Seo>` has committed the new document.title. */
    const frame = requestAnimationFrame(() => trackPageView(path));
    return () => cancelAnimationFrame(frame);
  }, [pathname, search]);

  return null;
}
