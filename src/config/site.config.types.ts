/**
 * ============================================================================
 * SITE CONFIG — TYPE CONTRACT
 * ============================================================================
 * The shape of `src/config/site.config.ts`.
 *
 * You do not need to edit this file when cloning the template. It exists so
 * that TypeScript catches typos, missing fields and malformed values the moment
 * you edit the config — turning "the client's phone number is missing on one
 * page" into a compile-time error instead of a lost lead.
 * ============================================================================
 */

/**
 * A managed image reference.
 *
 * `src` may either be a real path/URL (`/images/hero.jpg`,
 * `https://cdn.example.com/hero.jpg`) or an unreplaced placeholder token such
 * as `{{HERO_IMAGE}}`. When it is still a token, the `<Img />` component renders
 * a branded, on-palette SVG placeholder instead of a broken image — so the site
 * is fully presentable before a single photograph has been supplied.
 */
export interface ManagedImage {
  /** Real asset path/URL, or a `{{TOKEN}}` placeholder. */
  src: string;
  /**
   * Descriptive alt text. Required — it is both an accessibility and an SEO
   * asset. May contain `{{TOKEN}}` interpolations, e.g. "Modular kitchen by
   * {{BUSINESS_NAME}} in {{CITY}}".
   */
  alt: string;
  /** Intrinsic width in px. Used to reserve layout space and avoid CLS. */
  width?: number;
  /** Intrinsic height in px. Used to reserve layout space and avoid CLS. */
  height?: number;
  /** Short label drawn onto the generated placeholder (e.g. "Hero"). */
  label?: string;
  /**
   * Compression level for CDN-backed sources, 1–100. Defaults to 74, which is
   * right for photography that sits behind text or inside a card.
   *
   * Raise it (82–88) only for an image the visitor actually looks *at* rather
   * than through — the hero being the obvious one. Above ~88 the file size
   * climbs steeply for detail no screen resolves.
   */
  quality?: number;
  /**
   * SELF-HOSTED IMAGES ONLY. The widths you exported the file at.
   *
   * A local file cannot be resized on the fly, so without this the browser is
   * handed one file at every screen size — a 3840px hero downloaded onto a
   * 390px phone, then squeezed by the browser's own fast, low-quality
   * downscaler. That is both the slowest and the *softest* possible outcome,
   * which is why a self-hosted hero so often looks worse than a CDN one.
   *
   * Export the file at each width using the naming convention
   * `<name>-<width>.<ext>` alongside the original, list the widths here, and
   * `<Img>` emits a proper `srcset`:
   *
   *   src:    '/images/hero.jpg'
   *   widths: [768, 1280, 1920, 2560, 3840]
   *   →       /images/hero-768.jpg 768w, /images/hero-1280.jpg 1280w, …
   *
   * List widths your master can actually fill, and go far enough that 2×
   * (Retina) displays still get a true-resolution file. Omit the field entirely
   * and the single `src` is used as-is — nothing breaks, it is simply not
   * responsive.
   */
  widths?: number[];
  /**
   * SELF-HOSTED IMAGES ONLY. Modern formats exported alongside the `src`,
   * **best first**.
   *
   * `['avif', 'webp']` makes `<Img>` render a `<picture>` with one `<source>`
   * per format and the original `src` as the final `<img>` fallback. The
   * browser takes the first type it understands, so nothing needs a polyfill
   * and nothing is left behind:
   *
   *   AVIF  → Chrome 85+, Firefox 93+, Safari 16.4+   (~95% of traffic)
   *   WebP  → everything since 2020                   (~97%)
   *   JPEG  → the remainder
   *
   * The saving is not marginal. On the hero, 1920px costs 202 KB as AVIF,
   * 337 KB as WebP and 506 KB as JPEG — the same photograph, visually
   * identical.
   *
   * Requires `widths`, and every listed format must exist at every listed
   * width (`hero-1280.avif`, `hero-1280.webp`, …).
   */
  formats?: string[];
}

/** A single day's trading hours. */
export interface BusinessHour {
  /** Full day name, e.g. "Monday". */
  day: string;
  /** Opening time in 24h `HH:MM`, or `null` when closed. */
  opens: string | null;
  /** Closing time in 24h `HH:MM`, or `null` when closed. */
  closes: string | null;
}

/** Social profile entry. Set `url` to an empty string to hide the icon. */
export interface SocialLink {
  /** Platform key — drives which Lucide icon is rendered. */
  platform: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'pinterest' | 'x';
  /** Human label used for `aria-label` and screen readers. */
  label: string;
  /** Profile URL, or a `{{TOKEN}}` placeholder. Empty string hides the link. */
  url: string;
}

