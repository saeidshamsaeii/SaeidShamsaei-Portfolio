# Edition 31 — Eight-language portfolio

## Supported languages

English `en`, Persian `fa`, Arabic `ar`, Italian `it`, German `de`,
French `fr`, Simplified Chinese `zh` and Russian `ru`.

A subtle monochrome language selector appears on the homepage, case studies and
Engineering Index. It uses native language names rather than flag icons, has a
keyboard-operable popup, Escape dismissal, visible focus and a reduced-motion
fallback. The user's explicit language is saved in `localStorage` and written
as a shareable `?lang=<code>` URL parameter. On a fresh visit, a valid query
takes precedence, then the saved choice, then the browser language (if supported),
then English. Arabic and Persian update `html[dir]` to `rtl`; Chinese and
RTL scripts have deliberate typography fallbacks.

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
manual-scroll escape hatch. RTL word clipping follows the natural script direction.
The horizontal gallery rail retains its scroll geometry while its editorial copy
uses RTL where appropriate.

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
