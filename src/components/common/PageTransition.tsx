import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { DURATION, EASE } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/hooks';

/**
 * ============================================================================
 * PAGE TRANSITION
 * ============================================================================
 * Fades each route in as it mounts, so navigation reads as a considered change
 * of view rather than an instant swap.
 *
 * Three decisions worth recording, because each of them looks like an omission:
 *
 * 1. ENTER ONLY, NO EXIT.
 *    An exit animation requires keeping the outgoing page mounted while the
 *    incoming one renders, which means both are in the document at once. With
 *    route-level `React.lazy`, that reliably produces a scroll jump: the old
 *    page still owns the document height while the new one is still a
 *    suspended fallback. Fading the new page in alone has none of that and is
 *    indistinguishable at these durations.
 *
 * 2. OPACITY ONLY, NO TRANSLATE.
 *    A `transform` on this wrapper would make it the containing block for any
 *    `position: fixed` descendant, and would sit above three `lg:sticky`
 *    columns (contact form, design philosophy, FAQ). The per-section `Reveal`
 *    components already supply all the vertical movement; adding more here
 *    would only fight them.
 *
 * 3. KEYED ON `pathname`, NOT `key`.
 *    `location.key` changes on every navigation including a re-click of the
 *    current route, which would flash the page for no reason.
 * ============================================================================
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <m.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.base, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
