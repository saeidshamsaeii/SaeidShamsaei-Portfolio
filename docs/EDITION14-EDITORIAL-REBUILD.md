# Edition 14 — Editorial rebuilding instead of staged-looking animation

Status: changed GitHub source, awaiting a real owner-approved browser inspection, TypeScript build and local Worker synchronization. **No deployment, CI or Factory preview was initiated.**

## Why the earlier version felt artificial

1. The homepage still held 8 visually repetitive full-viewport chapters per project. Four projects meant 32 separate stops, many with near-identical compositions.
2. The tour used a new ease-in/ease-out curve for **every** stop, including a 17% artificial pause. This made motion feel like a slideshow rather than reading a continuous page.
3. The same six-chapter technical record was recited in abbreviated form on the homepage and again on the separate case-study pages.
4. Every word had its own fake blinking typewriter caret and vertical lift, drawing attention to the effect rather than to the content.
5. The automatic pace did not account for the amount of text. Long source-based paragraphs could be swept past before they were readable; detailed cases even had a redundant whole-chapter stop followed by stops for the same nested paragraphs.

## Implementation

- `data/homeStories.ts`: authored three distinct editorial beats for **each** of GARTAL, AI Factory, DigiRezhim and Petiwoo. Claims are constrained to source-implemented/stated boundaries, without fabricated performance data.
- `components/HorizontalCaseChapter.tsx`: one title scene + three distinct beats + one conclusion, **five** horizontal scenes/project instead of 8 or 20. The whole technical record remains at `/work/[slug]` and is not duplicated word for word on the homepage. This keeps the intentional sticky horizontal-to-vertical handoff.
- `app/edition14.css`: new restrained editorial composition, asymmetry, typography, negative space and product-aware details, instead of clone cards/chips. Text reveal is smooth and on-baseline; **removed artificial blinking word cursors**, retaining the legitimate cursor in the scroll-driven Linux code editor only.
- `components/GuidedTour.tsx`: each scene no longer starts a new ease/hold/ease sequence. The scroll advances **continuously**, with gently interpolated velocity from the existing scene-specific pace. Added a bounded word-count reading-time floor, ensuring the automatic director does not rush a long passage simply because of the base 2× setting. Manual wheel/touch/up/down scroll and 3.5-second idle-resume remain unchanged.
- `components/CaseStudy.tsx`: independent pages keep complete technical detail, but the chapter is no longer simultaneously a nested autoplay stop with all of its subparagraph stops. Its heading and three paragraph passages are separate, making the reading order unambiguous.
- `tests/source-contract.test.mjs`, `tests/portfolio.spec.ts`, `tests/guided-tour.spec.ts`: source and browser test expectations updated to verify the five-scene experience, continuous tour and authentic media policy.

## Acceptance boundary

The changes are present in GitHub `main`; they are **not visual QA evidence**. We cannot conclude the user likes the design from a source diff. Before owner acceptance, render an actual browser version and inspect:
- Three different beats per project, no repetitive chapter headline/card template.
- Frame transition continuity and early/late stop boundaries at 1366 desktop and 360/390 mobile sizes.
- Readable typography while the tour is running; no simulated blinking word bars.
- True scroll-scrubbed Linux editor plus preserved authentic portrait.
- Bidirectional manual override, 3.5-second idle continuation, deliberate Pause/Exit, tab hiding and reduced motion.
- Four `/work/[slug]` pages and actual source citations.
- No horizontal page overflow and no duplicate autoplay stops in nested case paragraphs.

Factory owner policy remains unchanged: no automatic Worker CI/test/build/preview and no public deployment before explicit approval.
