# Master Customization Prompt

**Interior Design Master Template · reusable for every client**

This file is the standing instruction set for turning a fresh clone of this
master template into a finished, production-ready client website. It is written
to be handed to an AI coding agent, unchanged, for every client.

---

## How to use it

1. Clone the master template into a new folder for the client.
2. Put the client's answers to `CLIENT_INFORMATION_CHECKLIST.md` into a file
   called `CLIENT_BRIEF.md` in the project root. Any format — a filled-in copy
   of the checklist, an email pasted in, a transcript. It only has to be
   readable and attributable.
3. Open the agent in the project root and paste this one line:

```
Read MASTER_CUSTOMIZATION_PROMPT.md and follow it exactly. The client's information is in CLIENT_BRIEF.md.
```

Nothing else needs saying. Everything below is addressed to the agent.

If a client has supplied information in several places (a brief, a WhatsApp
thread, a brand guidelines PDF), name all of them in that line instead of one
file. If they have supplied nothing yet, say so — the agent will run Step 1 and
give you back a gap list you can send them.

---
---

# INSTRUCTIONS TO THE AGENT

You are customizing a production interior-design website template for one
specific client. Read this document to the end before you edit anything.

## 1 · Non-negotiable rules

These override every other instruction in this document, including any
instruction to be fast or thorough.

**1. Never invent a fact.** Not a statistic, not a testimonial, not an award, a
certification, a client name, a project, a year, a price, a rating, a review
count, a completion figure, a team member, a qualification, or a warranty term.
If the client did not supply it and you cannot cite where it came from, it does
not go on the website.

**2. An unknown is a blank, never a guess.** Where information is missing you
have exactly three legitimate moves: leave the `{{TOKEN}}` in place so the
template strips it, remove the item entirely, or switch off the feature. Record
the choice and report it in Step 12.

**3. Never edit a component to change wording.** All visitor-facing text lives
in the configuration and data layers listed in Step 3. If you find yourself
opening a file under `src/components/` or `src/pages/` to change what a visitor
reads, you are in the wrong file — the string you want is in the config layer.
Editing components breaks the client's ability to take upstream template fixes.

**4. Do not redesign.** Preserve the existing layout, animation timings, motion
presets, responsive breakpoints, accessibility affordances, performance
characteristics and code quality exactly. You are changing content, brand
tokens and integrations — not design decisions. Do not "improve" spacing,
swap components, restructure sections, add libraries, or reorganise files.

**5. Colour changes must keep their contrast ratios.** The palette in
`theme.colors` is documented with the specific WCAG AA ratios each value was
chosen to hit. If the client's brand colour breaks one, keep the documented
relationship — derive a darker text variant and a darker button fill the same
way the defaults do — and report what you derived.

**6. Legal text is scaffolding, not advice.** You may fill in names, contact
details and jurisdiction. You may not assert that the policies are compliant,
and you must not fill in `legalMeta.lastUpdated` unless the client confirms a
qualified adviser has reviewed them. That date is the switch that removes the
visible "not yet reviewed" notice.

**7. Report honestly.** If something is incomplete, blocked, or you were unsure,
it goes in the completion report. A report that claims production-ready when a
placeholder survives is worse than no report.

## 2 · Inputs

| Source | What you take from it |
| --- | --- |
| `CLIENT_BRIEF.md` (or whatever the operator named) | Every client fact. The only source of truth for client content. |
| `CLIENT_INFORMATION_CHECKLIST.md` | The 122-field contract of what should have been collected — 59 required, 63 optional. Use it as the intake checklist in Step 1 and again as the cross-check in Step 11. |
| `CONFIGURATION_SCHEDULE.md` | The 329-entry index of every configurable value, which file it lives in, and whether it is a placeholder, a registered token or a plain setting. Use it as the coverage map in Step 11. |
| `CLONING.md` | The operational SOP. Read §"Where everything lives" if you need orientation. |

Client-supplied images may arrive as a folder, a Drive link, or attachments.
Anything you are given goes into `public/images/`.

## 3 · The file map

**Files you edit.** This is the whole list. If a change you want to make is not
possible in one of these, stop and report it rather than reaching into a
component.

