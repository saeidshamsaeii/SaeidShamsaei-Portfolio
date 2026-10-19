# Saeid Portfolio — UX acceptance / release gate
Owner-selected target: saeidshamsaeii/SaeidShamsaei-Portfolio (public GitHub SOURCE repository).

| Gate | Status | Evidence |
|---|---|---|
| Source architecture | IMPLEMENTED IN REPO | React / Next App Router / Typed six-chapter contract |
| Direction / reference | DESIGN PROPOSED | docs/SCROLL-STORYBOARD.md, A or B not accepted |
| PDF page images | PENDING | 23 original source pages prepared outside repo; no GitHub binary upload completed |
| GitHub exact-SHA CI | NOT VERIFIED | .github/workflows/ci.yml; check runs after commit |
| package-lock.json | MISSING | npm install + lockfile commit outstanding |
| Desktop/mobile real app browser | NOT VERIFIED | offline HTML prototype tests are separate, do not reuse them as Next tests |
| UX 21x105 audit | NOT RUN | Studio rubric applies per page and flow |
| Performance/SEO/a11y | NOT VERIFIED | no Lighthouse/axe or field data in this repo |
| Owner aesthetic approval | NOT ACCEPTED | user previously rejected v1–v6 and v7 still unapproved |
| Public live deployment | NOT AUTHORIZED | robots index/follow disabled until separately authorized |

## Immediate roadmap
P0: Source GitHub baseline, verifiable CI, lockfile, asset provenance and security sweep.
P1: Replace abstract diagrams with curated, owner-approved PDF/project-screen portfolio media; correct Persian/English type, composition, visual hierarchy and content truth.
P2: Evaluate distinct design directions against real mobile/desktop references and owner feedback.
P3: CSS/GSAP scroll choreography QA: forward/reverse, 360/390/768/1280/1440, reduced motion, keyboard, deep links, touch.
P4: Full case studies: challenge, role, architectural decisions, evidence and honest current status.
P5: Owner visual signoff, accessibility/performance baseline, staging and explicit publication authorization.

No grade like “19/10” or “CI green” should be reported without genuine independent evidence.
