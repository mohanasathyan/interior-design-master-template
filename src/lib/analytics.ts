import { siteConfig } from '@/config/site.config';
import { isRoute, routes } from '@/config/routes';
import { isFilled } from './tokens';

/**
 * ============================================================================
 * ANALYTICS
 * ============================================================================
 * Conversion measurement for a template that will be cloned for many different
 * businesses — so every decision here is about staying inert until a client
 * supplies an ID, and then working without anyone editing a component.
 *
 * ---------------------------------------------------------------------------
 * 1 · OFF IS THE DEFAULT, AND OFF MEANS OFF
 * ---------------------------------------------------------------------------
 * While the IDs are `{{TOKENS}}` — the state every clone starts in — nothing
 * runs. No script tag, no `dataLayer`, no click listener, no cookies, no
 * console output. `isAnalyticsEnabled()` is a couple of regex tests and every
 * entry point returns early on it. An unconfigured clone pays for a few
 * hundred bytes of dead code and nothing else.
 *
 * ---------------------------------------------------------------------------
 * 2 · WHY CLICKS ARE TRACKED BY DELEGATION, NOT BY `onClick`
 * ---------------------------------------------------------------------------
 * The conversion surfaces are scattered: the navbar CTA, the floating action
 * buttons, the footer, the contact cards, the FAQ panel, the final CTA band,
 * every service row, the project dialog, the 404. Putting an `onClick` on each
 * would mean editing fifteen components, duplicating the same three lines in
 * each, and re-doing it every time someone adds a button.
 *
 * Instead ONE capture-phase listener reads the anchor that was clicked and
 * derives the event from its `href`:
 *
 *      tel:…                    →  phone_call_click
 *      mailto:…                 →  email_click
 *      wa.me / whatsapp.com     →  whatsapp_click
 *      /contact                 →  cta_click
 *
 * Nothing needs wiring, existing markup is untouched, and a button added next
 * year is tracked the moment it is rendered. Where a element needs to say
 * something the href cannot express, it can opt in with
 * `data-analytics-event` / `data-analytics-label` and that wins.
 *
 * The one conversion this cannot see is a successful form submission — there
 * is no link to classify — so `ContactForm` calls `trackEvent` directly.
 *
 * ---------------------------------------------------------------------------
 * 3 · GA4 AND GTM
 * ---------------------------------------------------------------------------
 * Both are supported and either can be used alone. They share `window.dataLayer`
 * but read it differently: GTM triggers on `{ event: 'name', … }` objects,
 * while gtag.js consumes `arguments` arrays. `trackEvent` therefore writes the
 * GTM-shaped object always, and additionally calls `gtag()` when GA4 is
 * configured directly. Pushing to `dataLayer` is safe before the script has
 * loaded — the array is the queue, which is precisely how both products are
 * designed — so no event is lost during the deferred load below.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  CONFIGURATION                                                              */
/* -------------------------------------------------------------------------- */

/** GA4 measurement IDs are `G-` followed by an alphanumeric run. */
const GA4_PATTERN = /^G-[A-Z0-9]{4,}$/i;
/** GTM container IDs are `GTM-` followed by an alphanumeric run. */
const GTM_PATTERN = /^GTM-[A-Z0-9]{4,}$/i;

interface ResolvedIds {
  ga4: string | null;
  gtm: string | null;
}

let resolved: ResolvedIds | null = null;

/**
 * The IDs actually usable, or `null` for each.
 *
 * A value is only accepted if it is filled in AND well-formed. A typo is
 * therefore inert rather than half-working, which matters because a malformed
 * ID otherwise fails silently inside Google's script hours after launch.
 */