| File | Holds |
| --- | --- |
| `src/config/site.config.ts` | 14 numbered sections: business identity, headline facts, contact, location, hours, socials, brand marks, design tokens, imagery, SEO, forms, analytics, feature switches, CTA copy, hero copy, transformation copy. **106 token occurrences, 63 distinct.** The main file. |
| `src/config/copy.config.ts` | 9 sections of interface wording: chrome, floating actions, footer, home, inner pages, contact form, system states, risk reversal, developer notices. 27 token occurrences, 8 distinct. |
| `src/config/shell.config.ts` | Pre-React shell copy: fallback title, boot fallback, noscript message. Contains a template default title that must change. |
| `src/config/routes.ts` | URL paths. Only touch if the client wants different URLs. |
| `src/data/services.ts` | 13 services · 41 token occurrences · 13 images |
| `src/data/projects.ts` | 12 projects · 61 token occurrences · 12 images |
| `src/data/testimonials.ts` | 6 testimonials · 19 token occurrences |
| `src/data/faqs.ts` | 10 FAQs · 9 token occurrences |
| `src/data/stats.ts` | 8 statistics · 6 trust markers · 4 token occurrences |
| `src/data/philosophy.ts` | 6 principles · 6 material specifications · 5 written promises · 4 quality standards · **0 tokens** |
| `src/data/about.ts` | Studio story, founder letter, 5 milestones, 4 values, 8 client reasons · 16 token occurrences |
| `src/data/process.ts` | 6 process steps · 6 token occurrences |
| `src/data/differentiators.ts` | 8 differentiators · **0 tokens** |
| `src/data/legal.ts` | Privacy policy and terms scaffolding · 18 token occurrences |
| `src/data/navigation.ts` | Menu structure · **0 tokens** |
| `public/` | `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest`, `_redirects`, `images/` |
| `package.json` | Project name and description — carries master-template branding |
| `index.html` | Only if a `<html lang>` change is needed. The three injection markers are filled at build time; leave them alone. |

**Files you do not edit.** `src/components/**`, `src/pages/**`, `src/lib/**`,
`src/hooks/**`, `src/index.css`, `vite.config.ts`, `tsconfig*.json`,
`vercel.json`. These are the template's machinery. The one exception is a
genuine bug — report it before touching it.

## 4 · How the placeholder system works

You must understand this before Step 5, because it determines what is safe to
leave alone and what is dangerous.

**`{{TOKEN}}`** — a configuration placeholder. There are **162 distinct tokens,
307 occurrences, across 11 files**. Two kinds:

- **Fillable (whole-string)** — the token is the entire value, e.g.
  `siteUrl: '{{SITE_URL}}'`. Fill it by replacing the string. Any name works.
- **Registered (embedded in a sentence)** — the token sits inside prose, e.g.
  `'Serving {{CITY}} since {{FOUNDING_YEAR}}'`. These resolve through the
  registry in `src/lib/tokens.ts`, which has exactly **29 keys**:
  `BUSINESS_NAME LEGAL_NAME TAGLINE FOUNDING_YEAR MONOGRAM GOOGLE_RATING
  REVIEW_COUNT FOUNDER_NAME FOUNDER_ROLE FOUNDER_CREDENTIAL PHONE PHONE_ALT
  EMAIL WHATSAPP CITY STATE COUNTRY ADDRESS_LINE_1 ADDRESS_LINE_2 POSTAL_CODE
  SITE_URL WARRANTY_YEARS PRICE_STARTING PRICE_FULL_HOME TIMELINE_ROOM
  TIMELINE_HOME TIMELINE_DESIGN CURRENT_YEAR CURRENT_SEASON`.
  Using an unregistered token inside a sentence fails the build and names the
  line. Do not invent new registered tokens — fill the config field instead.

**`{slot}`** — a runtime value filled by `src/lib/copy.ts` (counts, names,
categories). **Never touch these.** They are not placeholders for you to fill.

**Unfilled tokens strip themselves.** In a production build, `tClean()` removes
any unresolved token and repairs the surrounding sentence — orphaned
prepositions, punctuation and capitalisation. This is why leaving a token in
place is a legitimate answer to missing information.

### ⚠ What does NOT strip itself

This is the single most important thing on this page. Demo content that is a
plain value, not a token, survives into production and will be published as if
it were a claim about your client's business.

