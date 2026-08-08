import type { LucideIcon } from 'lucide-react';

/**
 * ============================================================================
 * COPY CONFIG — TYPE CONTRACT
 * ============================================================================
 * The shape of `src/config/copy.config.ts`.
 *
 * You do not need to edit this file when cloning the template. It exists so
 * TypeScript catches a missing heading or a renamed key the moment you edit the
 * copy, instead of the site rendering an empty `<h2>` in production.
 *
 * Every string here may contain:
 *   • `{{TOKENS}}`  — config values, resolved by `src/lib/tokens.ts`
 *   • `{slots}`     — runtime values, filled by `src/lib/copy.ts`
 * The doc comment on each field names the slots it supports.
 * ============================================================================
 */

/** A section header: small uppercase label, headline, optional lead sentence. */
export interface SectionCopy {
  /** Small uppercase label above the headline. */
  eyebrow: string;
  /** The headline itself. */
  title: string;
  /** Supporting sentence beneath the headline. */
  lead: string;
}

/** The masthead at the top of an inner page. */
export interface PageHeroCopy {
  eyebrow: string;
  title: string;
  lead: string;
}

/**
 * One risk-reversal line — "Free consultation and site visit".
 *
 * Rendered under the closing call to action and under the About page hero. It
 * is ONE list used in both places: the two used to be written out separately
 * with the same words and different icons, which is how a studio ends up
 * promising a one-day reply on one page and a two-day reply on another.
 */
export interface AssuranceCopy {
  /** A `lucide-react` icon, imported at the top of `copy.config.ts`. */
  icon: LucideIcon;
  /** The promise itself. Keep it to five or six words. */
  text: string;
}

/**
 * A scaffolding notice: an emphasised lead followed by the explanation.
 *
 * Split in two because the lead is set in a heavier weight, and a single string
 * would either lose that emphasis or need markup inside the config.
 */
export interface NoticeCopy {
  /** The emphasised opening, e.g. "Demo mode:". */
  label: string;
  /** The rest of the sentence. May carry `{slots}` — see each field's note. */
  detail: string;
}

export interface CopyConfig {
  /* ==========================================================================
   * INTERFACE CHROME
   * ========================================================================== */
  /**
   * Wording that belongs to the interface rather than to the business:
   * landmark names, menu labels, and the text screen readers announce.
   *
   * Most clients never touch this. Translate it, though, and the whole site
   * speaks the new language to assistive technology — which no amount of
   * editing the visible copy would achieve on its own.
   */
  ui: {
    /** The first thing a keyboard user reaches on every page. */
    skipToContent: string;
    /** Accessible name of the desktop navigation landmark. */
    primaryNavLabel: string;
    /** Accessible name of the navigation inside the mobile drawer. */
    mobileNavLabel: string;
    /** Accessible name of the mobile drawer itself. */
    drawerLabel: string;
    /** Accessible name of the menu button while the drawer is closed. */
    openMenu: string;
    /** …and while it is open. */
    closeMenu: string;
    /** Short label on the drawer's WhatsApp button — the grid is two columns. */
    drawerWhatsapp: string;
    /** Accessible name of the breadcrumb landmark. */
    breadcrumbLabel: string;
    /** Default accessible name for a dialog's close button. */
    close: string;
    /** Accessible name of the logo link. Slots: `{name}`. */
    logoHome: string;
    /** Accessible name of the announcement bar's dismiss button. */
    dismissAnnouncement: string;
    /**
     * Accessible name of a social profile link. Used by the footer AND the
     * contact page, which is the point: a screen-reader user must hear the same
     * thing in both places. Supports `{{TOKENS}}`. Slots: `{platform}`.
     */
    socialProfile: string;
    /** Word drawn on generated placeholder artwork when an image has no label. */
    imagePlaceholder: string;
  };

  /* ==========================================================================
   * FLOATING ACTIONS
   * ========================================================================== */
  /** The persistent WhatsApp / call / back-to-top stack. */
  floating: {
    /** Label revealed on hover beside the back-to-top button. */
    backToTop: string;
    /** Its accessible name — a fuller description than the visible label. */
    backToTopAria: string;
    /** Accessible name of the call button. Supports `{{TOKENS}}`. */
    callAria: string;
    /** Accessible name of the WhatsApp button. Supports `{{TOKENS}}`. */
    whatsappAria: string;
  };

