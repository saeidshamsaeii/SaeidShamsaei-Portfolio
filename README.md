# Saeid Shamsaei — Software Architecture & Product Engineering

An **English-only**, source-grounded portfolio built with **Next.js 16, React 19
and TypeScript**. The current visual direction is a monochrome editorial site
with the owner-supplied portrait, a restrained opening, three code-led scenes,
an ordered **Selected Work** index, four horizontal project chapters,
four detailed case studies and a searchable Engineering Index.

> **Delivery status — October 31, 2026:** The static portfolio is live at
> `https://saeidshamsaei.com/` on the isolated VPS release path. Local
> TypeScript, source tests and the production build passed for the current
> published source. Lighthouse SEO scored 100 on the audited routes; desktop
> performance still needs optimization.

## Explore the authored routes

| Path | Purpose |
| --- | --- |
| `/` | Editorial portfolio, Selected Work, experience and direct contacts |
| `/work/gartal/` | Digital studio / reusable platform architecture |
| `/work/factory/` | GitHub to owner-controlled Windows Worker engineering |
| `/work/digirezhim/` | Clinical nutrition and physician workflow architecture |
| `/work/petiwoo/` | Pet-specialist commerce and checkout workflows |
| `/engineering/` | Twelve searchable decisions linked to GitHub source evidence |

Projects are deliberately described using checked-in repository facts.
Product/editorial illustrations must **not** be described as verified live
screenshots. Commercial claims, client outcomes and clinical compliance
require independent evidence.

## Design contract

- Pure black and white editorial style; **English only**, no flag or locale UI.
- Native vertical scrolling; horizontal chapters are driven by actual scroll
  progress. Manual wheel/touch/keyboard navigation suspends the director.
- Selected Work stages are strictly sequential: title and four projects each
  type, draw a separator, and hold **two seconds** before the next begins.
- Focus-visible navigation, readable content and reduced-motion fallback.
- Existing approved movement is kept; additional decorative motion is not a
  substitute for actual browser and accessibility verification.

## Development

Node.js 22+ and npm, local development on `http://localhost:3200`:

```bash
npm install
npm run dev
```

**Owner-initiated final checks only:**

```bash
npm run typecheck
npm test
npm run build
npm run qa:css
npm run qa:browser
```

**Full final acceptance, only when the owner explicitly initiates it:**

```bash
npm run qa:final
```

This first checks that a **committed npm lockfile matches package.json**, then
runs `npm ci` and the existing checks sequentially (TypeScript, source tests,
static export, CSS inventory, image audit and exported-site Playwright), then writes
`reports/quality/acceptance-<SHA>.json` with individual exit codes and log
tails. Playwright also captures twelve real-page review images under
`reports/quality/screenshots/<SHA>/`; these are evidence for human visual
inspection, **not** a substitute for explicit visual approval. The report explicitly fails when `package-lock.json` is missing, the
working tree is dirty, the Git SHA is not known or any gate fails. Browser QA
is recorded as `NOT_TESTED` if the export did not succeed. The resulting
report is local and ignored by Git; no CI, Preview or Worker automation is
activated. Source tests alone never authorize a 10/10 rating or publication.

`npm run build` exports a static site to `out/`. The Playwright suite
exercises the exported site. The QA commands are not executed automatically
by the Saeid AI Factory Worker, Sync or Dashboard. Do not label them as passed
without logs tied to the exact commit SHA.

## Release configuration and SEO

`NEXT_PUBLIC_SITE_URL` must be a genuine HTTPS public origin and
`NEXT_PUBLIC_SITE_READY=true` must be **explicitly approved** before any
page is indexable. The same shared gate controls canonical metadata,
per-project metadata, sitemap and robots. Otherwise, robots disallows crawlers,
page metadata is noindex and the sitemap is empty. A GitHub push is **not**
publication.

For the approved live domain, build with
`NEXT_PUBLIC_SITE_URL=https://saeidshamsaei.com` and
`NEXT_PUBLIC_SITE_READY=true`. The published sitemap is
`https://saeidshamsaei.com/sitemap.xml`; `robots.txt` advertises it.

The Next.js application uses static export with `trailingSlash:true`.
A verified deployment needs a tested domain, TLS, correct static route
rewrites, 404 handling and real browser captures.

## Quality and provenance

- `data/caseNarratives.ts`: editorial narratives bounded by documented scope.
- `data/engineeringEvidence.ts`: decision evidence and source links to
  specified Git revisions.
- `docs/RELEASE-ACCEPTANCE-2026.md`: evidence needed for a credible
  release and a defensible top-quality rating.
- `npm run qa:css`: read-only report on cumulative historical CSS debt.
- `docs/README-HISTORY-2026.md`: historical notes, not current release claims.

### Outstanding quality work

Desktop performance, accessibility findings and a browser console 404 still
need follow-up. Mobile performance and Search Console indexing should be
checked separately. No client, sales, uptime or clinical metrics are implied.

The older sequential CSS layers are kept until comparing screenshots across
all major breakpoints; deleting them blindly could break the approved
scroll and typography score. The small `app/quality.css` layer addresses
specific visibility and focus issues while preserving that cascade.
