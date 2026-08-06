import * as React from 'react';
import { cn } from '@/lib/utils';

/** Multi-line field. Shares the underline treatment used by `<Input />`. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full resize-none bg-transparent px-0 py-3 text-ink',
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
Textarea.displayName = 'Textarea';

export { Textarea };