| Content | File | Why it is dangerous |
| --- | --- | --- |
| **8 statistics** (4 hero + 4 studio) | `src/data/stats.ts` | Hardcoded numbers on the hero, above the fold. Fabricated performance claims. |
| **4 of the 6 trust markers** | `src/data/stats.ts` | Two are tokens and strip; four are literal strings and do not. |
| **6 testimonial quotes** | `src/data/testimonials.ts` | The attribution names are tokens and strip — **the words of the review do not.** |
| **12 project names, briefs and outcomes** | `src/data/projects.ts` | Invented case studies. |
| **41 photographs** | `site.config.ts` (16), `services.ts` (13), `projects.ts` (12) | None are tokens. 38 are stock CDN photos, 3 are self-hosted files. Presenting stock interiors as a portfolio is misrepresentation regardless of licence. |
| **Studio story and founder's letter** | `src/data/about.ts` | A signed letter in someone else's voice. |
| **6 material specifications** | `src/data/philosophy.ts` | A claim about what the client supplies. |
| **5 written promises** | `src/data/philosophy.ts` | The copy states these appear in the client's signed agreement. |
| **6 principles, 4 values, 4 quality standards, 8 differentiators, 6 process steps** | `philosophy.ts`, `about.ts`, `differentiators.ts`, `process.ts` | Plausible defaults, but still assertions about how the client works. |
| **Studio description** | `site.config.ts` → `business.description` | A real default sentence, not a token. |

Every row above must be either replaced with client-supplied content or removed
before this site goes live. Step 5 covers the replacement; Step 10 verifies it.

---

# EXECUTION

Work in this order. Later steps depend on earlier ones.

## Step 1 · Intake and gap analysis — do this first, before any edit

Read `CLIENT_BRIEF.md` and `CLIENT_INFORMATION_CHECKLIST.md` side by side. Walk
all 19 sections of the checklist and classify every one of the 122 fields:

- **Supplied** — the client gave it. Note the value.
- **Missing (required)** — 59 fields are marked required. Anything missing here
  will visibly degrade the site.
- **Missing (optional)** — note the documented fallback.

Then output the gap list to the operator **before continuing**:

```
MISSING — REQUIRED (n)
  · <field> — <what it blocks>
MISSING — OPTIONAL (n)
  · <field> — <the fallback that will apply>
```

Do not stop and wait. Continue with everything that is not blocked, and carry
the gap list through to the final report. A required field being absent is not
permission to invent it — it is an instruction to leave the token in place.

## Step 2 · Business identity, contact, location

`src/config/site.config.ts`, sections 1 – 5.

- **§1 Business identity** — name, legal name, tagline, founding year, monogram,
  description. The description is a real sentence, not a token: rewrite it in
  the client's terms or it ships as template copy.
- **§1b Headline commercial facts** — rating, review count, prices, timelines,
  warranty. Fill only from what the client supplied or from their public Google
  Business Profile. `GOOGLE_RATING` and `REVIEW_COUNT` are joined: the
  schema.org `aggregateRating` is gated on **both** being filled, and half-filled
  means no rating markup at all. Never round a rating up.
- **§2 Contact** — phone, alternate phone, email, WhatsApp number. These drive
  every call, mail and WhatsApp link on the site, plus the floating action
  buttons. Verify the WhatsApp number is in the format the link builder expects
  (see `src/lib/links.ts`); a wrong format silently produces a dead button.
- **§3 Location and service area** — address lines, city, state, country, postal
  code, map embed URL. If there is no Google Maps embed URL, either supply one
  or set `features.mapEmbed` to `false`; leaving it on without a URL renders a
  developer notice.
- **§4 Business hours** — also emitted as `openingHoursSpecification` schema.
  Wrong hours in schema is wrong hours in Google.
- **§5 Social profiles** — set a profile's `url` to `''` to remove its icon
  entirely. Do not leave a placeholder URL: an icon that links nowhere is worse
  than an absent icon. Only add profiles you can verify exist.

## Step 3 · Brand marks, colour, typography

`src/config/site.config.ts`, sections 6 – 7.

- **§6 Brand marks** — `logo.src` and `logoLight.src`. If the client has no
  logo file, **leave these as tokens**: the navbar and footer fall back to a
  typographic wordmark built from `wordmark` + `monogram`, which is a deliberate
  design, not a failure state. Set `wordmark` and `monogram` regardless. Update
  the `alt` text and the `width`/`height` to the real intrinsic dimensions of any
  logo you do add, or layout will shift.