  /* ==========================================================================
   * FOOTER
   * ========================================================================== */
  footer: {
    /** Heading above the social icon row. */
    socialHeading: string;
    /** The "read our reviews" text link beneath it. */
    reviewLink: string;
    /** Heading and landmark name for the service deep-link column. */
    servicesHeading: string;
    /** Heading and landmark name for the secondary link column. */
    studioHeading: string;
    /** Heading above the address, phone, email and hours. */
    contactHeading: string;
    /** Heading above the service-area list — a local-SEO surface. */
    serviceAreasHeading: string;
    /** The copyright line. Slots: `{year}`, `{name}`. */
    copyright: string;
    /** Label on the link to the generated sitemap.xml. */
    sitemap: string;
  };

  /* ==========================================================================
   * HOME PAGE
   * ========================================================================== */
  home: {
    /** Accessible name of the hero section. */
    heroLabel: string;

    /** The scrolling marquee of credibility markers beneath the hero. */
    trustStrip: {
      /** Screen-reader label on the control while the marquee is running. */
      pause: string;
      /** …and while it is paused. */
      play: string;
    };

    /** The statistics band. */
    stats: SectionCopy & {
      /** Label on the button beside the heading. */
      action: string;
      /** The reassurance line beneath the figures. Supports `{{TOKENS}}`. */
      footnote: string;
      /** Screen-reader context for the figures. Supports `{{TOKENS}}`. */
      screenReaderSummary: string;
    };

    /** The eight objection-handling cards. */
    whyUs: {
      eyebrow: string;
      title: string;
      /** The list of worries, set in muted ink. */
      lead: string;
      /** The promise that answers them, set in gold. Keep it short. */
      leadEmphasis: string;
      /** The invitation above the closing button. */
      closing: string;
    };

    /** The six featured services. */
    services: SectionCopy & {
      /** Button beside the heading. Slots: `{count}`. */
      allServices: string;
      /** Heading of the closing band. Slots: `{count}` — the services NOT shown. */
      moreTitle: string;
      /** Its supporting sentence. */
      moreLead: string;
      /** Primary button in the closing band. */
      exploreAll: string;
    };

    /** The portfolio teaser. */
    portfolio: SectionCopy & {
      /** Button beside the heading. Slots: `{count}`. */
      viewAll: string;
      /** The closing invitation. */
      closing: string;
      /** Primary closing button. */
      discuss: string;
      /** Secondary closing button. */
      browse: string;
    };

    /** The six-stage timeline. */
    process: SectionCopy & {
      /** Label above each stage. Slots: `{number}`. */
      step: string;
      /** Prefix before the stage's deliverable. Keep the trailing space. */
      deliverable: string;
      /** Heading of the closing panel. */
      closingTitle: string;
      /** Its supporting sentence. */
      closingLead: string;
    };

    /** The design-philosophy band. */
    philosophy: {
      /** The pull quote beside the sticky photograph. Include the quote marks. */
      quote: string;
      /** Its attribution. Supports `{{TOKENS}}`. */
      attribution: string;
    };

    /** The materials specification. */
    materials: {
      /** The note beside the photograph. */
      note: string;
      /** Inline label before each material's application. */
      usedFor: string;
      /** Description in the closing card. */
      scheduleOffer: string;
    };

    /** The written commitments. */
    promise: {
      /** The line beneath the commitments, above the button. */
      closing: string;
    };

    /** The testimonial wall. */
    testimonials: SectionCopy & {
      /** Accessible name of each star row. Slots: `{rating}`. */
      ratingLabel: string;
      /** The aggregate line beneath the wall. Supports `{{TOKENS}}`. */
      summary: string;
      /** Label on the link out to the public review profile. */
      readAll: string;
    };

    /** The FAQ accordion and its contact panel. */
    faqs: SectionCopy & {
      /** Heading of the "still stuck?" card. */
      panelTitle: string;
      /** Its supporting sentence. */
      panelLead: string;
      /** Label on the call button. Supports `{{TOKENS}}`. */
      callAction: string;
      /** The quiet text link beneath the card. */
      formLink: string;
    };

    /** The closing call to action. */
    finalCta: {
      eyebrow: string;
      /** First half of the headline, in light ink. */
      title: string;
      /** Second half, set in italic gold — the phrase worth emphasising. */
      titleEmphasis: string;
      lead: string;
    };
  };

