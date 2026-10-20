# Launch acceptance — motion portfolio v1.0 source pass

Owner-directed scope: replace prior generic portfolios with an original narrative scroll experience based on owner-selected image-led developer references. Four case studies: GARTAL, Factory, DigiRezhim, Petiwoo (GARTAL vertical).

| Gate | Status | Evidence |
| --- | --- | --- |
| Four projects, factual descriptions | SOURCE WRITTEN | data/portfolio.ts |
| Distinct visual scenes per project | SOURCE WRITTEN | components/SceneVisual.tsx |
| Desktop scroll scrub, native mobile fallback | SOURCE WRITTEN | components/PortfolioExperience.tsx, app/globals.css |
| Four static case routes | SOURCE WRITTEN | app/work/[slug]/page.tsx and CaseStudy.tsx |
| Actual PDF image binaries on GitHub | NOT DONE | PDF visual language represented by original diagrams, not page scans |
| NPM dependencies and lockfile | NOT VERIFIED | Run npm install, then commit lockfile |
| Typecheck + Next static build at final SHA | NOT VERIFIED | GitHub Actions exact commit required |
| Real Chromium mobile/desktop QA | NOT VERIFIED | Test 360/390/768/1280/1440 |
| Actual deployment + HTTPS domain | NOT STARTED | Host and domain not selected |
| Final visual owner acceptance | PENDING | Review in real browser |

Important: not a claim of visual production acceptance or user consent to live publication.
