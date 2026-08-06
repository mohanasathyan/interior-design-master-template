# Luxe — Interior Design Master Template

An ultra-premium, fully placeholder-driven website template for interior design
studios. Clone it, edit **one file**, drop in the client's photographs, and ship.

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Framer Motion · Radix (shadcn/ui pattern) · Lucide

---

## The core idea

Every business detail on this website — name, phone, email, WhatsApp, address,
social links, colours, fonts, images, SEO metadata, opening hours, form endpoint
— is read from a single file:

```
src/config/site.config.ts
```

Nothing is hardcoded anywhere else. Change that file and the entire site
re-themes and re-brands itself: all five pages, the schema.org markup, the share
cards, the WhatsApp deep links, the generated placeholder art and the favicon
colours.

### Placeholders that fail loudly, not silently

Any value written as `{{TOKEN}}` is treated as *not yet filled in*:

| Kind | Behaviour while unfilled |
| --- | --- |
| **Body copy** | Renders as `{{CITY}}` — visible, impossible to miss in a client review |
| **Images** | Renders elegant, on-brand SVG artwork instead of a broken image |
| **Links** (phone, WhatsApp, socials) | Falls back to `/contact` — never a dead `tel:{{PHONE}}` |
| **Titles, meta, schema** | Token stripped, orphaned punctuation tidied, sentences re-capitalised |
| **Form endpoint** | Contact form runs in demo mode: validates, animates, shows success |
| **`seo.siteUrl`** | Build prints a loud warning — sitemap and canonical need a real origin |

The result: **the template is fully demoable on day one with zero client
data**, while making it impossible to accidentally ship a half-filled page.

### Photography

The template ships with 39 curated luxury interior photographs so it presents
beautifully out of the box. They are delivered from a resizing CDN, which is
what lets `<Img>` emit a real `srcset` — a phone downloads a ~60 KB hero
instead of a 900 KB one.

Every one of them was picked against the same brief and then checked, not
assumed: warm neutrals only (cream, sand, taupe, oak, brass), no cool greys, no
saturated accent colours, no visible people in the interiors, and a subject
that actually matches its slot — the kitchen service shows a kitchen, the
wardrobe service shows a wardrobe. All 39 are verified to resolve and to carry
the free Unsplash licence rather than an Unsplash+ one, which is the difference
between "commercially usable" and "a licensing problem you find out about
later".

Images live in the config exactly like every other value:

```ts
// src/config/site.config.ts
hero: { src: photo('photo-1618221195710-dd6b41faaea6'), alt: '…', width: 2400, height: 1600 }

// or self-host — everything else keeps working
hero: { src: '/images/hero.jpg', alt: '…', width: 2400, height: 1600 }
```

> **Before launch, replace the PROJECT images with the client's own completed
> work.** The stock set is licensed for commercial use, but presenting someone
> else's interiors as your portfolio is misrepresentation regardless of licence.
> See `src/lib/images.ts` for the full note.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # TypeScript project-wide type check
```

---

## Cloning for a new client — the 20-minute checklist

1. **Copy the folder**, then `npm install`.
2. **Open `src/config/site.config.ts`** and replace every `{{TOKEN}}`.
   The file is organised into twelve numbered, commented sections.
3. **Swap the photography** — the client's own images in `media` and in
   `src/data/{services,projects}.ts`. Project images especially.
4. **Replace the favicon** (`public/favicon.svg`), then regenerate
   `apple-touch-icon.png`, `icon-192.png` and `icon-512.png` from it.
5. **Set `seo.siteUrl`** to the live domain, with no trailing slash.
   `robots.txt` and `sitemap.xml` are generated from it automatically.
6. **Set `forms.endpoint`** to a Formspree / Web3Forms / Basin URL — this
   switches the contact form out of demo mode.
7. **Review `src/data/`** — services, projects, FAQs, testimonials, milestones.
   The copy is written to be true for any quality studio, but the numbers,
   project names and reviews should become the client's real ones.
8. `npm run build` and deploy.

### Re-colouring for a different brand

Edit `theme.colors` in the config. The values are written to CSS custom
properties on `<html>` at runtime, and every Tailwind utility in the project
compiles to `var(--color-…)` — so one hex change re-themes buttons, borders,
headings, the footer and even the generated placeholder artwork.

The same applies to `theme.fonts` (swap the Google Fonts `<link>` in
`index.html` to match) and `theme.radius`.

**One rule worth keeping.** The palette carries *three* golds, because a
single gold cannot be legible in every role:

| Token | Used for | Contrast |
| --- | --- | --- |
| `accent` | icons, rules, borders, gold text on dark | 3.07:1 on canvas (icons need 3:1) |
| `accentStrong` | gold **text** on light surfaces | 5.02:1 on canvas |
| `accentButton` | solid gold **fills** carrying a white label | 4.68:1 with white |

The brand gold `#B8860B` is preserved exactly as specified — it simply is not
legible as small text on cream (3.07:1) or behind white type (3.25:1), so those
two roles get purpose-built variants. If you re-colour, keep the relationship:
`accentStrong` needs 4.5:1 against `canvas`, and `accentButton` needs 4.5:1
against `accentContrast`.

