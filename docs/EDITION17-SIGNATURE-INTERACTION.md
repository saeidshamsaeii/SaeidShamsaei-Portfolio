# Edition 17 — Signature interaction, not more visual noise

**Status:** changes committed to the connected GitHub `main` branch; no verified Next.js build, browser screenshots, owner Windows Worker pull or public deployment. The prior Factory rule against automatic CI/build/preview remains in effect.

## Creative direction

The strongest reference remains Dennis Snellenberg's readable personal introduction, very large name typography, photographs with character, disciplined micro-interaction and a project list visitors can scan quickly (https://dennissnellenberg.com/ and https://dennissnellenberg.com/work). Olivier Larose's work directory (https://www.olivierlarose.com/) is a secondary reference. **This work borrows principles, not photography, source, exact choreography or layout.** The original owner portrait and all real project content remain unchanged.

## Implemented

- **Scroll-split name**: the two typographic lines of the actual owner's name drift a small distance in opposing directions as the user reads the portrait-led opening. The original photograph moves upward subtly along the same native scroll timeline; a fine rule retracts. No prerecorded animation, GSAP dependency, WebGL or fabricated image. Motion uses computed **pixel** values, avoiding fragile CSS multiplication of lengths.
- **Living editorial index**: the four authentic products each have a different single-word motif, changing on pointer hover, keyboard focus or touch. GARTAL → SYSTEMS; AI Development Factory → EVIDENCE; DigiRezhim → PRECISION; Petiwoo → DISCOVERY. The watermark is visually subordinate and excluded from the accessibility tree. A compact 'In focus' discipline label supplies meaningful reading context, and the actual case-study and Git source navigation remain primary.
- **Contrast-correct director**: the existing automatically started, variable-tempo tour detects when its currently viewed section is the light owner cover or the light work directory, switching its text-only top HUD to ink rather than beige. It remains transparent (no bottom box), preserves native scroll override, pauses on manual input and resumes from actual scroll position after 3.5 seconds.
- **Safe fallbacks**: all interaction continues with the DOM's real selectable text; reduced motion removes identity transforms and the watermark entrance animation; touch users get expanded project details, keyboard focus exposes the same work and links. The user-facing site stays in English and no location facts are added.

## Implementation paths

- `components/SelectedWorkIndex.tsx`
- `components/SignatureOpening.tsx`
- `components/GuidedTour.tsx`
- `app/edition16.css` (extend existing edition rather than add a new CSS import)
- `tests/edition16-identity.spec.ts` (new expectations for the features)

## Real acceptance needed

- Run an **owner-directed** Next.js typecheck and actual browser build at the exact source commit.
- Inspect first-viewport typography and the real portrait at 320/360/390/430/768/1440 px; make sure the second line of the name is never clipped.
- Confirm scrolling forward and backward animates the cover without layout shift, that the work watermark never competes with actual content, and that keyboard/touch can reach both case and source links.
- Check tour status legibility during light/dark transitions, during manual override, and with its deliberate Pause/Exit.
- Check reduced-motion and no-JS behavior. Avoid publication until the owner approves the observed real site rather than a static source review.

The result is a specific direction with measurable acceptance, not a claim that it is objectively the most unique website in its category.
