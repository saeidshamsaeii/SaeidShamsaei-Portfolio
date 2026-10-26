# Edition 13 — Kinetic typography and edited case narratives

Status: committed source, not a verified local installation or approved production release.

## What changed

**Eliminate repetition.** Each of the four homepage project chapters now uses 8 pinned horizontal scenes, not 20: one identity/opening, six **different** case-study chapter headlines with one curated source-backed paragraph each, and a project-specific closing handoff. The homepage no longer repeats one chapter headline for all three paragraphs. All 18 source-backed paragraphs per project remain available in the separate /work/[slug]/ case pages, preserving research detail without forcing every visitor to read it twice.

**Cinematic variable pace.** The shared default-on guide still begins automatically and resumes after 3.5 seconds of manual-scroll inactivity. Its base tempo is 2×, but every editorial stop can declare `data-tour-pace`. Horizontal chapters use deliberately changing accents (examples: 0.70×, 0.82×, 1.12×, 1.25×, 1.48× of the base), with slower time for reflective copy and faster travel for transitions. The director eases between target speeds rather than jumping abruptly. The tiny top HUD shows the **actual current multiplier**, not the old misleading fixed 2× label. It has no user-adjusted speed selector or boxed lower panel. Native bidirectional manual scrolling, explicit Pause/Exit and reduced-motion handling remain.

**Unwritten really means invisible.** `WordReveal` now starts untyped words at 0 opacity and completely clipped. Native scroll reveals each successive word with left-to-right clipping, a gentle lift and a restrained active-word caret; going backwards rewinds that same sequence. The introduction uses the actual Linux hero scroll progress, horizontal project chapters use their pinned frame progress and all ordinary pages use viewport position. There is no dim 13% preview text. The new CSS `@media (scripting:enabled) and (prefers-reduced-motion:no-preference)` hides unrevealed text from the initial render while browsers with no scripting and visitors preferring reduced motion receive readable static content. Screen readers get one uninterrupted copy via the hidden semantic text, while the visual pieces are aria-hidden.

**More of the page uses the same treatment.** About headings, personal facts and specializations, case-study references and source labels, core contact copy and links, Linux hero editorial captions and chapter markers now use the same text component. Main navigation and Pause/Exit controls stay deliberately available and readable immediately for usability and accessibility.

**Long-form auto-reading is not skipped.** Each full case-study paragraph is a separate guide stop with its own pace/duration, so the director visits each passage rather than jumping from one six-chapter heading to the next before the lower content is revealed. Source disclosures and repository links remain intact. Image-free project storytelling and the authentic owner portrait remain unchanged.

## Files and verification

Changed: `components/HorizontalCaseChapter.tsx`, `components/WordReveal.tsx`, `components/GuidedTour.tsx`, `components/ScrollHero.tsx`, `components/PortfolioExperience.tsx`, `components/CaseStudy.tsx`, `app/edition13.css`, `app/layout.tsx`, source-contract tests and Playwright specs.

The old CSS included generic descendant `span` styles that would accidentally turn every animated word into a separate chip. Edition 13 overrides those inherited borders/padding/fonts **on the inner word wrappers only**, leaving intended chips on the semantic root.

Before final acceptance: test the actual Next.js build, direct page navigation, font wrapping and contrast, 360/390/430px viewport rendering, minimum height scenarios, no-JS/reduced-motion fallbacks, scroll forward and reverse, typed-text completion by each auto tour waypoint, source links and accessibility tree. **No build, browser execution, Worker CI/Preview, Windows pull or public deployment has been carried out or claimed from these GitHub source changes.**
