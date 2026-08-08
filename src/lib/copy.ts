import { Fragment, createElement, type ReactNode } from 'react';

/**
 * ============================================================================
 * COPY INTERPOLATION
 * ============================================================================
 * Some strings have to name a number the template only knows at render time —
 * "All 13 Services", "Showing 4 of 12 projects", "Close Marble House details".
 *
 * Those used to be built with template literals inside the component, which is
 * exactly the thing that makes copy un-editable: the sentence existed only as
 * fragments either side of a `${}`, so a client could not rewrite it, reorder
 * it, or translate it without editing JSX.
 *
 * So they are ordinary strings in `copy.config.ts` with single-brace
 * placeholders, and these two helpers fill them in.
 *
 * ---------------------------------------------------------------------------
 * WHY SINGLE BRACES AND NOT `{{TOKENS}}`
 * ---------------------------------------------------------------------------
 * The two systems answer different questions and must not be confused:
 *
 *   {{TOKEN}}  a CONFIG value — the business name, the city, the phone number.
 *              Resolved by `src/lib/tokens.ts`, validated at build time, and
 *              identical everywhere it appears.
 *
 *   {value}    a RUNTIME value — a count, the name of the project the visitor
 *              just clicked. It cannot live in the config because it does not
 *              exist until the component renders.
 *
 * Keeping them visually distinct means the build-time token validator never
 * sees a `{count}` and reports it as an unresolvable token, and a client
 * editing copy can tell at a glance which braces they may safely move around
 * and which ones name a field they can fill in.
 * ============================================================================
 */

/** Matches a runtime placeholder: `{count}`, `{name}`, `{total}`. */
const SLOT = /\{(\w+)\}/g;

/**
 * Fill runtime placeholders in a copy string.
 *
 * An unknown placeholder is left untouched rather than replaced with
 * `undefined` — a visible `{count}` is a bug report; the word "undefined" in
 * the middle of a sentence is a mystery.
 *
 * @example
 *   format('All {count} Services', { count: 13 }) // → 'All 13 Services'
 */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(SLOT, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * The same substitution, but each placeholder may be replaced by a React node.
 *
 * This exists so a sentence that carries emphasis — a bolder number inside an
 * otherwise muted line — can still be ONE editable string rather than three
 * fragments spliced around JSX. The client rewrites the sentence; the styling
 * stays attached to the value it belongs to.
 *
 * Every substituted node is wrapped in a keyed `Fragment`, because the result
 * is rendered as an array and React would otherwise warn about missing keys on
 * copy that the component author never wrote as a list.
 */
export function formatNodes(
  template: string,
  values: Record<string, ReactNode>,
): ReactNode[] {
  const output: ReactNode[] = [];
  let cursor = 0;
  let slot = 0;

  for (const match of template.matchAll(SLOT)) {
    const index = match.index ?? 0;
    if (index > cursor) output.push(template.slice(cursor, index));

    const value = values[match[1]];
    output.push(
      value === undefined
        ? match[0]
        : createElement(Fragment, { key: `slot-${slot++}` }, value),
    );

    cursor = index + match[0].length;
  }

  if (cursor < template.length) output.push(template.slice(cursor));
  return output;
}
