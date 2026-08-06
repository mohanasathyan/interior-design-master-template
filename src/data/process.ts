import {
  ClipboardList,
  Handshake,
  HardHat,
  KeyRound,
  MessageSquareQuote,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';

/**
 * ============================================================================
 * HOW WE WORK — SIX-STEP PROCESS
 * ============================================================================
 * A published process is a conversion tool. Interior design is a high-trust,
 * high-ticket purchase where the buyer's core anxiety is "what actually
 * happens after I pay?". Answering that in six concrete, dated steps removes
 * more friction than any amount of adjectives.
 *
 * Each step therefore names: what happens, what the client receives, and how
 * long it takes.
 * ============================================================================
 */

export interface ProcessStep {
  /** Two-digit numeral rendered as the editorial marker. */
  number: string;
  title: string;
  /** What actually happens in this stage. */
  description: string;
  /** The tangible artefact the client walks away with. */
  deliverable: string;
  /** Typical stage duration. Placeholder token by default. */
  duration: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation & Discovery',
    description:
      'We meet at your space or our studio to understand how you live, what is not working today, and what you want the finished home to feel like. We measure the site and photograph existing conditions.',
    deliverable: 'A written design brief and a measured site survey',
    duration: '{{STAGE_1_DURATION}}',
    icon: MessageSquareQuote,
  },
  {
    number: '02',
    title: 'Concept & Space Planning',
    description:
      'We test two or three layouts against your routines, daylight and storage inventory, and set the material direction. This is where the expensive decisions are made — on paper, where they are cheap to change.',
    deliverable: 'Layout options, mood board and material direction',
    duration: '{{STAGE_2_DURATION}}',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: '3D Design & Approval',
    description:
      'Every room is modelled in photorealistic 3D so you can walk through the design before anything is built. We revise until you are genuinely happy, then freeze the drawings.',
    deliverable: 'Room-by-room 3D visuals and approved working drawings',
    duration: '{{STAGE_3_DURATION}}',
    icon: PanelsTopLeft,
  },
  {
    number: '04',
    title: 'Detailed Quote & Agreement',
    description:
      'You receive an itemised quotation naming every material, brand, finish and hardware component, alongside a dated stage-wise schedule. Scope, cost and timeline are agreed in writing before work starts.',
    deliverable: 'Itemised quotation, project schedule and signed agreement',
    duration: '{{STAGE_4_DURATION}}',
    icon: Handshake,
  },
  {
    number: '05',
    title: 'Execution & Site Management',
    description:
      'Our project manager coordinates civil, electrical, plumbing, carpentry and finishing work with quality checks at each stage. You receive weekly progress updates with photographs.',
    deliverable: 'Weekly progress reports and stage-wise quality sign-offs',
    duration: '{{STAGE_5_DURATION}}',
    icon: HardHat,
  },
  {
    number: '06',
    title: 'Styling, Snagging & Handover',
    description:
      'We resolve every snag, deep clean the space, style it with the final layer of soft furnishings and accessories, and walk you through the completed home before handing over the keys.',
    deliverable: 'Snag-free handover, warranty documents and care guide',
    duration: '{{STAGE_6_DURATION}}',
    icon: KeyRound,
  },
];