/** Per-route SEO metadata. */
export interface PageSeo {
  /** Page title — the site title template is applied around it. */
  title: string;
  /** Meta description, ideally 140–160 characters. */
  description: string;
  /** Route path this metadata belongs to, e.g. `/services`. */
  path: string;
  /** Optional route-specific social share image. Falls back to the global one. */
  ogImage?: string;
}

/** Brand colour tokens. Every value must be a valid CSS colour. */
export interface ThemeColors {
  /** Page background — the warm luxury canvas. */
  canvas: string;
  /** Elevated surfaces: cards, panels, sheets. */
  surface: string;
  /** A slightly recessed surface used for alternating bands. */
  surfaceMuted: string;
  /** Primary body and heading text. */
  ink: string;
  /** Secondary/supporting text. Must hold 4.5:1 against `canvas`. */
  inkMuted: string;
  /** Brand accent — the metallic used for CTA fills, borders and icons. */
  accent: string;
  /**
   * A darkened accent, used for ACCENT-COLOURED TEXT on light backgrounds.
   *
   * This exists for a reason worth keeping: the brand gold (#B8860B) only
   * reaches ~3:1 against the light canvas, which fails WCAG AA for normal-size
   * text. Fills, borders and icons are fine at 3:1; small gold text is not.
   * So the palette keeps the brand gold for surfaces and uses this darker
   * variant wherever gold is set as type. Must hold 4.5:1 against `canvas`.
   */
  accentStrong: string;
  /**
   * The gold used for SOLID FILLS that carry white text — primary buttons,
   * active chips, hover fills.
   *
   * White on the brand gold is only 3.25:1. This deeper gold is the lightest
   * value that still clears WCAG AA with white (4.68:1), so the approved
   * "gold button, white label" treatment is preserved without failing.
   */
  accentButton: string;
  /** Accent hover/active state. */
  accentHover: string;
  /** Text colour placed on top of `accent` fills. */
  accentContrast: string;
  /** Hairline borders and dividers. */
  border: string;
  /** Deep tone used for the footer and dark editorial bands. */
  contrast: string;
  /** Text colour used on top of `contrast` surfaces. */
  contrastInk: string;
}

export interface SiteConfig {
  /** Core identity of the business. */
  business: {
    name: string;
    /** Short legal/registered name used in schema and the footer copyright. */
    legalName: string;
    /** One-line positioning statement shown under the logo and in the footer. */
    tagline: string;
    /** 2–3 sentence description used for schema.org and share cards. */
    description: string;
    /** Year the studio was founded — drives the "since" line and schema. */
    foundingYear: string;
    /** Price band shown to search engines: '$', '$$', '$$$', '$$$$'. */
    priceRange: string;
    /**
     * Average public review score, e.g. "4.9". Shown beside the star row and
     * emitted as `aggregateRating` schema — but only once it holds a real
     * number, since fabricated ratings are a Google penalty risk.
     */
    rating: string;
    /** Number of public reviews backing `rating`, e.g. "180". */
    reviewCount: string;
    /**
     * The founder's identity.
     *
     * It lives HERE, not in `src/data/about.ts`, because it is quoted in more
     * than one place — the About page letter, the home page pull-quote
     * attribution and the founder photograph's alt text. Anything named in more
     * than one place needs exactly one home, or the copies drift.
     *
     * Registered as `{{FOUNDER_NAME}}`, `{{FOUNDER_ROLE}}` and
     * `{{FOUNDER_CREDENTIAL}}`, so copy anywhere can quote it. The long-form
     * founder's letter stays in `src/data/about.ts` — that is copy, not
     * identity.
     */
    founder: {
      /** Full name, e.g. "Priya Sharma". */
      name: string;
      /** Job title, e.g. "Founder & Principal Designer". */
      role: string;
      /** Qualification or credential line, e.g. "B.Arch, 14 years' practice". */
      credential: string;
    };
  };

  /**
   * ---------------------------------------------------------------------------
   * HEADLINE COMMERCIAL FACTS
   * ---------------------------------------------------------------------------
   * Figures the studio quotes in more than one place — FAQ answers, the trust
   * strip, marketing copy. Each is registered as a `{{TOKEN}}`, so changing the
   * warranty term or the entry price here updates every sentence that mentions
   * it, on every page, with no risk of two pages contradicting each other.
   *
   * Keep the UNIT in the value ("5 years", not "5"), because these are dropped
   * straight into running prose.
   */
  facts: {
    /** `{{WARRANTY_YEARS}}` — e.g. "5 years". */
    warrantyYears: string;
    /** `{{PRICE_STARTING}}` — entry price for a single room, e.g. "₹3.5 lakh". */
    priceStarting: string;
    /** `{{PRICE_FULL_HOME}}` — typical full-home band, e.g. "₹12–35 lakh". */
    priceFullHome: string;
    /** `{{TIMELINE_ROOM}}` — a single room, e.g. "3–4 weeks". */
    timelineRoom: string;
    /** `{{TIMELINE_HOME}}` — a full home, e.g. "10–14 weeks". */
    timelineHome: string;
    /** `{{TIMELINE_DESIGN}}` — the design phase alone, e.g. "2–3 weeks". */
    timelineDesign: string;
  };

