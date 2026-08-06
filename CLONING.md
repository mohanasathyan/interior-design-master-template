# Cloning Checklist

A copy-paste worklist for spinning this template up for a new interior design
client. Work top to bottom; nothing here needs a developer except step 0.

---

## 0 · Set up (once per client)

```bash
cp -r "Interior Design" "ClientName-Website"
cd "ClientName-Website"
npm install
npm run dev
```

---

## 1 · Fill in `src/config/site.config.ts`

Every item below is a `{{TOKEN}}` in that file. Search for the token, replace
the value. The file is split into twelve numbered sections in this same order.

### Business identity
- [ ] `{{BUSINESS_NAME}}` — trading name, e.g. `Studio Verde Interiors`
- [ ] `{{LEGAL_NAME}}` — registered entity, used in the footer copyright
- [ ] `{{TAGLINE}}` — 3–5 words, sits under the logo
- [ ] `{{FOUNDING_YEAR}}` — e.g. `2011`
- [ ] `{{MONOGRAM}}` — 1–2 characters for the logo mark and favicon
- [ ] `{{GOOGLE_RATING}}` / `{{REVIEW_COUNT}}` — **leave as tokens unless the
      reviews are real.** Fabricated `aggregateRating` markup is a Google
      manual-action risk; the template omits the schema until both are filled.

### Contact
- [ ] `{{PHONE}}` — display format, e.g. `+91 98765 43210`
- [ ] `{{PHONE_HREF}}` — dial format, digits and `+` only: `+919876543210`
- [ ] `{{PHONE_ALT}}` — second line, or set to `''` to hide
- [ ] `{{EMAIL}}`
- [ ] `{{WHATSAPP}}` — international, no `+`, spaces or dashes: `919876543210`

### Location
- [ ] `{{ADDRESS_LINE_1}}`, `{{ADDRESS_LINE_2}}`, `{{CITY}}`, `{{STATE}}`,
      `{{POSTAL_CODE}}`, `{{COUNTRY}}`, `{{COUNTRY_CODE}}` (ISO-2, e.g. `IN`)
- [ ] `{{GOOGLE_MAP}}` — the **embed** URL from Google Maps → Share → Embed a map
      → copy only the `src="…"` value
- [ ] `{{GOOGLE_MAP_LINK}}` — the normal "share" link, used by *Get directions*
- [ ] `{{GOOGLE_REVIEW_LINK}}` — from the Google Business Profile "Ask for reviews" link
- [ ] `{{LATITUDE}}` / `{{LONGITUDE}}` — right-click the pin in Google Maps
- [ ] `{{SERVICE_AREA_1..6}}` — neighbourhoods and nearby towns (local SEO)

### Hours
- [ ] Adjust the `hours` array. `opens: null, closes: null` marks a closed day.

### Social
- [ ] `{{INSTAGRAM}}`, `{{FACEBOOK}}`, `{{YOUTUBE}}`, `{{LINKEDIN}}`, `{{PINTEREST}}`
- [ ] Set any unused platform's `url` to `''` to remove its icon entirely.

### Brand
- [ ] `{{LOGO}}` — path to the logo for light backgrounds, e.g. `/images/logo.svg`
- [ ] `{{LOGO_LIGHT}}` — white/reversed version for the footer and hero navbar
- [ ] *Or* leave both as tokens: the site falls back to a typographic wordmark
      that many studios prefer anyway.

### Theme
- [ ] Adjust `theme.colors` if the client has brand colours. Keep `inkMuted`
      at 4.5:1 or better against `canvas`.

