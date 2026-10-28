# Edition 31 — Eight-language portfolio

## Supported languages

English `en`, Persian `fa`, Arabic `ar`, Italian `it`, German `de`,
French `fr`, Simplified Chinese `zh` and Russian `ru`.

A restrained **flag-only** language selector appears on the homepage,
case studies and Engineering Index. Eight country icons (GB, IR, SA, IT,
DE, FR, CN, RU) are bundled as local SVGs under `public/flags` with an
MIT license notice in `public/flags/LICENSE.txt`. When opened, all eight
flags appear in a **single horizontal row inside the header**; there is no
dropdown overlay or 2x4 grid. Language names remain accessible through
screen-reader labels and hover titles, rather than visible codes.

The user's selection is persisted in `localStorage` and a shareable
`?lang=<code>` URL parameter; query, storage and supported browser locale
take precedence in that order before falling back to English.
Persian and Arabic use `html dir=rtl`; English, Italian, German, French,
Chinese and Russian use `html dir=ltr`, matching their natural directions.

## Translation scope

- Homepage: navigation, portrait-side introduction, all three Linux editorial
  scenes, about and specialties, Selected Work headings and the four project
  descriptors, project horizontal scenes, contact information and footer actions.
- Four case-study pages: project summary, six localized technical chapter
  summaries per project, links, evidence boundary, next-project navigation and
  interaction labels.
- Engineering Index: headings, filters, search instructions, four project
  scopes, twelve technical decision questions and documented approaches,
  limitations, evidence navigation and footer.
- Immutable references: repository names, commit identifiers, code paths,
  technology names, phone numbers and external links remain the original values.
  The detailed English source passages remain in `data/caseNarratives.ts` and
  GitHub source evidence remains available through the linked repositories.
- Locale-specific copy is authored, not live machine-translated in the browser.
  The translated six-chapter case narratives are concise curated summaries,
  not a word-for-word translation of every English detail paragraph.

## Motion and layout constraints

Selected Work retains five sequential stages: type, draw the divider, read for
two seconds, then advance. The last panel's final hold is handled by the headless
director. Switching language must not restart the overall tour or remove the
manual-scroll escape hatch. Word clipping follows the selected page direction.
Long translated words and CJK runs can wrap within their visual boxes instead
of escaping the page. The former catch-all wrapping rules were replaced with
scoped language-specific typography. Extra-short viewports use natural vertical overflow rather
than cropping paragraphs. The horizontal rail retains its scroll geometry.

## SEO and delivery boundary

Language selection is client-side on existing canonical routes. This **does not
create eight separately crawlable localized URLs or server-rendered `hreflang`
alternates**. A future route-level locale build with per-language metadata and
localized static HTML is required before claiming multilingual SEO indexing.
This repository's conservative `NEXT_PUBLIC_SITE_READY` policy remains unchanged.

## Manual QA (not Factory automated CI)

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Check home / work / engineering at 320, 390, 768 and 1440 px for Persian,
Arabic, Chinese, Russian and long German/French phrases. Check zoom and font
fallbacks; confirm screen-reader language/direction, picker focus management,
language persistence and 2-second reading holds. The above commands are
**instructions** and must not be claimed successful until actually executed.
