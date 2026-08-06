import type { SiteConfig } from './site.config.types';
// Relative, not the `@/` alias: this module is also imported by vite.config.ts
// (to inject real metadata into index.html at build time), and the alias is not
// available in that context.
import { photo } from '../lib/images';

/**
 * ============================================================================
 *                      ⭐  THE ONLY FILE YOU MUST EDIT  ⭐
 * ============================================================================
 *
 *  MASTER TEMPLATE — INTERIOR DESIGN
 *
 *  Every business detail on this website is read from this object. Clone the
 *  repository, replace the `{{TOKENS}}` below with the client's real details,
 *  drop their photographs into `/public/images/`, and the entire site — all
 *  five pages, the schema.org markup, the sitemap, the share cards, the
 *  WhatsApp deep links and the colour system — updates itself.
 *
 *  ---------------------------------------------------------------------------
 *  HOW PLACEHOLDERS WORK
 *  ---------------------------------------------------------------------------
 *  Any string of the form `{{SOMETHING}}` is treated as "not yet filled in".
 *
 *   • Text placeholders render as-is, so unfilled fields are impossible to miss
 *     during a client review.
 *   • Image placeholders (`{{HERO_IMAGE}}`) automatically render an elegant,
 *     on-brand SVG in place of a broken image — the site looks finished on day
 *     one, even with zero photography.
 *   • Link placeholders (`{{INSTAGRAM}}`) are detected and rendered as inert,
 *     so you never ship a dead link.
 *
 *  Marketing copy elsewhere in `src/data/` can embed tokens too — for example
 *  "Serving {{CITY}} since {{FOUNDING_YEAR}}" — and they are interpolated from
 *  this config at render time. See `src/lib/tokens.ts` for the token registry.
 *
 *  ---------------------------------------------------------------------------
 *  GO-LIVE CHECKLIST
 *  ---------------------------------------------------------------------------
 *   1. Replace every `{{TOKEN}}` in this file.
 *   2. Add images to `/public/images/` and point `media` at them.
 *   3. Replace `/public/favicon.svg` + `/public/apple-touch-icon.png`.
 *   4. Set `seo.siteUrl` to the live domain (no trailing slash).
 *   5. Set `forms.endpoint` to a real form endpoint.
 *   6. Run `npm run build` — robots.txt and sitemap.xml are generated from
 *      seo.siteUrl, and the build warns loudly if it is still a placeholder.
 *   7. Review `src/data/*` — services, projects, FAQs and testimonials.
 * ============================================================================
 */
