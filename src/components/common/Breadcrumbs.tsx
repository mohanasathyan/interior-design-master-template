import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/tokens';
import type { Crumb } from '@/lib/schema';

/**
 * Breadcrumb trail.
 *
 * Serves two audiences at once: it orients the visitor, and — paired with the
 * `BreadcrumbList` JSON-LD emitted by each page — it lets Google render the
 * site hierarchy in the search result instead of a raw URL.
 *
 * The final crumb is not a link and carries `aria-current="page"`.
 */
export function Breadcrumbs({
  items,
  tone = 'default',
  className,
}: {
  items: Crumb[];
  tone?: 'default' | 'light';
  className?: string;
}) {
  const light = tone === 'light';

  return (
    <nav aria-label="Breadcrumb" className={cn('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] tracking-[0.14em] uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(light ? 'text-white/85' : 'text-ink')}
                >
                  {t(item.name)}
                </span>
              ) : (
                <>
                  <Link
                    to={item.path}
                    className={cn(
                      'link-underline transition-colors duration-300',
                      light ? 'text-white/60 hover:text-white' : 'text-ink-muted hover:text-accent-strong',
                    )}
                  >
                    {t(item.name)}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className={cn('size-3', light ? 'text-white/35' : 'text-ink-muted/45')}
                    strokeWidth={1.5}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
