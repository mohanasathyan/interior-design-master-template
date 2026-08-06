import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * DIALOG
 * ============================================================================
 * Built on Radix so the hard parts are correct without re-implementing them:
 * focus trap, focus restore on close, Escape handling, `aria-modal`, inert
 * background and scroll locking.
 *
 * The visual treatment stays editorial — a warm scrim rather than a black one,
 * a square-cornered panel, and a close control that is a hairline circle
 * instead of a heavy button.
 * ============================================================================
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-100 bg-contrast/72 backdrop-blur-sm',
      'data-[state=open]:animate-[dialog-fade-in_260ms_var(--ease-luxe)]',
      'data-[state=closed]:animate-[dialog-fade-out_180ms_var(--ease-luxe)]',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { closeLabel?: string }
>(({ className, children, closeLabel = 'Close', ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-100 w-[calc(100vw-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2',
        'max-h-[90svh] overflow-y-auto overscroll-contain',
        'rounded-(--radius-brand) border border-border bg-canvas',
        'shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)]',
        'focus:outline-none',
        'data-[state=open]:animate-[dialog-in_320ms_var(--ease-luxe)]',
        'data-[state=closed]:animate-[dialog-out_200ms_var(--ease-luxe)]',
        className,
      )}
      {...props}
    >
      {children}

      <DialogPrimitive.Close
        aria-label={closeLabel}
        className={cn(
          'absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full',
          'border border-white/30 bg-black/35 text-white backdrop-blur-sm',
          'transition-all duration-400 ease-luxe',
          'hover:border-white hover:bg-white hover:text-ink',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        )}
      >
        <X className="size-4.5" strokeWidth={1.6} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = 'DialogContent';

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-h2 text-ink', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-ink-muted leading-relaxed', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