---

## Project structure

```
src/
├── config/
│   ├── site.config.ts          ⭐ THE ONLY FILE YOU MUST EDIT
│   └── site.config.types.ts    Type contract — catches typos at compile time
│
├── data/                       Content, separated from presentation
│   ├── navigation.ts           Header, footer and section anchors
│   ├── services.ts             13 services: features, benefits, timeline, price
│   ├── projects.ts             12 portfolio entries with area/duration/budget
│   ├── differentiators.ts      "Why choose us" — objection handlers
│   ├── process.ts              The six-step process
│   ├── philosophy.ts           Design principles, materials, promises, QA
│   ├── about.ts                Story, mission, vision, values, founder
│   ├── faqs.ts                 10 FAQs (feeds FAQPage rich results)
│   ├── testimonials.ts         6 reviews, each answering a different objection
│   └── stats.ts                Animated statistics and trust markers
│
├── lib/
│   ├── tokens.ts               The {{TOKEN}} interpolation engine
│   ├── images.ts               Image sources, srcset and social-crop builders
│   ├── links.ts                tel:/mailto:/wa.me builders with safe fallbacks
│   ├── placeholder.ts          Generates the branded SVG placeholder artwork
│   ├── schema.ts               JSON-LD: LocalBusiness, FAQ, Breadcrumb, Service
│   ├── motion.ts               Shared easing curves, durations and variants
│   └── utils.ts                cn(), time and slug helpers
│
├── hooks/index.ts              useScrolled, useCountUp, useLockBodyScroll, …
│
├── components/
│   ├── ui/                     Primitives: button, card, accordion, input,
│   │                           textarea, select, label, badge
│   ├── common/                 Img, Reveal, Section, SectionHeading, Seo,
│   │                           Stat, Breadcrumbs, SmartLink, ThemeProvider
│   ├── layout/                 Navbar, Footer, Logo, FloatingActions,
│   │                           AnnouncementBar, Layout
│   └── sections/               Composed page sections (Hero, ProcessTimeline,
│                               ServiceRow, ProjectCard, ContactForm, …)
│
└── pages/                      Home, Services, Projects, About, Contact, 404
```

---

## What is built in

### Conversion
- Sticky navbar that is transparent over the hero and solidifies on scroll
- Floating WhatsApp, click-to-call and back-to-top actions (individually toggleable)
- Dismissible announcement bar that collapses on first scroll
- Contact CTAs in **every** section, with varied wording so they never read as spam
- Contact form with only three required fields, honeypot spam protection and a demo mode
- Project cards publish area, duration and budget — turning browsing into self-qualification
- Clicking a project opens a full case study; the enquiry carries the project with it
- Service rows deep-link to `/services#slug` and pre-select the service in the form

### SEO
- **Metadata baked into the static HTML at build time** from the same config the
  runtime uses — social scrapers do not run JS, so this is what link previews read
- Per-route `<title>`, description, canonical, Open Graph and Twitter tags at runtime
- `robots.txt` and `sitemap.xml` **generated from the config** at build (and served
  in dev), so they can never point at the previous client's domain
- JSON-LD: `InteriorDesign`/`LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`,
  `FAQPage`, `Service` ItemList, and `AggregateRating` *only* once real review data exists
- Exactly one `<h1>` per page with no skipped heading levels
- Alt text on every image, token-interpolated
- Semantic HTML5 landmarks, service-area footer links

