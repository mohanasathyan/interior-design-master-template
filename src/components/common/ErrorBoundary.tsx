import { Component, type ErrorInfo, type ReactNode } from 'react';
import { siteConfig } from '@/config/site.config';
import { copyConfig } from '@/config/copy.config';
import { mailLink, telLink, whatsappLink } from '@/lib/links';
import { isFilled, t } from '@/lib/tokens';
import { routes } from '@/config/routes';

/**
 * ============================================================================
 * ERROR BOUNDARY
 * ============================================================================
 * The last line of defence, and on this site it is doing something specific.
 *
 * `index.html` paints a boot splash over the whole viewport at `z-index: 9999`,
 * and the ONLY thing that removes it is an effect inside `ThemeProvider`.
 * Effects run after a successful commit — so if anything throws while
 * rendering, React unmounts the tree, that effect never runs, and the visitor
 * is left on a cream screen with a spinner that turns forever. No content, no
 * phone number, no way out, and nothing in the UI to suggest a reload would
 * help.
 *
 * So this boundary does two jobs: it renders a usable fallback, and it retires
 * the splash by hand before doing so.
 *
 * ---------------------------------------------------------------------------
 * WHY THE FALLBACK IS PLAIN MARKUP
 * ---------------------------------------------------------------------------
 * Everything here is a bare element with utility classes. No `Button`, no
 * router `Link`, no motion components. Two reasons:
 *
 *  • This boundary is mounted ABOVE `BrowserRouter`, so there is no router
 *    context to render a `<Link>` into — one would throw, inside the very
 *    component whose job is to survive a throw.
 *  • A fallback that depends on the component library is a fallback that can
 *    fail for the same reason the app just did.
 *
 * The palette still applies: `index.css` defines the theme defaults, so this
 * renders on-brand even though `ThemeProvider` never got the chance to write
 * the config's colours over the top.
 * ============================================================================
 */

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Retire the boot splash so the fallback is not rendered behind a spinner. */
function dismissBootSplash(): void {
  const splash = document.getElementById('boot-splash');
  splash?.remove();
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    /*
     * The splash is removed here rather than in `render` because `render` must
     * stay free of side effects — and because this fires on the commit that
     * follows the failure, which is exactly when the fallback becomes visible.
     */
    dismissBootSplash();

    /* Left as `console.error` on purpose: it is what a monitoring service
       (Sentry, Rollbar) hooks, and it is what a developer looks for first. */
    console.error('[ErrorBoundary] A rendering error was caught:', error, info.componentStack);
  }

  private handleRetry = (): void => {
    /* A full reload rather than clearing state: the tree that threw is gone,
       and re-mounting it usually reproduces the same error immediately. */
    window.location.reload();
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    const call = telLink();
    const mail = mailLink();
    const whatsapp = whatsappLink();
    const hasPhone = isFilled(siteConfig.contact.phone);
    const hasEmail = isFilled(siteConfig.contact.email);
    const hasWhatsapp = isFilled(siteConfig.contact.whatsapp);
    const named = isFilled(siteConfig.business.name);
    const copy = copyConfig.system.error;

    return (
      <main className="grid min-h-svh place-items-center bg-canvas px-6 py-16">
        <div className="w-full max-w-lg text-center">
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent-strong">
            {copy.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            {copy.title}
          </h1>

          {/* Two whole sentences rather than one with a spliced-in clause: the
              named version reads differently, not just longer, and a client
              rewriting either must be able to see the whole thing. */}
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-muted">
            {named ? t(copy.bodyNamed) : copy.body}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex h-12 w-full items-center justify-center bg-accent-button px-7 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-accent-contrast transition-colors duration-300 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:w-auto"
            >
              {copy.retry}
            </button>

            {/* A plain anchor, not a router link — see the note above. */}
            <a
              href={routes.home}
              className="inline-flex h-12 w-full items-center justify-center border border-ink/25 px-7 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:w-auto"
            >
              {copy.home}
            </a>
          </div>

          {(hasPhone || hasEmail || hasWhatsapp) && (
            <div className="mt-10 border-t border-border pt-8">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink-muted">
                {copy.contactHeading}
              </p>
              <ul className="mt-4 flex flex-col items-center gap-2.5 text-[0.95rem] sm:flex-row sm:justify-center sm:gap-7">
                {hasPhone && (
                  <li>
                    <a
                      href={call.href}
                      className="tabular-nums text-ink transition-colors duration-300 hover:text-accent-strong"
                    >
                      {t(siteConfig.contact.phone)}
                    </a>
                  </li>
                )}
                {hasEmail && (
                  <li>
                    <a
                      href={mail.href}
                      className="break-all text-ink transition-colors duration-300 hover:text-accent-strong"
                    >
                      {t(siteConfig.contact.email)}
                    </a>
                  </li>
                )}
                {hasWhatsapp && (
                  <li>
                    <a
                      href={whatsapp.href}
                      target={whatsapp.external ? '_blank' : undefined}
                      rel={whatsapp.external ? 'noopener noreferrer' : undefined}
                      className="text-ink transition-colors duration-300 hover:text-accent-strong"
                    >
                      {copy.whatsapp}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/*
            The message itself, in development only. Shipping a stack trace to a
            visitor tells them nothing and tells an attacker something.
          */}
          {import.meta.env?.DEV && (
            <pre className="mt-8 overflow-x-auto rounded-(--radius-brand) border border-border bg-surface p-4 text-left text-[0.75rem] leading-relaxed text-ink-muted">
              {error.message}
            </pre>
          )}
        </div>
      </main>
    );
  }
}