function resolveIds(): ResolvedIds {
  if (resolved) return resolved;

  const { ga4MeasurementId, gtmContainerId } = siteConfig.analytics;

  const accept = (raw: string, pattern: RegExp, label: string): string | null => {
    if (!isFilled(raw)) return null; // still a token, or empty — silently off
    const value = raw.trim();
    if (pattern.test(value)) return value;

    /*
     * Filled in but malformed. Warned in development only: an empty ID must be
     * silent (it is the default state of every clone), but a typo is a mistake
     * worth surfacing to whoever just made it.
     */
    if (import.meta.env?.DEV) {
      console.warn(
        `[analytics] ${label} "${value}" does not look valid, so it was ignored.\n` +
          `  Expected ${label === 'GA4 measurement ID' ? 'G-XXXXXXXXXX' : 'GTM-XXXXXXX'}.\n` +
          `  Fix it in src/config/site.config.ts → analytics.`,
      );
    }
    return null;
  };

  resolved = {
    ga4: accept(ga4MeasurementId, GA4_PATTERN, 'GA4 measurement ID'),
    gtm: accept(gtmContainerId, GTM_PATTERN, 'GTM container ID'),
  };
  return resolved;
}

/** True when at least one provider is configured with a usable ID. */
export function isAnalyticsEnabled(): boolean {
  const { ga4, gtm } = resolveIds();
  return ga4 !== null || gtm !== null;
}

/* -------------------------------------------------------------------------- */
/*  EVENT VOCABULARY                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Every event the site can send, in one place.
 *
 * Names follow GA4 conventions: lower_snake_case, and the recommended
 * `generate_lead` for a completed enquiry so it lights up GA4's built-in
 * reporting rather than needing a custom definition.
 *
 * To add an event: add a key here, then either give the element a
 * `data-analytics-event` attribute or call `trackEvent` where it happens.
 */
