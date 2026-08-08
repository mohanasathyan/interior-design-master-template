# Configuration Schedule

**Master Template · Interior Design**

> Every value a clone needs to change.

Every configurable value in the template — placeholders, content records, fixed settings and tuning constants — with the file each one lives in. Search it, or work down it as a go-live checklist.

**No copy is stranded in a component any more.** An earlier revision of this schedule carried an eighteen-row exception listing client-facing text that only existed inside JSX — form labels, page mastheads, some twenty section headings. All of it now reads from `src/config/copy.config.ts`, and the three lines a visitor can see before the app loads from `src/config/shell.config.ts`. Cloning this template never requires opening a component.

| | |
| --- | --- |
| Placeholders | 158 |
| Registry keys | 29 |
| Files | 37 |
| Content records | 64 |
| Schedules | 43 |
| Entries | 329 |

## How to read this

- **Placeholder** — A `{{TOKEN}}` that is the whole value. Replace the string — nothing else needed.
- **Registered** — Also resolvable *inside* a sentence anywhere in the project, via the registry in `src/lib/tokens.ts`.
- **Setting** — A real default value, not a placeholder. Edit only if you want to change behaviour or copy.

## Index

1. [Business identity](#business-identity) — 11 entries
2. [Headline commercial facts](#headline-commercial-facts) — 6 entries
3. [Contact](#contact) — 6 entries
4. [Location & service area](#location-service-area) — 13 entries
5. [Business hours](#business-hours) — 3 entries
6. [Social profiles](#social-profiles) — 6 entries
7. [Brand marks](#brand-marks) — 6 entries
8. [Colours, fonts & radius](#colours-fonts-radius) — 16 entries
9. [CSS design tokens](#css-design-tokens) — 8 entries
10. [Imagery](#imagery) — 17 entries
11. [SEO & metadata](#seo-metadata) — 8 entries
12. [Routes & static files](#routes-static-files) — 11 entries
13. [Navigation & footer links](#navigation-footer-links) — 7 entries
14. [Services](#services) — 9 entries
15. [Projects](#projects) — 10 entries
16. [FAQs](#faqs) — 3 entries
17. [Testimonials](#testimonials) — 6 entries
18. [Story, values, founder & milestones](#story-values-founder-milestones) — 8 entries
19. [Philosophy, materials, promises & standards](#philosophy-materials-promises-standards) — 5 entries
20. [Process timeline](#process-timeline) — 4 entries
21. [Differentiators](#differentiators) — 2 entries
22. [Statistics & trust markers](#statistics-trust-markers) — 4 entries
23. [Legal documents](#legal-documents) — 4 entries
24. [Lead capture](#lead-capture) — 4 entries
25. [Analytics](#analytics) — 3 entries
26. [Feature switches](#feature-switches) — 7 entries
27. [Global CTA, hero & slider copy](#global-cta-hero-slider-copy) — 12 entries
28. [Interface chrome & accessibility text](#interface-chrome-accessibility-text) — 13 entries
29. [Home page copy](#home-page-copy) — 13 entries
30. [Inner page copy](#inner-page-copy) — 19 entries
31. [Contact form copy](#contact-form-copy) — 14 entries
32. [Risk-reversal assurances](#risk-reversal-assurances) — 4 entries
33. [Developer notices](#developer-notices) — 4 entries
34. [Pre-app shell copy](#pre-app-shell-copy) — 4 entries
35. [Document shell](#document-shell) — 8 entries
36. [Motion & interaction tuning](#motion-interaction-tuning) — 15 entries
37. [Image pipeline](#image-pipeline) — 4 entries
38. [Build, SEO generation & bundling](#build-seo-generation-bundling) — 8 entries
39. [Structured data](#structured-data) — 4 entries
40. [Type contracts & helpers](#type-contracts-helpers) — 4 entries
41. [Project metadata & tooling](#project-metadata-tooling) — 7 entries
42. [Static assets & PWA](#static-assets-pwa) — 5 entries
43. [Build & deployment](#build-deployment) — 4 entries

---

## Business identity

`src/config/site.config.ts › business`

> Founder identity lives here, not in the About data file — it is quoted on the About page, in the home-page pull-quote attribution and in the founder photograph’s alt text, so it needs exactly one home.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `name` | {{BUSINESS_NAME}} | Registered | Studio name. Drives the wordmark, schema, share cards and every page title. |
| `legalName` | {{LEGAL_NAME}} | Registered | Registered entity, used in the footer copyright and schema. |
| `tagline` | {{TAGLINE}} | Registered | One line under the logo. Hidden below xl in the header. |
| `description` | Set — 2 sentences | Setting | Used for schema.org and the footer blurb. |
| `foundingYear` | {{FOUNDING_YEAR}} | Registered | Drives the “since” line and schema foundingDate. |
| `priceRange` | $$$ | Setting | Price band shown to search engines. |
| `rating` | {{GOOGLE_RATING}} | Registered | Leave unfilled until you have real reviews — aggregateRating is only emitted when both this and reviewCount are set. |
| `reviewCount` | {{REVIEW_COUNT}} | Registered | Number of public reviews backing the rating. |
| `founder.name` | {{FOUNDER_NAME}} | Registered | Full name. |
| `founder.role` | {{FOUNDER_ROLE}} | Registered | Job title. |
| `founder.credential` | {{FOUNDER_CREDENTIAL}} | Registered | Qualification line on the About page. |

## Headline commercial facts

`src/config/site.config.ts › facts`

> Each of these is quoted in running prose in more than one place. Include the unit in the value — “5 years”, not “5”.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `warrantyYears` | {{WARRANTY_YEARS}} | Registered | Quoted in the FAQ answer and the trust marquee. |
| `priceStarting` | {{PRICE_STARTING}} | Registered | Entry price for a single room. |
| `priceFullHome` | {{PRICE_FULL_HOME}} | Registered | Typical full-home band. |
| `timelineRoom` | {{TIMELINE_ROOM}} | Registered | A single room. |
| `timelineHome` | {{TIMELINE_HOME}} | Registered | A full home. |
| `timelineDesign` | {{TIMELINE_DESIGN}} | Registered | The design phase alone. |

## Contact

`src/config/site.config.ts › contact`

> Drives every call, WhatsApp and mail link on the site. Any channel left unfilled degrades to the contact page rather than shipping a dead link.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `phone` | {{PHONE}} | Registered | Display format, e.g. “+91 98765 43210”. |
| `phoneHref` | {{PHONE_HREF}} | Placeholder | tel: URI — digits and a leading + only. |
| `phoneAlt` | {{PHONE_ALT}} | Registered | Optional second line. Empty string hides it. |
| `email` | {{EMAIL}} | Registered | Used for mailto: links and schema. |
| `whatsapp` | {{WHATSAPP}} | Registered | International format, no +, spaces or dashes. |
| `whatsappMessage` | Set — pre-filled message | Setting | Pre-written WhatsApp text. Supports tokens. |

## Location & service area

`src/config/site.config.ts › location`

> Feeds the footer NAP block, the contact page, the map embed and the LocalBusiness schema. Service areas are the cheapest durable local-SEO surface on the site.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `addressLine1` | {{ADDRESS_LINE_1}} | Registered |  |
| `addressLine2` | {{ADDRESS_LINE_2}} | Registered |  |
| `city` | {{CITY}} | Registered | Appears throughout marketing copy via the registry. |
| `state` | {{STATE}} | Registered | Also used in the Terms governing-law clause. |
| `postalCode` | {{POSTAL_CODE}} | Registered |  |
| `country` | {{COUNTRY}} | Registered | Also used in the Privacy Policy complaint clause. |
| `countryCode` | {{COUNTRY_CODE}} | Placeholder | ISO 3166-1 alpha-2, e.g. “IN”. Schema only. |
| `mapEmbedUrl` | {{GOOGLE_MAP}} | Placeholder | Google Maps embed URL. Unfilled shows an on-brand panel instead of a grey box. |
| `mapLink` | {{GOOGLE_MAP_LINK}} | Placeholder | “Get directions” target. |
| `reviewLink` | {{GOOGLE_REVIEW_LINK}} | Placeholder | Public reviews link. Unfilled hides the review prompts. |
| `latitude` | {{LATITUDE}} | Placeholder | GeoCoordinates schema. Emitted only with longitude. |
| `longitude` | {{LONGITUDE}} | Placeholder |  |
| `serviceAreas[0–5]` | {{SERVICE_AREA_1}} … {{SERVICE_AREA_6}} | Placeholder | Six neighbourhood/city names for the footer local-SEO strip. |

## Business hours

`src/config/site.config.ts › hours`

> Seven records, Monday first. Consecutive days sharing the same hours are collapsed automatically for display (“Monday – Friday”), and the same array is emitted as openingHoursSpecification schema.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[0–6].day` | Monday … Sunday | Setting | Full day name. |
| `[0–6].opens` | 10:00 (Mon–Sat) | Setting | 24h HH:MM, or null when closed. |
| `[0–6].closes` | 19:00 Mon–Fri · 17:00 Sat | Setting | Sunday is null / null = closed. |

## Social profiles

`src/config/site.config.ts › social`

> Order is preserved in the UI. Set url to an empty string to remove an icon entirely; leave it as a token and the icon renders inert rather than linking anywhere.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[0].url` | {{INSTAGRAM}} | Placeholder | platform: instagram · label: Instagram |
| `[1].url` | {{FACEBOOK}} | Placeholder | platform: facebook · label: Facebook |
| `[2].url` | {{YOUTUBE}} | Placeholder | platform: youtube · label: YouTube |
| `[3].url` | {{LINKEDIN}} | Placeholder | platform: linkedin · label: LinkedIn |
| `[4].url` | {{PINTEREST}} | Placeholder | platform: pinterest · label: Pinterest |
| `[n].platform / label` | Set | Setting | Drives the icon and the accessible name. x is also supported. |

## Brand marks

`src/config/site.config.ts › brand`

> Leave the logo images as tokens and the navbar and footer fall back to a typographic wordmark built from wordmark + monogram. Many luxury studios prefer this — it is not a downgrade.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `logo.src` | {{LOGO}} | Placeholder | For light backgrounds. |
| `logoLight.src` | {{LOGO_LIGHT}} | Placeholder | For dark backgrounds — footer and transparent hero navbar. |
| `logo.alt / logoLight.alt` | {{BUSINESS_NAME}} logo | Setting |  |
| `logo.width / height` | 180 × 48 | Setting | Also on logoLight. |
| `wordmark` | {{BUSINESS_NAME}} | Placeholder | Separate field — set a SHORTER display mark if the legal name is long. The header has ~155px for it at 1024px. |
| `monogram` | {{MONOGRAM}} | Registered | 1–2 characters. Hidden when unfilled. |

## Colours, fonts & radius

`src/config/site.config.ts › theme`

> Written to CSS custom properties on at runtime, so every Tailwind utility re-themes instantly. The same values are duplicated as first-paint defaults in src/index.css — change both, or the first frame paints the old palette.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `colors.canvas` | #FAF8F5 | Setting | Page background. |
| `colors.surface` | #FFFFFF | Setting | Cards, panels, sheets. |
| `colors.surfaceMuted` | #F4F1EC | Setting | Recessed alternating bands. |
| `colors.ink` | #222222 | Setting | Primary text. |
| `colors.inkMuted` | #666666 | Setting | Secondary text. Must hold 4.5:1 on canvas. |
| `colors.accent` | #B8860B | Setting | Brand gold. Fills, borders, icons only — 3:1 on canvas. |
| `colors.accentStrong` | #8A6508 | Setting | Gold as TEXT on light surfaces — 5.0:1. |
| `colors.accentButton` | #966D0A | Setting | Solid fills carrying white labels — 4.68:1. |
| `colors.accentHover` | #7E5C07 | Setting | Hover/active state — 6.14:1 with white. |
| `colors.accentContrast` | #FFFFFF | Setting | Label colour on gold fills. |
| `colors.border` | #ECECEC | Setting | Hairlines and dividers. |
| `colors.contrast` | #1A1917 | Setting | Footer and dark editorial bands. |
| `colors.contrastInk` | #F5F1EA | Setting | Text on contrast surfaces. |
| `fonts.display` | Playfair Display → Times New Roman → serif | Setting | Headings. |
| `fonts.body` | Inter → system stack | Setting | Body copy. |
| `radius` | 2 | Setting | Base corner radius in px. Luxury templates stay low: 2–6. |

## CSS design tokens

`src/index.css › @theme`

> First-paint defaults plus everything not exposed in the config: the fluid type scale, easings, elevation and the metallic gold gradient. Tailwind generates utilities straight from these names.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `--color-* (13)` | Mirrors theme.colors | Setting | Must be kept in step with the config. |
| `--font-display / body / sans` | Playfair / Inter | Setting |  |
| `--text-display / h1 / h2 / h3 / lead` | clamp() fluid scale | Setting | Each with its own line-height and letter-spacing. |
| `--ease-luxe / --ease-snap` | cubic-bezier(0.22,1,0.36,1) / (0.4,0,0.2,1) | Setting | The house curves. |
| `--radius-brand` | 2px | Setting | Overwritten at runtime by theme.radius. |
| `--shadow-lift / --shadow-float` | Two elevations, and only two | Setting | Card hover, and floating surfaces. |
| `--gradient-gold / --shadow-gold / --shadow-gold-lift` | Derived from --color-accent | Setting | Recolours automatically with the brand gold. |
| `--breakpoint-3xl` | 96rem | Setting | Extra breakpoint for wide editorial layouts. |

## Imagery

`src/config/site.config.ts › media`

> 16 image slots. Each accepts a CDN photo, a self-hosted path, or a token that renders branded placeholder artwork. Self-hosted files need widths (and optionally formats) or they are not responsive at all.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `hero` | /images/hero.jpg · 4000×2252 | Setting | Self-hosted, AVIF+WebP, 5 widths. The LCP element. |
| `studioDetail` | CDN photo · 1400×1050 | Setting | Contact page. |
| `aboutPrimary` | CDN photo · 1400×1750 | Setting | Portrait. |
| `aboutSecondary` | CDN photo · 1200×900 | Setting |  |
| `founder` | CDN photo · 1200×1500 | Setting | Alt text quotes {{FOUNDER_NAME}}. |
| `philosophy` | CDN photo · 1400×1750 | Setting | Sticky column on the home page. |
| `materials` | CDN photo · 1400×1050 | Setting |  |
| `ctaBackdrop` | CDN photo · 2400×1200 | Setting | Also the 404 backdrop. |
| `backdrops.soft / .warm` | CDN photos · 2400×1600 | Setting | Full-bleed washes behind light bands. Keep pale and uncluttered. |
| `transformation.before / .after` | /images/before.jpg · after.jpg · 4000×2250 | Setting | MUST share intrinsic dimensions, camera position and white balance — they are shown superimposed. |
| `pageHeaders.services / projects / about / contact` | CDN photos · 2400×1200 | Setting | One masthead per inner page. |
| `[any].src` | path · photo(id) · {{TOKEN}} | Placeholder | A token renders on-brand SVG placeholder art instead of a broken image. |
| `[any].alt` | Set — descriptive | Setting | Required. Supports tokens; cleaned of unresolved ones. |
| `[any].width / height` | Set | Setting | Reserves layout space and prevents CLS. |
| `[any].widths` | Self-hosted only | Setting | The widths you actually exported, e.g. [768,1280,1920,2560]. |
| `[any].formats` | ['avif','webp'] | Setting | Best first. Requires widths; every format must exist at every width. |
| `[any].quality` | 74 default | Setting | CDN sources only. Raise to 82–88 only for images looked at, not through. |

## SEO & metadata

`src/config/site.config.ts › seo`

> Baked into index.html at build time as well as applied per-route at runtime, because social scrapers do not execute JavaScript. Page paths read from the route registry, so the sitemap and canonicals follow a rename.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `siteUrl` | {{SITE_URL}} | Registered | Absolute origin, no trailing slash. The build warns loudly while unset — robots.txt and sitemap.xml need it. |
| `titleTemplate` | %s \| {{BUSINESS_NAME}} | Setting | %s is replaced by the page title. |
| `defaultTitle` | Set — home page title | Setting |  |
| `defaultDescription` | Set — 1 paragraph | Setting |  |
| `ogImage` | {{OG_IMAGE}} | Placeholder | 1200×630 share card. Falls back to a hero crop. |
| `twitterHandle` | {{TWITTER_HANDLE}} | Placeholder | Including the @. Empty omits the tag. |
| `locale` | en_IN | Setting | BCP-47. Also sets at build time. |
| `pages.home / services / projects / about / contact / privacy / terms / notFound` | title + description each | Setting | 8 records. Paths come from the route registry; notFound is excluded from the sitemap. |

## Routes & static files

`src/config/routes.ts`

> Application structure, deliberately NOT in the client-facing config — renaming a path here moves the router, every link, the breadcrumbs, the sitemap and the analytics classifier together. A client editing it in site.config.ts would silently break every CTA.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `routes.home` | / | Setting |  |
| `routes.services` | /services | Setting |  |
| `routes.projects` | /projects | Setting |  |
| `routes.about` | /about | Setting |  |
| `routes.contact` | /contact | Setting | Also the fallback for any unconfigured contact channel. |
| `routes.privacy` | /privacy | Setting |  |
| `routes.terms` | /terms | Setting |  |
| `routes.notFound` | /404 | Setting | Canonical path for the 404 view; the catch-all renders it. |
| `staticFiles.sitemap` | /sitemap.xml | Setting | Generated at build. Must be linked with a plain , not a router link. |
| `staticFiles.robots` | /robots.txt | Setting | Generated at build. |
| `serviceAnchor() / homeAnchor() / aboutAnchor()` | Helpers | Setting | Build deep links so ids and the links targeting them cannot drift apart. |

## Navigation & footer links

`src/data/navigation.ts`

> The single source of truth for the header, the mobile drawer, the footer and the 404 page. The service column is derived from services.ts, so adding a service adds its footer link automatically.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `primaryNav` | 5 items | Setting | Home, Services, Projects, About, Contact — label, href, drawer description. |
| `homeSections` | 13 section ids | Setting | hero, studio-at-a-glance, why-choose-us, services, featured-projects, see-the-transformation, how-we-work, design-philosophy, materials, our-promise, testimonials, faqs, start-your-project. |
| `FOOTER_SERVICE_LABELS` | 7 overrides | Setting | Shorter wording for the narrow footer column; anything unlisted falls back to its real title. |
| `footerServiceLinks` | 13 — derived | Setting | One deep link per service. Not hand-listed. |
| `footerCompanyLinks` | 6 items | Setting | Anchors built from homeSections, so a renamed section moves its link too. |
| `legalNav` | 2 items | Setting | Privacy Policy, Terms of Service. Also tells the navbar these are light-background routes. |
| `DARK_HERO_ROUTES` | [/] | Setting | Routes the navbar floats over transparently. Anything unrecognised is treated as the dark-hero 404. |

## Services

`src/data/services.ts`

> 13 records, each with 14 fields. featuredServices drives the home-page grid; serviceOptions drives the contact form’s select. Slugs are the /services#slug deep-link targets — keep them stable.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[n].slug / title / category` | Set | Setting | Slug is the anchor id and must stay stable. |
| `[n].summary / description` | Set | Setting | Card copy and expanded panel copy. |
| `[n].icon / image` | Set | Setting | Lucide icon + ManagedImage. |
| `[n].features` | 5–6 each | Setting | Concrete deliverables. |
| `[n].benefits` | 3–4 each | Setting | Client-facing outcomes. |
| `[n].idealFor` | Set | Setting | Who the service is for. |
| `[n].timeline` | {{TIMELINE_RESIDENTIAL}} … 13 variants | Placeholder | One per service: RESIDENTIAL, KITCHEN, WARDROBE, BEDROOM, LIVING, DINING, CEILING, LIGHTING, FURNITURE, PLANNING, COMMERCIAL, OFFICE, RENOVATION. |
| `[n].startingFrom` | {{PRICE_RESIDENTIAL}} … 13 variants | Placeholder | Same 13 suffixes as the timelines. |
| `[n].featured` | boolean | Setting | Featured services appear in the home-page overview. |

## Projects

`src/data/projects.ts`

> 12 records. featuredProjects drives the home-page portfolio preview; projectCategories drives the gallery filter chips. Every project’s numbers are placeholders — they are the most checkable claims on the site.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[n].slug / name / category / type` | Set | Setting | Category drives the gallery filter. |
| `[n].location` | Uses {{CITY}} | Registered | Follows the config automatically. |
| `[n].area` | {{PROJECT_1_AREA}} … {{PROJECT_12_AREA}} | Placeholder | 12 placeholders. |
| `[n].duration` | {{PROJECT_1_DURATION}} … _12_ | Placeholder | 12 placeholders. |
| `[n].budget` | {{PROJECT_1_BUDGET}} … _12_ | Placeholder | 12 placeholders. Deliberately a range, not a figure. |
| `[n].year` | {{PROJECT_1_YEAR}} … _12_ | Placeholder | 12 placeholders. |
| `[n].description / scope` | Set | Setting | Design intent, and the scope proof list. |
| `[n].image / span` | Set | Setting | span: tall \| standard \| wide — the masonry footprint. |
| `[n].featured` | boolean | Setting |  |
| `projectCategories` | Set | Setting | Filter chip labels, “All” first. |

## FAQs

`src/data/faqs.ts`

> 10 records, rendered on the home, services and contact pages and emitted as FAQPage structured data. The pricing question is deliberately first.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[n].question / answer` | Set | Setting | Answers quote the commercial facts via the registry. |
| `[n].category` | Set | Setting | Drives faqCategories. |
| `Embedded tokens` | {{PRICE_STARTING}}, {{PRICE_FULL_HOME}}, {{TIMELINE_ROOM}}, {{TIMELINE_HOME}}, {{TIMELINE_DESIGN}}, {{WARRANTY_YEARS}} | Registered | All resolve from facts in the config. |

## Testimonials

`src/data/testimonials.ts`

> 6 records, shown as a static wall rather than a carousel. Each quote is chosen to answer a different objection — cost, timeline, build quality, project management.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[n].quote` | Set | Setting |  |
| `[n].name` | {{TESTIMONIAL_1_NAME}} … _6_ | Placeholder | 6 placeholders. Use real names wherever permission allows. |
| `[n].location` | {{TESTIMONIAL_1_PROJECT}} … _6_ | Placeholder | 6 placeholders. |
| `[n].role` | Set | Setting | Project or property descriptor. |
| `[n].rating` | Number out of 5 | Setting |  |
| `[n].addresses` | Set | Setting | Editorial note on which objection the quote neutralises. Not rendered. |

## Story, values, founder & milestones

`src/data/about.ts`

> Founder identity is read from the config; only the long-form letter lives here. Milestone years are placeholders because they are the one part of the story that is factual rather than editorial.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `story` | eyebrow, title, 3 paragraphs | Setting | Uses {{BUSINESS_NAME}}, {{FOUNDING_YEAR}}, {{CITY}}. |
| `mission / vision` | statement + detail each | Setting |  |
| `values` | 4 records | Setting | icon, title, description. |
| `founder.letter` | 3 paragraphs | Setting | Drop-cap treatment on the first. |
| `founder.name / role / credential / signature` | From site.config | Setting | Single source — do not re-declare here. |
| `milestones[].year` | {{MILESTONE_1_YEAR}} … _5_ | Placeholder | 5 placeholders across 9 milestone records. |
| `milestones[5].title / description` | {{MILESTONE_5_TITLE}} / {{MILESTONE_5_DESCRIPTION}} | Placeholder | The open-ended “latest” milestone. |
| `clientReasons` | 8 lines | Setting | The About page’s “why clients choose us” list. |

## Philosophy, materials, promises & standards

`src/data/philosophy.ts`

> Four separate content blocks sharing one file. No placeholders — this is all editorial copy.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `philosophyIntro` | eyebrow, title, lead | Setting |  |
| `principles` | 6 records | Setting | icon, title, description. |
| `materialsIntro / materials` | intro + 6 records | Setting |  |
| `promiseIntro / promises` | intro + 5 records | Setting | Risk-reversal band. |
| `qualityStandards` | 4 records | Setting | Shares the FeatureCard pattern with values and differentiators. |

## Process timeline

`src/data/process.ts`

> 6 stages. Publishing a stage duration and a named deliverable is what turns an abstract worry into a schedule a visitor can picture.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `[n].number / title / description` | Set | Setting |  |
| `[n].duration` | {{STAGE_1_DURATION}} … {{STAGE_6_DURATION}} | Placeholder | 6 placeholders. |
| `[n].deliverable` | Set | Setting | The tangible artefact for that stage. |
| `[n].icon` | Set | Setting |  |

## Differentiators

`src/data/differentiators.ts`

> 8 objection-handling cards in a 4×2 grid. No placeholders.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `differentiators` | 8 records | Setting | icon, title, description. |
| `primaryDifferentiators` | First 4 — derived | Setting |  |

## Statistics & trust markers

`src/data/stats.ts`

> Demo figures. Replace them before launch — they are the most checkable claims on the site. Anything not countable (a rating) must use display rather than value, or it animates from zero and looks broken.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `heroStats` | 4 records | Setting | value, suffix, label, icon. Overlaid on the hero. |
| `studioStats` | 4 records | Setting | Adds detail. Also used on the About and Projects pages. |
| `trustMarkers` | 6 lines | Setting | The marquee under the hero. |
| `Embedded tokens` | {{GOOGLE_RATING}}, {{WARRANTY_YEARS}}, {{CITY}}, {{FOUNDING_YEAR}} | Registered |  |

## Legal documents

`src/data/legal.ts`

> Structured scaffolding, not legal advice. While lastUpdated is a placeholder both pages show a visible “not yet reviewed” notice — setting the date is what publishes them, which makes shipping unreviewed policies a deliberate act.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `legalMeta.lastUpdated` | {{LEGAL_LAST_UPDATED}} | Placeholder | Filling this in also removes the review notice from both pages. |
| `privacyPolicy` | eyebrow, title, lead + 10 sections | Setting | Who we are, what we collect, how we use it, sharing, cookies, retention, rights, security, children, changes. |
| `termsOfService` | eyebrow, title, lead + 11 sections | Setting | Scope, website use, quotations, consultations, changes, warranty, IP, payment, cancellation, liability, governing law. |
| `Embedded tokens` | {{BUSINESS_NAME}}, {{LEGAL_NAME}}, {{EMAIL}}, {{PHONE}}, {{CITY}}, {{STATE}}, {{COUNTRY}}, {{WARRANTY_YEARS}} | Registered | All resolve from the config. |

## Lead capture

`src/config/site.config.ts › forms`

> While endpoint is a placeholder the form runs in demo mode — it validates, animates and shows the success state without sending anything.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `endpoint` | {{FORM_ENDPOINT}} | Placeholder | Formspree, Web3Forms, Basin, Netlify Forms or your own. |
| `budgetOptions[0–4]` | {{BUDGET_BAND_1}} … {{BUDGET_BAND_5}} | Placeholder | Whole-string placeholders — write the entire label including currency and wording. |
| `budgetOptions[5]` | Not sure yet — please advise | Setting | Deliberately kept as real copy. |
| `successMessage` | Set | Setting | Shown on the confirmation panel. |

## Analytics

`src/config/site.config.ts › analytics`

> Leave both as tokens and the site ships with no analytics at all — no script, no cookies, no dataLayer, no click listener. Use one or the other: filling in both loads both, and double-counts if the GTM container also reports to the same GA4 property.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `ga4MeasurementId` | {{GA_MEASUREMENT_ID}} | Placeholder | G-XXXXXXXXXX. Validated by pattern — a typo is ignored, not half-applied. |
| `gtmContainerId` | {{GTM_CONTAINER_ID}} | Placeholder | GTM-XXXXXXX. |
| `Tracked events` | generate_lead, whatsapp_click, phone_call_click, email_click, cta_click, page_view | Setting | Defined in src/lib/analytics.ts. No per-button wiring needed — clicks are classified from the link’s destination. |

## Feature switches

`src/config/site.config.ts › features`

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `floatingWhatsApp` | true | Setting | Floating WhatsApp button. |
| `floatingCall` | true | Setting | Floating click-to-call button. |
| `backToTop` | true | Setting | Back-to-top control. |
| `announcementBar` | false | Setting | Slim strip above the navigation. |
| `announcementText` | Uses {{CURRENT_SEASON}} + {{CITY}} | Registered | CURRENT_SEASON is derived from the calendar month. |
| `mapEmbed` | true | Setting | Google Maps embed on the contact page. |
| `testimonials` | true | Setting | Testimonials band. |

## Global CTA, hero & slider copy

`src/config/site.config.ts › cta · heroCopy · transformationCopy`

> Kept in the config rather than in components, so cloning never means editing a component. The hero’s ask is deliberately different from the header’s — the header commits to time, the hero to a number.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `cta.primary` | Book Free Consultation | Setting | Header and most section CTAs. |
| `cta.secondary` | View Our Projects | Setting |  |
| `cta.tertiary` | Request a Quote | Setting | Service rows and the project dialog. |
| `cta.call` | Call Now | Setting |  |
| `cta.whatsapp` | WhatsApp Us | Setting |  |
| `heroCopy.headlineLead / headlineAccent / headlineTail` | Design Your / Dream Home / With Us | Setting | Three explicit lines — the accent line carries the brand gold. Set headlineTail to '' to drop it. |
| `heroCopy.subheadline` | Set | Setting |  |
| `heroCopy.ctaLabel` | Get Free Quote | Setting | Deliberately separate from cta.primary. |
| `transformationCopy.eyebrow / title / lead` | Set | Setting |  |
| `transformationCopy.beforeLabel / afterLabel` | Before / After | Setting | Sit on the photograph — keep them short. |
| `transformationCopy.hint` | Drag to compare | Setting | Visual affordance only. |
| `transformationCopy.handleLabel` | Before and after comparison | Setting | What a screen reader hears instead of the drag hint. |

## Interface chrome & accessibility text

`src/config/copy.config.ts › ui · floating · system`

> Landmark names, menu labels and the text screen readers announce. Most clients never touch this — but translate it and the whole site speaks the new language to assistive technology, which no amount of editing the visible copy would achieve on its own.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `ui.skipToContent` | Skip to main content | Setting | First thing a keyboard user reaches on every page. |
| `ui.primaryNavLabel / mobileNavLabel / drawerLabel` | Primary / Mobile / Site navigation | Setting | Accessible names for the three navigation landmarks. |
| `ui.openMenu / closeMenu` | Open menu / Close menu | Setting | The mobile trigger, per state. |
| `ui.drawerWhatsapp` | WhatsApp | Setting | Short label — the drawer grid is two columns. |
| `ui.breadcrumbLabel / close` | Breadcrumb / Close | Setting | Landmark name; default dialog close button. |
| `ui.logoHome` | {name} — go to homepage | Setting | Slot: {name}, the wordmark. |
| `ui.dismissAnnouncement` | Dismiss announcement | Setting |  |
| `ui.socialProfile` | {{BUSINESS_NAME}} on {platform} | Registered | ONE string, used by the footer and the contact page — a screen-reader user must hear the same thing in both. |
| `ui.imagePlaceholder` | Image | Setting | Drawn on generated placeholder artwork when a slot has no label. |
| `floating.backToTop / backToTopAria` | Top / Scroll back to top of page | Setting | Visible label and its fuller accessible name. |
| `floating.callAria / whatsappAria` | Call {{BUSINESS_NAME}} / Message … on WhatsApp | Registered | Tokens, not slots — they degrade gracefully while the name is unfilled. |
| `system.loading` | Loading page… | Setting | Announced while a route chunk downloads. Never shown visually. |
| `system.error.*` | 8 strings | Setting | Eyebrow, title, two body variants (named / unnamed), retry, home, contact heading, WhatsApp label. |

## Home page copy

`src/config/copy.config.ts › home`

> Every heading, eyebrow, lead and button on the home page, in the order they appear. Headings are set at display sizes — keep them tight or they wrap.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `home.heroLabel` | Introduction | Setting | Accessible name of the hero section. |
| `home.trustStrip.pause / play` | Pause / Play the scrolling list of credentials | Setting | Screen-reader label on the WCAG 2.2.2 control. |
| `home.stats` | eyebrow, title, lead, action, footnote, screenReaderSummary | Registered | Lead and footnote carry {{CITY}} and {{PHONE}}. |
| `home.whyUs` | eyebrow, title, lead, leadEmphasis, closing | Setting | leadEmphasis is the gold half-sentence — keep it short. |
| `home.services` | eyebrow, title, lead, allServices, moreTitle, moreLead, exploreAll | Setting | allServices and moreTitle take a {count} slot. |
| `home.portfolio` | eyebrow, title, lead, viewAll, closing, discuss, browse | Setting | viewAll takes a {count} slot. |
| `home.process` | eyebrow, title, lead, step, deliverable, closingTitle, closingLead | Setting | step takes {number}; deliverable keeps its trailing space. |
| `home.philosophy.quote / attribution` | Pull quote + {{FOUNDER_NAME}} — {{FOUNDER_ROLE}} | Registered | Include the quote marks in the quote itself. |
| `home.materials` | note, usedFor, scheduleOffer | Setting |  |
| `home.promise.closing` | 1 line above the button | Setting |  |
| `home.testimonials` | eyebrow, title, lead, ratingLabel, summary, readAll | Registered | ratingLabel takes {rating}; summary carries the rating tokens. |
| `home.faqs` | eyebrow, title, lead, panelTitle, panelLead, callAction, formLink | Registered | callAction carries {{PHONE}}. |
| `home.finalCta` | eyebrow, title, titleEmphasis, lead | Setting | titleEmphasis is the italic gold clause. |

## Inner page copy

`src/config/copy.config.ts › pages`

> The four page mastheads and every heading beneath them, plus the repeated labels inside service rows, portfolio tiles and the case-study dialog.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `pages.services.hero` | eyebrow, title, lead | Setting |  |
| `pages.services.index` | eyebrow, title, lead, listLabel | Setting | listLabel is the jump-rail’s accessible name. |
| `pages.services.row` | included, whyItMatters, idealFor, timeline, startingFrom, askAction, whatsappMessage | Registered | Repeated on all 13 rows. whatsappMessage carries {{BUSINESS_NAME}} and a {service} slot. |
| `pages.services.closing` | title, lead, secondaryAction | Setting |  |
| `pages.projects.hero` | eyebrow, title, lead, action | Registered | lead carries {{CITY}}. |
| `pages.projects.gallery` | eyebrow, title, lead, filterLabel, filterHeading, resultCount, empty | Setting | resultCount takes {visible} and {total}. |
| `pages.projects.card` | openLabel, area, duration, budget | Setting | openLabel takes {name} and {category}. |
| `pages.projects.dialog` | closeLabel, brief, scope, budget, completed, invitation, whatsappMessage | Registered | closeLabel takes {name}; whatsappMessage takes {project}. |
| `pages.projects.numbers / closing` | eyebrow, title / title, lead, secondaryAction | Setting |  |
| `pages.about.hero` | eyebrow, title, lead | Registered | lead carries {{CITY}}. |
| `pages.about.story` | primaryAction, secondaryAction | Setting |  |
| `pages.about.values / milestones / quality / reasons` | eyebrow, title, lead each | Setting | Four section headings. |
| `pages.about.founder.eyebrow` | A Word From Our Founder | Setting | The letter itself is in src/data/about.ts. |
| `pages.contact.hero` | eyebrow, title, lead | Setting |  |
| `pages.contact.cards` | 3 cards × eyebrow + description, plus copy/copied and Send an email | Setting |  |
| `pages.contact.studio` | eyebrow, title, lead, 4 row labels, directions, reviewSummary | Registered | lead carries {{CITY}}; reviewSummary the rating tokens. |
| `pages.contact.map` | frameTitle, cardTitle, directions | Registered | Both titles carry {{BUSINESS_NAME}}. |
| `pages.notFound` | eyebrow, title, lead, homeAction | Setting |  |
| `pages.legal.lastUpdated` | Last updated: | Setting | Label before the revision date on both legal pages. |

## Contact form copy

`src/config/copy.config.ts › form`

> ⚠ The placeholders are the most locale-specific strings on the site: an Indian name, an Indian dialling format, a carpet area in square feet and a “3 BHK” flat. Rewrite all five for the client’s market — an example that does not fit quietly signals the site was built for somebody else.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `form.title / lead` | Request your free consultation + intro | Setting |  |
| `form.fields.name` | label + placeholder “e.g. Priya Sharma” | Setting | ⚠ Locale-specific example. |
| `form.fields.phone` | label + placeholder “e.g. +91 98765 43210” + hint | Setting | ⚠ Locale-specific dialling format. |
| `form.fields.email` | label + placeholder “e.g. priya@example.com” | Setting | ⚠ Locale-specific example. |
| `form.fields.service` | label + “Choose a service” | Setting | Options come from serviceOptions in src/data/services.ts. |
| `form.fields.budget` | label + “Select a range” + hint | Setting | Bands come from forms.budgetOptions in site.config.ts. |
| `form.fields.date` | label only | Setting |  |
| `form.fields.message` | label + placeholder + hint | Setting | ⚠ Placeholder describes a 3 BHK flat in square feet. |
| `form.validation` | 6 messages | Setting | Written as help, not rebuke. Keep it that way — this is the highest-value form on the site. |
| `form.privacyNote / privacyLink` | Promise + “Privacy Policy” link label | Setting |  |
| `form.submit / submitting` | Send Enquiry / Sending… | Setting |  |
| `form.successTitle / sendAnother` | Thank you — enquiry received. / Send another enquiry | Setting | The success body comes from forms.successMessage. |
| `form.errorMessage` | Failure fallback | Registered | Carries {{PHONE}}. |
| `form.projectPrefill` | I’d like something similar to “{project}”. | Setting | Seeded when arriving from a project. Keep the trailing space. |

## Risk-reversal assurances

`src/config/copy.config.ts › assurances`

> ONE list, rendered under the About page hero AND under the closing call to action. They used to be written out separately — same three sentences, different icons — so changing the reply time in one place quietly left the other page promising something else. Only change these if the studio can actually honour them.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `assurances[0]` | Free consultation and site visit | Setting | Icon: MessageSquare. |
| `assurances[1]` | No obligation, no pressure | Setting | Icon: ShieldCheck. |
| `assurances[2]` | A reply within one working day | Setting | Icon: Clock. |
| `(count)` | 3 is the right number | Setting | Clears the three reasons someone hesitates — cost, commitment, silence. A fourth wraps the row on a laptop. |

## Developer notices

`src/config/copy.config.ts › developer`

> Scaffolding addressed to whoever is building the site, not to a visitor. Each is gated on a config field still being a placeholder, so filling that field in is what removes it — none of these can reach a finished site.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `developer.formDemoSuccess` | label + detail | Setting | On the success panel while forms.endpoint is a placeholder. Slots: {field}, {file}. |
| `developer.formDemoFooter` | label + detail | Setting | Under the form, same condition. |
| `developer.mapUnconfigured` | 1 sentence | Setting | In place of the map while location.mapEmbedUrl is a placeholder. |
| `developer.legalUnreviewed` | label + detail | Setting | On both legal pages while legalMeta.lastUpdated is a placeholder. Slots: {file}, {field}. |

## Pre-app shell copy

`src/config/shell.config.ts`

> The only lines a visitor can read BEFORE any of the app’s JavaScript has run. Injected into index.html at build time, so that file needs no editing. Kept out of copy.config.ts for two reasons: copy that must survive the app not loading cannot live in the app, and vite.config.ts imports this file — so it deliberately imports nothing itself.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `fallbackTitle` | Interior Design Studio | Setting | The document title of last resort, used only when seo.defaultTitle AND business.name are both still placeholders. Read by BOTH the runtime Seo component and the build-time head injector — it used to be written out separately in each, which is how a clone ends up with one title in the tab and another on the share card. Also the one string that names the vertical. |
| `bootFallback` | This is taking longer than expected. | Setting | Appears under the boot spinner after 10s. A healthy page removes the splash long before it fires. |
| `bootFallbackLink` | Reload the page | Setting | Two or three words. |
| `noscript` | 1 sentence | Setting | ⚠ Says “our design studio”. Name the client — it is the only page a JavaScript-disabled visitor ever sees. |

## Document shell

`index.html`

> Structure and first-paint styling only — the SEO block is injected from site.config.ts and the visible copy from shell.config.ts, so the two injection markers are the only things here you must not delete.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `Google Fonts URL` | Playfair Display + Inter | Setting | Two families and their weights. Change here AND in theme.fonts, or the stack and the download disagree. |
| `preconnect hints` | fonts.googleapis.com · fonts.gstatic.com | Setting |  |
| `Critical shell CSS` | background #faf8f5 | Setting | First-paint colour. Keep in step with theme.colors.canvas. |
| `Boot splash` | spinner colours #ececec / #b8860b | Setting | Border and accent of the loading mark. |
| `Boot failsafe delay` | 10s | Setting | The CSS-only dead-man’s switch. The timing is here; the wording is in shell.config.ts. |
| `<!-- SEO:INJECT -->` | Build-time marker | Setting | Replaced with title, description, canonical, Open Graph, Twitter, preconnect and the hero preload. |
| `<!-- SHELL:BOOT_FALLBACK -->` · `<!-- SHELL:NOSCRIPT -->` | Build-time markers | Setting | Replaced from shell.config.ts. |
| `favicon / manifest links` | 4 references | Setting | Paths into public/. |

## Motion & interaction tuning

`src/lib/motion.ts · src/hooks/index.ts · component constants`

> Not client copy, but every one is a deliberate, changeable value. Reveal delays only work because they are folded into the variant — a transition prop is silently discarded.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `EASE / EASE_SNAP` | cubic-bezier(0.22,1,0.36,1) / (0.4,0,0.2,1) | Setting | src/lib/motion.ts — the house curves. |
| `DURATION` | fast 0.35 · base 0.6 · slow 0.9 · editorial 1.2 | Setting | src/lib/motion.ts — seconds. |
| `viewportOnce / viewportRepeat` | margin 9999px 0px -10% 0px | Setting | src/lib/motion.ts — the asymmetric top margin is what stops fast scrolling stranding a reveal at opacity 0. |
| `useScrolled(threshold)` | 24 default · 32 in the navbar | Setting | src/hooks · Navbar — px before the bar goes solid. |
| `useScrolledPast` | 700 | Setting | FloatingActions — px before back-to-top appears. |
| `useCountUp(duration)` | 1800 | Setting | src/hooks — ms for the statistics count-up. |
| `useCopyToClipboard(resetAfter)` | 2000 | Setting | src/hooks — ms the “Copied” state holds. |
| `BeforeAfter STEP / PAGE_STEP` | 2 / 10 | Setting | Percent per arrow key and per Page key. |
| `Transformation initial` | 50 | Setting | Resting divider position. |
| `Marquee duration` | 38s | Setting | TrustStrip — one full loop. |
| `Hero slow-pan` | 24s, scale 1 → 1.045 | Setting | src/index.css keyframes. |
| `Analytics load delay` | idle timeout 4000 · fallback 1500ms | Setting | Analytics.tsx — how long third-party scripts wait. |
| `ScrollToTop deadline` | 3000ms | Setting | How long a hash target is polled for before giving up. |
| `Section spacing scale` | sm/md/lg/xl → py-14…py-44 | Setting | src/components/common/Section.tsx. |
| `Container widths` | narrow 3xl · default 85rem · wide 110rem · hero clamp | Setting | src/components/common/Section.tsx. |

## Image pipeline

`src/lib/images.ts`

> Change the CDN origin here to move providers; every image URL in the project is built through these functions.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `IMAGE_CDN_ORIGIN` | https://images.unsplash.com | Setting | Swap to move providers. Also drives the build-time preconnect hint. |
| `SRCSET_WIDTHS` | [480, 768, 1024, 1440, 1920, 2400] | Setting | Widths offered for CDN sources. |
| `DEFAULT_QUALITY` | 74 | Setting | Overridable per image via quality. |
| `primarySource cap` | 1440 | Setting | Fallback width for clients ignoring srcset. |

## Build, SEO generation & bundling

`vite.config.ts`

> Everything here is generated from the config at build time, so there is no static file to forget to update.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `Sitemap PRIORITY` | home 1.0 · projects/contact 0.9 · services 0.8 · about 0.7 | Setting | Commercial value, not page depth. Unlisted routes default to 0.6. |
| `Sitemap CHANGEFREQ` | monthly / yearly per route | Setting |  |
| `robots.txt` | Allow / · disallows source maps | Setting | Generated; Sitemap line uses seo.siteUrl. |
| `Hero preload` | best format, ≤1920 fallback | Setting | imagesizes must stay byte-identical to the img’s sizes. |
| `manualChunks` | vendor-motion · vendor-router · vendor-react | Setting | Only the three genuinely global libraries are pinned. |
| `build.target / chunk limit` | es2020 · 700kB warning | Setting |  |
| `Token validation` | Fails the build on unresolvable tokens | Setting | Warns with the full list of unfilled placeholders. |
| `Shell injection` | SHELL:BOOT_FALLBACK · SHELL:NOSCRIPT | Setting | shellHtmlPlugin escapes and injects the pre-app copy from shell.config.ts. |

## Structured data

`src/lib/schema.ts`

> Every builder strips unresolved tokens and omits unconfigured fields — invalid structured data is worse than none.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `Business @type` | ['InteriorDesign', 'LocalBusiness'] | Setting | Change if you clone this template to another vertical. |
| `aggregateRating` | Gated on rating + reviewCount | Setting | Never guessed — fabricated ratings are a manual-action risk. |
| `Emitted graphs` | LocalBusiness, WebSite, WebPage, BreadcrumbList, FAQPage, ItemList of Services | Setting |  |
| `Robots directive` | index, follow, max-image-preview:large, max-snippet:-1 | Setting | src/components/common/Seo.tsx. 404 is noindex, nofollow. |

## Type contracts & helpers

`src/config/site.config.types.ts · src/config/copy.config.types.ts · src/lib/copy.ts`

> You do not edit these when cloning. They exist so TypeScript turns “the client’s phone number is missing on one page” and “that heading key was renamed” into compile errors instead of empty elements in production.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `site.config.types.ts` | SiteConfig, ManagedImage, ThemeColors, PageSeo … | Setting | Shape of the business config. Every field carries a doc comment. |
| `copy.config.types.ts` | CopyConfig, SectionCopy, AssuranceCopy, NoticeCopy | Setting | Shape of the copy config. Each field’s comment names the {slots} it supports. |
| `lib/copy.ts › format()` | String interpolation of {slot} values | Setting | An unknown slot is left visible rather than replaced with “undefined”. |
| `lib/copy.ts › formatNodes()` | The same, but a slot may be a React node | Setting | Lets an emphasised number stay inside one editable sentence instead of three JSX fragments. |

## Project metadata & tooling

`package.json · components.json · tsconfig*.json · CLONING.md`

> Housekeeping a clone should still update, even though none of it is visitor-facing.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `package.json name` | luxe-interior-master-template | Setting | Rename per client. |
| `package.json description` | Set | Setting |  |
| `package.json version` | 1.0.0 | Setting |  |
| `components.json` | shadcn/ui generator config | Setting | Aliases and style preset. |
| `tsconfig paths` | @/* → ./src/* | Setting | Change here and in vite.config resolve.alias together. |
| `CLONING.md` | The step-by-step worklist | Setting | Seven numbered steps, opening with a “where everything lives” table. Kept in step with the fourteen config sections. |
| `public/images/README.md` | Export settings + measured contrast figures | Setting | How to regenerate the self-hosted hero and before/after set. |

## Static assets & PWA

`public/`

> Replace the files, keep the filenames — index.html references them by path.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `favicon.svg` | Replace | Setting |  |
| `apple-touch-icon.png` | 180×180 | Setting |  |
| `icon-192.png / icon-512.png` | PWA icons | Setting | 512 is also used as the maskable icon. |
| `site.webmanifest` | name, short_name, description, colours | Setting | Not token-driven — edit directly. |
| `images/` | hero, before, after + variants | Setting | Self-hosted responsive exports, named -.. |

## Build & deployment

`vercel.json · public/_redirects · vite.config.ts`

> robots.txt and sitemap.xml are generated at build time from seo.siteUrl, so there is no file to forget to update.

| Setting | Value / placeholder | Kind | Notes |
| --- | --- | --- | --- |
| `vercel.json rewrites` | SPA fallback | Setting | Every path serves index.html. |
| `vercel.json headers` | Cache + security | Setting | Immutable asset caching, nosniff, SAMEORIGIN, referrer and permissions policy. |
| `public/_redirects` | Netlify / Cloudflare fallback | Setting | Same job as the Vercel rewrite. |
| `vite.config.ts` | Build-time SEO, sitemap, token validation | Setting | Fails the build on a token no configuration could ever fill. |

---

## Notes

**The two gaps this audit surfaced are now closed.** The risk-reversal lines were duplicated verbatim between `FinalCta.tsx` and `About.tsx` — same three sentences, different icons — so a studio could promise a one-day reply on one page and something else on the other. They are now one `assurances` array rendered in both places. And `CLONING.md` has been brought back into step: it described twelve config sections when there were fourteen, and predated the `facts` block, the `analytics` block, founder identity moving into `site.config.ts`, the legal pages and the privacy/terms SEO entries.

**Two kinds of brace, and they are not interchangeable.** `{{TOKEN}}` is a value from `site.config.ts`, resolved by the registry and checked at build time. `{slot}` is a value the template only knows while rendering — a count, or the name of the project the visitor just opened — filled by `src/lib/copy.ts`. Keeping them visually distinct is what stops the build-time token validator reporting a `{count}` as an unresolvable token.

**Two kinds of placeholder, and the difference matters.** A placeholder that is the *whole* value of a field is filled by replacing the string. A token embedded *inside* a sentence can only resolve through the registry — and `npm run build` fails, naming the file and line, if you use one that has no home in the config.

**Unfilled placeholders behave differently per environment.** The dev server renders them literally so they are impossible to miss in review; a production build strips them and tidies the surrounding punctuation, so a missed field shortens a sentence rather than printing `{{FOUNDER_NAME}}` at a visitor.
