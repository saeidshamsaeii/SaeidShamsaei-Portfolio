// Deliberately OWNER-INVOKED final acceptance. Never called by Worker/Sync.
// Produces an evidence report tied to the exact Git SHA; does not claim
// runtime/browser success from source code or a GitHub push.
import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import process from 'node:process';

const cwd=process.cwd();
const now=()=>new Date().toISOString();
const started=now();
const maxBuffer=16*1024*1024;
const run=(exe,args,timeoutMs=12*60*1000)=>{
 const result=spawnSync(exe,args,{cwd,encoding:'utf8',maxBuffer,
  timeout:timeoutMs,shell:process.platform==='win32',windowsHide:true});
 return {exitCode:result.status,error:result.error?.message||null,
  stdout:result.stdout||'',stderr:result.stderr||''};
};
const git=run('git',['rev-parse','HEAD']);
const sha=git.exitCode===0?git.stdout.trim():'UNVERIFIED';
const checkout=run('git',['status','--porcelain']);
const dirty=checkout.exitCode!==0||checkout.stdout.trim().length>0;
const gates=[];
const mark=(id,status,detail,extra={})=>{
 const entry={id,status,detail,...extra};gates.push(entry);
 process.stdout.write('['+status+'] '+id+': '+detail+'\n');
};
const lockfile=existsSync(join(cwd,'package-lock.json'));
mark('reproducible-install',lockfile?'PASS':'FAIL',
 lockfile?'npm package-lock.json exists':'Missing npm lockfile: reproducible npm ci is not possible');
if(sha==='UNVERIFIED')mark('git-provenance','FAIL','Cannot resolve HEAD SHA');
else mark('git-provenance',dirty?'FAIL':'PASS',
 dirty?'Working tree is not clean; evidence cannot be attributed to source alone':'Source revision '+sha.slice(0,12));
const tasks=[
 ['typescript',['run','typecheck'],6*60*1000],
 ['source-contracts',['test'],6*60*1000],
 ['static-export',['run','build'],12*60*1000],
 ['css-inventory',['run','qa:css'],2*60*1000],
 ['image-audit',['run','images:audit'],3*60*1000],
 ['browser-e2e',['run','test:e2e'],14*60*1000]
];
for(const [id,args,timeoutMs] of tasks){
 if(id==='browser-e2e'&&gates.find(x=>x.id==='static-export')?.status!=='PASS'){
  mark(id,'NOT_TESTED','Static export failed; browser suite would not test the current revision');
  continue;
 }
 process.stdout.write('Running '+id+' (manual final QA)...\n');
 const t0=Date.now();
 const result=run('npm',args,timeoutMs);
 const pass=result.exitCode===0&&!result.error;
 mark(id,pass?'PASS':'FAIL',pass?'Command completed with exit code 0':
  result.error||'Command failed, exit code '+String(result.exitCode),{
  durationMs:Date.now()-t0,command:'npm '+args.join(' '),
  exitCode:result.exitCode,stdoutTail:result.stdout.slice(-12000),
  stderrTail:result.stderr.slice(-12000)
 });
}
const passes=gates.filter(g=>g.status==='PASS').length;
const report={
 schemaVersion:1,source:'owner-invoked-local-final-acceptance',
 startedAt:started,completedAt:now(),gitSha:sha,dirty,
 node:process.version,platform:process.platform,environment:'manual',
 result:gates.every(g=>g.status==='PASS')?'ENGINEERING_GATES_PASS':'NOT_APPROVED',
 summary:{passed:passes,total:gates.length},gates,
 limitations:[
  'A PASS does not certify independent WCAG accessibility, field Core Web Vitals, SEO indexing, or visual owner approval.',
  'Production release additionally requires owner-approved screenshots, a real HTTPS domain and explicit signoff.',
  'This script never enables CI, Preview or background Worker tasks.'
 ]
};
const folder=join(cwd,'reports','quality');
mkdirSync(folder,{recursive:true});
const out=join(folder,'acceptance-'+(sha==='UNVERIFIED'?'unknown':sha.slice(0,12))+'.json');
writeFileSync(out,JSON.stringify(report,null,2)+'\n','utf8');
process.stdout.write('\nEvidence report: '+out+'\n');
process.stdout.write('Result: '+report.result+' ('+passes+'/'+gates.length+' gates PASS)\n');
if(report.result!=='ENGINEERING_GATES_PASS')process.exitCode=1;
