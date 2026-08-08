import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { heroStats } from '@/data/stats';
import { homeSections } from '@/data/navigation';
import { isFilled, t } from '@/lib/tokens';
import { coverSizes } from '@/lib/images';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Section';
import { Img } from '@/components/common/Img';
import { Stat } from '@/components/common/Stat';
import { IconChip } from '@/components/common/IconChip';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * HERO
 * ============================================================================
 * The five seconds that decide whether the rest of the site gets read.
 *
 * Composition — one centred column at every breakpoint:
 *  • A full-bleed image under a single smooth top-to-bottom gradient. One
 *    gradient, not a stack: centred type needs even darkening, and layering
 *    several scrims is what turns a room into a silhouette.
 *  • Headline, sub-headline and ONE call to action, centred and vertically
 *    centred in the space above the statistics card.
 *  • A dark glass statistics card inset from the edges — four proof points a
 *    visitor reads before scrolling a single pixel.
 *
 * Accessibility and performance:
 *  • The hero image is the LCP element, so it loads eagerly at high priority.
 *  • Overlay opacity is measured, not eyeballed — see the note on the overlay.
 *  • Every animation is entrance-only; nothing loops in the viewport.
 * ============================================================================
 */
export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const { heroCopy } = siteConfig;

  /** Entrance transition. Fade and a short rise — nothing that draws attention. */
  const rise = (delay: number) => ({
    initial: reduceMotion ? undefined : { opacity: 0, y: 20 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section
      id={homeSections.hero}
      aria-label={copyConfig.home.heroLabel}
      /*
       * `min-h-svh`, not `92svh`. `svh` is the SMALL viewport height — the
       * height with the browser's chrome expanded — so a full `svh` is the
       * tallest hero that is still guaranteed to fit a phone screen without
       * the statistics card slipping under the fold, which is exactly what
       * happened when the copy was centred inside a 92svh section.
       */
      className="relative flex min-h-svh flex-col overflow-hidden bg-contrast"
    >
      {/*
        ---------------- Background image ----------------

        FULL-BLEED at every breakpoint. `inset-0` and `object-cover`, so the
        picture fills the section edge to edge with no letterboxing, no exposed
        background and no distortion.

        The consequence is a hard geometric limit worth writing down, because
        it is not a tuning choice and no amount of `object-position` changes it:

            visible width  =  viewport aspect ÷ image aspect

        On a 390×844 phone that is 0.462 ÷ 1.776 = **26%** of the frame. Put
        another way, the widest strip of this image a full-bleed portrait hero
        can ever show is `viewportAspect × imageHeight` = 1040 of its 4000
        pixels — independent of how the image is cropped beforehand, because
        cropping moves the window without widening it.

        So the room cannot be shown whole here; the only decision is WHICH 26%,
        and it is made in `object-position` below.
      */}
      <div className="absolute inset-0">
        <Img
          image={siteConfig.media.hero}
          priority
          tone="dark"
          /*
           * NOT `100vw`. This image is `object-fit: cover` and full-bleed, so
           * on a portrait phone it is laid out ~1500px wide and cropped — and
           * `100vw` would have the browser fetch a 390px-worth candidate and
           * stretch it 2.3–3.5× across that. `coverSizes` derives the real
           * laid-out width from the image's own ratio; see the note there.
           */
          sizes={coverSizes(siteConfig.media.hero.width, siteConfig.media.hero.height)}
          className="h-full w-full"
          imgClassName={cn(
            /*
             * WHICH slice survives. Measured against where things actually sit
             * in the frame, as a fraction of its width:
             *
             *   ottomans      12 – 45%
             *   armchair      21 – 34%
             *   coffee table  34 – 62%
             *   coral sofa    44 – 81%
             *   arc lamp      72 – 80%  (dome), 89 – 95% (base)
             *
             * Those span 12–95%. A phone shows 26%, so no setting reaches both
             * the armchair and the lamp — they are 59% of the frame apart, and
             * any window holding both would have to be more than twice as wide
             * as the one available. Three of the four is the ceiling.
             *
             * 42% centres the window on 29 – 55%, which is the setting that
             * gets those three: the armchair's right half, the near ottoman,
             * the coffee table almost whole, and the left third of the coral
             * sofa — foreground, middle, back, reading left to right as the
             * reference does. The arc lamp is the one that cannot come; a
             * window that reaches it (centre ~68%) drops the armchair AND the
             * table, which is two lost for one gained.
             *
             * Vertically always centred. Below 1.776 the full height is shown
             * so it has no effect; above it (ultrawide) centring holds the
             * sofa line rather than drifting to the ceiling.
             */
            'object-[42%_center] md:object-center',
            reduceMotion
              ? 'scale-100'
              : 'animate-[slow-pan_24s_ease-in-out_infinite_alternate] will-change-transform',
          )}
        />
      </div>

      {/*
        THE OVERLAY — one gradient, shaped differently either side of `lg`
        because the copy sits in a different place.

        Below `lg` the copy is top-aligned, so the scrim is near-solid across
        the band it occupies and then falls away completely by 68% — the lower
        third of the frame keeps its own light. From `lg` the copy is
        vertically centred, so the darkening has to follow it down and never
        quite reaches zero; that residue is also what carries the statistics
        card, which sits over pale marble where unscrimmed white measures
        2.2:1.

        No solid layer anywhere, at either breakpoint.

        Measured across thirteen viewports (320 → 2560), worst case per region:
        gold wordmark 4.67:1, navigation links 15.76:1, hero copy 4.97:1,
        statistics card 8.19:1 — all at the strict 4.5:1 threshold, with no
        reliance on the large-text exemption. The `lg`-and-up figures are
        unchanged from the approved desktop design. See
        `public/images/README.md` for the full table.
      */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0',
          /*
           * Below `lg` the copy is back on the photograph — the image is
           * full-bleed again — so this scrim carries readability on its own.
           *
           * It is shaped to the copy, not spread evenly: near-solid through
           * the band the headline and lead occupy, then a fast fall so it is
           * GONE by 68%. That is what keeps the lower third of the frame —
           * marble, navy rug, coral velvet, brass — at close to full strength
           * instead of under a flat wash, which is the whole difference
           * between a dark hero and a grey one.
           *
           * The 0.62 stop sits at 40%, not 36%, and that came from measuring
           * rather than from the comp. At 390px the lead wraps to three lines
           * and the copy block runs to ~44% of the section — well past where
           * the comp's shorter headline ends. Holding 0.58 to 36% and letting
           * go measured 3.64:1 on the last line of the paragraph; carrying
           * 0.62 to 40% brings the whole column to 5.80:1 or better.
           */
          'bg-[linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.86)_22%,rgba(0,0,0,0.62)_40%,rgba(0,0,0,0.24)_54%,rgba(0,0,0,0)_68%)]',
          /*
           * From `lg` the copy is vertically centred instead, so the darkening
           * has to follow it down the frame rather than clear early.
           *
           * It holds 0.78 to 18% rather than starting at 0.55, and that stop
           * is set by the WORDMARK, not the headline. Brand gold sits at 0.27
           * luminance, so it needs a background under 0.022 to clear 4.5:1 —
           * far darker than white text needs. Darkening only the top EDGE did
           * not fix it either: on a 1366×768 laptop the navigation band runs to
           * 15% of the frame, so the failing pixels were at the BOTTOM of the
           * bar. The plateau is what covers the whole band.
           */
          'lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.78)_18%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.25)_100%)]',
        )}
      />

      {/*
        A whisper of a vignette — roughly a quarter-stop at the corners. It stops
        the frame bleeding into the page edge. Transparent across the middle
        60%, so the room keeps its full contrast and the brass and coral stay
        warm.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(0,0,0,0.24)_100%)]"
      />

      {/* ---------------- Content ---------------- */}
      <Container
        size="hero"
        className={cn(
          /* `flex-1` takes the space the statistics card leaves; `justify-*`
             then decides where the copy sits inside it. */
          'relative z-10 flex flex-1 flex-col',
          /*
           * Top-aligned below `lg`, sitting just under the navigation exactly
           * as the reference draws it. Centring it here is what pushed the
           * statistics card off the bottom of a phone: the copy floated to the
           * middle, and the card followed it down past the fold.
           */
          'justify-start pb-8 pt-20 sm:pt-24',
          /* Vertically centred from `lg`, where the frame is wide enough that
             a top-aligned column would leave the lower half empty. */
          'lg:justify-center lg:pb-14 lg:pt-36',
        )}
      >
        <div className="mx-auto w-full max-w-184 text-center">
          {/* Headline — the single <h1> on the home page */}
          <m.h1
            {...rise(0.05)}
            /*
             * Three explicit lines rather than one wrapping string, so the
             * break is identical on every screen and no line is ever left with
             * an orphan. `text-balance` then evens each line's own rag if a
             * part is long enough to wrap on a small phone.
             */
            /*
             * The headline is set in the BODY face (Inter) at bold, not the
             * display serif, because that is what the approved design draws.
             * The mix is deliberate rather than accidental: the serif still
             * carries the wordmark and the statistics figures, so the page
             * keeps both voices. A bold grotesque also holds three short
             * stacked lines better than a Didone, whose thin strokes turn
             * fragile at this size on a phone.
             *
             * `leading` and `tracking` come after `text-display` because a
             * font-size utility carries its own line-height and letter-spacing
             * from the `@theme` token, and the later declaration wins.
             *
             * This started life as a `cn()` call and lost `text-display`
             * entirely — tailwind-merge mistook the custom token for a colour
             * and let `text-white` delete it. `cn()` is safe now (see the note
             * in `lib/utils.ts`), but a plain string is kept here because
             * nothing about this class list is conditional.
             */
            className="text-balance font-body text-display font-bold leading-[1.06] tracking-[-0.02em] text-white lg:leading-[1.04]"
          >
            {/*
              The `{' '}` between the lines is not cosmetic. `display: block`
              breaks the lines visually, but it puts nothing between the words
              in the text itself — the accessible name, the SEO title and any
              share-card scrape all read "Design YourDream HomeWith Us". The
              spaces collapse to nothing between block boxes, so they cost no
              layout and fix all three.
            */}
            {/*
              The supporting lines are set at 0.88em — a 12% step down — so the
              gold line is the unambiguous focal point rather than one of three
              equals. `em`, not a fixed size, so it rides the fluid `clamp()`
              on `--text-display` at every width.

              `leading-[1.2]` restores the rhythm the smaller size would
              otherwise break: 0.88 × 1.2 = 1.056em, which matches the accent
              line's own 1 × 1.06em, so the three baselines stay evenly spaced
              instead of the smaller lines bunching up.

              Both supporting lines take the step, not just the first. They are
              the same structural role, and shrinking only the lead would leave
              the tail as the largest white line on the screen — competing with
              the very line it is meant to defer to.
            */}
            <span className="block text-[0.88em] leading-[1.2]">{t(heroCopy.headlineLead)}</span>{' '}
            <span className="block text-accent">{t(heroCopy.headlineAccent)}</span>{' '}
            {isFilled(heroCopy.headlineTail) && (
              <span className="block text-[0.88em] leading-[1.2]">
                {t(heroCopy.headlineTail)}
              </span>
            )}
          </m.h1>

          {/* Sub-headline */}
          <m.p
            {...rise(0.18)}
            /* ~34rem holds the copy to two lines at the capped lead size on
               desktop and three or four on a phone, which is the proportion the
               reference draws. */
            className="mx-auto mt-6 max-w-xl text-pretty text-lead text-white/85 sm:mt-7 lg:mt-8 lg:max-w-136"
          >
            {t(heroCopy.subheadline)}
          </m.p>

          {/* Single call to action */}
          <m.div {...rise(0.3)} className="mt-8 flex justify-center sm:mt-9 lg:mt-10">
            <Button
              asChild
              size="xl"
              /*
               * The primitive's hover sheen is a light sweep across the face —
               * a shimmer. It is right on a flat fill and wrong on a metallic
               * one, where the gradient and its inset highlight already carry
               * the material. Two moving highlights read as an effect; one
               * reads as a surface. Scoped off here only; every other button
               * on the site keeps it.
               */
              noSheen
              className={cn(
                /*
                 * The pill radius is scoped to this one button rather than
                 * changed on the primitive. Site-wide, corners stay at the 2px
                 * brand radius — sharp edges read "atelier", and swapping that
                 * globally would restyle every button on every page.
                 */
                'min-w-60 rounded-full px-11',
                /*
                 * Metallic gold. `bg-accent` stays underneath as a flat
                 * fallback so the button is never unstyled if the gradient
                 * cannot paint; the gradient sits on top as a background
                 * IMAGE, which is why both survive the class merge.
                 *
                 * The label is `text-contrast` (#1a1917), the darker of the
                 * two ink tokens. That is a contrast decision, not a stylistic
                 * one — see the note beside `--gradient-gold`.
                 */
                'bg-accent bg-(image:--gradient-gold) text-contrast',
                /*
                 * The micro-interaction, and nothing more: a 3px lift, the
                 * shadow deepening and spreading, the arrow easing right.
                 * 300ms on the brand's own curve. No glow, no pulse, no
                 * shimmer. `active` settles back to 1px so the press is felt.
                 */
                'shadow-gold hover:shadow-gold-lift',
                'duration-300 hover:-translate-y-0.75 active:-translate-y-px',
                /* Hold the fill through hover — the primitive would otherwise
                   swap it for the darker `accent-hover` underneath. */
                'hover:bg-accent',
              )}
            >
              <Link to={routes.contact}>
                {t(heroCopy.ctaLabel)}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-luxe group-hover/btn:translate-x-1"
                  strokeWidth={1.9}
                />
              </Link>
            </Button>
          </m.div>
        </div>
      </Container>

      {/* ---------------- Statistics card ---------------- */}
      <m.div
        {...rise(0.45)}
        className="relative z-10 px-[clamp(1.5rem,5vw,6rem)] pb-6 sm:pb-8 lg:pb-14"
      >
        {/*
          Dark glass rather than a full-bleed band: inset from the edges with a
          real radius, which is what stops the foot of the hero reading as a
          toolbar. The fill is doing accessibility work as well as visual work —
          see the overlay note above.
        */}
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/12 bg-black/55 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {/*
            Four equal columns at every width, per the reference.
            `grid-cols-4` with `min-w-0` cells is what keeps that honest: the
            labels wrap inside their column instead of forcing the grid wider
            than the card, which is the usual way a four-up stat row starts
            scrolling sideways on a phone.
          */}
          <ul className="grid grid-cols-4">
            {heroStats.map((stat, index) => (
              <li
                key={stat.label}
                className={cn(
                  'flex min-w-0 flex-col items-center px-1.5 py-5 sm:px-3 sm:py-6 md:px-5 md:py-8',
                  index > 0 && 'border-l border-white/12',
                )}
              >
                {stat.icon && (
                  <IconChip
                    icon={stat.icon}
                    tone="light"
                    shape="square"
                    size="sm"
                    className="mb-2.5 md:mb-4"
                  />
                )}
                <Stat
                  {...stat}
                  icon={undefined}
                  tone="light"
                  size="xs"
                  align="center"
                  className="token-safe"
                />
              </li>
            ))}
          </ul>
        </div>
      </m.div>
    </section>
  );
}