  /* ==========================================================================
   * INNER PAGES
   * ========================================================================== */
  pages: {
    services: {
      hero: PageHeroCopy;
      /** The jump-to rail near the top. */
      index: SectionCopy & {
        /** Accessible name of the rail. */
        listLabel: string;
      };
      /** Repeated headings inside every service block. */
      row: {
        /** Heading above the deliverables list. */
        included: string;
        /** Heading above the benefits list. */
        whyItMatters: string;
        /** Meta-rail label: who the service suits. */
        idealFor: string;
        /** Meta-rail label: how long it takes. */
        timeline: string;
        /** Meta-rail label: the entry price. */
        startingFrom: string;
        /** Label on the WhatsApp button. */
        askAction: string;
        /**
         * Pre-filled WhatsApp message.
         * Supports `{{TOKENS}}`. Slots: `{service}`.
         */
        whatsappMessage: string;
      };
      /** The closing "not sure which one?" band. */
      closing: {
        title: string;
        lead: string;
        /** Secondary button — the primary one uses `cta.primary`. */
        secondaryAction: string;
      };
    };

    projects: {
      hero: PageHeroCopy & {
        /** Primary button in the hero. */
        action: string;
      };
      gallery: SectionCopy & {
        /** Accessible name of the category filter group. */
        filterLabel: string;
        /** The visible "Filter" label beside it, hidden on small screens. */
        filterHeading: string;
        /** Announced live as the filter changes. Slots: `{visible}`, `{total}`. */
        resultCount: string;
        /** Shown when a category has no projects yet. */
        empty: string;
      };
      /** Headings on each portfolio tile's metadata. */
      card: {
        /** Accessible name of the tile. Slots: `{name}`, `{category}`. */
        openLabel: string;
        area: string;
        duration: string;
        budget: string;
      };
      /** The case-study dialog. */
      dialog: {
        /** Accessible name of the close button. Slots: `{name}`. */
        closeLabel: string;
        /** Heading above the project description. */
        brief: string;
        /** Heading above the scope tags. */
        scope: string;
        /** Fact-grid label — differs from the tile's, which has less room. */
        budget: string;
        /** Fact-grid label for the completion year. */
        completed: string;
        /** The invitation above the buttons. */
        invitation: string;
        /**
         * Pre-filled WhatsApp message.
         * Supports `{{TOKENS}}`. Slots: `{project}`.
         */
        whatsappMessage: string;
      };
      /** The dark statistics band. */
      numbers: {
        eyebrow: string;
        title: string;
      };
      /** The closing band. */
      closing: {
        title: string;
        lead: string;
        secondaryAction: string;
      };
    };

    about: {
      hero: PageHeroCopy;
      /** Buttons beneath the studio story. */
      story: {
        primaryAction: string;
        secondaryAction: string;
      };
      values: SectionCopy;
      /** The founder's letter. Its body lives in `src/data/about.ts`. */
      founder: {
        eyebrow: string;
      };
      milestones: SectionCopy;
      quality: SectionCopy;
      reasons: SectionCopy;
    };

    contact: {
      hero: PageHeroCopy;
      /** The three channel cards above the form. */
      cards: {
        call: {
          eyebrow: string;
          description: string;
          /** Secondary action beneath the call button. */
          copyNumber: string;
          /** …and its confirmed state. */
          copied: string;
        };
        whatsapp: {
          eyebrow: string;
          /** The card's own heading — the other two show the phone and email. */
          title: string;
          description: string;
        };
        email: {
          eyebrow: string;
          description: string;
          action: string;
        };
      };
      /** The studio-details column beside the form. */
      studio: SectionCopy & {
        /** Row label above the postal address. */
        addressLabel: string;
        /** The "get directions" link beneath it. */
        directions: string;
        /** Row label above the opening hours. */
        hoursLabel: string;
        /** Row label above the phone numbers and email. */
        linesLabel: string;
        /** Row label above the social icons. */
        socialLabel: string;
        /** The star row beneath the panel. Supports `{{TOKENS}}`. */
        reviewSummary: string;
      };
      /** The full-width map band. */
      map: {
        /** Accessible name of the embedded map. Supports `{{TOKENS}}`. */
        frameTitle: string;
        /** Heading on the card floating over the map. Supports `{{TOKENS}}`. */
        cardTitle: string;
        /** Its button. */
        directions: string;
      };
    };

    notFound: {
      eyebrow: string;
      title: string;
      lead: string;
      /** Primary button. */
      homeAction: string;
    };

    /** Shared by the privacy policy and the terms of service. */
    legal: {
      /** Label before the document's revision date. */
      lastUpdated: string;
    };
  };

