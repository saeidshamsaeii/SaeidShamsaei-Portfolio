# Edition 10 — word-by-word scroll typography and full automatic portfolio tour

Status: committed to GitHub source. **Not a claim of successful local build, browser approval, Windows Worker sync, or production deployment.** Automatic Worker CI, builds and previews remain disabled under the current Factory operating policy.

## Editorial intent

The user requested *no project case-study imagery*: no stock photos, conceptual `project-*.webp` art or source-simulated interface cards should appear on the home case chapters or the independent `/work/[slug]/` routes. The original authentic owner portrait remains in the About chapter, and the existing Linux code-composition intro stays interactive.

Each of GARTAL, AI Development Factory, DigiRezhim and Petiwoo now has six extensive, source-attributed narrative chapters with at least three paragraphs per chapter, plus an introductory thesis and evidence summary. Content covers system boundaries, source-implemented workflows, technical trade-offs, repository architecture, validation limitations and next evidence. Data lives in `data/caseNarratives.ts`. Narratives must never imply verified customer data, medical outcomes, production metrics or a launched service when the repository alone does not support that claim.

## Interaction implementation

- `components/WordReveal.tsx`: renders full semantic SSR text, plus an `aria-hidden` per-word visual layer. Each visible paragraph observes native scroll and changes the opacity/position of successive words based on its viewport progress. The current word has a restrained cursor; no synthetic terminal process, video or content-fetch API is involved. Reduced-motion and no-JavaScript visitors receive the complete readable copy.
- `components/GuidedTour.tsx`: home and individual case pages read `[data-tour-stop]` elements in natural DOM order and move actual browser scroll between them with `requestAnimationFrame`. A stop can have explicit `data-tour-duration` (4–24 seconds); editorial steps set 7–14 seconds depending on paragraph length. A small fixed controller shows chapter, progress, pause/resume, playback speed (1×, 1.5×, 2×) and Exit.
- Automatic playback starts 1.8 seconds after hydration by default, unless reduced motion is preferred or the visitor has already scrolled, touched or used the keyboard. Any manual scroll, touch, navigation click or Escape exits playback. Pause/Exit buttons remain operable on touch screens. Playback does not use scroll hijacking on manual browsing and does not persist a second background worker.
- `components/ScrollHero.tsx`: three existing editorial scenes become explicit stops and word-reveal transitions; `LinuxCodeCanvas` still types its authentic DOM composition as the site scrolls.
- `components/PortfolioExperience.tsx`: original horizontal image-based case chapters are replaced with vertically readable long-form text, evidence annotations and direct case route links. The true owner portrait in `/assets/hires/portrait.webp` remains untouched.
- `components/CaseStudy.tsx`: independent pages reuse the six chapters, source links and automatic story controller. All case-study visuals and source-simulation cards are removed from rendered case layouts.
- `app/edition10.css`: isolated styles for premium editorial hierarchy, text-only narrative, mobile layouts, word fade, cursor and reduced-motion fallback, loaded after Edition 09.

## Acceptance checks before production approval

1. Inspect home and every `/work/{gartal,factory,digirezhim,petiwoo}/` page in an actual desktop browser and at narrow phone widths; verify no overflow, clipped words or overlapping typography.
2. Record word-by-word fade on manual scroll, reverse scroll and default automatic scroll. All words should remain accessible and should never disappear permanently.
3. Verify automatic tour starts after approximately 1.8 seconds; check every case chapter can be reached; pause/resume/speed/exit function with mouse, touch and keyboard.
4. Verify reduced-motion users receive static readable text and no autoplay. Check screen-reader announcements do not duplicate every word.
5. Confirm the owner portrait and existing contact links still work. No project case study may show `project-*.webp` visualizations or the old `SourceProductPreview` component.
6. Do not use automated Worker CI/Preview to claim success or automatically publish. Exact-SHA local tests and browser acceptance are separate, owner-directed checks, not performed by GitHub source edits alone.

Old image assets may remain in the repository for historical retention but must not be rendered in current case-study routes.
