import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

test('production indexing requires both explicit owner approval and valid HTTPS origin',()=>{
 const release=read('lib/siteRelease.ts');
 const robots=read('app/robots.ts');
 const sitemap=read('app/sitemap.ts');
 const layout=read('app/layout.tsx');
 const work=read('app/work/[slug]/page.tsx');
 const engineering=read('app/engineering/page.tsx');
 assert.match(release,/NEXT_PUBLIC_SITE_READY==='true'&&siteOrigin!==null/);
 assert.match(release,/url\.protocol!=='https:'/);
 assert.match(release,/example\.invalid/);
 assert.match(robots,/if\(!siteApproved\)/);
 assert.match(robots,/disallow:'\/'/);
 assert.match(sitemap,/if\(!siteApproved\)return \[\]/);
 assert.match(layout,/robots:\{index:siteApproved,follow:siteApproved\}/);
 assert.match(work,/robots:\{index:siteApproved,follow:siteApproved\}/);
 assert.match(work,/publicCanonical\('\/work\/'/);
 assert.match(engineering,/publicCanonical\('\/engineering\/'\)/);
});

test('real navigation and branded fallback exist for every authored static route',()=>{
 const projects=read('data/portfolio.ts');
 const missing=read('app/not-found.tsx');
 const page=read('components/PortfolioExperience.tsx');
 const work=read('components/SelectedWorkIndex.tsx');
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  assert.match(projects,new RegExp("id:'"+id+"'"));
  assert.ok(work.includes("'/work/'+project.id+'/'"));
 }
 assert.match(missing,/Back to portfolio/);
 assert.match(missing,/Engineering index/);
 assert.match(page,/href="#work-index"/);
 assert.match(page,/href="#about"/);
 assert.match(page,/href="#contact"/);
 assert.doesNotMatch(page,/LanguageSwitcher|LocaleProvider/);
});

test('long content is not silently hidden by a fixed-height project index',()=>{
 const component=read('components/SelectedWorkIndex.tsx');
 const css=read('app/quality.css');
 assert.match(component,/new ResizeObserver\(schedule\)/);
 assert.match(component,/host\.dataset\.workOversize/);
 assert.match(css,/data-work-oversize="true"/);
 assert.match(css,/overflow:visible!important/);
 assert.match(css,/focus-visible/);
});

test('manual performance audit exists and does not remove editorial CSS',()=>{
 const audit=read('scripts/css-audit.mjs');
 assert.match(audit,/read-only audit/);
 assert.match(audit,/!important/g);
 assert.ok(read('app/layout.tsx').includes("import './quality.css';"));
 assert.ok(fs.existsSync(path.join(root,'docs','RELEASE-ACCEPTANCE-2026.md')));
});

test('GARTAL case study uses current Next.js source, not superseded Python WSGI',()=>{
 const portfolio=read('data/portfolio.ts');
 const narrative=read('data/caseNarratives.ts');
 const evidence=read('data/engineeringEvidence.ts');
 assert.match(portfolio,/GARTAL-SITE \/ Next\.js App Router/);
 assert.match(portfolio,/PostgreSQL, Drizzle/);
 assert.match(narrative,/Next\.js App Router application using React and TypeScript/);
 assert.doesNotMatch(narrative.slice(0,narrative.indexOf(' factory:{')),/server-rendered Python WSGI application/);
 assert.match(evidence,/8807047e306304051d74db7596b5fdfed0be1606/);
 assert.match(evidence,/app\/api\/leads\/route\.ts/);
 assert.doesNotMatch(evidence,/content\.py/);
});

test('manual acceptance has exact-SHA evidence and does not run from Worker',()=>{
 const pkg=JSON.parse(read('package.json'));
 const runner=read('scripts/final-quality.mjs');
 const ignore=read('.gitignore');
 assert.equal(pkg.scripts['qa:final'],'node scripts/final-quality.mjs');
 assert.match(runner,/gitSha:sha/);
 assert.match(runner,/result:gates\.every\(g=>g\.status==='PASS'\)/);
 assert.match(runner,/package-lock\.json/);
 assert.match(runner,/browser-e2e/);
 assert.match(runner,/NOT_TESTED/);
 assert.match(ignore,/reports\/quality\//);
 assert.match(ignore,/test-results\//);
});

test('dead mock imagery and GSAP dependencies are not part of the active website',()=>{
 const pkg=JSON.parse(read('package.json'));
 const files=['SourceProductPreview.tsx','ResponsiveMedia.tsx','SceneVisual.tsx'];
 for(const file of files)
  assert.equal(fs.existsSync(path.join(root,'components',file)),false,
   file+' is obsolete and should not be reintroduced');
 assert.equal(pkg.dependencies.gsap,undefined);
 assert.equal(pkg.dependencies['@gsap/react'],undefined);
 const live=read('components/PortfolioExperience.tsx');
 assert.doesNotMatch(live,/SourceProductPreview|ResponsiveMedia|SceneVisual/);
});

test('Next-generated declarations stay untracked and owner QA can provision Chromium',()=>{
 const ignore=read('.gitignore');
 const pkg=JSON.parse(read('package.json'));
 const tsconfig=JSON.parse(read('tsconfig.json'));
 const runner=read('scripts/final-quality.mjs');
 assert.match(ignore,/^next-env\.d\.ts$/m);
 assert.equal(fs.existsSync(path.join(root,'next-env.d.ts')),false,
  'generated Next.js declaration should not be checked into the repository');
 assert.ok(pkg.scripts.typecheck.includes('next typegen'));
 assert.ok(tsconfig.include.includes('next-env.d.ts'));
 assert.ok(tsconfig.include.includes('.next/dev/types/**/*.ts'));
 assert.match(runner,/Chromium could not launch/);
 assert.match(runner,/playwright','install','chromium'/);
 assert.match(runner,/owner-invoked/);
});
