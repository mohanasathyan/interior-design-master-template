# Self-hosted images

Anything in this folder is served from the site root: a file saved as
`public/images/hero.jpg` is reachable at `/images/hero.jpg`, which is exactly
what `src` expects in `src/config/site.config.ts`.

---

## The hero image

A contemporary living room — coral velvet sofa, striped armchair, brass arc
lamp and a gold-framed glass partition. **Resized only, never cropped**, from
the supplied **4000 × 2252** master into five widths and three formats:

| Width | AVIF | WebP | JPEG | Serves |
| --- | --- | --- | --- | --- |
| 768 | 28 KB | 42 KB | 78 KB | phones |
| 1280 | 62 KB | 91 KB | 171 KB | tablets, phones at 2× |
| 1920 | 106 KB | 165 KB | 334 KB | desktops |
| 2560 | 143 KB | 228 KB | 497 KB | large desktops, 1280 at 2× |
| 3840 | 203 KB | 342 KB | 771 KB | 4K displays, 1920 at 2× |

Plus `hero.jpg` — a copy of the 1920 JPEG, the universal fallback for anything
that ignores `<picture>` and `srcset`.

**A typical desktop visitor downloads the 106 KB AVIF, not the 334 KB JPEG.**

3840 is the ceiling because the master is 4000 wide — a larger variant would be
an upscale. `sharp` is called with `withoutEnlargement`, so exporting a width
larger than the master silently yields the master's size instead.

### Positioning, measured

The frame is **16:9 (1.7762)**, and how much is cropped depends entirely on how
close the viewport is to that ratio:

| Viewport | Ratio | Width visible |
| --- | --- | --- |
| 1920 × 1080 | 1.778 | ~100% — the composition is shown essentially whole |
| 834 × 1112 | 0.750 | ~42% |
| 390 × 844 | 0.462 | ~26% |

That last row is not a tuning choice — a 16:9 image in a portrait viewport
*must* lose most of its width under `cover`.

### How much of the room a phone sees

The hero is **full-bleed at every breakpoint**: `inset-0` + `object-cover`, no
letterboxing, no exposed background, no distortion. The price is fixed by
arithmetic:

> visible width = viewport aspect ÷ image aspect

On a 390 × 844 phone that is 0.462 ÷ 1.776 = **26%** — a 1040px window on a
4000px frame. Equivalently `viewportAspect × imageHeight`, which is why
pre-cropping the source does not help: cropping moves the window, it does not
widen it. The only levers are a shorter image box (letterboxing) or a stretch,
and both are ruled out.

So the choice is *which* 26%. Measured positions of the furniture, as a
fraction of the frame's width:

| Element | Spans |
| --- | --- |
| ottomans | 12 – 45% |
| armchair | 21 – 34% |
| coffee table | 34 – 62% |
| coral sofa | 44 – 81% |
| arc lamp | 72 – 80% (dome), 89 – 95% (base) |

Those span 12 – 95%, so **three of the five is the ceiling** — the armchair and
the lamp are 59% apart and no 26% window holds both. `object-position: 42%`
takes the window to 29 – 55%, which keeps the armchair's right half, the near
ottoman, almost all of the coffee table and the left third of the sofa:
foreground, middle and back, reading left to right. Reaching the lamp (centre
~68%) would drop both the armchair and the table — two lost for one gained.

From `md` up it is **50%**, where the viewport is close enough to 16:9 that
nothing meaningful is cropped.

### `sizes` — why it is not `100vw`

This is the single easiest way to make a full-bleed hero look soft, and it only
shows up on phones, which is what makes it so easy to miss.

`cover` scales the image until it fills **both** axes. On a viewport taller
than the image's own ratio it scales by HEIGHT, so the image is laid out far
wider than the screen and the overflow is cropped. On a 390 × 844 phone that is
844 × 1.776 = **1499 CSS px of laid-out width**, not 390.

Tell the browser `100vw` and it fetches a candidate sized for 390px, then
stretches it across all 1499:

