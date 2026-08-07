/**
 * ============================================================================
 * LEGAL DOCUMENTS — PRIVACY POLICY & TERMS OF SERVICE
 * ============================================================================
 * Structured placeholder copy for the two documents every lead-capturing site
 * needs and most small-business templates skip.
 *
 * ---------------------------------------------------------------------------
 * ⚠️  THIS IS SCAFFOLDING, NOT LEGAL ADVICE
 * ---------------------------------------------------------------------------
 * The sections below are the ones a design studio's policies normally have to
 * cover, written in plain language and wired to the config so the business
 * name, contact details and jurisdiction fill themselves in. They are a
 * STARTING POINT. Every jurisdiction differs — India's DPDP Act, the UK/EU
 * GDPR, CCPA and others each impose their own obligations — so have a
 * qualified adviser review the finished text before launch.
 *
 * While `lastUpdated` is still a placeholder, both pages display a visible
 * "not yet reviewed" notice. Filling in the date is the switch that removes it,
 * which makes publishing unreviewed policies a deliberate act rather than an
 * oversight.
 *
 * ---------------------------------------------------------------------------
 * EDITING
 * ---------------------------------------------------------------------------
 * Change the copy here, never in the page components. `{{TOKENS}}` are resolved
 * from `site.config.ts` at render time — see `src/lib/tokens.ts`. Only
 * REGISTERED tokens may be used inside a sentence; `npm run build` fails and
 * names the line if you use one that has no home in the config.
 * ============================================================================
 */

export interface LegalSection {
  heading: string;
  /** Body paragraphs, rendered in order. May contain `{{TOKENS}}`. */
  paragraphs: string[];
  /** Optional bulleted list rendered after the paragraphs. */
  bullets?: string[];
}

export interface LegalDocumentContent {
  eyebrow: string;
  title: string;
  lead: string;
  sections: LegalSection[];
}

/**
 * Shared metadata.
 *
 * A whole-string placeholder, so it is filled by replacing this value — no
 * registry entry needed. It is rendered on its own rather than inside a
 * sentence, which is what keeps it a simple fillable field.
 */
export const legalMeta = {
  /** e.g. "12 March 2026". Filling this in also hides the review notice. */
  lastUpdated: '{{LEGAL_LAST_UPDATED}}',
};

/* -------------------------------------------------------------------------- */
/*  PRIVACY POLICY                                                             */
/* -------------------------------------------------------------------------- */