export const ANALYTICS_EVENTS = {
  /** A completed contact form submission — the primary conversion. */
  generateLead: 'generate_lead',
  /** Any tap on a WhatsApp deep link. */
  whatsappClick: 'whatsapp_click',
  /** Any tap on a `tel:` link. */
  phoneClick: 'phone_call_click',
  /** Any tap on a `mailto:` link. */
  emailClick: 'email_click',
  /** A lead-generation call to action — consultation, quote, "start a project". */
  ctaClick: 'cta_click',
  /** A client-side route change. */
  pageView: 'page_view',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Arbitrary, JSON-serialisable parameters attached to an event. */
export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/* -------------------------------------------------------------------------- */
/*  TRANSPORT                                                                  */
/* -------------------------------------------------------------------------- */

type DataLayerEntry = Record<string, unknown> | IArguments | unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ensure the queue exists. Safe to call repeatedly. */
function dataLayer(): DataLayerEntry[] {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

/**
 * Send an event.
 *
 * The single entry point for every measurement on the site — components never
 * touch `dataLayer` or `gtag` directly. A no-op when analytics is disabled, so
 * call sites never need to guard.
 *
 * @example trackEvent(ANALYTICS_EVENTS.generateLead, { form: 'contact' })
 */
export function trackEvent(name: AnalyticsEventName | string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined' || !isAnalyticsEnabled()) return;

  /* Drop undefined values so they do not land in reports as "undefined". */
  const payload: AnalyticsParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }

  /* GTM shape. Also a durable record for anything else reading the queue. */
  dataLayer().push({ event: name, ...payload });

  /* GA4 direct. `gtag` is defined by the loader below only when configured. */
  const { ga4 } = resolveIds();
  if (ga4 && typeof window.gtag === 'function') {
    window.gtag('event', name, payload);
  }
}

/* -------------------------------------------------------------------------- */
/*  LOADING                                                                    */
/* -------------------------------------------------------------------------- */

const GTM_SCRIPT_ID = 'analytics-gtm';
const GA4_SCRIPT_ID = 'analytics-ga4';

let initialised = false;

function injectScript(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * Load whichever providers are configured.
 *
 * Idempotent — React StrictMode double-invokes effects in development, and a
 * second `gtm.js` would double every hit.
 */
export function initAnalytics(): void {
  if (initialised || typeof window === 'undefined' || !isAnalyticsEnabled()) return;
  initialised = true;

  const { ga4, gtm } = resolveIds();
  const queue = dataLayer();

  if (gtm) {
    /* The standard GTM bootstrap. The `<noscript>` iframe from Google's snippet
       is deliberately omitted: this application does not render without
       JavaScript, so it could never fire. */
    queue.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    injectScript(GTM_SCRIPT_ID, `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`);
  }

  if (ga4) {
    /* `gtag` must push `arguments` itself — not a copied array — because that
       is the shape gtag.js expects to find waiting in the queue. */
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dataLayer().push(arguments);
    };
    window.gtag('js', new Date());
    /*
     * `send_page_view: false`, because this is a single-page app: the initial
     * view and every route change are sent from one place in `Analytics.tsx`.
     * Leaving it on would report the landing page twice.
     */
    window.gtag('config', ga4, { send_page_view: false });
    injectScript(GA4_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`);
  }
}

/* -------------------------------------------------------------------------- */
/*  AUTOMATIC CLICK TRACKING                                                   */
/* -------------------------------------------------------------------------- */

/** WhatsApp deep links, in every form `whatsappLink()` can produce. */
const WHATSAPP_PATTERN = /(?:wa\.me|(?:api|web|chat)\.whatsapp\.com)/i;

interface ClassifiedClick {
  name: string;
  params: AnalyticsParams;
}

/** A short, clean label for reporting — the element's visible text. */
function labelFor(element: HTMLElement): string {
  return (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
}

/**
 * Work out which conversion, if any, a clicked element represents.
 *
 * Exported for the test suite: the classification rules are the part of this
 * file most likely to drift as markup changes, so they are checkable directly.
 */
export function classifyClick(target: EventTarget | null): ClassifiedClick | null {
  if (!(target instanceof Element)) return null;

  /* An explicit annotation always wins, so a component can describe something
     the href cannot — a dialog opening, a filter, a slider interaction. */
  const annotated = target.closest<HTMLElement>('[data-analytics-event]');
  if (annotated?.dataset.analyticsEvent) {
    return {
      name: annotated.dataset.analyticsEvent,
      params: {
        label: annotated.dataset.analyticsLabel ?? labelFor(annotated),
        page_path: window.location.pathname,
      },
    };
  }

  const anchor = target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor) return null;

  const href = anchor.getAttribute('href') ?? '';
  const shared: AnalyticsParams = {
    label: labelFor(anchor),
    page_path: window.location.pathname,
  };

  if (href.startsWith('tel:')) {
    return { name: ANALYTICS_EVENTS.phoneClick, params: shared };
  }
  if (href.startsWith('mailto:')) {
    return { name: ANALYTICS_EVENTS.emailClick, params: shared };
  }
  if (WHATSAPP_PATTERN.test(href)) {
    return { name: ANALYTICS_EVENTS.whatsappClick, params: shared };
  }

  /*
   * Any internal link into the contact route is a lead-generation CTA: the
   * navbar's "Book Free Consultation", the hero's "Get Free Quote", every
   * "Request a Quote" on a service row, the project dialog, the final band.
   * Matching the destination rather than the wording means it keeps working
   * when the copy is rewritten per client — which it will be.
   */
  if (isRoute(href, routes.contact)) {
    return { name: ANALYTICS_EVENTS.ctaClick, params: shared };
  }

  return null;
}

/**
 * Begin delegated click tracking. Returns a cleanup function.
 *
 * Capture phase, so the event is recorded even if something downstream stops
 * propagation. `passive` because nothing here calls `preventDefault` — the
 * navigation must proceed exactly as it did before.
 */
export function startClickTracking(): () => void {
  if (typeof document === 'undefined' || !isAnalyticsEnabled()) return () => {};

  const onClick = (event: MouseEvent) => {
    const classified = classifyClick(event.target);
    if (classified) trackEvent(classified.name, classified.params);
  };

  document.addEventListener('click', onClick, { capture: true, passive: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}

/** Report a page view. Called on first load and on every client-side route change. */
export function trackPageView(path: string, title?: string): void {
  trackEvent(ANALYTICS_EVENTS.pageView, {
    page_path: path,
    page_location: typeof window === 'undefined' ? undefined : window.location.href,
    page_title: title ?? (typeof document === 'undefined' ? undefined : document.title),
  });
}
