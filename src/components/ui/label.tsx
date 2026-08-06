import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';

/**
 * Field label. Small, uppercase and letter-spaced so it reads as a caption
 * rather than competing with the value the visitor types.
 * Required fields get a gold asterisk that is hidden from screen readers —
 * the `required` attribute on the input already announces it.
 */
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink-muted',
      'transition-colors duration-300',
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden="true" className="ml-1 text-accent-strong">
        *
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = 'Label';

export { Label };