export const privacyPolicy: LegalDocumentContent = {
  eyebrow: 'Privacy',
  title: 'Privacy Policy',
  lead: 'How {{BUSINESS_NAME}} collects, uses and protects the information you share with us — written to be read, not to be skipped.',
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'This site is operated by {{LEGAL_NAME}}, an interior design studio based in {{CITY}}. Where this policy says "we" or "us", it means that business.',
        'If you have any question about this policy or about the information we hold on you, write to {{EMAIL}} or call {{PHONE}} and ask for whoever looks after data requests.',
      ],
    },
    {
      heading: 'What we collect',
      paragraphs: [
        'We only ask for what we need in order to reply usefully to an enquiry and, if you go ahead, to run your project.',
      ],
      bullets: [
        'Details you give us directly — your name, phone number, email address, budget range, preferred consultation date and anything you write in the enquiry message.',
        'Project information you choose to share, such as floor plans, photographs of your space, room dimensions and site addresses.',
        'Basic technical information your browser sends automatically, such as device type, approximate location and the pages you viewed.',
      ],
    },
    {
      heading: 'How we use it',
      paragraphs: [
        'Your enquiry is used to respond to you, prepare a quotation, and — if you appoint us — to design, schedule and deliver the work. We also keep records where we are legally required to, for example for tax and warranty purposes.',
        'We do not sell your details, we do not rent them, and we do not pass them to third-party marketers. We will not add you to a mailing list because you asked for a quotation.',
      ],
    },
    {
      heading: 'Who we share it with',
      paragraphs: [
        'Only where it is necessary to do the work or to run the business, and only ever the minimum required:',
      ],
      bullets: [
        'Suppliers, fabricators and contractors engaged on your specific project.',
        'Service providers who operate this website, our email and our form handling on our behalf.',
        'Professional advisers, and any authority we are legally obliged to disclose to.',
      ],
    },
    {
      heading: 'Cookies and measurement',
      paragraphs: [
        'This site sets only what it needs to function. If analytics or advertising tools are added later, this section will name them and explain how to opt out. Most browsers also let you block or delete cookies from their settings.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'Enquiries that do not lead to a project are kept only as long as they are useful to us, then deleted. Project records are kept for as long as the work is under warranty and for any period the law requires after that.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You can ask us what we hold about you, ask us to correct it, ask us to delete it, or object to a particular use. Write to {{EMAIL}} and we will respond within the period our local law allows. There is no charge for a reasonable request.',
        'If you believe we have handled your information badly, you are entitled to complain to the data protection authority in {{COUNTRY}}.',
      ],
    },
    {
      heading: 'Keeping it safe',
      paragraphs: [
        'We restrict access to the people who need it, use reputable providers for the systems that store it, and review that arrangement periodically. No system is completely secure, so if something does go wrong that puts your information at risk, we will tell you and the relevant authority as required.',
      ],
    },
    {
      heading: "Children's information",
      paragraphs: [
        'This site is intended for adults arranging work on a property. We do not knowingly collect information from children. If you believe a child has sent us information, contact {{EMAIL}} and we will remove it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'If this policy changes, the revised version appears on this page with a new date at the top. Material changes will be highlighted rather than made quietly.',
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  TERMS OF SERVICE                                                           */
/* -------------------------------------------------------------------------- */

export const termsOfService: LegalDocumentContent = {
  eyebrow: 'Terms',
  title: 'Terms of Service',
  lead: 'The terms on which {{BUSINESS_NAME}} provides this website and its design services. Plain language, and no clause that would surprise you later.',
  sections: [
    {
      heading: 'About these terms',
      paragraphs: [
        'These terms cover your use of this website and set out the general basis on which {{LEGAL_NAME}} provides design and execution services. Your individual project is governed by the signed proposal, quotation and contract for that project — where anything here differs from those documents, those documents take precedence.',
      ],
    },
    {
      heading: 'Using this website',
      paragraphs: [
        'You are welcome to browse, share and print pages from this site for your own use. You may not copy the site wholesale, present our work as your own, or use it in a way that damages the site or interferes with anyone else using it.',
      ],
    },
    {
      heading: 'Enquiries, quotations and pricing',
      paragraphs: [
        'Prices and timelines shown on this site are indicative ranges to help you judge fit, not offers. A binding price comes only from a written, itemised quotation prepared for your specific space.',
        'A quotation is valid for the period stated on it. Beyond that, material costs and availability may have moved and we may need to re-issue it.',
      ],
    },
    {
      heading: 'Consultations',
      paragraphs: [
        'The first consultation is free and carries no obligation on either side. Booking one does not commit you to a project and does not commit us to accepting it.',
      ],
    },
    {
      heading: 'Scope, changes and timelines',
      paragraphs: [
        'The scope of work is whatever the signed quotation lists. Changes requested after that point are welcome, but they are quoted separately and may move the schedule.',
        'Published timelines assume timely approvals, site access and payment at the agreed stages, and no circumstances outside our reasonable control. Where a delay arises from something outside that, we will tell you promptly and agree a revised date.',
      ],
    },
    {
      heading: 'Warranty',
      paragraphs: [
        'We provide a written warranty of {{WARRANTY_YEARS}} on our workmanship and on the components we manufacture, on the terms set out in your project contract.',
        'The warranty does not cover normal wear, accidental damage, alterations made by others, or failures in items supplied directly by you. Manufactured goods supplied by third parties carry their own manufacturer warranty, which we will pass on to you.',
      ],
    },
    {
      heading: 'Design ownership and photography',
      paragraphs: [
        'Drawings, visualisations and specifications we produce remain our intellectual property until the project is paid in full, at which point you receive the right to use them for the property they were made for.',
        'We like to photograph completed work for our portfolio. We will always ask first, we will never publish your address or personal details, and you are free to say no without it affecting anything.',
      ],
    },
    {
      heading: 'Payment',
      paragraphs: [
        'Payments fall due at the stages set out in your quotation. Work on a stage begins once the payment for it has cleared. Any charge for late payment will be stated in the contract rather than applied unannounced.',
      ],
    },
    {
      heading: 'Cancellation',
      paragraphs: [
        'You may cancel at any time. What is payable at that point is the work already completed plus any materials already ordered or made to your specification. We will always set that out clearly rather than withhold a figure.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'We accept responsibility for loss caused by our own negligence or breach of contract. We are not responsible for indirect or consequential loss, and our total liability is limited to the value of the contract in question, except where the law does not allow such a limit.',
        'Nothing in these terms limits any liability that cannot lawfully be limited.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of {{STATE}}, {{COUNTRY}}, and the courts there have jurisdiction over any dispute. We would far rather resolve anything by talking to you first — call {{PHONE}} or write to {{EMAIL}}.',
      ],
    },
  ],
};
