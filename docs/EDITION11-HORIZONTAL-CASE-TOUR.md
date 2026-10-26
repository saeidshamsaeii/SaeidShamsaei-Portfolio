# Edition 11 — horizontal text-first project stories / minimal upper tour controls

Source implementation only, not proof of a successful local Windows sync, Next.js build, runtime screenshot or release.

## Visual behavior and sequence

- The existing Linux scroll-typed three-act Hero and authentic owner portrait in About remain unchanged.
- Four selected work sections still appear vertically, in sequence: GARTAL, AI Factory, DigiRezhim and Petiwoo.
- Each project now contains 20 full-width **text-only** reading frames: one introduction, 18 paragraphs distributed across six documented case-study chapters, and one evidence/handoff frame.
- `components/HorizontalCaseChapter.tsx` computes section height and uses a sticky 100svh viewport. Native **vertical** document scroll determines the horizontal track's CSS `translate3d`. The current frame holds for roughly 72% of its scroll interval; the final 28% advances smoothly to the next. The last frame releases the sticky project into the next vertical project. No wheel interception or forced `window.scrollTo` is performed for manual project navigation.
- `components/WordReveal.tsx` reads each horizontal frame's progress, revealing source-backed paragraphs word by word. Standalone `/work/[slug]/` case pages retain their full vertical six-chapter narrative layout.
- The current source illustrations and conceptual screen reconstructions are **not rendered** in homepage project chapters or standalone case-study pages.

## Automatic tour controls

- `components/GuidedTour.tsx` maps each `data-tour-stop` inside a horizontal chapter to the real document scroll offset for that chapter's corresponding frame.
- The automatic tour still starts after 1.8 seconds unless the visitor already interacted, and pauses for reduced-motion users. Default tour speed is now **2×**. The playback speed selector cycles 2× → 1× → 1.5× → 2×.
- The old floating boxed panel at the bottom has been removed. A transparent, compact control line beneath the top navigation contains progress, **speed at the top**, pause/resume and exit. It does not cover the lower reading layout.
- Wheel/touch/keyboard/manual navigation cancels automatic playback and returns normal scroll control; interaction with the control buttons does not accidentally exit.
- On `prefers-reduced-motion: reduce` the horizontal frames are presented as normal vertical reading sections; word content remains legible without animation or autoplay.

## Source verification and acceptance still pending

Tests have been rewritten to check 20 frames, 18 paragraph panels, four project sequences, natural vertical release, horizontal text reveal, top toolbar position and controls, mobile page width and reduced-motion behavior.

Before declaring the feature complete, **run an actual Next.js build and a real browser review** on desktop plus 360/390/430px mobile, checking high-contrast typography, sticky positioning, backward scroll, long paragraph clipping, tour durations, frame-to-frame handoff, keyboard focus and contact links. No CI/preview was activated inside the Factory; release still requires owner confirmation and verified local Worker sync.
