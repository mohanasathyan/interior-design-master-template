import {
  BadgeCheck,
  CalendarCheck,
  Compass,
  HandCoins,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * ============================================================================
 * WHY CHOOSE US
 * ============================================================================
 * These are objection-handlers, not adjectives.
 *
 * Every prospective interior client carries the same four fears: it will cost
 * more than quoted, it will take longer than promised, the finish will not
 * match the render, and nobody will answer the phone once the deposit clears.
 *
 * Each card below answers one of those directly. That is why this section
 * converts — not because it says "quality" and "trust".
 * ============================================================================
 */

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
  /** The specific fear this card neutralises. Kept for editorial discipline. */
  addresses: string;
}

export const differentiators: Differentiator[] = [
  {
    icon: PencilRuler,
    title: 'Design You Approve Before We Build',
    description:
      'Photorealistic 3D visuals of every room, revised until you are genuinely happy. Nothing is fabricated or installed until the drawings carry your sign-off.',
    addresses: 'Fear that the finished space will not match the render',
  },
  {
    icon: HandCoins,
    title: 'Itemised, Honest Pricing',
    description:
      'A line-by-line quotation covering materials, hardware, labour and finishes. No lump sums, no vague allowances, and no revised figure halfway through the build.',
    addresses: 'Fear of cost creep',
  },
  {
    icon: CalendarCheck,
    title: 'A Schedule We Commit To',
    description:
      'A dated, stage-wise plan issued before work begins, with weekly progress updates. You always know what is happening this week and what happens next.',
    addresses: 'Fear of open-ended timelines',
  },
  {
    icon: Users,
    title: 'One Point of Contact, Start to Finish',
    description:
      'A dedicated project manager owns your build. You never chase carpenters, electricians or suppliers — that is our job, and it stays our job.',
    addresses: 'Fear of vendor chaos',
  },
  {
    icon: BadgeCheck,
    title: 'Materials You Can Verify',
    description:
      'Brand names and specifications listed in the quote, and physical samples you can hold before approving. What we specify is exactly what gets installed.',
    addresses: 'Fear of material substitution',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty and After-Care',
    description:
      'A written warranty on our workmanship and on manufactured components, plus a genuine after-handover support line. We answer after the invoice is settled.',
    addresses: 'Fear of being abandoned post-handover',
  },
  {
    icon: Compass,
    title: 'Designed Around Your Life',
    description:
      'We plan around your routines, your storage and your daylight — not around a template. Two homes with the same floor plan should never receive the same design.',
    addresses: 'Fear of a copy-paste interior',
  },
  {
    icon: Sparkles,
    title: 'Finished, Styled and Handed Over',
    description:
      'We complete the last five per cent that most firms leave: snag-free finishing, deep cleaning, styling and a walkthrough before you take the keys.',
    addresses: 'Fear of an unfinished handover',
  },
];

/**
 * The short-form version used on the home page. Four cards read as considered;
 * eight read as a list.
 */
export const primaryDifferentiators = differentiators.slice(0, 4);
