# Client Information Checklist

**Client Information Checklist · Interior Design Website · Rev. A**

> What we need from you before your site can go live.

Every field below feeds a real part of the finished website. The list is generated from the template itself, so nothing on it is speculative — each row names what the value does and, just as usefully, **what happens if you leave it out**.

**Required** means the site is incomplete, misleading or legally exposed without it. **Optional** means the template has a designed, deliberate answer for its absence — an icon quietly disappears, a section is omitted, a fallback takes over. Nothing breaks, nothing looks unfinished. Skip every optional field and you still get a complete site.

| | |
| --- | --- |
| Sections | 19 |
| Required | 59 |
| Optional | 63 |
| Photographs | 41 |
| Written records | 107 |

## How to read this

- **Required** — Withhold it and the site ships incomplete, inaccurate, or with a claim it cannot support. Several of these are commercial or legal risks rather than cosmetic gaps.
- **Optional** — The template detects the absence and handles it — a fallback wordmark, an omitted schema block, an inert icon, a hidden band. Supply it when you have it; never invent it.

## Index

01. [Business identity](#business-identity) — Who you are · 7 required
02. [Contact channels](#contact-channels) — How people reach you · 3 required
03. [Location and service area](#location-and-service-area) — Where you are · 6 required
04. [Branding and visual identity](#branding-and-visual-identity) — How it looks · 0 required
05. [Headline commercial facts](#headline-commercial-facts) — Your numbers · 6 required
06. [Services](#services) — 13 records · 4 required
07. [Projects and portfolio](#projects-and-portfolio) — 12 records · 8 required
08. [Photography](#photography) — 41 images · 4 required
09. [Statistics and trust markers](#statistics-and-trust-markers) — 8 + 6 records · 3 required
10. [Testimonials](#testimonials) — 6 records · 4 required
11. [Frequently asked questions](#frequently-asked-questions) — 10 records · 2 required
12. [Studio story, values and journey](#studio-story-values-and-journey) — About page · 3 required
13. [Process, principles, materials and promises](#process-principles-materials-and-promises) — Pre-written · 1 required
14. [SEO, metadata and domain](#seo-metadata-and-domain) — Findability · 1 required
15. [Lead capture](#lead-capture) — The contact form · 3 required
16. [Legal pages](#legal-pages) — Privacy and terms · 3 required
17. [Analytics and measurement](#analytics-and-measurement) — Optional throughout · 0 required
18. [Social profiles](#social-profiles) — 5 platforms · 0 required
19. [Site wording and feature switches](#site-wording-and-feature-switches) — Editorial · 1 required

---

## Business identity

*Who you are · 7 required of 10*

> These drive the wordmark, every page title, the search-result snippet, the share card and the LocalBusiness structured data. They are the first values filled and the ones most other copy quotes.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Trading name — `business.name` | The name customers know you by, spelled exactly as you want it set. Appears in the logo, every page title, and around forty sentences of copy. | Every sentence that names you shortens instead. The wordmark is blank and the browser tab reads a generic fallback. |
| **Required** | Registered legal name — `business.legalName` | The entity on your paperwork, e.g. "Verde Atelier LLP". Used in the footer copyright and the structured data. | The copyright line loses its owner. Search engines get no legal entity for your business. |
| **Required** | Tagline — `business.tagline` | Three to five words that sit under the logo. Positioning, not a slogan. | The line under the wordmark is simply absent — visually fine, but you lose a free positioning statement on every page. |
| **Required** | Studio description — `business.description` | Two or three sentences on what you do and for whom. Read by search engines and shown in the footer. | A default description ships describing a generic luxury studio — accurate enough to look finished, wrong enough to mislead. |
| **Required** | Founding year — `business.foundingYear` | Four digits. Drives the "since" line and the schema founding date. | The "established" claim disappears from the copy and the structured data. |
| **Required** | Founder name — `business.founder.name` | Full name of the person signing the About page letter. | The founder's letter is unsigned and the home-page pull quote has no attribution — a signed letter from nobody. |
| **Required** | Founder role — `business.founder.role` | Job title, e.g. "Founder & Principal Designer". | The attribution line under the pull quote is incomplete. |
| Optional | Founder credential — `business.founder.credential` | Qualification or years in practice, e.g. "B.Arch, 14 years' practice". | The credential line under the signature is dropped. The letter still reads correctly. |
| Optional | Monogram — `brand.monogram` | One or two characters for tight spaces and the favicon. | The wordmark renders without its monogram mark — a clean typographic logo rather than a mark plus name. |
| Optional | Price band — `business.priceRange` | One of $, $$, $$$, $$$$. Shown only to search engines, never to visitors. | Defaults to $$$. Change it only if that misrepresents you. |

## Contact channels

*How people reach you · 3 required of 6*

> Every call button, WhatsApp link, mail link and floating action on the site is built from these four fields. A channel left empty is not rendered as a dead link — the template detects it and degrades the button.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Phone number — display — `contact.phone` | Formatted as you want it read, e.g. "+91 98765 43210". Appears in the header, footer, FAQ panel, error page and contact page. | Every call-to-action that quotes the number loses it. The floating call button and the header phone link disappear. |
| **Required** | Phone number — dial format — `contact.phoneHref` | The same number with digits and a leading + only: `+919876543210`. This is what a phone actually dials. | Tapping any call button on a phone does nothing. This is the single most common lost-lead defect on a small-business site. |
| **Required** | Email address — `contact.email` | The inbox you actually monitor. Used for mail links and structured data. | The email card on the contact page and the email link in the footer are dropped. |
| Optional | WhatsApp number — `contact.whatsapp` | International format, no plus sign, spaces or dashes: `919876543210`. | The floating WhatsApp button, the WhatsApp card and every "ask about this service" deep link fall back to the contact page. Worth supplying — it is the highest-converting channel on this template. |
| Optional | Second phone line — `contact.phoneAlt` | A sales or support line, if you run one. | Only the primary number is shown. No gap appears. |
| Optional | WhatsApp opening message — `contact.whatsappMessage` | The text pre-filled when someone taps WhatsApp. A sensible default is written for you. | The supplied default is used. It already names your studio automatically. |

## Location and service area

*Where you are · 6 required of 11*

> This block feeds the footer address, the contact page, the map, and the name-address-phone consistency that local search ranking depends on. Keep it byte-identical to your Google Business Profile.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Street address — `location.addressLine1 / addressLine2` | Two lines. The studio a client could actually walk into. | The address block, the "get directions" link and the postal address in your structured data are all incomplete. |
| **Required** | City — `location.city` | Quoted in roughly twenty sentences of marketing copy as well as the address. | Every sentence naming your city shortens. This is the most-referenced single value on the site after your name. |
| **Required** | State / region — `location.state` | Also used in the governing-law clause of the terms of service. | The address is incomplete and the terms name no jurisdiction. |
| **Required** | Postal code — `location.postalCode` | Completes the postal address for local search. | Structured data ships an incomplete address, which weakens local ranking. |
| **Required** | Country and ISO code — `location.country / countryCode` | Full name plus the two-letter code, e.g. India / IN. | The country is missing from the address and from the privacy policy's complaint clause. |
| **Required** | Opening hours — `hours[7]` | Open and close time for each of the seven days; mark closed days as closed. Consecutive identical days are grouped for display automatically. | The hours panel shows the template's default trading week — plausible, and wrong. This also ships as opening-hours structured data, so search results can advertise hours you do not keep. |
| Optional | Google Maps embed URL — `location.mapEmbedUrl` | From Maps → Share → Embed a map → copy only the `src` value. | An on-brand panel with your address takes the map's place, rather than an empty grey rectangle. |
| Optional | Google Maps share link — `location.mapLink` | The normal share link. Powers every "get directions" button. | The directions buttons fall back to the contact page instead of dead-ending. |
| Optional | Latitude and longitude — `location.latitude / longitude` | Right-click your pin in Google Maps to copy them. | Geo coordinates are omitted from the structured data. A minor local-search signal is lost. |
| Optional | Service areas — `location.serviceAreas[6]` | Up to six neighbourhoods or nearby towns you cover. | The whole service-area band at the foot of the page is hidden. It is the cheapest durable local-SEO surface on the site, so supply them if you can. |
| Optional | Google review link — `location.reviewLink` | The "ask for reviews" short link from your Google Business Profile. | The star panel on the contact page and the "read our reviews" link in the footer are both hidden. |

## Branding and visual identity

*How it looks · 0 required of 6*

> Almost everything here is optional, and deliberately so. The template ships with a complete, considered visual identity; supplying your own replaces it rather than completing it.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| Optional | Logo — for light backgrounds — `brand.logo` | SVG or PNG, roughly 180×48. Used in the header on inner pages. | A typographic wordmark is set from your studio name instead. This is a legitimate luxury identity, not a placeholder — many studios keep it. |
| Optional | Logo — reversed / white — `brand.logoLight` | The white or reversed version, for the footer and the transparent header over the hero. | The same typographic wordmark, set in brand gold on the dark bands. |
| Optional | Brand colours — `theme.colors (13 values)` | Your palette, if you have one. Give us the canvas, ink and accent at minimum. | The template's warm-neutral and gold palette is used. Every value has been contrast-tested against WCAG AA; if you supply your own we re-test them, which may shift a shade slightly. |
| Optional | Typefaces — `theme.fonts` | Two families — one for headings, one for body — if your brand specifies them. | Playfair Display and Inter are used. Changing these means changing the font loader as well, so tell us early. |
| Optional | Corner radius — `theme.radius` | A number in pixels. Luxury templates stay low — 2 to 6. | Defaults to 2px. Sharp edges read as atelier rather than app. |
| Optional | Favicon and app icons — `public/favicon.svg + 3 PNGs` | A square mark, or just tell us the letter to set inside the default. | The default gold monogram icon ships. It is valid and on-brand, but it is not yours. |

## Headline commercial facts

*Your numbers · 6 required of 6*

> Each of these is quoted in more than one place — an FAQ answer, a trust marker, a service row. Setting each once here means no two pages can ever contradict each other. Include the unit in the value: "5 years", not "5".

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Warranty period — `facts.warrantyYears` | What you actually guarantee, e.g. "5 years on modular units". | The warranty claim vanishes from the FAQ answer and the trust marquee. A visitor comparing three quotes reads silence where your competitors write a number. |
| **Required** | Entry price — single room — `facts.priceStarting` | The realistic starting figure for one room. | The pricing FAQ — the question everyone has and few sites answer — loses its answer. |
| **Required** | Typical full-home band — `facts.priceFullHome` | A range, not a figure. | Same as above. Publishing a band filters out mismatched enquiries before they consume your time. |
| **Required** | Timeline — single room — `facts.timelineRoom` | e.g. "3–4 weeks". | The delivery expectation is missing from the FAQ and the service rows. |
| **Required** | Timeline — full home — `facts.timelineHome` | e.g. "10–14 weeks". | As above. |
| **Required** | Timeline — design phase — `facts.timelineDesign` | The design stage alone, before execution begins. | As above. |

## Services

*13 records · 4 required of 6*

> Thirteen services ship pre-written, each with a full editorial treatment — deliverables, benefits, an indicative timeline and a starting price. The copy is good; the commercial figures are yours. Remove any service you do not offer and the footer, the index rail and the contact form dropdown all follow automatically.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Which services you offer — `src/data/services.ts` | Confirm or strike out from: Residential, Modular Kitchen, Living Room, Bedroom, Wardrobes & Storage, Dining Room, False Ceiling, Lighting, Space Planning, Bespoke Furniture, Commercial, Office, Home Renovation. | The site advertises thirteen services including any you do not provide — and the contact form lets people enquire about them. |
| **Required** | Starting price per service — `13 values` | A starting band for each service you keep. | Each service row shows an empty price. The published-pricing advantage — the thing very few competitors do — is lost. |
| **Required** | Timeline per service — `13 values` | A typical delivery window for each service you keep. | The timeline meta line on each service row is blank. |
| **Required** | Service photographs — `13 images` | One landscape image per service, ideally 1200×900. | Licensed stock interiors are shown. Legal to display, but they are not your work. |
| Optional | Service descriptions and deliverables — `title, summary, description, features, benefits` | Review the pre-written copy and correct anything that misdescribes how you work. | The supplied copy ships. It is well-written and generic-free, but it describes a studio in general rather than yours specifically. |
| Optional | "Ideal for" line — `13 values` | Who each service suits, e.g. "Families moving into a new build". | A sensible default ships per service. |

## Projects and portfolio

*12 records · 8 required of 10*

> The portfolio is the product on an interior design site. This is the section that persuades, and it is the one you cannot leave as supplied.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Project photographs — `12 images` | One image per project. Mixed orientations work best — the gallery is a masonry layout and even tiles read as a product listing, not a portfolio. | ⚠ Stock interiors are shown as your portfolio. This is misrepresentation regardless of the image licence, and it is the single most important replacement on this list. |
| **Required** | Project names — `12 values` | Evocative rather than literal — "The Quiet Light Residence", not "Flat 4B". | The template's sample names ship, describing rooms you did not design. |
| **Required** | Category and property type — `12 × 2 values` | Category drives the gallery filter chips; type is shown as card metadata. | The filters segment projects that are not yours. |
| **Required** | Built-up area — `12 values` | e.g. "2,150 sq ft". | A blank appears where a serious prospect looks first. Publishing the number is how a visitor self-qualifies before contacting you. |
| **Required** | Delivery time — `12 values` | How long each project actually took. | As above — and the visitor is left to assume. |
| **Required** | Budget band — `12 values` | A range, deliberately, not a figure. | The most useful qualifying signal on the page is missing. |
| **Required** | Year completed — `12 values` | Four digits per project. | Every project card shows an empty year, which reads as evasive. |
| **Required** | Project brief — `12 × 2–3 sentences` | The problem you were given and what you did about it. This is the case study. | The template's sample briefs ship, describing work that is not yours. |
| Optional | Scope delivered — `12 lists` | Four to six tags per project — the proof list inside the case study. | A representative default scope list is shown per project. |
| Optional | Project location — `12 values` | A neighbourhood, if you can name it. | Falls back to your city automatically. |

## Photography

*41 images · 4 required of 10*

> Forty-one image slots in total. Every one has a curated, tonally-matched stock photograph behind it, so the site presents beautifully before you send a single file — but replacing them is the biggest single quality jump available to a real client. Keep to one brief across the whole set: warm neutrals, no cool greys, no saturated accents, no people inside the interiors.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Hero photograph — `media.hero — 3840×2160 or larger` | The first thing anyone sees. Landscape, with a calm area where the headline sits. Send the largest original you have. | A stock interior is used. It is a strong image, but it is the single frame that establishes whether the site is yours. |
| **Required** | Before and after pair — `media.transformation` | Two photographs of the same room — one empty, one finished — shot from the same tripod position, same lens, same exposure. **They must have identical pixel dimensions.** | A stock pair is shown. Mismatched or re-framed images make architectural lines step across the slider and the transformation stops reading as one room. |
| **Required** | Founder portrait — `media.founder — 1200×1500` | Portrait orientation, eye-line in the upper third. | A stock portrait appears above a letter signed in your founder's name. This is the most quietly dishonest gap on the list. |
| Optional | Page header images — `media.pageHeaders — 4 × 2400×1200` | One landscape image each for Services, Projects, About and Contact. | Curated stock headers are used. They sit under a gradient and carry no claim about authorship, so this is the safest set to leave. |
| Optional | About and studio images — `aboutPrimary, aboutSecondary, studioDetail` | A portrait, a landscape, and a materials or samples close-up. | Stock equivalents are used. |
| Optional | Philosophy and materials images — `media.philosophy, media.materials` | Atmospheric interior; close-up of finishes. | Stock equivalents are used. |
| Optional | Closing call-to-action backdrop — `media.ctaBackdrop — 2400×1200` | Low-detail landscape — heavy text sits on top of it. | A stock evening interior is used, heavily scrimmed. |
| Optional | Section backdrops — `media.backdrops — 2 images` | Two very pale, uncluttered interiors. They render under an 88% wash. | Stock pale interiors are used. Anything busy here fights the type, so leaving these is often the better call. |
| Optional | Social share image — `seo.ogImage — 1200×630` | What appears when someone pastes your link into WhatsApp or Slack. | The hero is used at the wrong aspect ratio. Because the hero is self-hosted there is no service to crop it automatically — so this matters more here than on most sites. **Strongly recommended.** |
| **Required** | Alt text for every image | A sentence describing what is actually in each photograph you send. | Screen-reader users get a description of a stock photograph instead of yours, and the descriptive-text SEO value is wasted. |

## Statistics and trust markers

*8 + 6 records · 3 required of 5*

> Eight figures and six credibility lines. These are the most checkable claims on the site — a prospect can and will test them against your Google profile and your portfolio.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Four hero statistics — `heroStats — value + label` | Four countable numbers overlaid on the hero, e.g. projects delivered, years practising, satisfaction rate, repeat clients. | Demo figures ship — 98%, 500+, 250+, 1500+. They are plausible, which is exactly what makes leaving them dangerous. |
| **Required** | Four studio statistics — `studioStats — value + label + detail` | Four fuller figures for the band beneath the hero, each with a short supporting line. | As above. Do not inflate these; they are the easiest claims on the site to disprove. |
| **Required** | Six trust markers — `trustMarkers` | Six short credibility lines for the scrolling strip under the hero, e.g. "In-house execution team", "5-year warranty". | Defaults ship, one of which quotes a Google rating you may not have. |
| Optional | Google rating — `business.rating` | e.g. "4.9". **Leave blank unless the reviews are real.** | The star rating is omitted from the page and from your structured data. Supplying a fabricated one is a Google manual-action risk, so the template emits nothing until both this and the review count are genuine. |
| Optional | Review count — `business.reviewCount` | The number of public reviews backing that rating. | As above — the rating schema requires both, and is omitted without either. |

## Testimonials

*6 records · 4 required of 6*

> Six quotes, laid out as a static wall rather than a carousel so every one is read. They are ordered so consecutive quotes answer different objections — cost, timeline, build quality, project management. Keep that spread when you replace them.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Six client quotes — `testimonials.quote` | Real reviews, ideally lifted verbatim from your Google profile. Two or three sentences each. | The template's sample quotes ship — invented praise attributed to invented clients on a live commercial site. |
| **Required** | Client names — `6 values` | A real name wherever you have permission. First name plus initial is acceptable. | Each quote shows an empty attribution, which reads as fabricated even when the words are real. |
| **Required** | Project descriptor — `6 values` | What the quote relates to, e.g. "3 BHK apartment" or "Retail fit-out". | The line under each name is incomplete. |
| Optional | Client location — `6 values` | A neighbourhood. | Falls back to your city. |
| Optional | Star rating per quote — `6 values` | Out of five. Defaults to five. | All six show five stars. If any review was four, say so — a wall of perfect fives reads as bought. |
| **Required** | Permission to publish | Written confirmation from each client that you may quote and name them. | You are publishing identifiable personal data without a basis for it, which your own privacy policy undertakes not to do. |

## Frequently asked questions

*10 records · 2 required of 3*

> Ten questions ship pre-written and are emitted as structured data, which makes the section eligible for the expandable FAQ result in Google. The pricing question is deliberately first — it is the one everybody has and almost nobody answers.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Confirm the ten answers — `src/data/faqs.ts` | Read them and correct anything that misstates how you work. Most studios change two or three. | You publish answers about your process, warranty and pricing that were written before we met you — and Google may show them as a rich result. |
| **Required** | Figures inside the answers — `price and timeline tokens` | The answers quote your warranty, entry price, full-home band and timelines. Supplying the commercial facts above fills these automatically. | Those sentences shorten mid-answer, so the pricing question — the highest-intent question on the page — resolves to nothing useful. |
| Optional | Additional questions | Anything clients ask you repeatedly that is not covered. | Ten questions is already a substantial section. Add only what genuinely recurs. |

## Studio story, values and journey

*About page · 3 required of 7*

> The trust page. Someone lands here after the portfolio has convinced them of the work, and now wants to know who they would be handing their home to for three months. It is written in the first person where a person speaks and the third where the studio does — that distinction is what stops it reading as a brochure.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Studio story — `story — 3 paragraphs` | How the practice started and what it is trying to do. Three paragraphs, in your own voice. | A well-written but generic origin story ships. It is the section a careful prospect reads most closely, and generic is exactly what they are testing for. |
| **Required** | Founder's letter — `founder.letter — 3 paragraphs` | First person, signed. The single most personal thing on the site. | A letter you did not write goes out over your name. |
| Optional | Signature — `founder.signature` | How you sign off — usually the first name. | Falls back to the founder name. |
| **Required** | Milestone years and events — `milestones — 5 records` | Five moments that shaped the practice: year, a short title, a sentence. | The journey timeline shows empty years. Unfilled year placeholders are also the one case that visibly breaks the layout on a phone, so these matter structurally as well as editorially. |
| Optional | Mission and vision — `mission, vision` | One statement and one supporting sentence each. | Considered defaults ship. Review them — they are short enough that a generic one is conspicuous. |
| Optional | Four studio values — `values` | Four things you will not trade away, each with a sentence. Values are only meaningful when they have cost you something. | Four well-chosen defaults ship. |
| Optional | Eight reasons clients choose you — `clientReasons` | Eight one-line reasons. None need be unique; the point is having all eight in one studio. | Eight defaults ship. |

## Process, principles, materials and promises

*Pre-written · 1 required of 7*

> Four editorial blocks that are complete as supplied. They are the sections that justify a premium fee, and they are written to be argued with rather than skimmed — so read them, but expect to change little.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Six stage durations — `processSteps.duration` | How long each of the six stages typically takes. The stage names and deliverables are written for you. | The published process — the section that most reliably converts a browser into an enquiry — shows six stages with no durations, which defeats the point of publishing it. |
| Optional | Process stages and deliverables — `6 records` | What happens at each stage and what the client receives at the end of it. | Six well-specified defaults ship. Correct anything that does not match how you actually run a project. |
| Optional | Six design principles — `principles` | Your stated point of view. A studio with one is bought on value; one without is bought on price. | Six defaults ship. |
| Optional | Six material specifications — `materials` | What sits behind the surface — core, stone, veneer, hardware, finishes, lighting — with the quality claim for each. | Six defaults ship describing a premium specification. If yours differs, this becomes required rather than optional: it is a claim about what you supply. |
| Optional | Five written promises — `promises` | Specific, falsifiable commitments. "The price we quote is the price you pay" is a contract term; "we are committed to quality" is noise. | Five defaults ship — and they appear in the agreement you sign with clients, per the copy. Confirm you can honour each. |
| Optional | Four quality standards — `qualityStandards` | The checks every project passes before handover. | Four defaults ship. |
| Optional | Eight differentiators — `differentiators` | Eight objection-handlers, each answering one specific fear. | Eight defaults ship, each written against a named client fear. |

## SEO, metadata and domain

*Findability · 1 required of 4*

> Baked into the page at build time as well as applied per route, because social scrapers do not run JavaScript. Get the domain to us early — the sitemap, the canonical tags and every share card are generated from it.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Live domain — `seo.siteUrl` | The final origin with no trailing slash, e.g. `https://verdeatelier.in`. | The build warns loudly. Sitemap URLs are relative, which search engines reject; no canonical tag is emitted at all; and share cards resolve to nothing. |
| Optional | Page titles and descriptions — `seo.pages — 8 routes` | Written for you across all eight routes, including the legal pages and the 404. | The supplied titles and descriptions ship. They name your studio and city automatically once those are filled. |
| Optional | Twitter / X handle — `seo.twitterHandle` | Including the @. | The Twitter attribution tag is omitted. Share cards still render fully. |
| Optional | Locale — `seo.locale` | Defaults to en_IN. Tell us if that is wrong. | Sets the document language and the Open Graph locale. Wrong here is a subtle accessibility defect, so correct it if it does not match. |

## Lead capture

*The contact form · 3 required of 5*

> The most valuable component on the site — everything else exists to get someone here. Only three fields are required of the visitor, because every additional required field measurably reduces submissions.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Form endpoint — `forms.endpoint` | A Formspree, Web3Forms, Basin or equivalent URL, or your own handler. | ⚠ The form runs in **demo mode**: it validates, animates and shows the success state, and sends nothing. A visitor is told you will be in touch and no enquiry ever arrives. |
| **Required** | Budget bands — `forms.budgetOptions — 5 values` | Five ranges written in full, including the currency, e.g. "Under ₹5 lakh". A sixth "not sure yet" option is provided. | The budget dropdown is empty apart from the fallback option, so you lose the qualifying signal that makes an enquiry worth calling back first. |
| **Required** | Enquiry destination | Which inbox or CRM the submissions should reach, and who monitors it. | Even a configured endpoint delivers to nobody in particular. |
| Optional | Success message — `forms.successMessage` | What someone reads after submitting. A default promising a reply within one business day is supplied. | The default is used — which commits you to a one-business-day reply. Change it if you cannot hold that. |
| Optional | Form placeholders and labels — `copy.config.ts › form` | The example name, phone format and property description shown greyed inside the fields. | ⚠ Defaults are India-specific — "e.g. Priya Sharma", "+91 98765 43210", "3 BHK apartment, 1,400 sq ft". Outside that market they quietly signal the site was built for somebody else. **Review these if you are not in India.** |

## Legal pages

*Privacy and terms · 3 required of 4*

> Two complete documents ship — ten sections of privacy policy and eleven of terms — written in plain language and wired to your details. They are structured scaffolding, not legal advice.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| **Required** | Legal review — `src/data/legal.ts` | Have a qualified adviser check both documents against the law where you operate. India's DPDP Act, the UK and EU GDPR and CCPA each impose different obligations. | You publish unreviewed policies while collecting personal data through a form. Both pages display a visible amber "template text — not yet reviewed" notice until this is done. |
| **Required** | Revision date — `legalMeta.lastUpdated` | e.g. "12 March 2026". Set this **after** the review, not before. | The amber notice remains. Setting this date is what publishes the documents, which makes shipping unreviewed policies a deliberate act rather than an oversight. |
| Optional | Corrections to the drafted text | Anything your adviser wants changed, added or removed. | The supplied text stands. It covers the sections a design studio normally needs, but "normally" is doing a lot of work in that sentence. |
| **Required** | Cookie disclosure | If you enable analytics, name the tools in the "cookies and measurement" section. | Your privacy policy states you set no measurement cookies while your site sets them. That is the one inaccuracy here with a regulatory edge. |

## Analytics and measurement

*Optional throughout · 0 required of 3*

> Leave both fields empty and the site ships with no analytics at all — no third-party script, no cookies, no data layer, no click listener, no console noise. Paste an ID in and conversion tracking starts on the next load with no other change.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| Optional | GA4 measurement ID — `analytics.ga4MeasurementId` | Format `G-XXXXXXXXXX`, from your Google Analytics property. | No analytics load. The site is measurably faster and sets no cookies — a legitimate choice, not a gap. |
| Optional | GTM container ID — `analytics.gtmContainerId` | Format `GTM-XXXXXXX`. ⚠ Use **one or the other**, not both — filling in both loads both, and double-counts every enquiry if your container also reports to the same GA4 property. | As above. |
| Optional | What is tracked | Nothing to supply. WhatsApp taps, click-to-call, email clicks, consultation and quote buttons and form submissions are all tracked automatically once an ID is present. | No per-button wiring is ever needed from you. |

## Social profiles

*5 platforms · 0 required of 6*

> Five platforms are offered. Every one is optional and the template handles absence properly: an unconfigured profile renders as an inert icon rather than a link to nowhere, so the row keeps its visual balance without shipping a dead link or misleading a screen-reader user.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| Optional | Instagram — `social[0].url` | Full profile URL. The highest-value platform for this vertical. | The icon renders inert — visible, correctly styled, not clickable, and hidden from screen readers. |
| Optional | Facebook — `social[1].url` | Full page URL. | As above. |
| Optional | YouTube — `social[2].url` | Channel URL. | As above. |
| Optional | LinkedIn — `social[3].url` | Company page URL. | As above. |
| Optional | Pinterest — `social[4].url` | Profile URL. | As above. |
| Optional | Platforms to remove entirely | Tell us which you do not use and we will delete the icon rather than render it inert. | All five icons show, some of them inert. Cleaner to remove the ones you will never use. |

## Site wording and feature switches

*Editorial · 1 required of 7*

> Every heading, button and label on the site reads from a configuration file, so any of it can change without touching code. All of it ships written. These are the pieces most worth a deliberate decision.

| | Field | What we need | If not supplied |
| --- | --- | --- | --- |
| Optional | Hero headline — `heroCopy — 3 lines` | Three deliberate lines, not one wrapping sentence. The middle line carries the brand gold, so put the phrase worth emphasising there. Keep them short — they are set at display size. | Ships as "Design Your / Dream Home / With Us". Strong and generic in equal measure; this is the most-read sentence on your site. |
| Optional | Hero button label — `heroCopy.ctaLabel` | Deliberately different from the header button — the header commits to time, the hero to a number. | Ships as "Get Free Quote" against the header's "Book Free Consultation". |
| Optional | Call-to-action wording — `cta — 5 labels` | Book Free Consultation, View Our Projects, Request a Quote, Call Now, WhatsApp Us. | The supplied wording is used site-wide. Changing one changes it everywhere it appears. |
| **Required** | Three assurance lines — `assurances` | Free consultation and site visit · No obligation, no pressure · A reply within one working day. Confirm you can honour all three. | You publish three promises under your closing call to action, on two separate pages, that nobody has agreed to keep. The reply-time commitment in particular is checkable within a day. |
| Optional | Announcement bar — `features.announcementBar` | A slim strip above the navigation for a seasonal offer. Off by default. | Stays hidden. The copy is written and ready if you want it switched on. |
| Optional | Feature switches — `features — 6 toggles` | Floating WhatsApp, floating call, back-to-top, announcement bar, map embed, testimonials band. | All ship on except the announcement bar. Turn off the testimonials band if you have no real reviews yet. |
| Optional | No-JavaScript message — `shell.config.ts` | What someone sees with JavaScript disabled. Currently says "our design studio". | The generic default is shown. It is the only page such a visitor ever sees, so naming you is worth the thirty seconds. |

---

## Three things worth reading before you start

**Never invent a number.** The ratings, the project areas, the delivery times and the statistics are the most checkable claims on the site. A rating and review count are only emitted as structured data once both hold real values — fabricated `aggregateRating` markup is a Google manual-action risk, so the template refuses to guess on your behalf.

**The portfolio photographs are not optional to replace.** The template ships with licensed stock interiors so it demonstrates properly on day one. Presenting another studio's work as your own portfolio is misrepresentation, whatever the licence says. Twelve project images and thirteen service images have to become yours.

**The legal pages are scaffolding, not advice.** A privacy policy and terms of service are written and wired to your details, covering the sections a design studio normally needs. Every jurisdiction differs. Until a qualified adviser has reviewed them and the revision date is set, both pages display a visible "not yet reviewed" notice — so publishing unreviewed policies is a deliberate act rather than an oversight.
