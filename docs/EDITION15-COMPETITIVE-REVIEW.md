# Edition 15 — reference audit and evidence-first portfolio architecture
Research window: October 2026.
Scope: original public websites and their accessible published text; this is not a controlled Lighthouse, WCAG, Web Vitals or browser performance audit.

## Positioning

Do not compete to be the *longest* portfolio. Compete to be the most **inspectable and useful** at two complementary reading speeds:
- **Experience / 1 minute**: cinematic homepage, authentic owner photo, real source-derived story, progressive Linux code and restrained motion, four distinct products, immediate contact.
- **Evidence / 10+ minutes**: normal-scroll engineering index, searchable architecture decisions, stated trade-offs, source paths, unknowns, full technical case studies.

"Best in the world" cannot be certified without a defined test panel, up-to-date competitors and measurable results. Site completeness is measured by actual answerability, transparency and usable outcomes, not the raw number of animations or paragraphs.

## Direct website references and decisions

| Reference | Original URL | Lesson | Do not imitate |
| --- | --- | --- | --- |
| Dennis Snellenberg | https://www.dennissnellenberg.com/ , https://www.dennissnellenberg.com/work | Precise positioning, curated visible work, service/category filtering and direct contact | Large amounts of inert visual motion on detailed engineering pages |
| Rauno Freiberg | https://rauno.me/ ; https://devouringdetails.com/ | Micro-interaction discipline; explore principles, prototypes and resources as separate concepts | Decorative movement that slows information retrieval |
| Maxime Heckel | https://maximeheckel.com/ , https://blog.maximeheckel.com/ | Demonstrate engineering via research, interactive learning material and working studies | Pretend a proposed experiment is a production implementation |
| Lok Chan Art Engineering | https://lokchanart.com/en/engineering/portfolio ; https://lokchanart.com/en/engineering/overview | Architecture, security boundaries, trade-offs, deployments, limitations, separate engineering articles | Claim others' KPIs or testing outcomes for Saeid's products |
| Brittany Chiang | https://brittanychiang.com/ , https://brittanychiang.com/archive | Clear professional identity, project/archive links and accessible plain navigation | Flatten complex products to technology-logo lists |
| Bruno Simon | https://bruno-simon.com/ | The portfolio itself can demonstrate actual coding and interaction; include recovery/controls | Build a resource-heavy 3D game unrelated to product architecture |
| Charlie Cook | https://charliecook.dev/ | Decision/constraint/evidence-oriented case studies with clear technical focus | Confuse plans for case studies with validated outcomes |

These observations derive from the public sites' own descriptions and accessible editorial structures; they do not mean their visual/motion behavior was independently measured in a complete browser run.

## Comparison with Saeid Portfolio / Edition 14

| Dimension | Edition 14 source status | Gap | Edition 15 response |
| --- | --- | --- | --- |
| Identity | English biography + real owner portrait | Need actual human-reviewed visual quality | Do not replace photo with generated or fictional identity |
| Cinematic interaction | Linux scroll type, native horizontal projects, varying tour pace | Long intro, possible motion fatigue, no observed production behavior | Maintain experience only; manual and reduced-motion stay available |
| Case-study copy | Four projects with six long-form chapters each | Paragraphs are not by themselves inspectable engineering proof | Add direct source-anchored decisions, alternatives and clear boundaries |
| Source navigation | Few reference links at the end of a case | Slow to locate repo paths or verify claims | **Implemented:** searchable /engineering/ index with 12 decision records and source register |
| Recruiter/client skim | Narrative first | Long wait to discover technical fit | **Implemented:** immediate direct link to Engineering Index from main header, bridge and case pages |
| Confidence | Repo text explicitly separates implemented claims from live releases | Need actual build/browser/test and real owner role/outcomes | Every record includes not-independently-verified statements |
| Performance | Many stacked edition CSS files, client scroll observers | Possible bundle and animation cost; not measured | Prioritize CSS consolidation, reduced-motion QA and budget after real metrics |
| Discoverability | Four /work routes, gated indexing | Evidence mode missing from sitemap | **Implemented:** gated engineering route in sitemap |
| Genuine product media | Concept art removed from current cases | No permissioned real product captures in repo | Never pass off synthetic UI as captured product; only add verified, redacted real captures if the owner approves |
| Intellectual depth | Source-informed overview and six chapters | Need design decisions with provenance and realistic limitations | **Implemented:** 3 decisions/project with trade-off, documented rationale and links |
| Language | Current UI primarily English | Historical README references EN/FA toggle that may not be in current UI | Do not claim localization until it is implemented/tested |
| Proof of capability | Development source present | Public access to private GitHub files may be restricted | Label source links appropriately; later add approved public sample code/diagrams without disclosing sensitive data |

## Edition 15 implemented

- `data/engineeringEvidence.ts`: 12 source-referenced architecture, product experience and delivery decisions across GARTAL, Factory, DigiRezhim, Petiwoo. Each project has a source register, explanation of the engineering trade-off and explicit non-verified claims.
- `components/EngineeringIndex.tsx`: searchable/filterable technical record, direct project navigation, evidence documents, scope warnings and contact route. No auto-tour is activated in this evidence-reading mode.
- `app/engineering/page.tsx` and `app/engineering.css`: a distinct, restrained, semantic and mobile-friendly reference mode; metadata and direct navigation.
- `components/PortfolioExperience.tsx`, `components/CaseStudy.tsx` and `app/edition14.css`: links from cinematic homepage and individual cases to their evidence records.
- `app/sitemap.ts`: includes /engineering/ only when explicit public readiness/indexing is enabled.
- `tests/engineering-index.spec.ts`: browser test specification for 4 project records, 12 decisions, search, filtering, source links, mobile width and direct navigation.

## Non-negotiable quality gates (NOT yet measured)

1. Actual Next.js typecheck and static build at exact SHA; the source is not a passed build.
2. Real Chromium/WebKit/mobile visual inspections of the immersive path and evidence mode (320–1440+ widths).
3. Keyboard navigation, WCAG-oriented semantics, screen-reader text, reduced motion, readable no-JS mode.
4. CLS, LCP, INP, scroll observer budget, accessibility checks, total CSS and JS bytes; define thresholds from genuine measurements.
5. Confirm all source references against expected repository SHA; GitHub private repo links may require authorized authentication.
6. Verify exact owner role and any commercial or clinical outcome before publication; no fake client logos, patient data or conversions.
7. Existing owner release policy applies: no automatic Factory CI/Preview, no force reset, no unapproved production release.

## Prioritized next release

**P0 — reliability & real review:** exact-SHA local safe sync, Next build, viewport screenshots, keyboard/reduced-motion, observer performance and native navigation; remove regressions.

**P1 — engineering illustrations grounded in facts:** accessible architecture diagrams sourced from real configuration; real decision records citing code blocks/commits; permitted technical excerpts; honest risk/threat model where appropriate. Do not substitute AI-generated product screenshots.

**P1 — conversion:** concise verified professional scope, contribution boundaries, technical capabilities, available collaboration modes and direct contact on first visit. Owner verifies identity and claims first.

**P2 — living engineering archive:** short source-reviewed essays on implementation decisions, architecture changelog with source commits, and optional genuine interactive demonstrations where possible. Never invent project results.

**P2 — design system consolidation:** merge obsolete CSS editions only after browser snapshots and verified regression checks; avoid piling on visual styles indefinitely.