  /* ==========================================================================
   * CONTACT FORM
   * ========================================================================== */
  /**
   * Every word in the lead-capture form.
   *
   * The placeholders are worth a second look when cloning: they carry example
   * names, phone formats and property descriptions, and an example that does
   * not match the client's market quietly signals that the site was built for
   * somebody else.
   */
  form: {
    title: string;
    lead: string;
    /** Per-field label, placeholder and hint. */
    fields: {
      name: { label: string; placeholder: string };
      phone: { label: string; placeholder: string; hint: string };
      email: { label: string; placeholder: string };
      service: { label: string; placeholder: string };
      budget: { label: string; placeholder: string; hint: string };
      date: { label: string };
      message: { label: string; placeholder: string; hint: string };
    };
    /** Shown on blur and on submit. Written as help, not as rebuke. */
    validation: {
      nameRequired: string;
      nameTooShort: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailInvalid: string;
      serviceRequired: string;
    };
    /** The privacy promise beside the submit button. */
    privacyNote: string;
    /** Label on the link to the privacy policy. */
    privacyLink: string;
    /** Submit button, at rest and while sending. */
    submit: string;
    submitting: string;
    /** The confirmation panel. The message itself is `forms.successMessage`. */
    successTitle: string;
    /** Button that returns the visitor to a fresh form. */
    sendAnother: string;
    /** Shown when the endpoint rejects the submission. Supports `{{TOKENS}}`. */
    errorMessage: string;
    /** Seeded into the message when arriving from a project. Slots: `{project}`. */
    projectPrefill: string;
  };

  /* ==========================================================================
   * SYSTEM STATES
   * ========================================================================== */
  /** What a visitor sees when something is loading or has gone wrong. */
  system: {
    /** Announced while a route's chunk downloads. Never shown visually. */
    loading: string;
    /** The error boundary's fallback page. */
    error: {
      eyebrow: string;
      title: string;
      /** Used when the business name is not configured. */
      body: string;
      /** Used when it is. Supports `{{TOKENS}}`. */
      bodyNamed: string;
      /** Primary button — reloads the page. */
      retry: string;
      /** Secondary button — a plain link home. */
      home: string;
      /** Heading above the direct contact channels. */
      contactHeading: string;
      /** Label on the WhatsApp link in that list. */
      whatsapp: string;
    };
  };

  /* ==========================================================================
   * RISK REVERSAL
   * ========================================================================== */
  /** The three promises shown under the About hero and the closing CTA. */
  assurances: AssuranceCopy[];

  /* ==========================================================================
   * DEVELOPER NOTICES
   * ========================================================================== */
  /**
   * Scaffolding messages addressed to whoever is building the site, not to the
   * visitor. Each one disappears on its own once the matching field is filled
   * in, so they never reach a live page — they are here for completeness, and
   * so a template built on top of this one can translate or remove them.
   */
  developer: {
    /**
     * Shown on the form's success panel while `forms.endpoint` is a
     * placeholder. Slots: `{field}`, `{file}` — both rendered as code.
     */
    formDemoSuccess: NoticeCopy;
    /** Shown under the form in the same state. Slots: `{field}`, `{file}`. */
    formDemoFooter: NoticeCopy;
    /**
     * Shown in place of the map while `location.mapEmbedUrl` is a placeholder.
     * A single string: it is prose, with no emphasised lead.
     */
    mapUnconfigured: string;
    /**
     * Shown on both legal pages while `legalMeta.lastUpdated` is a
     * placeholder. Slots: `{file}`, `{field}` — both rendered as code.
     */
    legalUnreviewed: NoticeCopy;
  };
}
