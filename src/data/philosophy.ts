import {
  CircleDot,
  Gem,
  Leaf,
  Lightbulb,
  Ruler,
  Timer,
  TreePine,
  Wind,
  type LucideIcon,
} from 'lucide-react';

/**
 * ============================================================================
 * DESIGN PHILOSOPHY · MATERIALS · PROMISE
 * ============================================================================
 * The editorial heart of the site. This is the content that separates a studio
 * charging premium fees from a contractor quoting per square foot — it shows
 * there is a point of view behind the work, not just a price list.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  DESIGN PHILOSOPHY                                                          */
/* -------------------------------------------------------------------------- */

export interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const philosophyIntro = {
  eyebrow: 'Design Philosophy',
  title: 'Rooms should feel considered, never decorated.',
  lead: 'Good interior design is mostly invisible. It is the door that opens the right way, the socket exactly where you need it, the light that softens at dusk. We spend our attention on the decisions you will feel every day, not the ones that only photograph well.',
};

export const principles: Principle[] = [
  {
    icon: Ruler,
    title: 'Proportion Before Decoration',
    description:
      'We resolve scale, circulation and sightlines first. A room with correct proportions looks expensive with almost nothing in it; a badly proportioned room cannot be rescued by furniture.',
  },
  {
    icon: Lightbulb,
    title: 'Light as a Material',
    description:
      'Natural light is planned for, and artificial light is layered in three tiers with the colour temperature specified room by room. Lighting changes how a space feels more than any finish.',
  },
  {
    icon: CircleDot,
    title: 'Restraint in the Palette',
    description:
      'Three materials, well chosen and repeated, will always outperform ten competing for attention. We build interest through texture and craft rather than through variety.',
  },
  {
    icon: Timer,
    title: 'Designed to Age Well',
    description:
      'We deliberately avoid what will look dated in three years. The base layer stays timeless and the trend-led pieces stay easy to change — so the home matures instead of expiring.',
  },
  {
    icon: Wind,
    title: 'Room to Breathe',
    description:
      'Empty space is a design element, not wasted area. Leaving a wall bare or a corner open is often the most confident decision available in a room.',
  },
  {
    icon: Leaf,
    title: 'Responsible by Default',
    description:
      'Low-VOC finishes, responsibly sourced timber and efficient fittings are our standard specification, not an upgrade you have to request and pay extra for.',
  },
];

/* -------------------------------------------------------------------------- */
/*  PREMIUM MATERIALS                                                          */
/* -------------------------------------------------------------------------- */

export interface Material {
  name: string;
  /** What it is, in plain language. */
  description: string;
  /** Where the client will encounter it. */
  usedFor: string;
  /** The quality claim — the reason this specification costs more. */
  standard: string;
}

export const materialsIntro = {
  eyebrow: 'Premium Materials',
  title: 'The specification behind the finish.',
  lead: 'Anything can look good on handover day. What separates a premium interior is how it looks in year five — which comes down to what sits behind the surface. These are the specifications we build to as standard.',
};

export const materials: Material[] = [
  {
    name: 'Moisture-Resistant Core',
    description:
      'Boiling-water-resistant plywood and engineered boards for every carcass in wet and humid zones.',
    usedFor: 'Kitchen units, wardrobes, vanities',
    standard: 'Rated to resist swelling and delamination in humid conditions',
  },
  {
    name: 'Natural Stone & Quartz',
    description:
      'Engineered quartz and honed natural stone for surfaces that face heat, water and daily abrasion.',
    usedFor: 'Countertops, vanity tops, table surfaces',
    standard: 'Non-porous, stain-resistant and heat-tolerant',
  },
  {
    name: 'Real Wood Veneer',
    description:
      'Book-matched veneers over a stable engineered substrate, giving genuine timber grain without the movement of solid wood.',
    usedFor: 'Feature walls, joinery fronts, headboards',
    standard: 'Grain-matched across panels and factory-finished',
  },
  {
    name: 'European Hardware',
    description:
      'Soft-close hinges, telescopic channels and lift-up mechanisms from established international manufacturers.',
    usedFor: 'Every drawer, shutter and lift-up unit',
    standard: 'Cycle-tested for years of daily operation',
  },
  {
    name: 'Low-VOC Finishes',
    description:
      'Water-based paints, lacquers and adhesives that cure quickly and leave no lingering solvent smell.',
    usedFor: 'Walls, ceilings, painted joinery',
    standard: 'Low emission — safe for children and sensitive households',
  },
  {
    name: 'Specification-Grade Lighting',
    description:
      'High colour-rendering LED fittings with the beam angle and colour temperature chosen per room.',
    usedFor: 'Cove, spot, profile and decorative lighting',
    standard: 'High CRI, flicker-free and fully dimmable',
  },
];

/* -------------------------------------------------------------------------- */
/*  OUR PROMISE                                                                */
/* -------------------------------------------------------------------------- */

export interface Promise {
  title: string;
  description: string;
}

export const promiseIntro = {
  eyebrow: 'Our Promise',
  title: 'What you can hold us to.',
  lead: 'Commitments are only worth something if they are specific. These are ours, and we put them in writing on every project.',
};

export const promises: Promise[] = [
  {
    title: 'The price we quote is the price you pay',
    description:
      'Our quotation is itemised and fixed for the agreed scope. Any change is priced and approved by you in writing before it is executed — there are no surprises on the final invoice.',
  },
  {
    title: 'The schedule we publish is the schedule we work to',
    description:
      'You receive a dated, stage-wise plan before work begins and a progress update every week. If anything slips, you hear it from us first, along with the recovery plan.',
  },
  {
    title: 'What you approve is what gets installed',
    description:
      'Every material and brand is named in the quotation. Nothing is substituted for a cheaper equivalent without your explicit written consent.',
  },
  {
    title: 'We finish the last five per cent',
    description:
      'Snagging, deep cleaning, styling and a full walkthrough are part of the contract — not optional extras you have to chase after handover.',
  },
  {
    title: 'We answer after handover',
    description:
      'A written warranty covers our workmanship and manufactured components, and our support line stays open. The relationship does not end when the invoice is settled.',
  },
];

/* -------------------------------------------------------------------------- */
/*  QUALITY STANDARDS (About page)                                             */
/* -------------------------------------------------------------------------- */

export interface QualityStandard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const qualityStandards: QualityStandard[] = [
  {
    icon: Gem,
    title: 'Stage-Wise Quality Checks',
    description:
      'Formal inspections at civil, carpentry, finishing and handover stages, each signed off before the next trade begins work.',
  },
  {
    icon: TreePine,
    title: 'Responsible Sourcing',
    description:
      'Timber and boards from established suppliers with verifiable sourcing, and low-emission finishes throughout as standard.',
  },
  {
    icon: Ruler,
    title: 'Millimetre Tolerances',
    description:
      'Factory-cut joinery and laser-verified site measurements, so shutters align and gaps stay consistent across every run.',
  },
  {
    icon: Timer,
    title: 'Documented Handover',
    description:
      'Every project closes with warranty papers, a materials schedule and a care guide, so you know exactly what was installed and how to maintain it.',
  },
];
