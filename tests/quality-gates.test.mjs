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
