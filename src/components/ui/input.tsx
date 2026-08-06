import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * INPUT
 * ============================================================================
 * Underline-only fields. Boxed inputs read as "form"; a single hairline that
 * thickens and turns gold on focus reads as "stationery" — which is the
 * feeling we want when someone is about to hand over their phone number.
 *
 * The 48px minimum height also satisfies the WCAG 2.5.5 target-size guidance.
 * ============================================================================
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders the field in its error state and wires up `aria-invalid`. */
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', invalid, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        'peer h-12 w-full bg-transparent px-0 py-3 text-ink',
        'border-0 border-b border-ink/50',
        'placeholder:text-ink-muted/75',
        'transition-[border-color,box-shadow] duration-400 ease-luxe',
        'hover:border-ink/75',
        'focus:border-accent-strong focus:outline-none focus:shadow-[0_1px_0_0_var(--color-accent-strong)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-red-700 focus:border-red-700 focus:shadow-[0_1px_0_0_#b91c1c]',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
