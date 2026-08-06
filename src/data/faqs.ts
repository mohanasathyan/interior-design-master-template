/**
 * ============================================================================
 * FREQUENTLY ASKED QUESTIONS
 * ============================================================================
 * These do three jobs at once:
 *
 *  1. Remove the objections that stop someone picking up the phone.
 *  2. Pre-qualify enquiries, so the studio's time goes to serious prospects.
 *  3. Feed `FAQPage` structured data, which can win an expandable rich result
 *     and a chunk of extra SERP real estate.
 *
 * Answers are written to be genuinely useful rather than evasive — "it
 * depends" is the fastest way to lose a lead. Where a real number is required,
 * a `{{TOKEN}}` is used so each client fills in their own.
 * ============================================================================
 */

export interface Faq {
  question: string;
  answer: string;
  /** Grouping for the About/Contact page filters. */
  category: 'Pricing' | 'Process' | 'Timeline' | 'Services' | 'Support';
}

export const faqs: Faq[] = [
  {
    question: 'How much does interior design cost?',
    answer:
      'Cost depends on the size of the space, the scope of work and the material specification you choose. As a guide, our projects typically begin from {{PRICE_STARTING}} for a single room and {{PRICE_FULL_HOME}} for a full home. After the first consultation we issue an itemised quotation covering every material, finish and labour line, so you can see exactly where the budget goes before committing to anything.',
    category: 'Pricing',
  },
  {
    question: 'How long does an interior project take?',
    answer:
      'A single room usually takes {{TIMELINE_ROOM}}, and a full home {{TIMELINE_HOME}}, measured from design approval to handover. The design and approval stage runs {{TIMELINE_DESIGN}} before that. We issue a dated, stage-wise schedule at the start of every project and send weekly progress updates, so you always know where things stand.',
    category: 'Timeline',
  },
  {
    question: 'Do you provide 3D designs before work begins?',
    answer:
      'Yes. Every room is modelled in photorealistic 3D so you can walk through the design before anything is fabricated or installed. We revise the visuals until you are genuinely happy, and only then do we freeze the drawings and begin execution. You are never asked to approve work from a mood board alone.',
    category: 'Process',
  },
  {
    question: 'Can you renovate an existing home while we are living in it?',
    answer:
      'Yes, and a large part of our work is exactly that. We phase the project room by room, seal off active work areas to contain dust, schedule the noisiest activities within agreed hours, and clean at the end of each phase. It takes longer than an empty-property build, and we build that into the schedule from the outset rather than discovering it midway.',
    category: 'Services',
  },
  {
    question: 'Do you handle turnkey projects?',
    answer:
      'Yes. Turnkey is our standard way of working. We take responsibility for design, civil work, electrical, plumbing, false ceiling, carpentry, painting, furniture and final styling under one agreement, with a single project manager as your point of contact. You are not left coordinating between six different vendors.',
    category: 'Services',
  },
  {
    question: 'What is included in your quotation, and what is not?',
    answer:
      'Our quotation itemises every material, brand, hardware component, finish and labour line for the agreed scope. It excludes only items we cannot control — statutory approvals, society or building charges, and anything you choose to buy directly. Excluded items are listed explicitly in the quote, so nothing is hidden in a footnote.',
    category: 'Pricing',
  },
  {
    question: 'Do you work with a fixed budget?',
    answer:
      'Yes, and we prefer it. Tell us your ceiling at the first meeting and we will design to it, showing you where the money is best spent and where a lower-cost specification will not be noticed. It is far more productive than presenting a design you love and then discovering it is thirty per cent over budget.',
    category: 'Pricing',
  },
  {
    question: 'What warranty do you provide?',
    answer:
      'We provide a written warranty of {{WARRANTY_YEARS}} on our workmanship and on manufactured components such as modular units and wardrobes. Appliances and branded fittings carry their own manufacturer warranties, which we hand over documented at the end of the project. Our support line stays open after handover.',
    category: 'Support',
  },
  {
    question: 'Do you take on small projects, or only full homes?',
    answer:
      'We take on single rooms, individual kitchens and standalone wardrobe projects alongside full homes and commercial fit-outs. A well-designed single room is often the right way to start, and many of our full-home clients began with exactly that.',
    category: 'Services',
  },
  {
    question: 'How do I start, and does the first consultation cost anything?',
    answer:
      'The first consultation is free and carries no obligation. Call {{PHONE}}, message us on WhatsApp or send the enquiry form on this site, and we will arrange a conversation at your space or at our {{CITY}} studio. We will discuss what you want to achieve, walk through your options and follow up with an indicative budget — all before you commit to anything.',
    category: 'Process',
  },
];

/** The home page shows a focused subset; the rest live on About/Contact. */
export const homeFaqs = faqs;

/** Distinct categories for filtering. */
export const faqCategories = Array.from(new Set(faqs.map((faq) => faq.category)));