> The hero's metallic button is **derived** from `accent`, not hard-coded: its
> gradient, both shadows and its highlight are `color-mix()` of that one value
> (`--gradient-gold` / `--shadow-gold` in `index.css`). Change `accent` and the
> whole thing re-tints itself.
>
> ⚠️ One thing to re-check if you do: the button's label is `contrast`
> (#1a1917) and the gradient bottoms out at 94% of `accent`, which measures
> **4.82:1**. A lighter brand gold keeps clearing AA; a darker one will not.
> If the client's gold is deeper than `#B8860B`, either raise that 94% or
> switch the label to white and re-measure.

### SEO
- [ ] `{{SITE_URL}}` — live origin, **no trailing slash**
- [ ] `{{OG_IMAGE}}` — absolute URL to a 1200×630 share image. **Do set this** —
      the hero is self-hosted, so there is no CDN to crop a share card from and
      the fallback is the full-size hero at the wrong ratio.
- [ ] `{{TWITTER_HANDLE}}` — including the `@`, or `''`

### Forms
- [ ] `{{FORM_ENDPOINT}}` — Formspree / Web3Forms / Basin URL.
      Until this is set, the form runs in **demo mode** (validates, shows
      success, sends nothing). Test a real submission before handover.
- [ ] `{{BUDGET_BAND_1..5}}` — the budget ranges shown in the form dropdown

### Features & CTAs
- [ ] Toggle `floatingWhatsApp`, `floatingCall`, `backToTop`, `announcementBar`,
      `mapEmbed`, `testimonials`
- [ ] `{{CURRENT_SEASON}}` in the announcement text, or rewrite the line
- [ ] Adjust `cta.*` wording if the client prefers different phrasing

### Hero copy
The first words a visitor reads, in `heroCopy`:

- [ ] `headlineLead` / `headlineAccent` / `headlineTail` — three deliberate
      lines, not one wrapping string. `headlineAccent` is the line set in brand
      gold, so put the phrase worth emphasising there. Set `headlineTail` to
      `''` to drop the third line entirely.
- [ ] `subheadline` — one or two sentences. Supports `{{TOKENS}}`.
- [ ] `ctaLabel` — the hero's single call to action. Separate from
      `cta.primary`, which stays on the navigation button.

> Keep the headline lines SHORT. They are set at display size and centred, so a
> long line wraps and the deliberate three-line shape collapses.

### Transformation slider copy

The before/after comparison on the home page, in `transformationCopy`:

- [ ] `eyebrow` / `title` / `lead` — the section header
- [ ] `beforeLabel` / `afterLabel` — the badges pinned over each half. One or
      two words; they sit on the photograph, not on a surface.
- [ ] `hint` — the "Drag to compare" line under the frame
- [ ] `handleLabel` — what a screen reader announces. Name the control, not the
      gesture: the slider works with the arrow keys too, so "drag" is wrong for
      the people who will actually hear this.

---

## 2 · Images

The template ships with 39 curated stock interiors so it demos immediately.
Replacing them is the single biggest quality jump for a real client.

When you swap them, keep the brief the set was built to, or the page loses its
coherence fast: warm neutrals only (cream, sand, taupe, oak, brass), no cool
greys or blues, no saturated accent colours, and no people inside the interior
shots. One off-palette photograph is more noticeable than five mediocre
on-palette ones.

> ⚠️ **The 12 project images are not optional to replace.** The stock set is
> licensed for commercial use, but showing another studio's work as this
> client's portfolio is misrepresentation. Swap them before launch.

Two ways to set any image:

```ts
src: photo('photo-1618221195710-dd6b41faaea6')   // CDN — automatic srcset
src: '/images/hero.jpg'                          // your file in /public/images
```

Self-hosted files skip the CDN resizing, so export them at the sizes below and
compress to under ~300 KB each.

> ⚠️ **`media.hero` is self-hosted, not CDN.** It points at
> `/images/hero.jpg`, with the responsive variants listed in
> `media.hero.widths` sitting beside it. The files are committed; see
> `public/images/README.md` for the export settings and how to regenerate them
> for a new client.
>
> Because the hero is a local file, the CDN can no longer generate the 1200×630
> share card automatically — so **`{{OG_IMAGE}}` matters more than it used to.**
> Set it, or every shared link previews with the full-size hero at the wrong
> aspect ratio.

> ⚠️ **`media.transformation` is self-hosted too**, and it is the one pair on
> the site with a hard constraint: **`before` and `after` must have identical
> `width` and `height`.** They are stacked in a single box and one is clipped
> over the other, so matching dimensions are what make the two halves line up.
> Mismatched ones make the floor line step across the divider. Shoot them from a
> tripod that was not moved, at the same exposure and white balance — see
> `public/images/README.md`.

| Slot | Recommended size | Notes |
| --- | --- | --- |
| `hero` | 3840 × 2160+ | Self-hosted, AVIF+WebP+JPEG. Keep the LEFT calm — text sits there |
| `transformation.before` | 4000 × 2250 | Self-hosted. The empty space |
| `transformation.after` | 4000 × 2250 | Self-hosted. **Must match `before` exactly** — same size, camera, exposure |
| `studioDetail` | 1400 × 1050 | Materials / samples shot, contact page |
| `backdrops.soft` | 2400 × 1600 | Pale, calm interior — sits under a 90% wash |
| `backdrops.warm` | 2400 × 1600 | Second pale backdrop, alternates with the above |
| `aboutPrimary` | 1400 × 1750 | Portrait |
| `aboutSecondary` | 1200 × 900 | Landscape |
| `founder` | 1200 × 1500 | Portrait, eye-line in the upper third |
| `philosophy` | 1400 × 1750 | Atmospheric, layered lighting |
| `materials` | 1400 × 1050 | Close-up of finishes |
| `ctaBackdrop` | 2400 × 1200 | Low detail — heavy text sits on top |
| `pageHeaders.*` | 2400 × 1200 | One per inner page, works under a dark scrim |
| Service images | 1200 × 900 | In `src/data/services.ts` |
| Portfolio images | 1200 × 1600 / 1200 × 900 / 1600 × 1000 | Match each project's `span` |

- [ ] Update `media.*` in `site.config.ts`
- [ ] Update the 13 service images in `src/data/services.ts`
- [ ] **Update the 12 project images in `src/data/projects.ts`**
- [ ] Rewrite every `alt` to describe the real photograph
- [ ] Leave `backdrops.*` `alt` **empty** — they are decorative by design

Any slot left as a `{{TOKEN}}` renders branded placeholder art, so a partial
image set still looks finished during a client review.

---

## 3 · Content review — `src/data/`

- [ ] `services.ts` — remove services the client does not offer; fill the
      `{{TIMELINE_*}}` and `{{PRICE_*}}` tokens

> The footer's service column is **derived from this list**, so adding or
> removing a service updates the footer automatically — there is no second list
> to keep in step. If a new service's title is long, give it a shorter footer
> label in `FOOTER_SERVICE_LABELS` in `src/data/navigation.ts`; the column is a
> narrow track and a two-line entry breaks the rhythm of the list.
- [ ] `projects.ts` — replace with real projects; fill area, duration, budget,
      year; vary `span` across the list
- [ ] `testimonials.ts` — replace with real, attributed Google reviews
- [ ] `faqs.ts` — fill `{{PRICE_STARTING}}`, `{{PRICE_FULL_HOME}}`,
      `{{TIMELINE_*}}`, `{{WARRANTY_YEARS}}`
- [ ] `about.ts` — `{{FOUNDER_NAME}}`, `{{FOUNDER_ROLE}}`,
      `{{FOUNDER_CREDENTIAL}}`, `{{MILESTONE_*}}`; rewrite the story in the
      client's own voice
- [ ] `stats.ts` — set the real numbers. Do not inflate them; they are the most
      checkable claims on the site.

---

## 4 · Assets

- [ ] Replace `public/favicon.svg` (or just change the letter inside it)
- [ ] Regenerate the PNG icons from that SVG, keeping the filenames:
      `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`.
      Any SVG→PNG exporter works; the committed ones are valid defaults.
- [ ] `public/site.webmanifest` — set `name` and `short_name`

`robots.txt` and `sitemap.xml` are **generated at build time** from
`seo.siteUrl` — there is nothing to edit, but the build will warn loudly if
that value is still a placeholder.

---

## 5 · Pre-launch verification

```bash
npm run lint     # type check
npm run build    # must complete with NO plugin warnings
npm run preview  # walk every page at 375px, 768px and 1440px
```

- [ ] The build prints **no** `seo.siteUrl is still a placeholder` warning
- [ ] Search `src/` for `{{` — no tokens should remain in rendered copy
- [ ] `dist/index.html` — check the baked `<title>`, `og:title`, `og:image`
      and the hero `<link rel="preload">` all show real values
- [ ] `dist/sitemap.xml` — every `<loc>` is an absolute URL on the live domain
- [ ] Paste the live URL into WhatsApp/Slack and confirm the preview card
- [ ] Submit a real contact-form enquiry and confirm it arrives
- [ ] Open a project tile — the case study opens, Escape closes it, and focus
      returns to the tile
- [ ] Drag the before/after slider on a real phone. Check that a **vertical**
      swipe starting on the image still scrolls the page, and that architectural
      lines run straight through the divider without a step
- [ ] Tab to the slider handle and drive it with the arrow keys, Home and End
- [ ] Tap the phone, WhatsApp and email links on an actual phone
- [ ] Validate structured data → <https://validator.schema.org>
- [ ] Rich results test → <https://search.google.com/test/rich-results>
- [ ] Lighthouse on the deployed URL, mobile profile
- [ ] Tab through the whole site — the focus ring must always be visible, and
      the mobile menu must not let Tab escape behind it
- [ ] Arrow-key through the project filters
- [ ] Enable "reduce motion" in the OS and confirm nothing animates
- [ ] **Flick-scroll the home page fast on a real phone**, then stop. Every band
      must be visible — no blank gaps where a section failed to animate in.
      Scroll reveals are IntersectionObserver-driven and a fast swipe can
      outrun the observer; `viewportOnce` in `src/lib/motion.ts` is tuned so a
      skipped element still resolves rather than being stranded at `opacity: 0`.
- [ ] Open `/projects` on a **tablet** and confirm each card shows its area,
      duration and budget under the image. Those sit behind a hover reveal on
      mouse devices, and the swap is keyed on `pointer: fine`, not on width —
      a touch device of any size must get the permanent version.
- [ ] Check the page does not scroll sideways at 320px on every route

---

## 6 · Deploy

| Host | Setting |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA rewrites | `public/_redirects` (Netlify/Cloudflare) or `vercel.json` (Vercel) — already included |

Then:

- [ ] Point the domain and force HTTPS
- [ ] Submit `sitemap.xml` in Google Search Console
- [ ] Connect the Google Business Profile and confirm NAP matches the footer exactly
- [ ] Add analytics if required
