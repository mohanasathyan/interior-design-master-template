import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * SELECT
 * ============================================================================
 * Radix Select rather than a native <select> so the dropdown can carry the
 * brand's typography and spacing on every platform — a native select on
 * Windows would break the composition badly on the contact page.
 *
 * Radix keeps full keyboard support, type-ahead and correct ARIA roles.
 * A hidden native input is rendered by Radix for form submission when `name`
 * is supplied, so this still posts correctly to any form endpoint.
 * ============================================================================
 */

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { invalid?: boolean }
>(({ className, children, invalid, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      'group flex h-12 w-full items-center justify-between gap-3 bg-transparent px-0 py-3 text-left',
      'border-0 border-b border-ink/50 text-ink',
      'transition-[border-color,box-shadow] duration-400 ease-luxe',
      'hover:border-ink/75',
      'focus:border-accent-strong focus:outline-none focus:shadow-[0_1px_0_0_var(--color-accent-strong)]',
      'data-[placeholder]:text-ink-muted/75',
      'disabled:cursor-not-allowed disabled:opacity-50',
      invalid && 'border-red-700',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        className="size-4 shrink-0 text-ink-muted transition-transform duration-400 ease-luxe group-data-[state=open]:rotate-180"
        strokeWidth={1.5}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={6}
      className={cn(
        'relative z-100 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden',
        'rounded-(--radius-brand) border border-border bg-surface',
        'shadow-float',
        'animate-[select-in_180ms_var(--ease-luxe)]',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1.5">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-(--radius-brand)',
      'py-2.5 pl-3 pr-9 text-sm text-ink outline-none',
      'transition-colors duration-200',
      'data-[highlighted]:bg-surface-muted data-[highlighted]:text-accent-strong',
      'data-[state=checked]:text-accent-strong',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-3 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-3.5 text-accent-strong" strokeWidth={2} />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem };
