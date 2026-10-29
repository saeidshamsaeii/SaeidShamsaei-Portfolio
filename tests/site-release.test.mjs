import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

// The release module is pure, JavaScript-compatible TypeScript. Evaluate that
// *same checked-in source* in isolated environments without Next.js, a DB,
// network access or the user's actual environment variables.
const source=readFileSync(new URL('../lib/siteRelease.ts',import.meta.url),'utf8');
const script=ts.transpileModule(source,{fileName:'siteRelease.ts',compilerOptions:{
 target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext
}}).outputText.replace(/\bexport (?=const |function )/g,'')+
 '\n({siteOrigin,siteApproved,publicCanonical})';
function inspect(env){
 return runInNewContext(script,{URL,process:{env}});
}

test('release is private by default, even with a real domain',()=>{
 const missing=inspect({});
 assert.equal(missing.siteApproved,false);
 assert.equal(missing.siteOrigin,null);
 assert.equal(missing.publicCanonical('/'),undefined);
 const domainOnly=inspect({NEXT_PUBLIC_SITE_URL:'https://portfolio.example.org'});
 assert.equal(domainOnly.siteApproved,false);
 assert.equal(domainOnly.publicCanonical('/work/factory/'),undefined);
});

test('release requires explicit approval and a valid HTTPS root origin',()=>{
 for(const raw of [
  'http://portfolio.example.org','https://localhost',
  'https://example.invalid','https://example.com',
  'https://portfolio.example.org/path','https://portfolio.example.org/?x=1',
  'https://user:pass@portfolio.example.org','not-an-address'
 ]){
  const value=inspect({NEXT_PUBLIC_SITE_READY:'true',NEXT_PUBLIC_SITE_URL:raw});
  assert.equal(value.siteApproved,false,'should refuse '+raw);
  assert.equal(value.publicCanonical('/'),undefined);
 }
});

test('approved HTTPS origin produces correct canonical URLs for static pages',()=>{
 const value=inspect({
  NEXT_PUBLIC_SITE_READY:'true',
  NEXT_PUBLIC_SITE_URL:' https://portfolio.example.org/ '
 });
 assert.equal(value.siteApproved,true);
 assert.equal(value.siteOrigin,'https://portfolio.example.org');
 assert.equal(value.publicCanonical('/'),'https://portfolio.example.org/');
 assert.equal(value.publicCanonical('/engineering/'),'https://portfolio.example.org/engineering/');
 assert.equal(value.publicCanonical('work/gartal'),'https://portfolio.example.org/work/gartal/');
});
