import { useEffect, type ReactNode } from 'react';
import { siteConfig } from '@/config/site.config';

/**
 * ============================================================================
 * THEME PROVIDER
 * ============================================================================
 * Writes the palette from `site.config.ts` onto <html> as inline custom
 * properties. Because Tailwind v4 compiles utilities to `var(--color-*)`
 * references, changing one hex value in the config instantly re-themes every
 * button, border, heading and generated placeholder on the site.
 *
 * Inline styles on the root element outrank the `@theme` defaults in
 * `index.css`, so the config always wins — while the CSS defaults still paint
 * the correct colours on the very first frame, before React has mounted.
 * ============================================================================
 */

/** Maps config keys to the CSS custom properties Tailwind reads. */
const COLOR_VARS: Record<keyof typeof siteConfig.theme.colors, string> = {
  canvas: '--color-canvas',
  surface: '--color-surface',
  surfaceMuted: '--color-surface-muted',
  ink: '--color-ink',
  inkMuted: '--color-ink-muted',
  accent: '--color-accent',
  accentStrong: '--color-accent-strong',
  accentButton: '--color-accent-button',
  accentHover: '--color-accent-hover',
  accentContrast: '--color-accent-contrast',
  border: '--color-border',
  contrast: '--color-contrast',
  contrastInk: '--color-contrast-ink',
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const { colors, fonts, radius } = siteConfig.theme;

    for (const [key, cssVar] of Object.entries(COLOR_VARS)) {
      const value = colors[key as keyof typeof colors];
      if (value) root.style.setProperty(cssVar, value);
    }

    root.style.setProperty('--font-display', fonts.display);
    root.style.setProperty('--font-body', fonts.body);
    root.style.setProperty('--font-sans', fonts.body);
    root.style.setProperty('--radius-brand', `${radius}px`);

    /* Keep the mobile browser chrome in step with the page background. */
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = colors.canvas;
  }, []);

  useEffect(() => {
    /*
     * Retire the boot splash from index.html once React has painted. Fading it
     * rather than removing it outright avoids a visible snap on slow devices.
     */
    const splash = document.getElementById('boot-splash');
    if (!splash) return;

    splash.style.opacity = '0';
    const timer = window.setTimeout(() => splash.remove(), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
