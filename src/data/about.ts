import { Eye, Heart, Scale, Sparkle, Target, Users, type LucideIcon } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

/**
 * ============================================================================
 * ABOUT — STORY, MISSION, VISION, VALUES, FOUNDER, MILESTONES
 * ============================================================================
 * The About page is where a premium studio justifies its premium. It is also,
 * on most interior design sites, the second-most-visited page after the
 * portfolio — because a prospect who likes the work then wants to know who
 * they would be handing their home over to.
 *
 * The copy below is written as a studio would actually speak: specific,
 * unhurried and free of superlatives.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  COMPANY STORY                                                              */
/* -------------------------------------------------------------------------- */

export const story = {
  eyebrow: 'Our Story',
  title: 'A studio built on the belief that good design should be lived in.',
  paragraphs: [
    '{{BUSINESS_NAME}} began in {{FOUNDING_YEAR}} with a single conviction: that the interiors most people were being offered in {{CITY}} were either beautiful and impractical, or practical and forgettable. There was very little in between, and almost nothing that could be delivered on a promised date for a promised price.',
    'We started with one project, one carpenter and an uncomfortable amount of attention to detail. What grew from it was a studio that keeps design and execution under the same roof — because the gap between the drawing and the built reality is where most interior projects quietly fall apart.',
    'Today we are a team of designers, project managers and craftspeople delivering homes, workplaces and retail spaces across {{CITY}} and the surrounding region. The scale has changed. The conviction has not: a space is only successful if it still works beautifully on an ordinary Tuesday, three years after we have left.',
  ],
};

/* -------------------------------------------------------------------------- */
/*  MISSION & VISION                                                           */
/* -------------------------------------------------------------------------- */

export const mission = {
  icon: Target,
  label: 'Our Mission',
  statement:
    'To design and deliver interiors that make daily life easier and more beautiful — on schedule, on budget and to a standard our clients can verify for themselves.',
  detail:
    'That means honest quotations, published timelines, materials named in writing, and a single accountable team from first sketch to final handover.',
};

export const vision = {
  icon: Eye,
  label: 'Our Vision',
  statement:
    'To be the studio that {{CITY}} recommends without hesitation — known less for a signature style than for reliably getting it right.',
  detail:
    'We would rather be the practice a family returns to for their second home than the one that wins a magazine feature and leaves a snag list behind.',
};

/* -------------------------------------------------------------------------- */
/*  VALUES                                                                     */
/* -------------------------------------------------------------------------- */

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    icon: Scale,
    title: 'Honesty Over Salesmanship',
    description:
      'If a material will not suit your usage, we say so — even when the alternative earns us less. A client who trusts our advice is worth more than a single upgraded line item.',
  },
  {
    icon: Users,
    title: 'The Client Knows Their Life Best',
    description:
      'We bring the expertise; you bring the lived reality of the space. The best projects come from that exchange, not from a designer imposing a preference.',
  },
  {
    icon: Sparkle,
    title: 'Craft Is Non-Negotiable',
    description:
      'A misaligned shutter or an uneven gap is not a small thing. Detail is what people notice long after the paint smell has gone, and it is where we refuse to compromise.',
  },
  {
    icon: Heart,
    title: 'Care After the Invoice',
    description:
      'The handover is the beginning of the relationship, not the end. We answer the phone in year two as readily as we did in week two.',
  },
];

/* -------------------------------------------------------------------------- */
/*  FOUNDER                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The founder's identity comes from `site.config.ts`, not from here.
 *
 * It used to be declared in this file as its own set of `{{TOKENS}}`, which
 * made this the third place the same person was named — alongside the home
 * page pull-quote attribution and the founder photograph's alt text. Those two
 * referenced `{{FOUNDER_NAME}}` as registry tokens, and the registry only reads
 * `site.config.ts`, so they could never resolve: filling this file in fixed the
 * About page and left the other two rendering the raw token on the live site.
 *
 * One home, in the config, quoted everywhere else. The LETTER stays here,
 * because that is copy rather than identity.
 */
export const founder = {
  name: siteConfig.business.founder.name,
  role: siteConfig.business.founder.role,
  credential: siteConfig.business.founder.credential,
  /** A short, personal letter. The drop-cap treatment makes it read as one. */
  letter: [
    'I started this studio because I was tired of watching people receive a beautiful design and then a completely different building experience. The rendering promised one thing. The site delivered another. Somewhere between the two, the client stopped being excited and started being anxious.',
    'So we built the practice around closing that gap. We keep design and execution in the same team, we name our materials in writing, we publish our schedule, and we put one person in charge of your project who you can reach directly.',
    'None of that is glamorous. But it is the reason our clients recommend us — and, far more often than we expected, come back to us for their next home.',
  ],
  signature: siteConfig.business.founder.name,
};

/* -------------------------------------------------------------------------- */
/*  MILESTONES                                                                 */
/* -------------------------------------------------------------------------- */

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: '{{MILESTONE_1_YEAR}}',
    title: 'The studio opens',
    description:
      'Founded in {{CITY}} with a two-person team and a first residential commission.',
  },
  {
    year: '{{MILESTONE_2_YEAR}}',
    title: 'Execution brought in-house',
    description:
      'Our own carpentry and site teams are established, ending the handover gap between design and build.',
  },
  {
    year: '{{MILESTONE_3_YEAR}}',
    title: 'First commercial commissions',
    description:
      'The practice expands into retail, hospitality and workplace interiors alongside residential work.',
  },
  {
    year: '{{MILESTONE_4_YEAR}}',
    title: 'The design studio opens',
    description:
      'A dedicated experience centre in {{CITY}} where clients can see and handle every material we specify.',
  },
  {
    year: '{{MILESTONE_5_YEAR}}',
    title: '{{MILESTONE_5_TITLE}}',
    description: '{{MILESTONE_5_DESCRIPTION}}',
  },
];

/* -------------------------------------------------------------------------- */
/*  WHY CLIENTS CHOOSE US (About page — reasons, not features)                 */
/* -------------------------------------------------------------------------- */

export const clientReasons: string[] = [
  'One team owns design and execution, so nothing is lost in handover',
  'Itemised quotations that name every brand and material',
  'Photorealistic 3D approval before a single panel is cut',
  'A dedicated project manager you can reach directly',
  'Weekly progress updates with site photographs',
  'Stage-wise quality checks signed off before the next trade begins',
  'Written warranty on workmanship and manufactured components',
  'Snagging, deep cleaning and styling included as standard',
];
