# Motion-first UX contract — Saeid UI/UX Studio 0.5.2

## Research references (inspiration, not copied templates)
- https://tympanus.net/codrops/hub/tutorials/ — scroll-linked changing galleries and sticky editorial grids.
- https://www.awwwards.com/inspiration/3d-scroll-animation-0110-studio-portfolio-web — restrained immersive sequences.
- https://motion.dev/docs/react-scroll-animations — accessibility-aware, lightweight scroll progress.

## Directions evaluated (owner has not approved one)
**A — Systems Atelier (IMPLEMENTED DESIGN PROPOSAL).** Deep graphite-green / warm bronze; fine technical lines; modest bilingual type; structured interactive diagrams derived from case-study source terminology; native scroll with GSAP ScrollTrigger scene indexing.

**B — Architectural Museum (NOT IMPLEMENTED).** Bone-white editorial canvas; black typography / desaturated copper; panoramic source-document imagery, detailed architecture annotations, matte grain. May be preferable if the owner rejects A.

## Six-chapter scene contract
| Chapter | Source | Scroll intent | Accessible equivalent |
| --- | --- | --- | --- |
| 01 Foundation | GARTAL PDF vision | Core framework diagram & scene index | Semantic chapter with real text |
| 02 Runtimes | GARTAL PDF architecture | Shift stage focus to interfaces/runtimes | Same chapter text and case link |
| 03 Tenant security | GARTAL PDF security | Highlight tenant/RBAC boundary | Readable security explanation |
| 04 Clinical knowledge | DigiRezhim PDF concept | Palette shifts toward muted jade | Domain workflow summary |
| 05 Patient data | DigiRezhim PDF records | Patient data diagram stage | Semantic patient-record section |
| 06 Physician flow | DigiRezhim PDF workflow | Final clinical decision scene | Case-study link and static native mobile figure |

Desktop: sticky visual stage in separate grid column, chapter text scrolls normally; ScrollTrigger changes the active visual for each chapter. No pinned text/focus trap and no Lenis. Mobile under 960px: all chapters display an inline diagram with native scroll; IntersectionObserver updates navigation only. Reduced motion disables reveal animations. Backward scroll must restore the matching scene.

**Provenance:** Current inline illustrations are interpretive redraws of concepts described in the owner-provided PDFs. The real 23 PDF page renders remain in local source ZIP and are awaiting a separate binary media migration to this public repository. Do not call these diagrams genuine product screenshots.

## Design acceptance
Status is DESIGN_PROPOSED; not owner-approved. Technical checks needed: npm lockfile + install, TS build, actual viewport QA 360/390/768/1280/1440, keyboard, reduced motion, mobile, fast reverse scroll, read-only QA screenshots, Core Web Vitals, code/privacy audit. Production deployment forbidden without separate owner go-ahead.
