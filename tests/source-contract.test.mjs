import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=(name)=>fs.readFileSync(path.join(root,name),'utf8');

test('homepage opens with three text-first scenes and no hero portrait',()=>{
 const src=read('components/ScrollHero.tsx');
 assert.match(src,/const slides=\[/);
 assert.equal((src.match(/index:'0[123]'/g)||[]).length,3);
 assert.match(src,/I BUILD DIGITAL/);
 assert.match(src,/MY PURPOSE/);
 assert.match(src,/HOW I THINK/);
 assert.doesNotMatch(src,/<img\b/);
 assert.match(src,/href="#about"/);
});

test('authentic portrait is in the About chapter, before the project sequence',()=>{
 const homepage=read('components/PortfolioExperience.tsx');
 const portrait=homepage.indexOf('src="/assets/hires/portrait.webp"');
 const about=homepage.indexOf('id="about"');
 const projects=homepage.indexOf('id="selected-projects"');
 assert.ok(about>=0&&portrait>about&&projects>portrait);
 assert.equal((homepage.match(/src="\/assets\/hires\/portrait.webp"/g)||[]).length,1);
 assert.ok(fs.statSync(path.join(root,'public/assets/hires/portrait.webp')).size>1000);
});

test('confirmed biography values are precise and public text is English only',()=>{
 const bio=read('data/portfolio.ts');
 assert.match(bio,/ageYears:\s*25\s*,/);
 assert.match(bio,/yearsOfExperience:\s*5\s*[,\n}]/);
 const homepage=read('components/PortfolioExperience.tsx');
 assert.match(homepage,/publicBiography\.ageYears/);
 assert.match(homepage,/publicBiography\.yearsOfExperience/);
 assert.doesNotMatch(homepage,/[\u0600-\u06ff]/);
 assert.doesNotMatch(homepage,/\bIran\b/i);
});

test('source includes four real project chapters and direct case navigation',()=>{
 const homepage=read('components/PortfolioExperience.tsx');
 const data=read('data/portfolio.ts');
 assert.match(homepage,/projects\.map\(/);
 assert.match(homepage,/\/work\/\x27\+project\.id/);
 for(const name of ['gartal','factory','digirezhim','petiwoo']){
  assert.ok(data.includes("id:'"+name+"'"),'missing '+name);
  assert.ok(fs.statSync(path.join(root,'public/assets/hires/project-'+name+'.webp')).size>1000);
 }
});

test('source retains reduced-motion and direct page accessibility',()=>{
 const css=read('app/edition08.css');
 const layout=read('app/layout.tsx');
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/sx-v8-about-portrait/);
 assert.match(layout,/html lang="en" dir="ltr"/);
 assert.match(layout,/edition08\.css/);
});
