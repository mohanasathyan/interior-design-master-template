# Cloning SOP — Interior Design Master Template

The official procedure for turning this master template into a client website.

It is written around a two-phase sales process:

| | | Hands-on time | Outcome |
| --- | --- | --- | --- |
| **Phase 1** | **Demo** — build a personalised site from public information and send it to the prospect | **2–3 h** | A private, unindexed preview URL |
| **Phase 2** | **Production** — after they pay, collect everything and finish the build | **5–7 h** | A live, indexed, fully integrated website |

Phase 1 is a sales instrument. Phase 2 is the product. They have different rules,
and the difference between them is the most important thing in this document.

---

## The four rules

These are not style preferences. Breaking any one of them creates a document
that misrepresents a real, named business — to that business.

**1 · Never invent a fact.** No statistic, rating, review count, award,
certification, client name, project, area, timeline, price or credential goes on
a demo unless you have read it on a source you can point to. "It's only a demo"
is not a defence: the prospect cannot tell which numbers you made up, and if they
spot one they will assume you made up all of them.

**2 · An unknown is a blank, never a guess.** The template is built for this.
Leave a value as its `{{TOKEN}}` and a production build strips it and tidies the
sentence around it. Unfilled fields degrade gracefully everywhere — that is a
designed behaviour, not a gap. Use it.

**3 · A demo is private and unindexed.** It is a preview for one recipient, not
a publication. It must never be crawlable, and it must never carry a working
contact form that silently swallows real enquiries.