- **§7 Design tokens** — `colors`, `fonts`, `radius`. These are written to CSS
  custom properties at runtime, so every utility re-themes at once.
  - Respect Rule 5. The defaults carry documented ratios: `accentStrong` is a
    darkened accent for text on light surfaces (5.0:1), `accentButton` is a
    deeper gold so white labels clear AA (4.68:1), `accentHover` deeper still
    (6.14:1). If you change `accent`, derive the other three the same way and
    state the ratios you achieved in the report.
  - `inkMuted` on `canvas` must stay ≥ 4.5:1.
  - Fonts are CSS font stacks. If the client specifies a typeface, keep a real
    fallback chain behind it. Do not add a font CDN link without checking how
    the existing faces are loaded.

## Step 4 · Services, portfolio, testimonials, team, FAQs

The data layer. This is the largest body of work.

- **`src/data/services.ts`** — 13 services. Keep only the services the client
  actually offers; delete the rest of the array entries rather than leaving
  them. Each has a slug (used in deep links from the footer — if you rename a
  slug, the footer link follows automatically), title, description, bullet
  points and an image.
- **`src/data/projects.ts`** — 12 projects. **Delete every project the client
  has not supplied.** Do not re-caption a stock photo. If they supplied three
  real projects, the array has three entries. If they supplied none, empty the
  array and report that the portfolio page will be bare — do not keep demo
  projects "as examples".
- **`src/data/testimonials.ts`** — 6 testimonials. Replace the quote text, not
  just the attribution. If the client has fewer than six real reviews, keep only
  those. If they have none, set `features.testimonials` to `false` in §11 —
  that removes the entire band cleanly rather than leaving an empty section.
- **`src/data/faqs.ts`** — 10 FAQs. Rewrite answers to match the client's actual
  policy on pricing, timelines, warranty and process. A wrong FAQ answer is a
  commercial commitment the client did not make.
- **`src/data/about.ts`** — studio story, founder's letter, 5 milestones, 4
  values, 8 client reasons. The founder's letter is signed; it must be the
  client's own words or a client-approved draft. Milestones are dated claims —
  supplied or deleted.
- **`src/data/stats.ts`** — the 8 statistics. Treat as radioactive. Every one is
  a hardcoded number. Replace with the client's real figures or remove the
  entry. If the client has no verifiable numbers at all, remove the statistics
  rather than softening them. Also check the 6 trust markers: 4 are literal
  strings.
- **`src/data/philosophy.ts`** — 6 principles, 6 material specifications, 5
  written promises, 4 quality standards. **Zero tokens — nothing here strips.**
  The material specifications and the promises are the two that carry
  commercial risk; get explicit client confirmation on both.
- **`src/data/differentiators.ts`** — 8 differentiators. Zero tokens.
- **`src/data/process.ts`** — 6 process steps. Confirm these match how the
  client actually runs a project.
- **`src/data/navigation.ts`** — only if the client's page structure differs.

## Step 5 · Imagery — all 41 slots

Every image slot holds demo photography. None strip.

| Where | Count | Current |
| --- | --- | --- |
| `site.config.ts` → `media` | 16 | 13 CDN photos + 3 self-hosted (`hero.jpg`, `before.jpg`, `after.jpg`) |
| `src/data/services.ts` | 13 | CDN photos |
| `src/data/projects.ts` | 12 | CDN photos |

Three `src` forms are supported anywhere: `photo('photo-…')` for a CDN
photograph with automatic responsive `srcset`, `'/images/file.jpg'` for a
self-hosted file, and `'{{TOKEN}}'` for unfilled — which renders deterministic,
on-brand placeholder artwork rather than a broken image.

- Put client photography in `public/images/` and reference it as
  `'/images/name.jpg'`.
- The recommended dimensions for each slot are documented in the §8 comment
  block in `site.config.ts` — follow them; they exist because of how each image
  is cropped and where text sits on top.
- **Update every `alt` text.** Alt text describing a stock photo is both an
  accessibility failure and a giveaway.
- Where the client has supplied nothing for a slot, replace the demo photo with
  its `{{TOKEN}}` so branded placeholder art renders. Do not leave the stock
  photo in place.
