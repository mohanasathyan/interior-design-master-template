import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { hasDarkHero, primaryNav } from '@/data/navigation';
import { telLink, whatsappLink } from '@/lib/links';
import { isFilled, t } from '@/lib/tokens';
import { useLockBodyScroll, useScrolled } from '@/hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Section';
import { AnnouncementBar } from './AnnouncementBar';
import { Logo } from './Logo';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * NAVBAR
 * ============================================================================
 * Behaviour:
 *  • Transparent and light-on-dark while sitting over a page's hero image.
 *  • On scroll it becomes an opaque, blurred bar with a hairline border and
 *    a slightly reduced height — the transition is 500ms so it reads as a
 *    considered change of state rather than a snap.
 *  • Below `lg` it collapses into a full-screen drawer with staggered links.
 *
 * Accessibility:
 *  • The drawer is a labelled `role="dialog"` with `aria-modal`.
 *  • Escape closes it, background scroll is locked, and focus moves into the
 *    panel on open and returns to the trigger on close.
 *  • `NavLink` supplies `aria-current="page"` for the active route.
 * ============================================================================
 */
export function Navbar() {
  const scrolled = useScrolled(32);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const call = telLink();
  const whatsapp = whatsappLink();

  useLockBodyScroll(open);

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /*
   * Modal keyboard behaviour: Escape dismisses, focus moves into the panel on
   * open, and Tab is trapped so it cannot wander into the inert page behind
   * the drawer (WCAG 2.1.2, "No Keyboard Trap" — the inverse requirement: a
   * modal must contain focus while it is open and release it on close).
   *
   * The toggle button lives in the header rather than in the panel, so it is
   * spliced into the front of the focus cycle — otherwise a keyboard user
   * could never reach the control that closes the thing.
   */
  useEffect(() => {
    if (!open) return;

    const getFocusable = () => {
      const inPanel = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

      return triggerRef.current ? [triggerRef.current, ...inPanel] : inPanel;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || !active)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  /*
   * The navbar is only transparent while it floats over a dark hero. Inner
   * pages open on the light canvas, so they get the solid bar immediately —
   * otherwise white nav links would sit on a cream background and vanish.
   */
  const darkHero = hasDarkHero(location.pathname);
  const solid = scrolled || open || !darkHero;

  return (
    <>
      {/* Skip link — the first thing a keyboard user reaches on every page. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-90 no-print',
          'transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-luxe',
          solid
            ? 'border-b border-border bg-canvas/92 shadow-[0_1px_30px_-16px_rgba(34,34,34,0.4)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        {/* Seasonal / availability strip. Collapses away on first scroll. */}
        <AnnouncementBar collapsed={solid} />

        {/*
          `hero` width, matching the hero band beneath it, so the logo sits on
          the same left edge as the headline and the CTA on the same right edge
          as the last statistic. In the approved design the header reads as part
          of the hero composition rather than as a separate contained strip.

          Note this applies on every page, so the header spans wider than the
          body content on inner pages. That is the normal editorial
          arrangement — a full-width header over a narrower measure — and it is
          what keeps the header consistent from page to page.
        */}
        <Container size="hero">
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-[height] duration-500 ease-luxe',
              solid ? 'h-18 lg:h-20' : 'h-22 lg:h-28',
            )}
          >
            {/*
              `shrink-0` is load-bearing between `lg` and `xl`.

              Without it the mark is a shrinkable flex item, and a flex item
              shrinks to its MIN-CONTENT — for a wordmark that is the width of
              its longest single word. A two- or three-word studio name was
              therefore compressed to a third of its width and wrapped onto
              three lines inside a bar that is only 80px tall. Measured at
              1024px: 245px of mark squeezed into 102px.
            */}
            <Logo tone={solid ? 'default' : 'light'} compact className="shrink-0" />

            {/* ---------------- Desktop navigation ---------------- */}
            <nav aria-label="Primary" className="hidden lg:block">
              {/*
                The nav is the only group here that can give width back without
                losing information, so it is where the space comes from. Four
                gaps at 24px instead of 40px frees 64px between `lg` and `xl`,
                and the full `gap-10` rhythm returns at `xl` exactly as designed.
              */}
              <ul className="flex items-center gap-6 xl:gap-10">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        cn(
                          'link-underline relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em]',
                          'transition-colors duration-300 ease-luxe',
                          solid
                            ? isActive
                              ? 'text-accent-strong'
                              : 'text-ink hover:text-accent-strong'
                            : isActive
                              ? 'text-white'
                              : 'text-white/80 hover:text-white',
                          isActive && 'link-wipe',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------------- Desktop actions ---------------- */}
            <div className="hidden shrink-0 items-center gap-5 lg:flex">
              {isFilled(siteConfig.contact.phone) && (
                <a
                  href={call.href}
                  className={cn(
                    /*
                      Held back to `2xl`, and the breakpoint is measured rather
                      than chosen.

                      The complete bar — wordmark with tagline, five links at
                      the full `gap-10` rhythm, the number and the call to
                      action — needs 1216px of row width. The `hero` container
                      gutters mean that is not available until a 1366px
                      viewport. At `xl` (1280px) the row has 1142px, so the
                      full set has ALWAYS been 74px over budget there; it never
                      looked broken only because the button and the wordmark
                      were being silently compressed to absorb it, which is the
                      defect this change removes.

                      The number is the right thing to defer. It is the widest
                      optional item at 143px, and it is the one conversion route
                      here that is duplicated on the same screen — the floating
                      call button carries it at every width, and it is the first
                      action inside the mobile drawer. The alternative was
                      compressing the studio's own name to make room for it.
                    */
                    'group hidden items-center gap-2.5 text-[0.78rem] font-medium tracking-[0.04em] 2xl:inline-flex',
                    'transition-colors duration-300',
                    solid ? 'text-ink hover:text-accent-strong' : 'text-white/85 hover:text-white',
                  )}
                >
                  <Phone
                    className="size-3.5 transition-transform duration-500 ease-luxe group-hover:rotate-12"
                    strokeWidth={1.6}
                  />
                  <span className="tabular-nums">{t(siteConfig.contact.phone)}</span>
                </a>
              )}

              {/* `md` over the hero — the reference draws a generous outlined
                  button, not the compact one used on scrolled/inner pages. */}
              {/*
                `shrink-0`, and it fixes a defect rather than tuning a spacing.

                The button primitive carries `overflow-hidden` so the hover
                sheen is clipped to its own face. Per the flexbox spec a flex
                item's `min-width: auto` resolves to its content-based minimum
                ONLY while `overflow` is `visible`; with `hidden` the automatic
                minimum becomes 0. So this button was infinitely shrinkable,
                and because its label is `whitespace-nowrap` the text did not
                reflow — it was cut off mid-word inside the button. Measured at
                1024–1280px: 8–14px of "Book Free Consultation" clipped away,
                on the primary conversion control, for every client.

                Scoped here rather than added to `buttonVariants`, because
                every other button on the site sits in a container that wants
                it to be shrinkable.
              */}
              <Button
                asChild
                size={solid ? 'sm' : 'md'}
                variant={solid ? 'primary' : 'outlineGold'}
                className="shrink-0"
              >
                <Link to={routes.contact}>
                  {siteConfig.cta.primary}
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
                    strokeWidth={1.7}
                  />
                </Link>
              </Button>
            </div>

            {/*
              ---------------- Mobile trigger ----------------
              The menu button alone. A call shortcut used to sit beside it, but
              the approved header is the business name on the left and a single
              menu glyph on the right — two icons there read as a toolbar. The
              number is still one tap away: it is the first action inside the
              drawer, and the floating action button carries it too.
            */}
            <div className="flex items-center lg:hidden">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={cn(
                  'grid size-11 place-items-center rounded-(--radius-brand) transition-colors duration-300',
                  solid
                    ? 'text-ink hover:bg-surface-muted hover:text-accent-strong'
                    : 'text-white hover:bg-white/12',
                )}
              >
                {open ? (
                  <X className="size-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="size-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ---------------- Mobile drawer ---------------- */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-navigation"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-80 flex flex-col bg-canvas pt-20 lg:hidden"
          >
            <Container className="flex flex-1 flex-col overflow-y-auto pb-10">
              <nav aria-label="Mobile" className="mt-6 flex-1">
                <ul className="flex flex-col">
                  {primaryNav.map((item, index) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 + index * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-border"
                    >
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline justify-between gap-4 py-5',
                            'font-display text-2xl transition-colors duration-300',
                            isActive ? 'text-accent-strong' : 'text-ink hover:text-accent-strong',
                          )
                        }
                      >
                        <span>{item.label}</span>
                        {item.description && (
                          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
                            {item.description}
                          </span>
                        )}
                      </NavLink>
                    </m.li>
                  ))}
                </ul>
              </nav>

              {/* Contact actions pinned to the bottom of the drawer. */}
              <m.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-col gap-3"
              >
                <Button asChild size="lg" block>
                  <Link to={routes.contact}>{siteConfig.cta.primary}</Link>
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button asChild size="lg" variant="outline">
                    <a href={call.href}>
                      <Phone className="size-4" strokeWidth={1.6} />
                      {siteConfig.cta.call}
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={whatsapp.href}
                      target={whatsapp.external ? '_blank' : undefined}
                      rel={whatsapp.external ? 'noopener noreferrer' : undefined}
                    >
                      <MessageCircle className="size-4" strokeWidth={1.6} />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                {isFilled(siteConfig.contact.email) && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-2 text-center text-sm text-ink-muted transition-colors hover:text-accent-strong"
                  >
                    {t(siteConfig.contact.email)}
                  </a>
                )}
              </m.div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