export const siteConfig: SiteConfig = {
  /* ==========================================================================
   * 1 · BUSINESS IDENTITY
   * ========================================================================== */
  business: {
    name: '{{BUSINESS_NAME}}',
    legalName: '{{LEGAL_NAME}}',
    tagline: '{{TAGLINE}}',
    description:
      'A luxury interior design studio creating considered, liveable spaces for homes and workplaces. From concept and 3D visualisation through to turnkey execution, every project is delivered by one accountable team.',
    foundingYear: '{{FOUNDING_YEAR}}',
    priceRange: '$$$',
    /* Leave as tokens until you have genuine public reviews to cite. */
    rating: '{{GOOGLE_RATING}}',
    reviewCount: '{{REVIEW_COUNT}}',
  },

  /* ==========================================================================
   * 2 · CONTACT  —  drives every call, WhatsApp and mail link on the site
   * ========================================================================== */
  contact: {
    phone: '{{PHONE}}',
    phoneHref: '{{PHONE_HREF}}', // digits only, e.g. +919876543210
    phoneAlt: '{{PHONE_ALT}}',
    email: '{{EMAIL}}',
    whatsapp: '{{WHATSAPP}}', // e.g. 919876543210 — no +, spaces or dashes
    whatsappMessage:
      "Hello {{BUSINESS_NAME}}, I'd like to discuss an interior design project. Could we schedule a consultation?",
  },

  /* ==========================================================================
   * 3 · LOCATION & SERVICE AREA
   * ========================================================================== */
  location: {
    addressLine1: '{{ADDRESS_LINE_1}}',
    addressLine2: '{{ADDRESS_LINE_2}}',
    city: '{{CITY}}',
    state: '{{STATE}}',
    postalCode: '{{POSTAL_CODE}}',
    country: '{{COUNTRY}}',
    countryCode: '{{COUNTRY_CODE}}',
    mapEmbedUrl: '{{GOOGLE_MAP}}',
    mapLink: '{{GOOGLE_MAP_LINK}}',
    reviewLink: '{{GOOGLE_REVIEW_LINK}}',
    latitude: '{{LATITUDE}}',
    longitude: '{{LONGITUDE}}',
    serviceAreas: [
      '{{SERVICE_AREA_1}}',
      '{{SERVICE_AREA_2}}',
      '{{SERVICE_AREA_3}}',
      '{{SERVICE_AREA_4}}',
      '{{SERVICE_AREA_5}}',
      '{{SERVICE_AREA_6}}',
    ],
  },

  /* ==========================================================================
   * 4 · BUSINESS HOURS  —  also emitted as openingHoursSpecification schema
   * ========================================================================== */
  hours: [
    { day: 'Monday', opens: '10:00', closes: '19:00' },
    { day: 'Tuesday', opens: '10:00', closes: '19:00' },
    { day: 'Wednesday', opens: '10:00', closes: '19:00' },
    { day: 'Thursday', opens: '10:00', closes: '19:00' },
    { day: 'Friday', opens: '10:00', closes: '19:00' },
    { day: 'Saturday', opens: '10:00', closes: '17:00' },
    { day: 'Sunday', opens: null, closes: null }, // null = closed
  ],

  /* ==========================================================================
   * 5 · SOCIAL PROFILES  —  set `url: ''` to remove an icon entirely
   * ========================================================================== */
  social: [
    { platform: 'instagram', label: 'Instagram', url: '{{INSTAGRAM}}' },
    { platform: 'facebook', label: 'Facebook', url: '{{FACEBOOK}}' },
    { platform: 'youtube', label: 'YouTube', url: '{{YOUTUBE}}' },
    { platform: 'linkedin', label: 'LinkedIn', url: '{{LINKEDIN}}' },
    { platform: 'pinterest', label: 'Pinterest', url: '{{PINTEREST}}' },
  ],

  /* ==========================================================================
   * 6 · BRAND MARKS
   * --------------------------------------------------------------------------
   * If you leave the logo images as tokens, the navbar and footer fall back to
   * a beautifully-set typographic wordmark built from `wordmark` + `monogram`.
   * Many luxury studios prefer this — it is not a downgrade.
   * ========================================================================== */
  brand: {
    logo: {
      src: '{{LOGO}}',
      alt: '{{BUSINESS_NAME}} logo',
      width: 180,
      height: 48,
      label: 'Logo',
    },
    logoLight: {
      src: '{{LOGO_LIGHT}}',
      alt: '{{BUSINESS_NAME}} logo',
      width: 180,
      height: 48,
      label: 'Logo',
    },
    wordmark: '{{BUSINESS_NAME}}',
    monogram: '{{MONOGRAM}}',
  },

  /* ==========================================================================
   * 7 · DESIGN TOKENS
   * --------------------------------------------------------------------------
   * These are written to CSS custom properties on <html> at runtime, so every
   * Tailwind utility (`bg-canvas`, `text-accent`, …) re-themes instantly.
   * Keep contrast ratios in mind: `inkMuted` on `canvas` must stay ≥ 4.5:1.
   * ========================================================================== */
  theme: {
    colors: {
      canvas: '#FAF8F5',
      surface: '#FFFFFF',
      surfaceMuted: '#F4F1EC',
      ink: '#222222',
      inkMuted: '#666666',
      accent: '#B8860B',
      /* Darkened gold for TEXT on light surfaces — 5.0:1 vs canvas (WCAG AA). */
      accentStrong: '#8A6508',
      /* Solid gold fills that carry white labels — 4.68:1 with white (WCAG AA). */
      accentButton: '#966D0A',
      accentHover: '#7E5C07',
      /*
       * Label colour on the solid gold fills. White, per the approved design —
       * which is why `accentButton` above is a deeper gold than the brand
       * `accent`: white on #B8860B would be 3.25:1, but on #966D0A it is
       * 4.68:1, and on the #7E5C07 hover state 6.14:1. Same look, AA clean.
       */
      accentContrast: '#FFFFFF',
      border: '#ECECEC',
      contrast: '#1A1917',
      contrastInk: '#F5F1EA',
    },
    fonts: {
      display: "'Playfair Display', 'Times New Roman', serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    radius: 2,
  },

  /* ==========================================================================
   * 8 · IMAGERY
   * --------------------------------------------------------------------------
   * Every image is either:
   *   photo('photo-…')        a CDN photograph — automatically responsive
   *   '/images/hero.jpg'      your own file in /public/images
   *   '{{TOKEN}}'             unfilled — renders branded placeholder artwork
   *
   * The defaults below are a curated, tonally-matched luxury interior set so
   * the template presents beautifully out of the box. SWAP THEM for the
   * client's own photography before launch (see `src/lib/images.ts`).
   *
   * Recommended sizes when self-hosting (2× for retina):
   *   hero            2400 × 1600   landscape, calm area lower-left for text
   *   studioDetail    1400 × 1050   materials / samples, contact page
   *   aboutPrimary    1400 × 1750   portrait
   *   aboutSecondary  1200 × 900    landscape
   *   founder         1200 × 1500   portrait, eye-line in the upper third
   *   ctaBackdrop     2400 × 1200   landscape, low detail (text sits on top)
   *   pageHeaders     2400 × 1200   landscape, works under a dark scrim
   * ========================================================================== */
  media: {
    /*
     * SELF-HOSTED, on purpose. Resized — never cropped — from the supplied
     * 4000×2252 master into five widths and three formats. See
     * `public/images/README.md`, which also records the measured text-contrast
     * figures the overlay was tuned to.
     *
     * `widths` is what makes a local file responsive at all. Without it the
     * full master goes to every phone and is then squeezed by the browser's own
     * low-quality downscaler, which is the usual reason a self-hosted hero
     * looks *softer* than a CDN one as well as slower.
     */
    hero: {
      src: '/images/hero.jpg',
      /*
       * AVIF first, WebP second, the `src` JPEG as the universal fallback.
       * Same image in all three; at 1920px it costs 106 KB / 165 KB / 334 KB
       * respectively. See `formats` in site.config.types.ts.
       */
      formats: ['avif', 'webp'],
      /*
       * No `{{BUSINESS_NAME}} in {{CITY}}` tail on this one. `tClean` strips
       * unfilled tokens and tidies the orphaned preposition, which would leave
       * the alt ending on a bare "…fireplace, designed". Alt text should
       * describe the image anyway — the brand and city are already in the
       * <h1>, the <title> and the LocalBusiness schema.
       */
      alt: 'Contemporary living room with a coral velvet sofa, black-and-white striped armchair, brass arc lamp and a gold-framed glass partition',
      /*
       * 16:9 (1.7762). This matters for the crop: at 1920×1080 the frame is
       * almost exactly the image's own ratio, so desktop shows the composition
       * essentially whole.
       */
      width: 4000,
      height: 2252,
      /*
       * 3840 is the top of the ladder — the largest width the 4000px master can
       * fill without upscaling, and what a 4K display asking for 100vw needs.
       */
      widths: [768, 1280, 1920, 2560, 3840],
      label: 'Hero',
    },
    studioDetail: {
      src: photo('photo-1586798271453-2421dcccc277'),
      alt: 'Brushed brass tapware against honed marble in a {{BUSINESS_NAME}} project',
      width: 1400,
      height: 1050,
      label: 'Studio detail',
    },
    aboutPrimary: {
      src: photo('photo-1674542572845-7875fa71f1ca'),
      alt: 'Warm neutral interior with sheer drapery and brass detailing by {{BUSINESS_NAME}}',
      width: 1400,
      height: 1750,
      label: 'About',
    },
    aboutSecondary: {
      src: photo('photo-1634547476021-c1155c01616c'),
      alt: 'Cream living room with travertine table and olive foliage by {{BUSINESS_NAME}}',
      width: 1200,
      height: 900,
      label: 'Studio',
    },
    founder: {
      src: photo('photo-1635328372330-757aa2e61d57'),
      alt: 'Portrait of {{FOUNDER_NAME}}, founder of {{BUSINESS_NAME}}',
      width: 1200,
      height: 1500,
      label: 'Founder',
    },
    philosophy: {
      src: photo('photo-1724100688235-5ae39e7d9a84'),
      alt: 'Late afternoon light falling across a softly furnished {{BUSINESS_NAME}} interior',
      width: 1400,
      height: 1750,
      label: 'Philosophy',
    },
    materials: {
      src: photo('photo-1683462979098-b1a67a362322'),
      alt: 'Close-up of marble, brass and lacquered joinery finishes',
      width: 1400,
      height: 1050,
      label: 'Materials',
    },
    ctaBackdrop: {
      src: photo('photo-1774551351897-c64cd76a7c22'),
      alt: 'Warmly lit evening living room completed by {{BUSINESS_NAME}}',
      width: 2400,
      height: 1200,
      label: 'CTA',
    },
    /*
     * Full-bleed backdrops for the light content bands. Deliberately pale and
     * uncluttered — they render under an ~88% canvas wash, so their only job
     * is to stop large light areas reading as flat colour.
     */
    backdrops: {
      soft: {
        src: photo('photo-1723257131566-c331ac692297'),
        alt: '',
        width: 2400,
        height: 1600,
        label: 'Backdrop',
      },
      warm: {
        src: photo('photo-1715639116465-92add34d121f'),
        alt: '',
        width: 2400,
        height: 1600,
        label: 'Backdrop',
      },
    },
    /*
     * SELF-HOSTED, like the hero, and for the same reason: these two are shown
     * superimposed and must stay pixel-aligned, which is not something to hand
     * to a CDN that may crop either one independently.
     *
     * Both masters are 4000×2250 — the SAME dimensions, which is what makes the
     * alignment exact. Resized only, never cropped, into four widths and three
     * formats each. See `public/images/README.md`.
     */
    transformation: {
      before: {
        src: '/images/before.jpg',
        formats: ['avif', 'webp'],
        alt: 'The same double-height living room before work began — bare white walls, polished stone floor and no furniture',
        width: 4000,
        height: 2250,
        /*
         * 2560 tops the ladder here, not 3840 as on the hero. The frame is laid
         * out inside a content container rather than full-bleed, so the widest
         * it is ever asked for is ~1232 CSS px — 2464 device px on a 2× display.
         * A 3840 variant could never be selected.
         */
        widths: [768, 1280, 1920, 2560],
        label: 'Before',
      },
      after: {
        src: '/images/after.jpg',
        formats: ['avif', 'webp'],
        alt: 'The same room completed — curved cream sectional, sculptural brass staircase, crystal chandelier, marble coffee table and a linear fireplace',
        width: 4000,
        height: 2250,
        widths: [768, 1280, 1920, 2560],
        label: 'After',
      },
    },
    pageHeaders: {
      services: {
        src: photo('photo-1699239116624-85268dce7377'),
        alt: 'Living room with tan leather seating, fluted panelling and an arched opening',
        width: 2400,
        height: 1200,
        label: 'Services',
      },
      projects: {
        src: photo('photo-1697457751529-f29bda48cb61'),
        alt: 'Calm cream living room with arched shelving and boucle seating',
        width: 2400,
        height: 1200,
        label: 'Projects',
      },
      about: {
        src: photo('photo-1665002164383-a87e02d46034'),
        alt: 'Sunlit family living room in a warm neutral palette',
        width: 2400,
        height: 1200,
        label: 'About',
      },
      contact: {
        src: photo('photo-1697947656193-a87d460b5fb5'),
        alt: 'Contemporary living room in soft taupe and cream tones',
        width: 2400,
        height: 1200,
        label: 'Contact',
      },
    },
  },

  /* ==========================================================================
   * 9 · SEO
   * ========================================================================== */
  seo: {
    siteUrl: '{{SITE_URL}}',
    titleTemplate: '%s | {{BUSINESS_NAME}}',
    defaultTitle: '{{BUSINESS_NAME}} — Luxury Interior Design in {{CITY}}',
    /*
     * Copy tip: put tokens at the END of a clause, not as the subject of one.
     * `tClean` strips unfilled tokens from metadata, so "{{BUSINESS_NAME}}
     * delivers…" would degrade to a sentence with no subject, whereas this
     * phrasing still reads correctly in either state.
     */
    defaultDescription:
      'Award-worthy interior design in {{CITY}} — turnkey residential and commercial interiors, space planning, 3D visualisation, modular kitchens, wardrobes and bespoke furniture. Book a free consultation with {{BUSINESS_NAME}}.',
    ogImage: '{{OG_IMAGE}}',
    twitterHandle: '{{TWITTER_HANDLE}}',
    locale: 'en_IN',
    pages: {
      home: {
        path: '/',
        title: '{{BUSINESS_NAME}} — Luxury Interior Design in {{CITY}}',
        description:
          'Designing beautiful spaces that reflect your lifestyle. Turnkey residential and commercial interior design in {{CITY}} — 3D designs, transparent pricing and on-time handover. Book a free consultation.',
      },
      services: {
        path: '/services',
        title: 'Interior Design Services',
        description:
          'Residential and commercial interior design, modular kitchens, wardrobes, false ceilings, lighting design and turnkey home renovation in {{CITY}}. Explore the full service range from {{BUSINESS_NAME}}.',
      },
      projects: {
        path: '/projects',
        title: 'Our Projects',
        description:
          'Browse completed interior design projects by {{BUSINESS_NAME}} across {{CITY}} — apartments, villas, kitchens, offices and retail. Real areas, timelines and budget bands for every project.',
      },
      about: {
        path: '/about',
        title: 'About Our Studio',
        description:
          'Meet the team behind {{BUSINESS_NAME}}. Our story, design philosophy, quality standards and the process we follow on every interior project in {{CITY}}.',
      },
      contact: {
        path: '/contact',
        title: 'Contact & Free Consultation',
        description:
          'Talk to {{BUSINESS_NAME}} about your interior project. Call {{PHONE}}, message us on WhatsApp, or book a free design consultation at our {{CITY}} studio.',
      },
      notFound: {
        path: '/404',
        title: 'Page Not Found',
        description: 'The page you were looking for has moved or no longer exists.',
      },
    },
  },

  /* ==========================================================================
   * 10 · FORMS
   * --------------------------------------------------------------------------
   * While `endpoint` is still a token the contact form runs in DEMO MODE: it
   * validates, animates and shows the success state without sending anything.
   * Paste a Formspree / Web3Forms / Basin URL here to go live.
   * ========================================================================== */
  forms: {
    endpoint: '{{FORM_ENDPOINT}}',
    budgetOptions: [
      'Under {{BUDGET_BAND_1}}',
      '{{BUDGET_BAND_2}}',
      '{{BUDGET_BAND_3}}',
      '{{BUDGET_BAND_4}}',
      'Above {{BUDGET_BAND_5}}',
      'Not sure yet — please advise',
    ],
    successMessage:
      "Thank you — your enquiry has reached our design team. We'll be in touch within one business day.",
  },

  /* ==========================================================================
   * 11 · FEATURE SWITCHES
   * ========================================================================== */
  features: {
    floatingWhatsApp: true,
    floatingCall: true,
    backToTop: true,
    /*
     * Off, because the approved hero reference has the navigation sitting on
     * the top edge of the photograph with no strip above it. Flip to `true` to
     * bring it back — the copy below is kept ready for that.
     */
    announcementBar: false,
    announcementText:
      'Now booking {{CURRENT_SEASON}} projects in {{CITY}} — complimentary design consultation.',
    mapEmbed: true,
    testimonials: true,
  },

  /* ==========================================================================
   * 12 · GLOBAL CALL-TO-ACTION COPY
   * ========================================================================== */
  cta: {
    primary: 'Book Free Consultation',
    secondary: 'View Our Projects',
    tertiary: 'Request a Quote',
    call: 'Call Now',
    whatsapp: 'WhatsApp Us',
  },

  /* ==========================================================================
   * 13 · HERO COPY
   * --------------------------------------------------------------------------
   * The first words a visitor reads. Kept here rather than in `Hero.tsx` for
   * the same reason as everything else in this file: cloning the template for a
   * new client must never mean editing a component.
   * ========================================================================== */
  heroCopy: {
    /*
     * The headline is three deliberate lines, not one string that wraps.
     *
     * A wrapping headline breaks wherever the column width happens to put it,
     * which at display sizes routinely orphans a word or splits a phrase that
     * should stay together. Three explicit parts give the same break on every
     * screen — and let the middle line carry the brand gold without any markup
     * living in the config.
     */
    headlineLead: 'Design Your',
    headlineAccent: 'Dream Home',
    headlineTail: 'With Us',
    subheadline:
      'Beautiful interiors. Hassle-free experience. End-to-end solutions that truly reflect you.',
    /*
     * Separate from `cta.primary` on purpose. The navbar keeps "Book Free
     * Consultation"; the hero asks for a quote. Two different asks on one
     * screen is deliberate — the header commits to time, the hero to a number.
     */
    ctaLabel: 'Get Free Quote',
  },

  /* ==========================================================================
   * 14 · TRANSFORMATION SLIDER COPY
   * --------------------------------------------------------------------------
   * The before/after comparison on the home page. The images themselves live in
   * `media.transformation` above; this is only the words around them.
   * ========================================================================== */
  transformationCopy: {
    eyebrow: 'Before & After',
    title: 'See the Transformation',
    lead: 'Drag the slider to experience how we transform empty spaces into stunning dream homes.',
    /*
     * Deliberately plain. These badges sit ON the photograph, so anything
     * longer competes with the picture — and the picture is the argument.
     */
    beforeLabel: 'Before',
    afterLabel: 'After',
    hint: 'Drag to compare',
    /*
     * What a screen reader announces in place of the visual "drag" hint, which
     * describes a gesture a keyboard user cannot perform. Names the control,
     * not the input — the arrow keys work here just as well as a finger does.
     */
    handleLabel: 'Before and after comparison',
  },
};

export default siteConfig;