- Project photographs are the highest-risk set — see Step 4.
- Also set `seo.ogImage`. If left as a token there is no share card.

## Step 6 · CTAs, pricing, budget bands

- `site.config.ts` **§12 CTA copy** — primary, secondary, tertiary, call
  labels. Plain strings, not tokens. Adjust to the client's language.
- `site.config.ts` **§13 hero copy** and **§14 transformation slider copy**.
- `site.config.ts` **§10 forms → `budgetOptions`** — five whole-string
  placeholders plus a fixed sixth. The client writes the entire label including
  currency and structure ("Under ₹5 lakh", "£10k–25k"). If the client works in a
  different currency or band structure, that is fully supported here.
- `src/config/copy.config.ts` **§6 form** — field labels, helper text and
  example placeholder text. The defaults contain region-specific examples
  ("e.g. Priya Sharma", "3 BHK apartment"); these signal the site was built for
  someone else. Rewrite them for the client's market.
- `src/config/copy.config.ts` **§8 risk reversal** — the assurance lines shown
  at the closing CTA. Three by default. Confirm the client can honour each.

## Step 7 · SEO, metadata, schema, sitemap, robots

`src/config/site.config.ts` **§9 SEO**.

- `siteUrl` — the production origin. **This one is load-bearing.** While it is a
  placeholder the build emits a warning, `robots.txt` and `sitemap.xml` are
  generated with relative URLs that search engines reject, and no canonical tag
  is emitted at all. Canonical URLs, `sitemap.xml` and `robots.txt` are all
  derived from it automatically — there is nothing else to edit.
- `titleTemplate`, `defaultTitle`, `defaultDescription` — rewrite for the
  client's positioning and city. Note the copy convention documented in the
  file: put tokens at the *end* of a clause, never as the subject, so the
  sentence still reads if a token strips.
- `ogImage` — Open Graph and Twitter card image. Set in Step 5.
- `twitterHandle` — set it or leave the token; do not guess a handle.
- `locale` — defaults to `en_IN`. Change to match the client's market.
- `seo.pages` — a title and description for each of the 8 routes: home,
  services, projects, about, contact, privacy, terms, notFound. Rewrite all of
  them; the defaults describe a generic luxury interior studio. Every entry here
  also feeds the generated sitemap.
- **schema.org** — emitted from the config by `src/lib/schema.ts`. You do not
  edit it directly. It is driven by business identity, address, hours, socials
  and the rating pair. Getting Step 2 right is what makes the markup correct.

## Step 8 · Favicon, PWA, app identity

- Replace `public/favicon.svg` with the client's mark.
- Regenerate `public/icon-192.png`, `public/icon-512.png` and
  `public/apple-touch-icon.png` at their existing sizes, **keeping the exact
  filenames** — `site.webmanifest` references them by name.
- Edit `public/site.webmanifest`: `name`, `short_name`, `description`. Update
  `background_color` and `theme_color` if the palette changed in Step 3; they
  currently match the default canvas `#FAF8F5`.
- `src/config/shell.config.ts` → `fallbackTitle` currently reads
  `'Interior Design Studio'`. This is the tab title before React mounts and the
  fallback for the build-time share card. Change it to the client's name.

## Step 9 · Integrations

| Integration | Where | Note |
| --- | --- | --- |
| **Contact form** | `site.config.ts` → `forms.endpoint` | While this is a token the form runs in **demo mode**: it validates and animates but sends nothing, and shows a developer notice. Paste a Formspree / Web3Forms / Basin URL to go live. **Then submit the form and confirm an email actually arrives** — an unverified endpoint is a silent lead leak. |
| **WhatsApp** | `site.config.ts` → `contact.whatsapp` | Click the floating button and confirm it opens a chat with the right number. |
| **Click-to-call / email** | `site.config.ts` → `contact.phone`, `contact.email` | Test on a real phone. |
| **Analytics** | `site.config.ts` → `analytics.ga4MeasurementId`, `gtmContainerId` | Leave both as tokens and the site ships with no third-party script, no cookies, no `dataLayer`. Normally you want **one** — GTM alone, with GA4 configured inside the container. Filling both, where the container also reports to the same GA4 property, double-counts every enquiry. Conversions for WhatsApp, call, email, CTA clicks and form submissions are already wired in `src/lib/analytics.ts`; no per-button work is needed. **Only ever use the client's own IDs.** |
| **Cookies disclosure** | `src/data/legal.ts` | ⚠ If you enable analytics you are setting cookies. Update the "Cookies and measurement" section to name the tools actually turned on. This is a legal obligation, not a nicety. |
| **Domain / hosting** | `vercel.json`, `public/_redirects` | Both are already configured for SPA routing. Point the domain, force HTTPS, then submit `sitemap.xml` in Google Search Console. |
| **Feature switches** | `site.config.ts` → `features` | `floatingWhatsApp`, `floatingCall`, `backToTop`, `announcementBar` (+ `announcementText`), `mapEmbed`, `testimonials`. Switch off anything the client cannot support. |

