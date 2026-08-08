import { Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import type { CopyConfig } from './copy.config.types';

/**
 * ============================================================================
 *                    ⭐  THE SECOND FILE YOU MAY EDIT  ⭐
 * ============================================================================
 *
 *  MASTER TEMPLATE — INTERIOR DESIGN · SITE COPY
 *
 *  `site.config.ts` holds the client's DETAILS. This file holds the site's
 *  WORDS: every heading, label, button, form field, placeholder example and
 *  screen-reader announcement that is not already in `src/data/`.
 *
 *  It exists because of a promise the config header makes and this template
 *  used not to keep — that cloning it "must never mean editing a component".
 *  Perfectly ordinary marketing copy was stranded inside JSX: the three
 *  assurance lines under the closing call to action, every contact-form label,
 *  the example names in the placeholders, twenty-odd section headings. All of
 *  it needed a developer, and none of it should.
 *
 *  ---------------------------------------------------------------------------
 *  WHAT LIVES WHERE — the rule, so nothing has two homes
 *  ---------------------------------------------------------------------------
 *    site.config.ts   the business: name, phone, address, colours, images,
 *                     SEO, feature switches, hero copy, global CTA wording
 *    copy.config.ts   the interface: section headings, labels, form copy,
 *                     system messages, accessibility text          ← this file
 *    src/data/*.ts    the substance: services, projects, FAQs, testimonials,
 *                     the founder's letter, legal documents
 *    src/config/routes.ts   application structure. NOT client-editable.
 *
 *  ---------------------------------------------------------------------------
 *  TWO KINDS OF BRACE, AND THEY ARE NOT THE SAME
 *  ---------------------------------------------------------------------------
 *    {{TOKEN}}   a value from site.config.ts — `{{CITY}}`, `{{PHONE}}`.
 *                Resolved at render time and checked by `npm run build`, which
 *                FAILS if you use a key that has no home in the config.
 *                See `src/lib/tokens.ts` for the full list.
 *
 *    {slot}      a value the template only knows while rendering — a count, the
 *                name of the project the visitor just opened. The doc comment
 *                on each field names the slots it supports; using one that is
 *                not listed leaves the raw `{slot}` visible.
 *
 *  You may move a `{slot}` anywhere within its own sentence, or drop it. You
 *  may not invent new ones without changing the component that supplies it.
 *
 *  ---------------------------------------------------------------------------
 *  EDITING NOTES
 *  ---------------------------------------------------------------------------
 *   • Headings are set at display sizes. Long ones wrap; keep them tight.
 *   • The form placeholders carry example names, phone formats and property
 *     descriptions. They are the most locale-specific strings on the site —
 *     rewrite them for the client's own market.
 *   • Anything under `ui`, `floating` or `system` is mostly read by assistive
 *     technology. It is short, dull and load-bearing: translate it, but do not
 *     make it clever.
 * ============================================================================
 */
export const copyConfig: CopyConfig = {
  /* ==========================================================================
   * 1 · INTERFACE CHROME
   * ========================================================================== */
  ui: {
    skipToContent: 'Skip to main content',
    primaryNavLabel: 'Primary',
    mobileNavLabel: 'Mobile',
    drawerLabel: 'Site navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    drawerWhatsapp: 'WhatsApp',
    breadcrumbLabel: 'Breadcrumb',
    close: 'Close',
    logoHome: '{name} — go to homepage',
    dismissAnnouncement: 'Dismiss announcement',
    socialProfile: '{{BUSINESS_NAME}} on {platform}',
    imagePlaceholder: 'Image',
  },

  /* ==========================================================================
   * 2 · FLOATING ACTIONS
   * ========================================================================== */
  floating: {
    backToTop: 'Top',
    backToTopAria: 'Scroll back to top of page',
    /*
     * The business name is a token rather than a slot, so these read correctly
     * whether or not it has been filled in — an unresolved token is stripped in
     * production, leaving "Call" and "Message on WhatsApp", both still useful.
     */
    callAria: 'Call {{BUSINESS_NAME}}',
    whatsappAria: 'Message {{BUSINESS_NAME}} on WhatsApp',
  },

  /* ==========================================================================
   * 3 · FOOTER
   * ========================================================================== */
  footer: {
    socialHeading: 'Follow our work',
    reviewLink: 'Read our Google reviews',
    servicesHeading: 'Services',
    studioHeading: 'Studio',
    contactHeading: 'Visit or call us',
    serviceAreasHeading: 'Interior designers serving',
    copyright: '© {year} {name}. All rights reserved.',
    sitemap: 'Sitemap',
  },

  /* ==========================================================================
   * 4 · HOME PAGE
   * ========================================================================== */
  home: {
    heroLabel: 'Introduction',

    trustStrip: {
      pause: 'Pause the scrolling list of credentials',
      play: 'Play the scrolling list of credentials',
    },

    stats: {
      eyebrow: 'The Studio at a Glance',
      title: 'A decade of homes, delivered on time and on budget.',
      lead: 'Numbers are the shortest route to trust in this profession. These are ours — and every one of them is verifiable in the projects we have completed across {{CITY}}.',
      action: 'Read Our Story',
      footnote:
        'Every project is delivered by our own in-house team — designers, project managers and craftspeople on our payroll, not subcontracted out. Questions? Call {{PHONE}} and speak to a designer directly.',
      screenReaderSummary: 'Statistics for {{BUSINESS_NAME}}, interior designers in {{CITY}}.',
    },

    whyUs: {
      eyebrow: 'Why Choose Us',
      title: 'Every reason an interior project goes wrong — and how we prevent it.',
      lead: 'Most people approaching an interior studio are carrying the same four worries: the cost will climb, the timeline will slip, the finish will not match the render, and nobody will pick up the phone afterwards.',
      leadEmphasis: 'Here is precisely how we handle each of them.',
      closing:
        'Have a project in mind? A short conversation is usually enough to tell you what is realistic for your space and your budget.',
    },

    services: {
      eyebrow: 'What We Do',
      title: 'Interiors designed, built and finished by one team.',
      lead: 'From a single room to a complete turnkey home, every service below is delivered end to end — design, materials, execution and styling — without a hand-off to another contractor.',
      allServices: 'All {count} Services',
      moreTitle: 'Plus {count} more specialist services.',
      moreLead:
        'False ceilings, lighting design, space planning, bespoke furniture, dining rooms and full home renovation — see the complete range, or simply tell us what you need.',
      exploreAll: 'Explore All Services',
    },

    portfolio: {
      eyebrow: 'Selected Work',
      title: 'Spaces we have designed, built and handed over.',
      lead: 'Every project below was delivered end to end by our own team. Area, timeline and budget band are published for each one — so you can judge the fit before you ever pick up the phone.',
      viewAll: 'View All {count} Projects',
      closing:
        'Seen something close to what you have in mind? Send us the reference and the dimensions of your space — we will tell you what it would take to achieve it.',
      discuss: 'Discuss Your Project',
      browse: 'Browse the Full Gallery',
    },

    process: {
      eyebrow: 'How We Work',
      title: 'Six stages. Every one of them written down.',
      lead: 'No interior project should be a leap of faith. This is exactly how yours will run — what happens at each stage, what you receive at the end of it, and how long it takes.',
      step: 'Step {number}',
      /* The trailing space is deliberate — the deliverable follows inline. */
      deliverable: 'You receive: ',
      closingTitle: 'Stage one is a conversation, and it is free.',
      closingLead:
        'Tell us about your space and we will walk you through what is realistic for your budget and timeline — with no obligation to proceed.',
    },

    philosophy: {
      quote:
        '“A home should not look like it was decorated. It should look like it was always meant to be this way.”',
      attribution: '{{FOUNDER_NAME}} — {{FOUNDER_ROLE}}',
    },

    materials: {
      note: 'Every material below is named in your quotation, with a physical sample you can hold before you approve it. Nothing is substituted without your written consent.',
      usedFor: 'Used for:',
      scheduleOffer:
        'Want the full specification for your project? We will send an itemised material schedule with your quotation.',
    },

    promise: {
      closing:
        'These commitments appear in the agreement we sign with you — not only on this page.',
    },

    testimonials: {
      eyebrow: 'Client Experiences',
      title: 'What our clients say once the dust has settled.',
      lead: 'The reviews below were chosen because each one addresses something different — pricing, timelines, build quality and project management. Together they describe what it is actually like to work with us.',
      ratingLabel: '{rating} out of 5 stars',
      summary: '{{GOOGLE_RATING}} average from {{REVIEW_COUNT}} client reviews',
      readAll: 'Read All Reviews on Google',
    },

    faqs: {
      eyebrow: 'Frequently Asked',
      title: 'The questions worth asking before you commit.',
      lead: 'Straight answers to what people actually ask us — including the one about cost. If yours is not here, we are happy to answer it directly.',
      panelTitle: 'Still have a question?',
      panelLead:
        'Speak to a designer directly — no scripts, no sales pitch. Most questions take five minutes to resolve.',
      callAction: 'Call us: {{PHONE}}',
      formLink: 'Or send an enquiry instead',
    },

    finalCta: {
      eyebrow: 'Start Your Project',
      title: 'Let’s design a home you will',
      titleEmphasis: 'never want to leave.',
      lead: 'Tell us about your space, your timeline and your budget. We will come back with a clear view of what is achievable — and an honest opinion on where your money is best spent.',
    },
  },

  /* ==========================================================================
   * 5 · INNER PAGES
   * ========================================================================== */
  pages: {
    services: {
      hero: {
        eyebrow: 'Our Services',
        title: 'Everything your space needs, from one accountable studio.',
        lead: 'Thirteen specialist services, all delivered in-house — design, materials, execution and finishing. No hand-offs to a third-party contractor, and one project manager from first sketch to handover.',
      },
      index: {
        eyebrow: 'Service Index',
        title: 'Jump straight to what you need.',
        lead: 'Every service below includes what is delivered, why it matters, an indicative timeline and a starting price band.',
        listLabel: 'Services on this page',
      },
      row: {
        included: 'What’s included',
        whyItMatters: 'Why it matters',
        idealFor: 'Ideal for',
        timeline: 'Typical timeline',
        startingFrom: 'Starting from',
        askAction: 'Ask a question',
        whatsappMessage:
          'Hello {{BUSINESS_NAME}}, I’d like to know more about your {service} service.',
      },
      closing: {
        title: 'Not sure which service you need?',
        lead: 'Most projects combine several of the above. Describe your space and what is not working, and we will tell you exactly what it would take — including what you can safely leave out.',
        secondaryAction: 'See These Services Built',
      },
    },

    projects: {
      hero: {
        eyebrow: 'Selected Work',
        title: 'Projects we have designed, built and handed over.',
        lead: 'Homes, workplaces and retail spaces across {{CITY}}. Every project below lists its area, delivery time and budget band — so you can judge the fit before you get in touch.',
        action: 'Start a Similar Project',
      },
      gallery: {
        eyebrow: 'Portfolio',
        title: 'Real projects, real numbers.',
        lead: 'We publish the area, the timeline and the budget band for every project. Very few studios do — and it is the fastest way for you to tell whether we are the right fit.',
        filterLabel: 'Filter projects by category',
        filterHeading: 'Filter',
        resultCount: 'Showing {visible} of {total} projects',
        empty: 'No projects in this category yet — but we would be glad to discuss yours.',
      },
      card: {
        openLabel: '{name} — {category} project. View project details.',
        area: 'Area',
        duration: 'Duration',
        budget: 'Budget',
      },
      dialog: {
        closeLabel: 'Close {name} details',
        brief: 'The brief',
        scope: 'Scope delivered',
        budget: 'Budget band',
        completed: 'Completed',
        invitation:
          'Like this one? Tell us your room dimensions and we will come back with a realistic scope, timeline and budget for your space.',
        whatsappMessage:
          'Hello {{BUSINESS_NAME}}, I saw the “{project}” project on your website and would like something similar. Could we discuss it?',
      },
      numbers: {
        eyebrow: 'By the Numbers',
        title: 'What our track record looks like.',
      },
      closing: {
        title: 'Want something like one of these?',
        lead: 'Send us the project that caught your eye along with your floor plan or room dimensions. We will come back with a realistic scope, timeline and budget for your space.',
        secondaryAction: 'Explore Our Services',
      },
    },

    about: {
      hero: {
        eyebrow: 'About the Studio',
        title: 'The people who will be looking after your home.',
        lead: 'We are a design and execution studio in {{CITY}} — designers, project managers and craftspeople under one roof, accountable for the whole journey from first sketch to final handover.',
      },
      story: {
        primaryAction: 'See Our Work',
        secondaryAction: 'What We Offer',
      },
      values: {
        eyebrow: 'Our Values',
        title: 'Four things we will not trade away.',
        lead: 'Values are only meaningful when they cost something. Each of these has, at some point, cost us a project — and we would make the same call again.',
      },
      founder: {
        eyebrow: 'A Word From Our Founder',
      },
      milestones: {
        eyebrow: 'Our Journey',
        title: 'How the studio grew.',
        lead: 'A short history of the decisions that shaped how we work today.',
      },
      quality: {
        eyebrow: 'Quality Standards',
        title: 'What “finished properly” means to us.',
        lead: 'Quality is not a claim, it is a set of checks. These are the ones every project passes through before we hand over the keys.',
      },
      reasons: {
        eyebrow: 'Why Clients Choose Us',
        title: 'Eight reasons people pick this studio over a cheaper quote.',
        lead: 'None of these are unique ideas. What is unusual is finding all eight in the same studio — and getting them in writing.',
      },
    },

    contact: {
      hero: {
        eyebrow: 'Get in Touch',
        title: 'Let’s talk about your space.',
        lead: 'Call, message or send an enquiry — whichever suits you. The first consultation is free, carries no obligation, and usually tells you more in twenty minutes than a week of research.',
      },
      cards: {
        call: {
          eyebrow: 'Call the studio',
          description: 'Speak to a designer directly. Fastest way to get an answer.',
          copyNumber: 'Copy number',
          copied: 'Copied',
        },
        whatsapp: {
          eyebrow: 'Message us',
          title: 'WhatsApp',
          description: 'Send photos of your space and we will reply with initial thoughts.',
        },
        email: {
          eyebrow: 'Email the team',
          description: 'Best for drawings, floor plans and detailed briefs.',
          action: 'Send an email',
        },
      },
      studio: {
        eyebrow: 'Visit the Studio',
        title: 'Come and see the materials in person.',
        lead: 'Samples, finishes and hardware are all on display at our {{CITY}} studio. Drop in during opening hours, or book a slot so a designer is free to walk you through.',
        addressLabel: 'Studio address',
        directions: 'Get directions',
        hoursLabel: 'Opening hours',
        linesLabel: 'Direct lines',
        socialLabel: 'Follow our work',
        reviewSummary: '{{GOOGLE_RATING}} from {{REVIEW_COUNT}} reviews on Google',
      },
      map: {
        frameTitle: 'Map showing the location of {{BUSINESS_NAME}}',
        cardTitle: '{{BUSINESS_NAME}} — {{CITY}} Studio',
        directions: 'Get Directions',
      },
    },

    notFound: {
      eyebrow: 'Error 404',
      title: 'This page has been rearranged.',
      lead: 'The page you were looking for has moved or no longer exists. Here is the quickest way back to what you probably came for.',
      homeAction: 'Back to Home',
    },

    legal: {
      lastUpdated: 'Last updated:',
    },
  },

  /* ==========================================================================
   * 6 · CONTACT FORM
   * ========================================================================== */
  form: {
    title: 'Request your free consultation',
    lead: 'Three quick details is all we need to get started. Everything else is optional — but the more you tell us, the more useful our first reply will be.',

    fields: {
      /*
       * ⚠️ The placeholders below are the most locale-specific strings on the
       * site: an Indian name, an Indian dialling format, a carpet area in
       * square feet and a "3 BHK" flat. They are good examples for the market
       * this template was designed against and obviously wrong for any other.
       * Rewrite all five for the client's own market.
       */
      name: { label: 'Your name', placeholder: 'e.g. Priya Sharma' },
      phone: {
        label: 'Phone number',
        placeholder: 'e.g. +91 98765 43210',
        hint: 'We will call you back, not add you to a list.',
      },
      email: { label: 'Email address', placeholder: 'e.g. priya@example.com' },
      service: { label: 'Service you are interested in', placeholder: 'Choose a service' },
      budget: {
        label: 'Approximate budget',
        placeholder: 'Select a range',
        hint: 'An honest range helps us design to it, not over it.',
      },
      date: { label: 'Preferred consultation date' },
      message: {
        label: 'Tell us about your space',
        placeholder:
          'e.g. 3 BHK apartment, around 1,400 sq ft. We need the kitchen, both wardrobes and the living room done before we move in this December.',
        hint: 'Property type, carpet area, rooms involved, timeline — anything helps.',
      },
    },

    /*
     * Written as help rather than as rebuke, and each one says what to do next
     * rather than what the visitor did wrong. This is the single highest-value
     * form on the site; a scolding validation message costs real enquiries.
     */
    validation: {
      nameRequired: 'Please tell us your name.',
      nameTooShort: 'Please enter your full name.',
      phoneRequired: 'A phone number lets us call you back.',
      phoneInvalid: 'Please check the phone number.',
      emailInvalid: 'Please check the email address.',
      serviceRequired: 'Choose the service you are interested in.',
    },

    privacyNote:
      'Your details stay with our design team. No spam, no reselling, and no sales calls out of the blue.',
    privacyLink: 'Privacy Policy',

    submit: 'Send Enquiry',
    submitting: 'Sending…',

    successTitle: 'Thank you — enquiry received.',
    sendAnother: 'Send another enquiry',

    errorMessage:
      'Something went wrong sending your enquiry. Please call {{PHONE}} or message us on WhatsApp and we will pick it up straight away.',

    /* The trailing space matters — the visitor types straight after it. */
    projectPrefill: 'I’d like something similar to “{project}”. ',
  },

  /* ==========================================================================
   * 7 · SYSTEM STATES
   * ========================================================================== */
  system: {
    loading: 'Loading page…',
    error: {
      eyebrow: 'Something went wrong',
      title: 'This page didn’t load properly.',
      body: 'Sorry — that is our fault, not yours. Reloading usually fixes it. If it does not, please get in touch directly.',
      bodyNamed:
        'Sorry — that is our fault, not yours. Reloading usually fixes it. If it does not, {{BUSINESS_NAME}} would still love to hear from you.',
      retry: 'Reload the page',
      home: 'Back to home',
      contactHeading: 'Reach us directly',
      whatsapp: 'WhatsApp',
    },
  },

  /* ==========================================================================
   * 8 · RISK REVERSAL
   * --------------------------------------------------------------------------
   * ONE list, shown beneath the About page hero and beneath the closing call to
   * action. The two used to be written out separately — same three sentences,
   * different icons — which meant changing the reply time in one place quietly
   * left the other page promising something else.
   *
   * Three is the right number: it clears the three reasons someone hesitates at
   * the last moment (cost, commitment, silence) without turning into a list
   * nobody reads. Add a fourth and the row wraps on a laptop.
   * ========================================================================== */
  assurances: [
    { icon: MessageSquare, text: 'Free consultation and site visit' },
    { icon: ShieldCheck, text: 'No obligation, no pressure' },
    { icon: Clock, text: 'A reply within one working day' },
  ],

  /* ==========================================================================
   * 9 · DEVELOPER NOTICES
   * --------------------------------------------------------------------------
   * Addressed to whoever is building the site, not to a visitor. Each one is
   * gated on a config field still being a placeholder, so filling that field in
   * is what removes it — none of these can reach a finished site.
   * ========================================================================== */
  developer: {
    formDemoSuccess: {
      label: 'Demo mode —',
      detail: 'set {field} in {file} to start receiving real enquiries.',
    },
    formDemoFooter: {
      label: 'Demo mode:',
      detail: 'submissions are simulated. Set {field} in {file} to go live.',
    },
    mapUnconfigured:
      'Add your Google Maps embed URL to `location.mapEmbedUrl` in site.config.ts to display the studio location here.',
    legalUnreviewed: {
      label: 'Template text — not yet reviewed.',
      detail:
        'This document is structured scaffolding, not legal advice. Edit it in {file}, have a qualified adviser check it against the law where the studio operates, then set {field} to publish. Setting that date removes this notice.',
    },
  },
};

export default copyConfig;
