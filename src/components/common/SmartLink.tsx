import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ResolvedLink } from '@/lib/links';

/**
 * ============================================================================
 * SMART LINK
 * ============================================================================
 * Routes correctly no matter what it is given:
 *
 *  • `/services`            → client-side <Link>, no page reload
 *  • `https://…`, `wa.me/…` → <a> with `rel="noopener noreferrer"`
 *  • `tel:` / `mailto:`     → plain <a>, no rel attributes needed
 *  • an unconfigured link   → falls back to /contact, so a placeholder never
 *                             becomes a dead end for a would-be customer
 *
 * Using this everywhere removes an entire class of bug from the clone process.
 * ============================================================================
 */
export interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** A path, an absolute URL, or a `ResolvedLink` from `@/lib/links`. */
  to: string | ResolvedLink;
  children: ReactNode;
}

export function SmartLink({ to, children, ...props }: SmartLinkProps) {
  const href = typeof to === 'string' ? to : to.href;
  const isProtocol = /^(https?:|tel:|mailto:|wa\.me)/i.test(href);
  const external = typeof to === 'string' ? /^https?:/i.test(href) : to.external;

  /* Internal route → keep navigation client-side so the SPA never reloads. */
  if (!isProtocol && href.startsWith('/')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