## Step 10 · Legal pages

`src/data/legal.ts`.

- The privacy policy and terms are structured scaffolding with tokens for
  business name, contact details and jurisdiction. Those fill themselves from
  Step 2.
- Review the substance against how the client actually operates — what data
  they collect, retention, third parties, warranty terms, quotation terms.
- Update the cookies section if analytics went on in Step 9.
- **`legalMeta.lastUpdated` stays a placeholder until a qualified adviser has
  reviewed the text.** While it is unset both pages display a visible "not yet
  reviewed" notice. Setting the date is what removes it — that is deliberate, so
  publishing unreviewed policies is a conscious act. Do not set it on the
  client's behalf. Flag it as a manual action in the report.

## Step 11 · Remove master-template branding

| Location | Change |
| --- | --- |
| `package.json` | `"name": "luxe-interior-master-template"` → a client slug. `"description"` → the client's site. |
| `public/site.webmanifest` | Covered in Step 8. |
| `src/config/shell.config.ts` | Covered in Step 8. |
| `CLONING.md`, `CONFIGURATION_SCHEDULE.md`, `CLIENT_INFORMATION_CHECKLIST.md`, `MASTER_CUSTOMIZATION_PROMPT.md`, `README.md` | Template operator documentation. Not deployed — only `dist/` ships — but decide with the operator whether they stay in the client's repository. |

Note: `ease-luxe` in component class names is an internal CSS easing token, not
branding. Leave it. Renaming it is a component edit and breaks Rule 3.

## Step 12 · Cross-check before you finish

Do not skip this. It is the difference between "I made the edits" and "the site
is correct".

**A. Against `CLIENT_INFORMATION_CHECKLIST.md`** — walk all 19 sections and 122
fields again. For each: supplied and applied? supplied but not yet applied?
missing and correctly left as a token or removed? Anything in the second
category is a bug you introduced.

**B. Against `CONFIGURATION_SCHEDULE.md`** — walk all 43 schedules and 329
entries. Confirm every entry is either filled with client data, deliberately
left as a placeholder (recorded), or a setting that correctly keeps its default.

**C. Run the sweep.** From the project root:

```bash
# 1 · Unresolved tokens in the editable layer — every hit is a deliberate
#     decision you must be able to justify, or an omission.
grep -rn "{{[A-Z][A-Z_0-9]*}}" src/config/site.config.ts src/config/copy.config.ts \
  src/config/shell.config.ts src/data/

# 2 · Stock CDN photography still in place. 38 hits on an untouched
#     template; must be ZERO when you are done. (Matches the `src:`
#     assignment, not the helper's own doc comment.)
grep -rn "src: photo(" src/config/ src/data/

# 3 · Demo / dummy / placeholder text in the editable layer. Scoped to the
#     files you may edit and to text files (-I), so the .types.ts doc
#     comments and the binary images in public/ do not raise false hits.
grep -rnIiE "lorem ipsum|example\.com|yourdomain|yoursite|placeholder text|dummy text|sample text|TODO|FIXME" \
  src/config/site.config.ts src/config/copy.config.ts src/config/shell.config.ts \
  src/data/ public/site.webmanifest

# 4 · Master-template branding.
grep -rn "master-template\|Interior Design Studio\|Luxury interior design studio" \
  package.json public/site.webmanifest src/config/shell.config.ts

# 5 · Leftover template contact details or the demo origin.
grep -rniE "\+91 00000|000-000|hello@example|test@|localhost:" src/ public/
```