**4 · Never edit a component.** Everything configurable lives in four files and
one folder. If you find yourself opening a `.tsx` file to change wording, stop —
you are about to create a clone that cannot be updated from upstream. See
[Keeping the template maintainable](#keeping-the-template-maintainable).

---

## Where everything lives

| File | Holds |
| --- | --- |
| `src/config/site.config.ts` | The **business** — name, contact, address, hours, social, brand, colours, images, SEO, forms, analytics, feature switches, hero and CTA wording |
| `src/config/copy.config.ts` | The **interface** — every heading, button, form label, placeholder example, system message and screen-reader announcement |
| `src/config/shell.config.ts` | The three lines visible **before the app loads** — boot failsafe, `<noscript>`, fallback title |
| `src/data/*.ts` | The **substance** — services, projects, FAQs, testimonials, statistics, the founder's letter, the legal documents |
| `/public/images/` | Photography |

`src/config/routes.ts` is **not** on that list. It is application structure —
URL paths, anchors, the sitemap location. Changing it moves the router.

Two companion documents:

- **`CONFIGURATION_SCHEDULE.md`** — every configurable value in the project, by
  file. 43 schedules, 329 entries. Your reference when you need to find *where*
  something lives.
- **`CLIENT_INFORMATION_CHECKLIST.md`** — 122 fields split into 59 required and
  63 optional, each naming what happens if it is not supplied. This is the
  document you send the client in Phase 2.

---

# PHASE 0 · One-time setup

*15 minutes, once per machine.*

```bash
node --version    # 20.19+ or 22.12+
npm --version
git --version
```

Have ready: a Vercel or Netlify account, an image compressor
(Squoosh, ImageOptim), and a scratch folder for prospect research.

---

# PHASE 1 · The demo

**Goal:** a personalised, honest, private preview that looks like the prospect's
own website — built entirely from what anyone can already see about them online.

**Hands-on time: 2–3 hours.** Budget 4–5 for your first one.

---

## 1.1 · Clone and scaffold — 10 min

```bash
cp -r "Interior Design" "ClientName-Website"
cd "ClientName-Website"
rm -rf .git && git init && git add -A && git commit -m "Clone from master template"
npm install
npm run dev
```

Committing the untouched clone first is deliberate — every later step becomes a
readable diff, and `git diff` is how you audit your own work before sending.

**Edit now:** `package.json` → `name`, `description`.

---

## 1.2 · Research the prospect — 30–45 min

Public sources only. Capture what you find and **where you found it** — the
source column is what makes rule 1 enforceable.

| Look at | Harvest |
| --- | --- |
| Google Business Profile | Trading name, phone, address, hours, category, **rating + review count**, map link, photos |
| Their current website | Legal name, founding year, founder name and title, services, tagline, email, about copy |
| Instagram | Project photography, tone of voice, city, follower-facing claims |
| Facebook / LinkedIn | Founding year, team size, legal entity, service areas |
| Justdial / Houzz / local directories | Price band, service list, corroboration |

Record everything in a scratch file:

```
BUSINESS_NAME    Verde Atelier            ← google business profile
FOUNDING_YEAR    2014                     ← about page, their site
GOOGLE_RATING    4.7                      ← GBP, 63 reviews, read 12 Mar
FOUNDER_NAME     ?                        ← NOT FOUND — leave as token
```

**A value with no source line does not go in the config.** If you cannot cite
it, it stays a placeholder.

---

## 1.3 · Strip what you cannot verify — 15 min · **DO THIS BEFORE YOU FILL**

> ### ⚠ This is the step that matters
>
> The template ships with demonstration content so it presents beautifully out
> of the box. The moment you put a real business name on it, that content stops
> being a demonstration and becomes **a claim about that business**.
>
> Some of it strips itself. Some of it does not. Know which is which.

### Strips itself — safe to leave

These are `{{TOKENS}}`. A production build removes them and repairs the
sentence, so an unfilled field shortens the copy rather than showing anything
false.

- Every value in `site.config.ts` you have not filled
- Project areas, durations, budgets, years
- Testimonial names and project descriptors
- Service prices and timelines
- Milestone years, stage durations
- Rating and review count — the star schema is *omitted entirely* unless both
  are real

### Does **not** strip — you must edit it

| What | Where | Why it is dangerous |
| --- | --- | --- |
| **8 statistics** — 98%, 500+, 250+, 1500+, 12+, 480+, 96%, 40+ | `src/data/stats.ts` → `heroStats`, `studioStats` | Hardcoded numbers, not tokens. They render exactly as written, on the hero, above the fold. This is the number-one way to send a prospect a lie. |
| **6 testimonial quotes** | `src/data/testimonials.ts` | The names are tokens and strip; **the words do not**. You would be publishing invented praise for a real business. |
| **12 project names + briefs** | `src/data/projects.ts` | Real prose describing work nobody did. |
| **12 project photographs** | `src/data/projects.ts` | Licensed stock. Presenting it as their portfolio is misrepresentation whatever the licence permits. |
| **Studio story + founder letter** | `src/data/about.ts` | A signed first-person letter nobody wrote. |
| **6 material specifications** | `src/data/philosophy.ts` | A claim about what they supply. |
| **5 written promises** | `src/data/philosophy.ts` | The copy states these appear in the client's signed agreement. |
| **Studio description** | `site.config.ts` → `business.description` | A real default sentence, not a token. |
| **4 trust markers** | `src/data/stats.ts` → `trustMarkers[2..5]` | "Free design consultation", "Transparent, itemised quotations", "Single point of contact", "Turnkey project delivery" — plausible service claims you have not verified. The first two markers *are* tokens and strip themselves. |

### The strip recipe

```ts
// src/config/site.config.ts
features: {
  testimonials: false,     // removes the entire testimonial wall, site-wide
  mapEmbed: false,         // until you have their real embed URL
}
```

```ts
// src/data/stats.ts — replace every demo figure with a token, OR
// with a verified figure and its source in a comment.
export const heroStats: StatProps[] = [
  { display: '{{STAT_1}}', label: 'Years of Practice', icon: CalendarClock },
  // …
];
```

> **`display` not `value`.** A `value` counts up from zero on scroll. A token or
> any non-numeric string must use `display`, or it animates from 0 and looks
> broken. See the note at the top of `stats.ts`.

For **projects**, choose one:

- **Best — their own work.** Use photographs from their public Instagram or
  website, with their own captions where you have them. It is their work shown
  back to them, on a private URL, which is ordinary agency practice. Delete the
  deployment if they decline.
- **Safe — no portfolio claim.** Keep the stock imagery but rewrite each project
  name and brief as an explicitly generic design direction, and say plainly in
  your covering message that the gallery is placeholder styling.

Never mix the two. A gallery that is half theirs and half stock is the version
that reads as deception when they notice.

---

## 1.4 · Fill the verified public facts — 20–30 min

**File: `src/config/site.config.ts`** — fourteen numbered sections, in order.

| Section | Fill from research | Leave if unknown |
| --- | --- | --- |
| 1 · Business identity | name, legal name, tagline, founding year, monogram | founder name/role/credential, rating, review count |
| 1b · Commercial facts | — | all six (warranty, prices, timelines) |
| 2 · Contact | phone, **phoneHref**, email, whatsapp | phoneAlt |
| 3 · Location | address, city, state, postal code, country, ISO code, map link, service areas | lat/long, review link, embed URL |
| 4 · Hours | **all seven days from GBP** | — |
| 5 · Social | any profile URL you found | the rest — they render inert |
| 6 · Brand | monogram | logos — the wordmark fallback is a real identity |
| 7 · Theme | their palette if their site shows one | keep the default |
| 9 · SEO | `siteUrl` = the demo URL | ogImage, twitter handle |
| 13 · Hero copy | rewrite in their voice | — |

**`phoneHref` is the one people forget.** Digits and a leading `+` only —
`+919876543210`. Get it wrong and every call button on every phone does nothing.

**Rating and review count:** fill these *only* from the Google Business Profile,
and only if you read them today. They are the most checkable numbers on the page.

Prune `src/data/services.ts` to the services they actually list. The footer, the
index rail and the contact form dropdown all follow automatically.

---

## 1.5 · Photography — 20–30 min

| Slot | Demo approach |
| --- | --- |
| `media.hero` | Their best public interior shot. Landscape, calm on the left where the headline sits. |
| `media.transformation.before/after` | **Only if you have a genuine pair.** Identical dimensions, same camera position. If not, use the template's — it is clearly a demonstration of the mechanic. |
| `media.founder` | Their public founder photo, or **leave as a token** — a stock face over a letter in their founder's name is the quietest lie on the site. |
| `media.pageHeaders`, `backdrops`, `philosophy`, `materials` | Leave as supplied. These carry no authorship claim. |
| Service images | Theirs if you have 13, otherwise leave. |

Self-hosted files need `widths` in the config or they are not responsive at all —
one full-size original goes to every phone. Export at the listed widths or use
`photo('…')` for a CDN source.

Rewrite every `alt` to describe the actual photograph.

---

## 1.6 · Demo-mode configuration — 5 min

Non-negotiable before deploying.

```ts
// src/config/site.config.ts
forms:     { endpoint: '{{FORM_ENDPOINT}}' },   // demo mode — sends nothing
analytics: { ga4MeasurementId: '{{GA_MEASUREMENT_ID}}',
             gtmContainerId:  '{{GTM_CONTAINER_ID}}' },   // no scripts, no cookies
```

Leaving the form endpoint unset is correct here. The form validates, animates and
shows its success state without sending — and displays a visible "demo mode"
note so nobody is misled into thinking an enquiry was received.

Leave `src/data/legal.ts` → `legalMeta.lastUpdated` as its token. Both legal
pages then carry the amber "template text — not yet reviewed" banner, which is
exactly what you want a prospect to see on a demo.

**Unindexed deployment.** Deploy to a Vercel *preview* or Netlify *deploy
preview* URL — both send `X-Robots-Tag: noindex` automatically. Do not deploy a
demo to a production alias. If your host does not do this, add password
protection.

---

## 1.7 · Demo QA — 15 min

```bash
npm run lint          # type check
npm run build         # must complete
npm run preview
```

### Honesty pass — do this first

- [ ] `git diff src/data/stats.ts` — **no demo figure survives**
- [ ] `features.testimonials` is `false`, or every quote is real and attributed
- [ ] No stock photograph is presented as their portfolio
- [ ] No founder photo unless it is genuinely theirs
- [ ] Every number on the page traces to a line in your research file
- [ ] `business.description` describes *them*
- [ ] Read the build's `N of 29 tokens are still placeholders` warning and
      confirm each remaining one is a deliberate blank, not an oversight

### Technical pass

- [ ] Every page loads: `/`, `/services`, `/projects`, `/about`, `/contact`,
      `/privacy`, `/terms`, and a bad URL
- [ ] Tap the phone number on a real phone — it dials
- [ ] Tap WhatsApp — it opens with the pre-filled message
- [ ] Submit the form — success state shows, demo-mode note visible
- [ ] No horizontal scroll at 320 px on any route
- [ ] Search the rendered pages for `{{` — nothing visible
- [ ] Search for `{` — no unfilled `{count}` or `{name}` slot
- [ ] Header, hero and footer all read correctly at 390 px, 768 px, 1440 px
- [ ] Deployed URL returns `X-Robots-Tag: noindex`

---

## 1.8 · Deploy and send — 10 min

```bash
npx vercel          # preview deployment, not --prod
```

Set `seo.siteUrl` to the preview URL and rebuild, so the share card resolves
when you paste the link.

**In your covering message, say three things:**

1. This is a private preview built from public information.
2. Name anything that is placeholder — the portfolio, the statistics, the
   testimonials — before they find it themselves.
3. Say what changes when they engage: their photography, their numbers, their
   reviews, a live form, their domain.

Point 2 is the whole method. Volunteering the gaps is what converts a demo from
a stunt into a credible piece of work.

---

# PHASE 2 · Production

**Trigger: the client has paid.**

**Hands-on time: 5–7 hours**, spread across 1–3 weeks of elapsed time — the
gating items are the client's photography and their lawyer's review, neither of
which you control.

---

## 2.1 · Collect — 15 min of your time

Send **`CLIENT_INFORMATION_CHECKLIST.md`**. 122 fields, 59 required, 63
optional, each stating what happens if it is not supplied.

Chase these first — everything else can proceed without them, and these three
have the longest lead times:

1. **Photography** — 41 slots, and the portfolio is the product
2. **Legal review** — external, measured in weeks
3. **Domain + form endpoint** — needed before anything can be tested end to end

---

## 2.2 · Business configuration — 45 min

**File: `src/config/site.config.ts`**

Work down the fourteen sections and fill every remaining `{{TOKEN}}`.

Now fillable that were not in Phase 1:

- `business.founder.*` — name, role, credential
- `facts.*` — warranty, both price bands, all three timelines
- `location.mapEmbedUrl`, `latitude`, `longitude`, `reviewLink`
- `brand.logo`, `brand.logoLight`
- `seo.siteUrl` (**the live domain, no trailing slash**), `seo.ogImage`,
  `seo.twitterHandle`
- `forms.endpoint`, `forms.budgetOptions` (5 bands, written in full with currency)
- `analytics.ga4MeasurementId` **or** `gtmContainerId` — one, not both
- `features.mapEmbed: true`, `features.testimonials: true`

Re-enable anything you switched off for the demo.

---

## 2.3 · Content — 1.5–2 h

| File | Work |
| --- | --- |
| `src/data/stats.ts` | Real figures for all 8 statistics + 6 trust markers. Use `display` for anything non-numeric. |
| `src/data/services.ts` | Final service list; price and timeline per service; 13 images |
| `src/data/projects.ts` | 12 real projects — name, category, type, area, duration, budget, year, brief, scope, image |
| `src/data/testimonials.ts` | 6 real reviews with names and permission to publish |
| `src/data/about.ts` | Story, founder's letter, 5 milestones, mission, vision, values |
| `src/data/faqs.ts` | Review all 10 answers |
| `src/data/philosophy.ts` | Principles, materials, promises, quality standards — confirm they can honour each |
| `src/config/copy.config.ts` | **Form placeholders** — the defaults are India-specific. Also the 3 assurance lines: confirm they can honour a one-working-day reply. |
| `src/config/shell.config.ts` | `noscript` message — name the client |

---

## 2.4 · Photography — 1–2 h

41 slots. Keep one brief across the set: warm neutrals, no cool greys, no
saturated accents, no people inside the interiors. One off-palette photograph is
more noticeable than five mediocre on-palette ones.

- Compress everything under ~300 KB
- Self-hosted files: export at each width in `widths` using
  `<name>-<width>.<ext>`, and list `formats: ['avif','webp']` if you have them
- `transformation.before` and `.after` must have **identical** `width` and
  `height` — mismatched dimensions make the floor line step across the divider
- Rewrite every `alt`
- Leave `backdrops.*` alt **empty** — they are decorative

---

## 2.5 · Integrations — 45 min

| Integration | Step | Verify |
| --- | --- | --- |
| **Domain** | Point DNS, force HTTPS, set `seo.siteUrl` | `dist/sitemap.xml` shows absolute URLs on the live domain |
| **Contact form** | Paste endpoint, set the destination inbox | Submit a real enquiry and confirm it **arrives** |
| **WhatsApp** | `contact.whatsapp`, international, no symbols | Tap on a real phone; message pre-fills |
| **Phone** | `contact.phoneHref` | Tap on a real phone; it dials |
| **Email** | `contact.email` | Tap; the client opens |
| **Social** | Any real URL; delete unused platforms | Each opens the right profile in a new tab |
| **Maps** | Embed URL from Share → Embed; share link; lat/long | Map renders; directions open |
| **Analytics** | One ID | Tap WhatsApp and submit the form — both register as conversions |
| **Favicon / PWA** | Replace `favicon.svg`, regenerate the 3 PNGs keeping filenames, edit `public/site.webmanifest` | Icon shows in a browser tab |
| **Legal** | Adviser's corrections, then `legalMeta.lastUpdated` | Amber notice is **gone** |

⚠ **Analytics: one or the other.** GTM alone is the usual setup, with GA4
configured inside the container. Fill in both and you load both — and if the
container also reports to the same GA4 property, every enquiry counts twice.

⚠ **If you enable analytics, update the "cookies and measurement" section of
`src/data/legal.ts`.** Otherwise the privacy policy says you set no measurement
cookies while the site sets them.

---

## 2.6 · Full validation — 1 h

```bash
npm run lint      # type check — must pass clean
npm run build     # must complete with NO plugin warnings
npm run preview
```

**Build output must show neither warning:**

- `seo.siteUrl is still a placeholder` → the domain is not set
- `N of 29 tokens are still placeholders` → fields are outstanding; the message
  names every one

**Configuration**

- [ ] Search `src/` for `{{` — no tokens remain in rendered copy
- [ ] Search rendered pages for `{` — no unfilled `{slot}`
- [ ] `dist/index.html` — baked `<title>`, `og:title`, `og:image` and the hero
      `<link rel="preload">` all show real values
- [ ] `dist/sitemap.xml` — every `<loc>` absolute, on the live domain
- [ ] `dist/robots.txt` — `Sitemap:` line points at the live domain

**Accessibility**

- [ ] Tab the whole site — focus ring always visible; the mobile drawer does not
      let Tab escape behind it
- [ ] Arrow-key through the project filters
- [ ] Tab to the before/after handle; drive it with arrows, Home, End
- [ ] Enable OS "reduce motion" — nothing animates, and **every trust marker in
      the strip is still readable** at 390 px
- [ ] Screen-reader pass on one page

**Performance and layout**

- [ ] Lighthouse on the deployed URL, mobile profile
- [ ] No sideways scroll at 320 px on every route
- [ ] **Flick-scroll the home page fast on a real phone**, then stop — every
      band visible, no blank gaps where a reveal failed
- [ ] Open `/projects` on a **tablet** — every card shows area, duration and
      budget under the image (hover-reveal is keyed to `pointer: fine`, not width)
- [ ] Vertical swipe starting on the before/after slider still scrolls the page

**Third-party**

- [ ] <https://validator.schema.org> — clean
- [ ] <https://search.google.com/test/rich-results> — clean
- [ ] Paste the live URL into WhatsApp and Slack — preview card correct

---

## 2.7 · Deploy — 30 min

```bash
npm run build
npx vercel --prod
```

| Host | Setting |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA rewrites | `vercel.json` (Vercel) or `public/_redirects` (Netlify / Cloudflare) — both included |

Then: point the domain, force HTTPS, submit `sitemap.xml` in Google Search
Console, and confirm the Google Business Profile NAP matches the footer exactly.

---

# Pre-delivery checklist

*Everything below must be true before you tell the client it is live.*

**Truth**

- [ ] Every statistic is real and the client has confirmed it in writing
- [ ] Every testimonial is real, attributed, and you have permission to publish
- [ ] Every project is theirs — photograph, name, area, duration, budget, year
- [ ] The founder photograph is the actual founder
- [ ] Rating and review count match the Google Business Profile today
- [ ] No stock photography remains anywhere it implies authorship
- [ ] The three assurance lines are commitments they have agreed to

**Function**

- [ ] A real form submission arrived in the client's inbox
- [ ] Phone, WhatsApp and email tested on a physical phone
- [ ] Every social icon opens the right profile
- [ ] Map renders; directions open
- [ ] Analytics recorded a test conversion
- [ ] All 8 routes load; hard-refresh on `/services` does not 404

**Compliance**

- [ ] Legal pages reviewed by a qualified adviser
- [ ] `legalMeta.lastUpdated` set — amber notice gone
- [ ] Cookie disclosure matches what the site actually sets
- [ ] HTTPS forced

**Build**

- [ ] `npm run build` completes with zero plugin warnings
- [ ] Lighthouse mobile acceptable
- [ ] Sitemap submitted

---

# Handover checklist

*What the client receives.*

- [ ] **Live URL**, confirmed working on their own phone
- [ ] **Repository access** — or a zip, plus where it is hosted
- [ ] **Hosting account** — transferred to them, or documented access
- [ ] **Domain** — registrar login, or confirmation of who holds it
- [ ] **Form endpoint** — which service, which account, which inbox
- [ ] **Analytics** — property access granted to their Google account
- [ ] **Search Console** — verified, sitemap submitted, access granted
- [ ] **A one-page "how to change things" note** — naming
      `site.config.ts` for details, `copy.config.ts` for wording, `src/data/`
      for services, projects, FAQs and testimonials, and stating plainly that
      no component ever needs editing
- [ ] **`CONFIGURATION_SCHEDULE.md`** included in the repository
- [ ] **What is theirs vs licensed** — any stock photography still in use, named
- [ ] **Written confirmation** that all published statistics, testimonials and
      project details were supplied and approved by them
- [ ] Agreed support window and what falls inside it

---

# Common mistakes

Ranked by how often they happen and how much they cost.

| # | Mistake | Consequence | Prevention |
| --- | --- | --- | --- |
| 1 | Leaving the demo statistics in `stats.ts` | You send a prospect eight fabricated claims about their own business, above the fold | Step 1.3, before you fill anything |
| 2 | Forgetting `contact.phoneHref` | Every call button on every phone does nothing. Silent, total lead loss | Tap it on a real phone |
| 3 | Shipping with `forms.endpoint` unset | The form shows a success message and sends nothing | Submit a real enquiry and confirm it arrives |
| 4 | `seo.siteUrl` left as a placeholder | Sitemap has relative URLs search engines reject; no canonical tag; share cards break | The build warns — read it |
| 5 | Filling **both** GA4 and GTM | Every enquiry counted twice; all reporting is wrong | Pick one. GTM alone is usual |
| 6 | Leaving India-specific form placeholders | "e.g. Priya Sharma", "3 BHK apartment" — signals the site was built for someone else | `copy.config.ts` → `form.fields` |
| 7 | Setting `legalMeta.lastUpdated` before the legal review | Publishes unreviewed policies and removes the warning that says so | Set it **last** |
| 8 | Editing a `.tsx` file to change wording | The clone can no longer take upstream fixes | Everything is in the four config files |
| 9 | Mismatched before/after dimensions | Architectural lines step across the divider; reads as a photo error | Identical `width` and `height` |
| 10 | Stock project images left in place | Misrepresentation, whatever the licence says | 12 images, no exceptions |
| 11 | Self-hosted images without `widths` | A 4000 px original downloaded onto every phone — slowest *and* softest | List the widths you exported |
| 12 | No `seo.ogImage` | The hero is self-hosted, so nothing can crop a share card automatically | Supply a 1200×630 |
| 13 | Filling `rating` without real reviews | Fabricated `aggregateRating` is a Google manual-action risk | Leave both blank — the schema is then omitted |
| 14 | Using `value` for a non-numeric statistic | It animates from 0 and looks broken | Use `display` |
| 15 | Deploying a demo to a production alias | An unfinished, partly-placeholder site about a real business gets indexed | Preview deployments only |
| 16 | Testing only in a desktop browser | Touch devices get a different portfolio card layout; `pointer: fine` is the switch | Test on a real tablet |
| 17 | Never running `npm run build` until the end | The token validator fails the build on unresolvable tokens — better to know on day one | Build after every phase |

---

# Keeping the template maintainable

A clone that has diverged from the master cannot take upstream fixes. Three
habits prevent that.

**1 · Config files only.** If a change requires opening a component, it belongs
in the master, not in the clone. Fix it upstream, then pull it down.

**2 · Keep the clone's history clean.** The first commit is the untouched
template. Every subsequent commit should touch only:

```
src/config/site.config.ts
src/config/copy.config.ts
src/config/shell.config.ts
src/data/*.ts
public/
package.json
```

`git diff --stat` against your first commit is a one-line audit. Anything
outside that list is a signal.

**3 · Push improvements upstream.** When you find a genuine defect or write copy
better than the default, fix it in the **master template**, not just in the
clone. Every future clone starts better, and this document stays true.

### Optional: a demo preset

If you run Phase 1 often, the six edits in step 1.3 are the same every time.
Adding a `demo` flag to `site.config.ts` that switches off testimonials and
swaps the statistics for tokens would cut that step to one line — at the cost of
one more branch in the template. Worth doing at roughly the tenth demo; not
before.

---

# Command reference

```bash
npm run dev        # dev server — tokens stay VISIBLE for review
npm run lint       # type check
npm run build      # type check + production build + token validation
npm run preview    # serve dist/ exactly as deployed

npx vercel         # preview deployment (noindex) — Phase 1
npx vercel --prod  # production — Phase 2
```

**Dev and production differ on purpose.** The dev server renders unfilled
`{{TOKENS}}` literally so they are impossible to miss during review. A
production build strips them and repairs the punctuation, so a missed field
shortens a sentence rather than printing `{{FOUNDER_NAME}}` at a visitor.

**Always review in `npm run dev`. Always ship what `npm run build` produces.**
