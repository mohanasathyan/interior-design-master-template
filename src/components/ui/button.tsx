import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * BUTTON
 * ============================================================================
 * The single button primitive for the entire site.
 *
 * Design notes:
 *  • Corners stay at 2px. Rounded pills read "app"; sharp edges read "atelier".
 *  • Letter-spacing is generous and the label is uppercase at small sizes —
 *    the typographic signature of luxury retail.
 *  • Every solid variant carries a light sweep on hover (`.sheen`), which is
 *    the most restrained premium hover effect available: no scale, no bounce.
 *  • `asChild` lets the same styling wrap a react-router <Link> or an <a>
 *    without nesting interactive elements.
 * ============================================================================
 */
const buttonVariants = cva(
  [
    'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden',
    /*
     * `whitespace-nowrap` from `sm` up only.
     *
     * A nowrap button's MIN-CONTENT width is its entire label — the browser is
     * told the text may never break, so the shortest the box can ever be is the
     * full string. Inside a flex or grid track (`min-width: auto`) that becomes
     * the track's minimum too, so one long label pushes its whole column wider
     * than a 320px screen and clips the heading and body copy beside it. It is
     * worst while the template is unfilled, because a label like
     * "Call us: {{PHONE}}" is longer than the real phone number it stands in for.
     *
     * Below `sm` the label is allowed to wrap to a second line instead. Nothing
     * changes at any width where the button already fits, which is every
     * tablet and desktop breakpoint.
     */
    'font-body font-medium whitespace-normal sm:whitespace-nowrap select-none',
    'rounded-(--radius-brand)',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-400 ease-luxe',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent',
    'disabled:pointer-events-none disabled:opacity-50',
    /*
     * A one-pixel lift on hover and a one-pixel press on click. At this scale
     * it is felt rather than seen, which is the whole point — a button that
     * visibly jumps reads as a toy, one that does not move at all reads as an
     * image. `active` is declared after `hover` so the press always wins.
     */
    'hover:-translate-y-px active:translate-y-px',
  ].join(' '),
  {
    variants: {
      variant: {
        /**
         * The money button. Solid gold with a white label, per the approved
         * design — note the fill is `accent-button` (a deeper gold) rather
         * than the brand `accent`, so white clears WCAG AA on both the resting
         * and hover states. See `theme.colors` in site.config.ts.
         */
        primary:
          'bg-accent-button text-accent-contrast shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:bg-accent-hover hover:shadow-[0_12px_32px_-14px_color-mix(in_srgb,var(--color-accent-button)_70%,transparent)]',
        /** Gold-outlined companion to `primary` on light backgrounds. */
        outline:
          'border border-accent/45 text-accent-strong bg-transparent hover:border-accent-button hover:bg-accent-button hover:text-accent-contrast',
        /** Neutral outline, where gold would compete with a nearby primary. */
        outlineInk:
          'border border-ink/25 text-ink bg-transparent hover:border-ink hover:bg-ink hover:text-canvas',
        /** Gold outline over dark photography — the transparent navbar CTA. */
        outlineGold:
          'border border-accent/70 text-white bg-transparent backdrop-blur-sm hover:bg-accent-button hover:border-accent-button hover:text-accent-contrast',
        /** For use on dark photography and the contrast band. */
        light:
          'border border-white/35 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-ink hover:border-white',
        /** Solid light button on dark backgrounds. */
        inverse: 'bg-canvas text-ink hover:bg-white',
        /** Minimal, for tertiary actions inside cards. */
        ghost: 'text-ink hover:text-accent-strong bg-transparent',
        /** Reads as a text link but keeps the button hit-area. */
        link: 'text-accent-strong underline-offset-4 hover:text-ink px-0',
      },
      size: {
        sm: 'h-10 px-5 text-[0.72rem] tracking-[0.16em] uppercase',
        md: 'h-12 px-7 text-[0.76rem] tracking-[0.18em] uppercase',
        lg: 'h-14 px-9 text-[0.8rem] tracking-[0.18em] uppercase',
        xl: 'h-16 px-11 text-[0.84rem] tracking-[0.2em] uppercase',
        icon: 'size-11',
      },
      /** Stretches the button to fill its container — used on mobile. */
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (e.g. a router <Link>) instead of a <button>. */
  asChild?: boolean;
  /** Disables the hover sheen — useful for `ghost` / `link` variants. */
  noSheen?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, noSheen, children, ...props }, ref) => {
    const showSheen = !noSheen && variant !== 'ghost' && variant !== 'link';
    const classes = cn(buttonVariants({ variant, size, block }), className);

    /*
     * The sheen: a skewed highlight that sweeps left→right on hover.
     * It is absolutely positioned, so it sits outside the flex flow and never
     * affects the label's alignment, and `pointer-events-none` keeps it out of
     * the way of clicks entirely.
     */
    const sheen = showSheen ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-luxe group-hover/btn:translate-x-full"
      />
    ) : null;

    /*
     * `asChild` renders the caller's own element (a router <Link>, an
     * <a href="tel:…">) carrying the button's styling, rather than nesting one
     * interactive element inside another.
     *
     * Radix `Slot` accepts exactly ONE child, so the sheen cannot simply sit
     * beside `children` here — that throws "Slot failed to slot onto its
     * children" and takes down every link-styled button on the site.
     * `Slottable` marks which child is the element to merge props into; Radix
     * then renders the remaining children (the sheen) inside it.
     */
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {sheen}
          <Slottable>{children}</Slottable>
        </Slot>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {sheen}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
