import {
  CalendarClock,
  Clock,
  Home,
  PencilRuler,
  Repeat,
  Users,
  UsersRound,
} from 'lucide-react';
import type { StatProps } from '@/components/common/Stat';

/**
 * ============================================================================
 * STATISTICS
 * ============================================================================
 * Proof points. These are the numbers a prospect scans before reading a single
 * paragraph, so keep them honest and keep them few.
 *
 * `value` must be a real number for the count-up animation. Anything that
 * cannot be counted (a rating like "4.9") belongs in `trustMarkers` below.
 * ============================================================================
 */

/**
 * Floating metrics overlaid on the hero. Exactly four — more crowds the image.
 *
 * All four count up from zero, so all four use `value` + `suffix`. If you swap
 * one for something that cannot be counted — a rating like "4.9", or a claim
 * like "On Time" — use `display` instead, or it will animate from 0 and look
 * broken.
 *
 * ⚠️ These are DEMO figures. Replace them with the client's real numbers before
 * launch; they are the most checkable claims on the site.
 */
export const heroStats: StatProps[] = [
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Users },
  { value: 500, suffix: '+', label: 'Happy Families', icon: UsersRound },
  { value: 250, suffix: '+', label: 'Repeat & Referral Clients', icon: Repeat },
  { value: 1500, suffix: '+', label: 'Design Concepts Created', icon: PencilRuler },
];

/** The fuller statistics band that follows the hero. */
export const studioStats: StatProps[] = [
  {
    value: 12,
    suffix: '+',
    label: 'Years of Practice',
    detail: 'Designing interiors across {{CITY}} since {{FOUNDING_YEAR}}.',
    icon: CalendarClock,
  },
  {
    value: 480,
    suffix: '+',
    label: 'Projects Delivered',
    detail: 'Homes, offices and retail spaces completed end to end.',
    icon: Home,
  },
  {
    value: 96,
    suffix: '%',
    label: 'On-Time Handover',
    detail: 'Projects delivered within the committed schedule.',
    icon: Clock,
  },
  {
    value: 40,
    suffix: '+',
    label: 'In-House Specialists',
    detail: 'Designers, project managers and craftspeople on our own payroll.',
    icon: Users,
  },
];

/** Non-numeric trust markers rendered as a quiet strip under the hero. */
export const trustMarkers: string[] = [
  '{{GOOGLE_RATING}} rated on Google',
  '{{WARRANTY_YEARS}} warranty on materials',
  'Free design consultation',
  'Transparent, itemised quotations',
  'Single point of contact',
  'Turnkey project delivery',
];
