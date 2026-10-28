# Edition 21 — Restored hero copy, ordered paragraph reveal, medium movement

Scope: user-requested repair of Edition 20's missing first-screen text, premature multi-paragraph appearances, and uneven automated scroll pace. These changes are committed to GitHub `main` source; there is **no verified local Next.js build, browser QA, Worker synchronization or public deployment**.

## What changed

### The text beside the real photograph is back

`components/SignatureOpening.tsx` once again includes the personal message:
> I make complex digital systems
> feel considered, useful and human.

The large `SAEID / SHAMSAEI` title remains the first two sequential beats, followed by the concise two-line message. This replaces the generic `Design. / Code. / Architecture.` filler, which was not the original identity statement. The image remains the actual unchanged `portrait.webp`, with a slightly reduced grayscale background crop from Edition 20. New targeted `app/edition20.css` rules secure heading and subtitle width, high-contrast white typography and no text overlap with the photo at responsive widths.

### Fix the cause of simultaneous lines/paragraphs

`components/WordReveal.tsx` already measured actual visual line breaks. However, a fast wheel jump could snap **several paragraphs to their target at once**, and a legacy intersection exit branch explicitly marked entire paragraphs complete when leaving view. This created the 'multiple lines arrive together' defect even though the declarative blocks were technically ordered.

Edition 21 uses a **single section-wide paced clock** held in `WeakMap<HTMLElement,...>`, read by the heading and every subsequent paragraph. The clock advances with a bounded maximum rate regardless of whether the user or director leaps far down the page, and rewinds immediately on reverse scrolling. Section flow is: complete title → complete first visible line → next natural wrapped line → next paragraph. An off-screen paragraph is no longer automatically marked 100% written just because it left the viewport. The extra CSS opacity/clip transition was removed: JavaScript frame progress controls every pixel, preventing one line's transition tail from overlapping the next line's onset.

The same component is used by the main intro, Linux story captions, About, selected work, each of the four pinned product stories, contact, and all six chapters on each detailed case route. Functional navigation and reduced-motion static content remain visible.

### Medium, steadier auto scrolling without a bar

`components/GuidedTour.tsx` remains entirely **headless** and enabled after the multilingual greeting, but no longer uses the previous 2× baseline and widely changing 0.58–1.55 multipliers. Its duration now follows **actual distance at approximately 315px per second** plus a small minimum interval for short text passages. The engine retains wheel/touch/keyboard takeover, Escape pause, and 3.5-second idle continuation. It does not render a toolbar, speed number or progress bar.

The introduction gets one **2.35-second stationary reveal window after welcome**: the personal message writes in place beside the photograph, then moderate automatic scrolling begins. This one-time opening is not repeated at every chapter and does not change the steady speed formula.

## Verification still required

- Manually run Next.js typecheck/build and the new `tests/edition21-reading-order.spec.ts` on the specific GitHub SHA, without triggering Factory automatic CI/Preview.
- Inspect 320, 360, 390, 430, 768, 900, 1024, 1440px screenshots for text fitting alongside the portrait, phone crop, actual line wraps, title spacing, and no horizontal overflow.
- Inspect the first screen after `Hello...` and the multilingual sequence: name and restored tagline fully appear before the scripted scroll moves.
- Perform rapid down/up scrolling on all four horizontal product scenes and each case-study page; ensure **no next paragraph appears before the previous one finishes**.
- Verify actual per-section scroll movement is medium, no visible speed line remains, and manual input stays in control until its idle interval.
- Keep the owner-approved workflow: source commits to `main`, no unapproved public deployment, no Factory automatic CI/build/preview.