| Viewport | `sizes="100vw"` | Corrected |
| --- | --- | --- |
| 390 × 844 @2× | 1280w → **2.34× upscale** | 3840w → 0.78× |
| 390 × 844 @3× | 1280w → **3.51× upscale** | 3840w → 1.17× |
| 430 × 932 @3× | 1920w → **2.59× upscale** | 3840w → 1.29× |
| 834 × 1112 @2× | 1920w → **2.06× upscale** | 3840w → 1.03× |
| 1920 × 1080 @1× | 1920w → 1.00× | 1920w → 1.00× |

Note the last row: desktop is unaffected, because there the viewport ratio is
close to the image's and almost nothing is cropped. The hero looks perfect on
the machine it is built on and soft on every phone.

`coverSizes()` in `src/lib/images.ts` derives the right value from the image's
own dimensions, and **both** the `<img>` and the build-time preload call it —
they must be byte-identical or the browser resolves two different candidates
and downloads the hero twice.

### Overlay, measured

The hero uses **one** gradient, shaped differently either side of `lg` because
the copy sits in a different place:

| | Stops |
| --- | --- |
| below `lg` | `0.92` → `0.86` @22% → `0.62` @40% → `0.24` @54% → **`0` @68%** |
| from `lg` | `0.88` → `0.78` @18% → `0.55` @50% → `0.25` @100% |

The mobile scrim is shaped to the copy rather than spread evenly: near-solid
through the band the headline and lead occupy, then a fast fall so it is gone
by 68% and the lower third of the frame — marble, navy rug, coral velvet,
brass — keeps close to full strength. That is the difference between a dark
hero and a grey one.

The `0.62 @40%` stop is measured, not copied from the comp. At 390px the lead
wraps to three lines and the copy block runs to ~44% of the section, well past
where the comp's shorter headline ends; holding `0.58` only to 36% left the
paragraph's last line at **3.64:1**.

Four regions carry text. Each was sampled by taking the **brightest** tile
rather than the average, because an average hides pale marble behind one line
of a statistic:

| Viewport | Wordmark (gold) | Nav links | Hero copy | Stats card |
| --- | --- | --- | --- | --- |
| 320 × 690 | 6.02:1 | 18.76:1 | 6.91:1 | 9.60:1 |
| 360 × 780 | 6.04:1 | 18.93:1 | 6.04:1 | 9.84:1 |
| 390 × 844 | 6.04:1 | 18.96:1 | 6.21:1 | 9.48:1 |
| 412 × 915 | 6.05:1 | 19.00:1 | 6.47:1 | 9.43:1 |
| 430 × 932 | 6.05:1 | 19.00:1 | 6.75:1 | 9.66:1 |
| 768 × 1024 | 5.83:1 | 18.96:1 | 6.20:1 | 8.20:1 |
| 834 × 1112 | 5.83:1 | 19.00:1 | 5.69:1 | 8.19:1 |
| 1024 × 768 | 4.80:1 | 15.76:1 | 5.65:1 | 10.90:1 |
| 1280 × 800 | 4.75:1 | 15.99:1 | 5.57:1 | 10.62:1 |
| 1366 × 768 | 4.67:1 | 15.86:1 | 4.97:1 | 10.64:1 |
| 1440 × 900 | 4.87:1 | 16.33:1 | 5.62:1 | 10.65:1 |
| 1920 × 1080 | 5.17:1 | 17.21:1 | 5.48:1 | 10.49:1 |
| 2560 × 1440 | 5.30:1 | 17.56:1 | 5.20:1 | 10.73:1 |

All past the 4.5:1 minimum, with **no reliance on the large-text exemption**.
The `1024`-and-up rows are unchanged from the desktop design.

Three things about this pairing drove the numbers, and all three are worth
knowing before swapping the image:

- **The wordmark is gold, and gold is a mid-luminance colour** (#B8860B sits at
  0.27). It needs a background under 0.022 to clear 4.5:1 — far darker than
  white text needs. That, not the headline, is what sets the `0.78 @18%`
  plateau on desktop. Darkening only the top *edge* did not work: on a
  1366 × 768 laptop the navigation band runs to 15% of the frame, so the
  failing pixels were at the bottom of the bar.
