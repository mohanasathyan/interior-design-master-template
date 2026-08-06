/**
 * ============================================================================
 * TESTIMONIALS
 * ============================================================================
 * Social proof. Two rules were followed when writing these placeholders, and
 * they should be kept when swapping in the client's real reviews:
 *
 *  1. A specific testimonial beats a glowing one. "They finished four days
 *     early" persuades; "amazing work, highly recommended" does not.
 *  2. Each quote should answer a different objection — cost, timeline, quality
 *     and communication — so the set works as a group rather than repeating
 *     the same reassurance four times.
 *
 * Replace the `{{TOKENS}}` with real names and locations. Real, attributable
 * reviews are far more persuasive than anonymous ones.
 * ============================================================================
 */

export interface Testimonial {
  quote: string;
  /** Client name. Use a real one wherever permission allows. */
  name: string;
  /** Project or property descriptor. */
  role: string;
  location: string;
  /** Star rating out of five. */
  rating: number;
  /** The objection this quote neutralises — editorial note, not rendered. */
  addresses: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'What convinced us was the quotation. Every material and brand was listed with a price against it, so we knew precisely what we were paying for. The final invoice matched the original figure exactly.',
    name: '{{TESTIMONIAL_1_NAME}}',
    role: '{{TESTIMONIAL_1_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Cost transparency',
  },
  {
    quote:
      'They handed over four days ahead of schedule, which I genuinely did not expect. The weekly photo updates meant I never had to visit the site to find out what was happening.',
    name: '{{TESTIMONIAL_2_NAME}}',
    role: '{{TESTIMONIAL_2_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Timeline reliability',
  },
  {
    quote:
      'The kitchen is the part we use most and it has held up perfectly. Two years in, the shutters still close softly and there is not a mark on the countertop. The quality is exactly what they promised.',
    name: '{{TESTIMONIAL_3_NAME}}',
    role: '{{TESTIMONIAL_3_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Build quality over time',
  },
  {
    quote:
      'One person handled everything. I never once had to coordinate between a carpenter, an electrician and a painter — which, having renovated before, is worth a great deal on its own.',
    name: '{{TESTIMONIAL_4_NAME}}',
    role: '{{TESTIMONIAL_4_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Project management',
  },
  {
    quote:
      'They listened properly. We mentioned that we cook every day and they redesigned the whole kitchen layout around it. The finished space fits how we actually live, not how a catalogue thinks we should.',
    name: '{{TESTIMONIAL_5_NAME}}',
    role: '{{TESTIMONIAL_5_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Personalisation',
  },
  {
    quote:
      'The 3D visuals were accurate to the point of being uncanny. What we walked into on handover day was what we had approved on screen three months earlier.',
    name: '{{TESTIMONIAL_6_NAME}}',
    role: '{{TESTIMONIAL_6_PROJECT}}',
    location: '{{CITY}}',
    rating: 5,
    addresses: 'Design accuracy',
  },
];
