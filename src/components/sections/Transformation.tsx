import { MoveHorizontal } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { homeSections } from '@/data/navigation';
import { t } from '@/lib/tokens';
import { Section, SectionHeading } from '@/components/common/Section';
import { Reveal } from '@/components/common/Reveal';
import { BeforeAfter } from '@/components/common/BeforeAfter';

/**
 * ============================================================================
 * SEE THE TRANSFORMATION
 * ============================================================================
 * The one interactive proof on the page.
 *
 * WHY IT SITS HERE — between the portfolio and the process.
 *
 * The portfolio above answers "show me" with finished rooms, and finished rooms
 * are the weakest kind of proof an interior studio has: every competitor's
 * gallery looks broadly the same, and a beautiful photograph says nothing about
 * who is responsible for it. What this section shows instead is the DELTA — the
 * empty shell the client actually starts from, and the distance travelled. That
 * is the thing being bought, and it is the one claim a rival gallery of pretty
 * pictures cannot make.
 *
 * It then hands straight off to the process section below, which explains how
 * the change is delivered. Desire, then proof of change, then method: the
 * section is the bridge, and moving it earlier — next to the hero, say — trades
 * that away for an interaction that competes with the hero's call to action.
 *
 * The band is `muted` because it lands between a `canvas` portfolio and a
 * `contrast` process. A warm sand ground separates the two without putting two
 * dark bands next to each other, and photography reads better framed by a tone
 * than floating on white.
 * ============================================================================
 */

/**
 * THE `sizes` ARITHMETIC
 *
 * Wrong `sizes` on a `cover` image is the quiet way to ship a soft photograph,
 * and it only shows up where the box is further from the image's own ratio —
 * which here is phones. `cover` scales until BOTH axes are filled, so in a box
 * narrower than 16:9 the image is laid out WIDER than the box and the overflow
 * is cropped. The laid-out width is `boxWidth × (imageRatio ÷ boxRatio)`:
 *
 *   below sm   box 4:3    → 1.7778 ÷ 1.3333 = 1.34 × the box
 *   sm → lg    box 3:2    → 1.7778 ÷ 1.5    = 1.19 × the box
 *   lg and up  box 16:9   → 1.00 × the box  (the box IS the image's ratio)
 *
 * The box is the default container, so its width is the viewport less that
 * container's gutters (px-6 → px-8 → px-12 → px-16), capped at 85rem − 2×4rem
 * = 1232px. Tell the browser `100vw` instead and a 390px phone at 3× requests a
 * candidate for 390 CSS px and stretches it across 456 — a 3.5× upscale.
 *
 * Both layers are handed the identical string. If they differed, the browser
 * would resolve two different candidates and one side of the divider would be
 * measurably softer than the other.
 */
const FRAME_SIZES = [
  '(min-width: 1536px) 1232px',
  '(min-width: 1280px) calc(100vw - 8rem)',
  '(min-width: 1024px) calc(100vw - 6rem)',
  '(min-width: 640px) calc((100vw - 4rem) * 1.19)',
  'calc((100vw - 3rem) * 1.34)',
].join(', ');

export function Transformation() {
  const copy = siteConfig.transformationCopy;
  const { before, after } = siteConfig.media.transformation;

  return (
    <Section
      id={homeSections.transformation}
      tone="muted"
      spacing="xl"
      ariaLabelledBy="transformation-title"
    >
      <SectionHeading
        id="transformation-title"
        eyebrow={copy.eyebrow}
        title={copy.title}
        lead={copy.lead}
        align="center"
        maxWidth="max-w-2xl"
      />

      {/*
        `preset="fade"` rather than the usual rise. The frame is the largest
        object in the band and it opens with a wipe of its own the moment it
        lands — a simultaneous 24px lift would read as two competing entrances
        for one element.
      */}
      <Reveal preset="fade" delay={0.1} className="mt-14 md:mt-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-(--radius-brand) shadow-float">
            <BeforeAfter
              before={before}
              after={after}
              beforeLabel={copy.beforeLabel}
              afterLabel={copy.afterLabel}
              handleLabel={copy.handleLabel}
              sizes={FRAME_SIZES}
              initial={50}
            />
          </div>

          {/*
            The hint is decorative — `aria-hidden`, because it describes a
            gesture, and the handle already announces itself properly to a
            screen reader through its own label and value.
          */}
          <p
            aria-hidden="true"
            className="mt-6 flex items-center justify-center gap-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted"
          >
            <MoveHorizontal className="size-4 text-accent-strong" strokeWidth={1.5} />
            {t(copy.hint)}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