- **A pale grey wall spans the full width at mid-height.** With centred desktop
  copy, a 0.45 middle stop leaves the lead at 3.81:1 at every viewport.
- **The lower edge is pale marble and a bright rug**, where the statistics card
  sits. Unscrimmed, white-on-image there measures 2.2:1. The card's own
  `bg-black/55` dark glass is what fixes it, which is why the gradient can stop
  at 0.25 instead of needing a heavy band across the foot of the picture.

**If you replace this image, redo this check.** The fix for a bright image is
different artwork or a different crop, not an ever-heavier scrim — a heavy
scrim is what flattens a picture into a texture.

### Encoding

Quality falls as width rises, because a pixel in the 3840 variant is displayed
on a denser screen rather than a bigger one, so it subtends less visual angle.
Holding quality flat spends the most bytes where they are least visible — and
at 3840 that variant is the LCP resource on a 4K display, so over-spending
there costs a Core Web Vital:

| Width | AVIF | WebP | JPEG |
| --- | --- | --- | --- |
| 768 | q62 | q84 | q86 |
| 1280 | q60 | q83 | q85 |
| 1920 | q58 | q82 | q85 |
| 2560 | q54 | q79 | q83 |
| 3840 | q48 | q75 | q80 |

This image is a render with large flat wall areas, so it compresses far better
than a photograph would at the same settings — hence a 1920 AVIF of 106 KB.

- effort 6 on AVIF and WebP; mozjpeg with 4:4:4 chroma on JPEG
- lanczos3 downscaling, **no sharpening pass** — added sharpening is what puts
  halos around high-contrast edges like the brass partition frames
- **resize only**: no crop, no rotation, no colour work, so composition,
  perspective, lighting and colour are identical to the master at every width
- sRGB throughout; an Adobe RGB or P3 export looks flat in some browsers

All three formats are resized from one decoded buffer per width, so they are
pixel-identical before compression and differ only by codec.

### Replacing it for a new client

Regenerate all sixteen files from the new master, keeping the naming
convention. Two config fields must stay in step with what is on disk:

- `media.hero.widths` — a width listed but missing here is a 404; a file here
  that is not listed is simply never requested
- `media.hero.formats` — every listed format must exist at every listed width

### Export settings

- **Format**: JPEG at quality 82–86, or WebP at 80–84 (smaller at the same
  quality — every browser in use supports it). Keep the extension consistent
  with what is in `widths`.
- **Colour**: sRGB. An Adobe RGB or Display P3 export will look flat and
  desaturated in some browsers.
- **Do not sharpen** the downscaled variants beyond your export tool's default.
  Halos around the travertine veining and the window mullions are the giveaway
  of an over-processed hero.
- **Do not upscale.** Only export widths your master can actually fill. A 3840
  variant from a 2000 px master ships four times the bytes for no additional
  detail; drop that width from `widths` instead.
- Target roughly: 768 ≈ 100 KB, 1280 ≈ 240 KB, 1920 ≈ 500 KB, 2560 ≈ 800 KB,
  3840 ≈ 1.5 MB as JPEG. Meaningfully above that and the compression setting is
  too high, not the image.

### One command, if you have ImageMagick

```bash
cd public/images
for w in 768 1280 1920 2560 3840; do
  magick hero-master.jpg -resize "${w}x>" -quality 84 -colorspace sRGB "hero-${w}.jpg"
done
cp hero-1920.jpg hero.jpg
```

The `>` in `"${w}x>"` is what stops ImageMagick enlarging a master that is
narrower than the width being requested.

---

## Checking it worked

```bash
npm run build
```

Then open `dist/index.html` and find the hero preload. It should read:

```html
<link rel="preload" as="image" href="/images/hero-1920.avif" type="image/avif"
      imagesrcset="/images/hero-768.avif 768w, /images/hero-1280.avif 1280w, …"
      imagesizes="100vw" fetchpriority="high" />
```

`href` is deliberately the 1920 variant rather than the largest: it is the
fallback for Safari below 17.2, which ignores `imagesrcset` and downloads
`href` verbatim.

