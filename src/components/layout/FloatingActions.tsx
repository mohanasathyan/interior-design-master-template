import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { telLink, whatsappLink } from '@/lib/links';
import { t } from '@/lib/tokens';
import { cn } from '@/lib/utils';

/**
 * ============================================================================
 * FLOATING ACTIONS
 * ============================================================================
 * The persistent conversion layer: WhatsApp, click-to-call and back-to-top.
 *
 * Design decisions that matter here:
 *  • WhatsApp keeps its recognisable green. Restyling it to the brand palette
 *    looks tidier but measurably reduces taps — people recognise the colour
 *    before they read the icon.
 *  • Labels expand on hover on desktop and stay hidden on mobile, where the
 *    icon alone is understood and screen space is scarce.
 *  • The stack sits above the safe-area inset so it never collides with an
 *    iPhone's home indicator.
 *  • Every button is 56px — comfortably above the 44px minimum tap target.
 *
 * Each element can be switched off independently in `site.config.ts`.
 * ============================================================================
 */

function useScrolledPast(distance: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setPast(window.scrollY > distance);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [distance]);

  return past;
}

/** Shared shell so all three buttons share identical geometry and m. */
function FloatingButton({
  href,
  onClick,
  label,
  ariaLabel,
  className,
  children,
  external,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const shared = cn(
    'group/fab relative flex h-14 items-center gap-0 overflow-hidden rounded-full',
    'shadow-[0_10px_34px_-12px_rgba(0,0,0,0.45)]',
    'transition-[width,gap,padding,background-color,box-shadow] duration-500 ease-luxe',
    'w-14 pl-0 md:hover:w-auto md:hover:gap-3 md:hover:pl-5 md:hover:pr-6',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent',
    className,
  );

  const inner = (
    <>
      {/* Label is width-animated rather than mounted/unmounted, so it slides. */}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[0.16em] opacity-0 transition-[max-width,opacity] duration-500 ease-luxe md:inline md:group-hover/fab:max-w-[11rem] md:group-hover/fab:opacity-100">
        {label}
      </span>
      <span className="grid size-14 shrink-0 place-items-center transition-all duration-500 ease-luxe md:group-hover/fab:size-auto">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={shared}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={shared}>
      {inner}
    </button>
  );
}

export function FloatingActions() {
  const showBackToTop = useScrolledPast(700);
  const call = telLink();
  const whatsapp = whatsappLink();
  const { features } = siteConfig;
  const businessName = t(siteConfig.business.name);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div
      className="fixed bottom-6 right-4 z-70 flex flex-col items-end gap-3 no-print sm:bottom-8 sm:right-6"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* ---- Back to top ---- */}
      {features.backToTop && (
        <AnimatePresence>
          {showBackToTop && (
            <m.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <FloatingButton
                onClick={scrollToTop}
                label="Top"
                ariaLabel="Scroll back to top of page"
                className="border border-border bg-surface text-ink hover:bg-ink hover:text-canvas"
              >
                <ArrowUp className="size-5" strokeWidth={1.6} />
              </FloatingButton>
            </m.div>
          )}
        </AnimatePresence>
      )}

      {/* ---- Click to call ---- */}
      {features.floatingCall && (
        <FloatingButton
          href={call.href}
          label={siteConfig.cta.call}
          ariaLabel={`Call ${businessName}`}
          className="bg-ink text-canvas hover:bg-accent-button hover:text-accent-contrast"
        >
          <Phone className="size-5" strokeWidth={1.6} />
        </FloatingButton>
      )}

      {/* ---- WhatsApp ---- */}
      {features.floatingWhatsApp && (
        <div className="relative">
          {/* A slow halo pulse to draw the eye without demanding attention. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/25 [animation-duration:3.2s] motion-reduce:hidden"
          />
          <FloatingButton
            href={whatsapp.href}
            external={whatsapp.external}
            label={siteConfig.cta.whatsapp}
            ariaLabel={`Message ${businessName} on WhatsApp`}
            className="bg-[#25D366] text-ink hover:bg-[#1EBE5A]"
          >
            <MessageCircle className="size-5" strokeWidth={1.7} />
          </FloatingButton>
        </div>
      )}
    </div>
  );
}
