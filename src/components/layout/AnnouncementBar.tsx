import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';
import { t } from '@/lib/tokens';
import { Container } from '@/components/common/Section';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * ANNOUNCEMENT BAR
 * ============================================================================
 * A slim strip above the navigation for a seasonal offer or an availability
 * notice — a genuine urgency lever for a service business.
 *
 * It collapses to zero height once the visitor scrolls, so it never competes
 * with the navigation, and it can be dismissed permanently for the session.
 * Both behaviours matter: an announcement bar that follows you down the page
 * reads as advertising, not as an invitation.
 *
 * Toggle it entirely with `features.announcementBar` in `site.config.ts`.
 * ============================================================================
 */
export function AnnouncementBar({ collapsed }: { collapsed: boolean }) {
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.features.announcementBar) return null;

  const message = t(siteConfig.features.announcementText);

  return (
    <AnimatePresence initial={false}>
      {!collapsed && !dismissed && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-contrast text-contrast-ink"
        >
          <Container>
            <div className="relative flex items-center justify-center gap-4 py-2.5">
              <Link
                to={routes.contact}
                className="group inline-flex items-center gap-2.5 text-center text-[0.7rem] font-medium tracking-[0.1em] text-contrast-ink/85 transition-colors duration-300 hover:text-accent sm:text-[0.74rem]"
              >
                <span aria-hidden="true" className="hidden size-1.5 rounded-full bg-accent sm:block" />
                <span>{message}</span>
                <ArrowRight
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss announcement"
                className="absolute right-4 grid size-7 place-items-center text-contrast-ink/60 transition-colors duration-300 hover:text-contrast-ink sm:right-8"
              >
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
}
