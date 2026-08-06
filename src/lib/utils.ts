import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * ============================================================================
 * TAILWIND-MERGE, TAUGHT THIS PROJECT'S THEME
 * ============================================================================
 * tailwind-merge resolves conflicts by grouping utilities, and it only knows
 * the names in Tailwind's OWN scale. This project defines its type scale in a
 * CSS-first `@theme` block — `--text-display`, `--text-h1`, `--text-lead` — so
 * `text-display` is a name the library has never heard of. Faced with an
 * unknown `text-*`, it assumes COLOUR.
 *
 * The consequence is silent and severe. In a single `cn()` call:
 *
 *   cn('font-display text-display text-ink')  →  'font-display text-ink'
 *
 * The font size is dropped, because a later "colour" was assumed to replace an
 * earlier one, and the heading renders at body size. No warning, no error, and
 * nothing in the markup to suggest the class was ever there. It affected every
 * SectionHeading and every lead paragraph on the site.
 *
 * Registering both scales fixes it everywhere at once, which is the only sane
 * place to fix it — the alternative is remembering, at every call site forever,
 * never to put a theme colour and a theme font size in the same `cn()`.
 *
 * The same trap bites `--shadow-*`, in the opposite direction. `shadow-gold`
 * looks like `shadow-<colour>` to the library, so it is filed under
 * `shadow-color` and does NOT replace a box-shadow. The primitive's own
 * `hover:shadow-[…]` then survives beside `hover:shadow-gold-lift`, both set
 * `--tw-shadow`, and which one wins comes down to the order Tailwind happens
 * to emit them in — a coin toss, silently.
 *
 * ⚠️ ADD TO THESE LISTS whenever you add a `--text-*`, `--color-*` or
 * `--shadow-*` token to `index.css`, or the new token will be dropped — or
 * fail to drop something else — in exactly the same silent way.
 * ============================================================================
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead'] }],
      shadow: [{ shadow: ['lift', 'float', 'gold', 'gold-lift'] }],
      'text-color': [
        {
          text: [
            'canvas',
            'surface',
            'surface-muted',
            'ink',
            'ink-muted',
            'accent',
            'accent-strong',
            'accent-button',
            'accent-hover',
            'accent-contrast',
            'border',
            'contrast',
            'contrast-ink',
          ],
        },
      ],
    },
  },
});

/**
 * Merge Tailwind classes safely.
 * `cn('p-2', condition && 'p-4')` → later utilities win, conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a minimum and a maximum. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Pad a number to two digits — used by the process/step numbering. */
export function pad2(value: number) {
  return value.toString().padStart(2, '0');
}

/**
 * Convert `HH:MM` (24h) into a human 12-hour label, e.g. "10:00" → "10:00 AM".
 * Returns the input untouched if it is not a well-formed time.
 */
export function formatTime(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return time;
  const hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${minutes} ${suffix}`;
}

/** Create a URL-safe slug from a label. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\{\{|\}\}/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