If `imagesrcset` is missing, `widths` is not set in the config. If the page
still shows placeholder artwork, the filename does not match `src`.

---

## The before/after pair

`before.jpg` and `after.jpg` feed the home page's comparison slider — the same
double-height living room as an empty shell and as a finished interior. Both
masters are **4000 × 2250** and are resized only, never cropped, into four
widths and three formats each:

| Width | AVIF | WebP | JPEG | | AVIF | WebP | JPEG |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | **before** | | | | **after** | | |
| 768 | 8 KB | 11 KB | 33 KB | | 23 KB | 32 KB | 68 KB |
| 1280 | 16 KB | 21 KB | 66 KB | | 52 KB | 75 KB | 147 KB |
| 1920 | 26 KB | 36 KB | 123 KB | | 94 KB | 148 KB | 295 KB |
| 2560 | 35 KB | 46 KB | 187 KB | | 129 KB | 210 KB | 459 KB |

The empty room costs a quarter of what the furnished one does at every width —
flat walls and a plain floor give a codec almost nothing to encode. Both are
lazy-loaded, so neither competes with the hero for the LCP.

The ladder stops at **2560**, not 3840 as the hero's does. The frame sits inside
the content container rather than full-bleed, so the widest it is ever laid out
is ~1232 CSS px — 2464 device px on a 2× display. A 3840 variant could never be
selected by any device, so shipping one would be dead weight.

### The one rule that matters when replacing them

> **Both files must have the SAME intrinsic dimensions.**

The slider stacks them in one box with the same `object-fit: cover` and the same
`object-position`, and clips the top one. That is what makes the two halves line
up — nothing in the component measures or corrects anything. Feed it a
4000 × 2250 and a 3800 × 2100 and `cover` will scale them differently, so the
floor line will step across the divider and the illusion of one room collapses
instantly.

Three more things have to hold, and none of them can be fixed in CSS:

- **Same camera position, lens and height.** Architectural lines — the floor
  edge, the ceiling soffit, the window mullions — should run straight through
  the divider without a jog. This is why the pair must be shot on a tripod that
  was not moved, or rendered from one saved camera.
- **Same white balance and exposure.** A colour or brightness shift across the
  seam reads as a photographic mistake rather than as a design transformation.
- **Something recognisable in both.** The window wall does the work here: it is
  the fixed point that tells the eye these are one room at two moments, not two
  rooms side by side.

### What the phone actually sees

The frame changes shape across breakpoints, and `cover` crops whatever the box
is narrower than the image:

| Breakpoint | Box ratio | Width visible | Laid-out width |
| --- | --- | --- | --- |
| below `sm` | 4:3 | 75% | 1.34 × the box |
| `sm` → `lg` | 3:2 | 84% | 1.19 × the box |
| `lg` and up | 16:9 | 100% | 1.00 × the box |

The 4:3 mobile box is a deliberate trade. A 16:9 frame at 390px is only 219px
tall — too short to drag comfortably and too small to carry a hero image —
while 4:3 gives 292px and costs 12.5% off each side. The centre 75% keeps the
sectional, the brass staircase, the chandelier, the marble table, the armchair
and the ottoman; what it loses is the fireplace at the right edge.

That "laid-out width" column is the `sizes` calculation, and getting it wrong is
the same trap documented for the hero above: `100vw` on a 390px phone at 3× DPR
would request a candidate for 390 CSS px and stretch it across 456, and the
comparison would look soft on exactly the devices most people use. The value
lives in `Transformation.tsx` with its arithmetic written out.

**Both layers are handed the identical `sizes` string.** If they differed, the
browser would resolve two different candidates and one side of the divider would
be visibly softer than the other — a defect that is very hard to spot and
impossible to un-see.

---

## Adding other self-hosted images

Same pattern anywhere in `site.config.ts` or `src/data/`:

```ts
{ src: '/images/founder.jpg', alt: '…', width: 1200, height: 1500 }
```

`widths` is optional. Without it the one file is used at every screen size —
fine for a small portrait, wasteful for anything full-bleed.