  /** Everything a visitor can use to reach the business. */
  contact: {
    /** Display phone number, e.g. "+91 98765 43210". */
    phone: string;
    /** Tel: URI — digits and a leading + only, e.g. "+919876543210". */
    phoneHref: string;
    /** Optional second line (sales, support). Empty string hides it. */
    phoneAlt: string;
    email: string;
    /** WhatsApp number in international format without symbols, e.g. "919876543210". */
    whatsapp: string;
    /** Pre-filled WhatsApp message. Supports `{{TOKEN}}` interpolation. */
    whatsappMessage: string;
  };

  /** Physical location and service area. */
  location: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    /** ISO 3166-1 alpha-2, e.g. "IN". Used by schema.org. */
    countryCode: string;
    /** Google Maps embed URL (`https://www.google.com/maps/embed?pb=...`). */
    mapEmbedUrl: string;
    /** "Get directions" link target. */
    mapLink: string;
    /** Public "leave us a review" link. */
    reviewLink: string;
    latitude: string;
    longitude: string;
    /** Neighbourhoods / cities served — rendered in the footer for local SEO. */
    serviceAreas: string[];
  };

  /** Trading hours, Monday first. */
  hours: BusinessHour[];

  /** Social profiles. Order is preserved in the UI. */
  social: SocialLink[];

  /** Logos and brand marks. */
  brand: {
    /** Logo for light backgrounds. */
    logo: ManagedImage;
    /** Logo for dark backgrounds (footer, transparent hero navbar). */
    logoLight: ManagedImage;
    /**
     * Fallback wordmark. Rendered as elegant type when no logo image is set —
     * defaults to the business name.
     */
    wordmark: string;
    /** Short monogram (1–2 characters) used in tight spaces and the favicon. */
    monogram: string;
  };

  /** Design tokens. Edited here, applied to CSS custom properties at runtime. */
  theme: {
    colors: ThemeColors;
    fonts: {
      /** CSS font-family stack for headings. */
      display: string;
      /** CSS font-family stack for body copy. */
      body: string;
    };
    /** Base corner radius in px. Luxury templates stay low: 2–6. */
    radius: number;
  };

  /** Imagery used across the site. All entries accept `{{TOKEN}}` placeholders. */
  media: {
    hero: ManagedImage;
    /** Shown above the studio details on the contact page. */
    studioDetail: ManagedImage;
    aboutPrimary: ManagedImage;
    aboutSecondary: ManagedImage;
    founder: ManagedImage;
    philosophy: ManagedImage;
    materials: ManagedImage;
    ctaBackdrop: ManagedImage;
    /**
     * Soft, very light interior photographs used as full-bleed backdrops
     * behind light content bands. They sit under a heavy canvas wash, so
     * choose calm, low-contrast, pale images — anything busy will fight the
     * type. Set either to a `{{TOKEN}}` to fall back to a flat colour band.
     */
    backdrops: {
      /** Behind feature-card grids (why-us, values, quality standards). */
      soft: ManagedImage;
      /** Behind the promise, FAQ and contact-card bands. */
      warm: ManagedImage;
    };
    /**
     * The two halves of the home page's before/after comparison slider.
     *
     * ⚠️ These two are unlike every other pair of images on the site: they are
     * shown SUPERIMPOSED, one clipped over the other, so they must be shot from
     * the same position. Three things have to hold or the transformation stops
     * reading as one room and starts reading as two photographs:
     *
     *   1. IDENTICAL intrinsic dimensions. The slider stacks both layers in the
     *      same box with the same `object-fit`/`object-position`, so matching
     *      `width`/`height` is what makes the alignment exact rather than
     *      approximate.
     *   2. The same camera position, lens and framing. Architectural lines —
     *      the floor edge, the ceiling soffit, the window mullions — should run
     *      straight through the divider without a step.
     *   3. The same white balance and exposure. A colour shift across the seam
     *      reads as a photographic error, not as a design transformation.
     */
    transformation: {
      /** The empty / unfinished space. Revealed to the LEFT of the divider. */
      before: ManagedImage;
      /** The completed interior. Revealed to the RIGHT of the divider. */
      after: ManagedImage;
    };
    pageHeaders: {
      services: ManagedImage;
      projects: ManagedImage;
      about: ManagedImage;
      contact: ManagedImage;
    };
  };

  /** Site-wide SEO settings. */
  seo: {
    /** Absolute origin with no trailing slash, e.g. "https://example.com". */
    siteUrl: string;
    /** `%s` is replaced by the page title. */
    titleTemplate: string;
    /** Title used on the home page and as a fallback. */
    defaultTitle: string;
    defaultDescription: string;
    /** Absolute URL to the 1200×630 social share image. */
    ogImage: string;
    /** Twitter/X handle including the `@`. Empty string omits the tag. */
    twitterHandle: string;
    /** BCP-47 locale, e.g. "en_IN". */
    locale: string;
    /** Per-route metadata, keyed by a stable page id. */
    pages: Record<string, PageSeo>;
  };

  /** Lead-capture wiring. */
  forms: {
    /**
     * Where the contact form posts. Works out of the box with Formspree,
     * Web3Forms, Basin, Netlify Forms or your own endpoint.
     * Leave as a `{{TOKEN}}` to run the form in demo mode (validates and shows
     * the success state without sending anything).
     */
    endpoint: string;
    /** Budget bands offered in the contact form's select. */
    budgetOptions: string[];
    /** Where the visitor heard about the studio — optional lead-quality signal. */
    successMessage: string;
  };

  /**
   * ---------------------------------------------------------------------------
   * ANALYTICS
   * ---------------------------------------------------------------------------
   * Both fields are OPTIONAL in practice: while either is a `{{TOKEN}}`, an
   * empty string, or malformed, that provider is simply never loaded. No
   * script, no `dataLayer`, no listener, no console noise. Paste a real ID in
   * and it initialises on the next load with no code change.
   *
   * ⚠️ USE ONE OR THE OTHER, not both, unless you know why you want both.
   * The usual setup is GTM alone, with the GA4 tag configured inside the
   * container. Filling in BOTH fields loads GTM *and* gtag.js, and if the
   * container also forwards to the same GA4 property every conversion is
   * counted twice.
   */
  analytics: {
    /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Leave as a token to disable. */
    ga4MeasurementId: string;
    /** GTM container ID, e.g. "GTM-XXXXXXX". Leave as a token to disable. */
    gtmContainerId: string;
  };

  /** Feature switches — turn whole UI affordances on or off per client. */
  features: {
    floatingWhatsApp: boolean;
    floatingCall: boolean;
    backToTop: boolean;
    announcementBar: boolean;
    /** Announcement bar copy. Supports `{{TOKEN}}` interpolation. */
    announcementText: string;
    /** Show the Google Maps embed on the contact page. */
    mapEmbed: boolean;
    /** Show the testimonials band. */
    testimonials: boolean;
  };

  /** Global CTA copy, so wording is changed in exactly one place. */
  cta: {
    primary: string;
    secondary: string;
    tertiary: string;
    call: string;
    whatsapp: string;
  };

  /** The headline, sub-headline and call to action on the home page hero. */
  heroCopy: {
    /** First headline line, in white. */
    headlineLead: string;
    /** Second headline line, in brand gold — the phrase to emphasise. */
    headlineAccent: string;
    /** Third headline line, in white. Set to `''` to drop it entirely. */
    headlineTail: string;
    /** One or two sentences under the headline. Supports `{{TOKENS}}`. */
    subheadline: string;
    /** Label on the hero's single call to action. */
    ctaLabel: string;
  };

  /** Copy for the home page's before/after transformation slider. */
  transformationCopy: {
    /** Small uppercase label above the headline. */
    eyebrow: string;
    /** The section headline. Supports `{{TOKENS}}`. */
    title: string;
    /** Supporting sentence under the headline. Supports `{{TOKENS}}`. */
    lead: string;
    /**
     * Badge pinned over the left half of the frame. Keep it to one or two
     * words — it sits on photography, not on a surface.
     */
    beforeLabel: string;
    /** Badge pinned over the right half of the frame. */
    afterLabel: string;
    /**
     * The hint shown beneath the frame, e.g. "Drag to compare". It is a visual
     * affordance only: the slider announces itself properly to assistive
     * technology through `handleLabel`, which is what a screen-reader user
     * actually hears.
     */
    hint: string;
    /**
     * Accessible name for the draggable handle, read by screen readers in
     * place of the visual hint above.
     */
    handleLabel: string;
  };
}
