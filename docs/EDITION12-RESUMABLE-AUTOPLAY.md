# Edition 12 — Default-on fixed 2× cinematic tour with idle-resumable manual browsing

## Owner-requested behavior

No visitor is required to press a Tour button. The page begins its tour when React hydrates, on the homepage and on each individual work/case-study route. The director has one fixed playback speed: **2×**. A slim, transparent upper status line shows the current chapter, progress and “2×”; the bottom box and clickable speed cycler are gone.

A visitor may scroll **up or down**, drag the scrollbar, use Arrow/Page keys, or swipe freely. These are native scroll events: they immediately yield the animation without scroll-lock or wheel interception. After the last manual interaction and **3.5 seconds idle**, the director finds the first next stop **after the current real scrollY** and advances gently downward from that exact position, even if the visitor had moved back to an earlier project or an earlier horizontal paragraph frame. It must not restart at the top or jump forward from stale playback state.

The automatic director continues in the same normal document scroll stream, so existing 20-frame per-project horizontal storytelling and scroll-linked word typing remain synchronized. When the final contact frame has been played, autoplay ends naturally rather than looping to the top.

For user control and accessibility, the top line still exposes deliberate Pause/Resume and Exit; **explicit Pause does not auto-resume**, and explicit Exit disables autoplay for that page view. Manual browsing pauses temporarily. A hidden browser tab suspends animation; it may resume after an idle interval on return. A visitor whose OS prefers reduced motion sees static readable copy and no autoplay.

## Source changes

- `components/GuidedTour.tsx`: fixed `AUTO_SPEED=2`, 3500ms idle timer, separate `playing/manual/paused/finished` modes, real-scroll detection, touch gesture lifecycle, keyboard events, background-tab handling and latest-position destination recalculation. The upper indicator now has a non-clickable fixed `2×` label instead of a speed-changing button.
- `components/PortfolioExperience.tsx` and `components/CaseStudy.tsx`: initialize `GuidedTour` as active from the first render; no deferred 1.8-second startup, no TOUR or RESTART TOUR buttons.
- `app/edition11.css`: small visual status changes for temporarily manual versus explicitly paused modes; preserves the transparent top-only controls.
- `tests/guided-tour.spec.ts`, `tests/portfolio.spec.ts` and `tests/source-contract.test.mjs`: regression expectations for immediate 2x, manual up/down, idle resume, explicit pause, no start button, independent case autoplay, reduced-motion and top-only controls.

## Verification boundary

These are GitHub source changes. Local Windows Worker sync and real Next/Playwright browser execution are **not** established by commits alone. Do not enable Factory automatic CI/build/preview, run destructive sync or deploy without the owner's policy-compliant validation and acceptance.

Actual runtime acceptance should verify initial auto movement, fast manual back-scroll followed by a smooth 3.5-second idle resume from the viewed earlier paragraph, trackpad/touch/keyboard input, horizontal-to-vertical chapter handoff, deliberate Pause stability, reduced-motion mode, no clipped text on phone widths, and normal contact navigation.