### Motion
One vocabulary, defined in `src/lib/motion.ts` and applied through `Reveal`:
- Nothing bounces, nothing overshoots — every curve is a long deceleration
- Scroll reveals fire once, 80px before the element is centred, staggered 60–90ms
- Routes cross-fade on mount (`PageTransition`); the loading spinner is delayed
  400ms so a fast chunk never flashes it
- Photographs zoom to 1.045 and lift a fraction in tone on hover; cards raise
  1–1.5px onto `shadow-lift`; buttons lift 1px and sweep a sheen, then press
  1px down on click
- All of it is GPU-composited — transforms, opacity and filters only, never
  layout — and all of it disappears under `prefers-reduced-motion`

### Accessibility (WCAG 2.1 AA)
- Skip-to-content link, visible focus rings on every interactive element
- Mobile drawer traps Tab, closes on Escape and restores focus to its trigger
- Gallery filters are a proper `radiogroup` with roving tabindex and arrow keys
- Project case study is a Radix dialog: focus trap, focus restore, Escape, scroll lock
- ARIA labels on all icon-only controls, `aria-current` on the active nav link
- Form errors wired via `aria-invalid` + `aria-describedby`, announced with `role="alert"`
- Animated statistics expose their final value as text, never a counting narration
- `prefers-reduced-motion` fully respected — animations are removed, not just shortened
- **Every colour pair measured**, including the `accent`/`accentStrong` split; tap targets ≥ 44px

### Performance
- The hero ships as **AVIF → WebP → JPEG** via `<picture>`, four widths each.
  A desktop visitor downloads 100 KB rather than the 306 KB JPEG equivalent;
  the preload declares `type="image/avif"` so browsers that cannot decode it
  skip it entirely rather than wasting the request
- Hero `object-position` shifts per breakpoint (58% → 55% → 50%) so the
  architectural subject survives the crop on a portrait phone, and the overlay
  stops are set from measured white-text contrast at eight viewport sizes
  rather than by eye — see `public/images/README.md`
- Responsive `srcset` on every photograph (480→3840px) with correct `sizes`
- Hero is preloaded from the static HTML with a matching `imagesrcset`, so the LCP
  image starts downloading before the JS bundle has even parsed
- `LazyMotion` + `m.*` components — drops Framer Motion's drag/layout code (~13 KB gz)
- Route-level code splitting; the home page ships ~192 KB of gzipped JS
- Vendor chunks split so a copy change never invalidates the framework bundle
- Width/height on every image to eliminate layout shift
- Placeholder artwork is an inline data URI — zero network requests, cannot 404
- Google Maps iframe is lazy-loaded so it never blocks interactivity
- Fonts load non-blocking with a `noscript` fallback

---

## Deployment

The router uses `BrowserRouter`, so the host must rewrite all paths to
`index.html`. Both configs are included:

- **Netlify / Cloudflare Pages** → `public/_redirects`
- **Vercel** → `vercel.json` (also sets cache and security headers)

Build command `npm run build`, output directory `dist`.

---

## Notes for future maintainers

- **Adding a service**: append to `src/data/services.ts`. The services page,
  home-page grid, footer links, contact-form dropdown and `Service` schema all
  update automatically.
- **Adding a project**: append to `src/data/projects.ts`. Vary the `span`
  (`tall` / `standard` / `wide`) — an even masonry grid is the fastest way to
  make a portfolio look templated.
- **Adding a token**: add the field to `site.config.types.ts`, the value to
  `site.config.ts`, and register it in `buildRegistry()` in `src/lib/tokens.ts`.
- **Rendering a config value in a narrow column**: put `token-safe` on the
  element. An unfilled placeholder is one unbreakable 24-character word, and a
  browser will push it straight out of its grid track and over the neighbouring
  column. Real values never do this, so the bug only shows up in exactly the
  state you demo the template in.
- **Elevation**: there are two shadows, `shadow-lift` (a card raising on hover)
  and `shadow-float` (dropdowns, dialogs). Reach for one of those rather than a
  new `shadow-[…]`; seven near-identical hand-tuned shadows is how a design
  system quietly stops being one.
- **The recurring gold furniture** — the circular icon badge and the short rule
  under a heading — are `IconChip` and `GoldRule` in `common/IconChip.tsx`.
  They appear in nine sections between them, so they live in one file.
- **shadcn/ui**: `components.json` is configured, so `npx shadcn@latest add …`
  works and will drop new primitives into `src/components/ui/`.
