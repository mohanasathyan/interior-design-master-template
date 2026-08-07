import { AlertCircle } from 'lucide-react';
import { legalMeta, type LegalDocumentContent } from '@/data/legal';
import { isFilled, t } from '@/lib/tokens';
import type { Crumb } from '@/lib/schema';
import { Section } from '@/components/common/Section';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

/**
 * ============================================================================
 * LEGAL DOCUMENT
 * ============================================================================
 * The shared renderer for the privacy policy and the terms of service. One
 * component, because the two pages differ only in their content — and two
 * near-identical page files is how they drift apart.
 *
 * Deliberately quiet: a narrow measure, generous leading, no photography and no
 * scroll-reveal animation. These pages are read when someone is checking
 * whether they can trust you with a phone number, and content that fades in as
 * you scroll a policy is content that gets in the way.
 *
 * The extra top padding is not decoration. The navbar is `fixed`, and unlike
 * every other inner page this one has no `PageHero` to sit beneath it, so the
 * heading needs clearance of its own or the bar covers it.
 * ============================================================================
 */
export function LegalDocument({
  content,
  crumbs,
}: {
  content: LegalDocumentContent;
  crumbs: Crumb[];
}) {
  /* Filling in the date is the switch that retires the review notice. */
  const reviewed = isFilled(legalMeta.lastUpdated);

  return (
    <Section tone="canvas" spacing="lg" container="narrow" className="pt-32 md:pt-40">
      <Breadcrumbs items={crumbs} />

      <span className="eyebrow mt-8">{t(content.eyebrow)}</span>

      <h1 className="mt-5 font-display text-h1 text-ink">{t(content.title)}</h1>

      <p className="mt-6 text-lead text-ink-muted">{t(content.lead)}</p>

      {/*
        The date is rendered beside its label rather than inside a sentence.
        That is what keeps `{{LEGAL_LAST_UPDATED}}` a plain fillable field
        instead of a token that would need a registry entry — see the note in
        `src/data/legal.ts`.
      */}
      <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Last updated: <span className="text-ink">{t(legalMeta.lastUpdated)}</span>
      </p>

      {!reviewed && (
        <div
          role="note"
          className="mt-8 flex items-start gap-3.5 rounded-(--radius-brand) border border-accent/35 bg-accent/8 p-5"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent-strong"
            strokeWidth={1.8}
          />
          <p className="text-[0.86rem] leading-relaxed text-ink">
            <span className="font-medium">Template text — not yet reviewed.</span> This document is
            structured scaffolding, not legal advice. Edit it in{' '}
            <code className="text-accent-strong">src/data/legal.ts</code>, have a qualified adviser
            check it against the law where the studio operates, then set{' '}
            <code className="text-accent-strong">legalMeta.lastUpdated</code> to publish. Setting
            that date removes this notice.
          </p>
        </div>
      )}

      <div className="mt-14 flex flex-col gap-12">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-h3 text-ink">{t(section.heading)}</h2>

            <div className="mt-4 flex flex-col gap-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-ink-muted">
                  {t(paragraph)}
                </p>
              ))}
            </div>

            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-5 flex flex-col gap-3">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3.5 leading-relaxed text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                    />
                    {t(bullet)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </Section>
  );
}