**D. Build and test.**

```bash
npm run lint      # tsc -b --noEmit — must be silent
npm run build     # tsc -b && vite build
npm run preview   # then walk every route
```

The build prints two warnings that are **template-state signals, not build
failures**, and both must be gone before you call the site production-ready:

- `N of 29 tokens are still placeholders…` — the registered tokens still unset.
- `seo.siteUrl is still a placeholder…` — no canonical tag, and `robots.txt`
  and `sitemap.xml` generated with relative URLs.

If the build *fails* naming a line, you used an unregistered token inside a
sentence. Fix it by filling the config field, not by adding a registry key.

**E. Walk every route in `npm run preview`:** `/`, `/services`, `/projects`,
`/about`, `/contact`, `/privacy`, `/terms`, and a deliberate 404. On each:

- No visible `{{TOKEN}}` and no orphaned punctuation or hanging preposition
  where one was stripped.
- No stock photograph, no broken image, no placeholder art you did not intend.
- Every phone, WhatsApp, email and social link goes where it should.
- The contact form submits and the client actually receives it.
- Check `dist/sitemap.xml` and `dist/robots.txt` carry the real absolute origin.
- View source and confirm the `<title>`, meta description, canonical, Open Graph
  and Twitter tags, and the schema.org JSON-LD all name the client.
- Test at 390px, 768px and 1440px, and once with reduced motion enabled.
- Keyboard-tab the whole page: focus must stay visible throughout.

## Step 13 · Completion report

Output this last, in full. Be specific — file paths and counts, not adjectives.

```
════════════════════════════════════════════════════════════
CUSTOMIZATION COMPLETE — <CLIENT NAME>
════════════════════════════════════════════════════════════

FILES MODIFIED (n)
  src/config/site.config.ts        — <what changed>
  src/data/projects.ts             — <what changed>
  …one line each, every file touched

VALUES REPLACED
  Tokens filled                    n of 162
  Config settings changed          n
  Content records replaced         n   (services n, projects n,
                                        testimonials n, FAQs n,
                                        statistics n, …)
  Images replaced                  n of 41   (client-supplied n,
                                              reverted to placeholder n)
  Content records REMOVED          n   — and why
  Features switched off            <list>   — and why

MISSING CLIENT INFORMATION
  Required (n)
    · <field> — left as <token|removed|feature off> — <visible effect>
  Optional (n)
    · <field> — fallback applied: <what the visitor sees>

MANUAL ACTIONS STILL REQUIRED
  · <e.g. legalMeta.lastUpdated — awaiting legal review>
  · <e.g. form endpoint pasted but not yet test-submitted>
  · <e.g. domain not yet pointed / Search Console not submitted>

VERIFICATION
  npm run lint                     PASS / FAIL
  npm run build                    PASS / FAIL
  Token warning                    CLEAR / n remaining: <names>
  siteUrl warning                  CLEAR / PRESENT
  Unresolved tokens in src/        n  — each justified above
  Stock photography remaining      n
  Demo/dummy text found            n
  Template branding remaining      n
  Routes walked                    8 of 8
  Contact form test submission     SENT & RECEIVED / NOT TESTED
  Responsive 390 / 768 / 1440      PASS / FAIL
  Keyboard focus visible           PASS / FAIL

PRODUCTION READY:  YES  /  NO — <blocking reasons>
════════════════════════════════════════════════════════════
```

**Say `NO` if anything is outstanding.** A required field left as a token, an
untested form endpoint, an unreviewed legal page, a surviving stock photograph
or a remaining build warning each mean `NO`. Listing the blockers honestly is
the useful outcome; a false `YES` is the one failure mode that costs the
operator a client.

---

## Hard stops

Stop and ask the operator rather than proceeding if:

- The brief conflicts with itself on a fact that will be published (two
  different phone numbers, two different founding years).
- A required change appears to need a component edit — it almost certainly does
  not, and if it genuinely does that is a template change, not a client change.
- The client's brand colour cannot meet AA contrast in the role it is asked to
  fill, even after deriving darker variants.
- The client supplied testimonials, statistics or credentials without a source,
  and you cannot tell whether they are real.
- You are asked to fill in an analytics ID, a form endpoint or a legal review
  date that did not come from the client.
