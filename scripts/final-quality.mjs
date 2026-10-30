// Deliberately OWNER-INVOKED final acceptance. Never called by Worker/Sync.
// Produces an evidence report tied to the exact Git SHA; does not claim
// runtime/browser success from source code or a GitHub push.
import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import process from 'node:process';

const cwd=process.cwd();
const now=()=>new Date().toISOString();
const started=now();
const maxBuffer=16*1024*1024;
const run=(exe,args,timeoutMs=12*60*1000)=>{
 // Windows .cmd shims require cmd.exe; avoid shell:true argument interpolation
 // (and its Node DEP0190 warning). The command/args here are hard-coded by
 // this owner-invoked QA script, never taken from untrusted input.
 const npmCli=exe==='npm'?process.env.npm_execpath:null;
 // npm run sets npm_execpath to npm-cli.js. Invoke it through Node itself
 // for correct quoting on Windows and Linux without shell interpolation.
 const windowsCmd=exe==='npm'&&!npmCli&&process.platform==='win32';
 const command=npmCli?process.execPath:
  windowsCmd?(process.env.ComSpec||'cmd.exe'):exe;
 const argv=npmCli?[npmCli,...args]:
  windowsCmd?['/d','/s','/c','npm.cmd '+args.join(' ')]:args;
 const result=spawnSync(command,argv,{cwd,encoding:'utf8',maxBuffer,
  timeout:timeoutMs,shell:false,windowsHide:true});
 return {exitCode:result.status,error:result.error?.message||null,
  stdout:result.stdout||'',stderr:result.stderr||''};
};
const git=run('git',['rev-parse','HEAD']);
const sha=git.exitCode===0?git.stdout.trim():'UNVERIFIED';
const checkout=run('git',['status','--porcelain']);
const dirty=checkout.exitCode!==0||checkout.stdout.trim().length>0;
const dirtyPaths=checkout.stdout.trim().split(/\r?\n/).filter(Boolean);
if(dirty){
 process.stdout.write('Git working tree changes detected before QA:\n');
 for(const changed of dirtyPaths.slice(0,30))process.stdout.write('  '+changed+'\n');
 if(dirtyPaths.length>30)process.stdout.write('  ... '+(dirtyPaths.length-30)+' more\n');
}
const lockTracked=run('git',['ls-files','--error-unmatch','package-lock.json']);
const gates=[];
const mark=(id,status,detail,extra={})=>{
 const entry={id,status,detail,...extra};gates.push(entry);
 process.stdout.write('['+status+'] '+id+': '+detail+'\n');
};
const lockfile=existsSync(join(cwd,'package-lock.json'));
const rootPackage=JSON.parse(readFileSync(join(cwd,'package.json'),'utf8'));
let consistentLock=false;
if(lockfile){
 try{
  const lock=JSON.parse(readFileSync(join(cwd,'package-lock.json'),'utf8'));
  const root=lock.packages?.[''];
  consistentLock=Number(lock.lockfileVersion)>=3&&
   root?.name===rootPackage.name&&
   ['dependencies','devDependencies'].every(group=>
    JSON.stringify(Object.entries(rootPackage[group]||{}).sort())===
    JSON.stringify(Object.entries(root[group]||{}).sort()));
 }catch{/* malformed lockfile is a blocking failure */}
}
const verifiedLock=lockfile&&consistentLock&&lockTracked.exitCode===0;
mark('reproducible-install',verifiedLock?'PASS':'FAIL',
 !lockfile?'Missing package-lock.json':
 !consistentLock?'Lockfile is invalid or does not match package.json':
 lockTracked.exitCode!==0?'Lockfile is not committed to Git':
 'Committed npm lockfile matches package manifest');
if(sha==='UNVERIFIED')mark('git-provenance','FAIL','Cannot resolve HEAD SHA');
else mark('git-provenance',dirty?'FAIL':'PASS',
 dirty?'Working tree is not clean; evidence cannot be attributed to source alone':'Source revision '+sha.slice(0,12));
const tasks=[
 // Installed only during an explicit owner-invoked final QA, never by Worker.
 ['dependency-install',['ci','--no-audit','--no-fund'],10*60*1000],
 ['typescript',['run','typecheck'],6*60*1000],
 ['source-contracts',['test'],6*60*1000],
 ['static-export',['run','build'],12*60*1000],
 ['css-inventory',['run','qa:css'],2*60*1000],
 ['image-audit',['run','images:audit'],3*60*1000],
 ['browser-e2e',['run','test:e2e'],14*60*1000]
];
for(const [id,args,timeoutMs] of tasks){
 if(id==='dependency-install'&&!verifiedLock){
  mark(id,'NOT_TESTED','Cannot run npm ci without committed package-lock.json');
  continue;
 }
 if(id!=='dependency-install'&&
    gates.find(x=>x.id==='dependency-install')?.status!=='PASS'){
  mark(id,'NOT_TESTED','Dependency installation was not verified; no tests were executed');
  continue;
 }
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
 if(!pass){
  process.stdout.write('--- '+id+' diagnostic stdout (last 6000 chars) ---\n'+
   (result.stdout.slice(-6000)||'(empty)')+'\n');
  process.stdout.write('--- '+id+' diagnostic stderr (last 6000 chars) ---\n'+
   (result.stderr.slice(-6000)||'(empty)')+'\n');
  if(id==='browser-e2e'&&/Executable doesn't exist|playwright install/i.test(result.stderr+'\n'+result.stdout))
   process.stdout.write('Browser is missing. Run: npx playwright install chromium\n');
 }
}
const passes=gates.filter(g=>g.status==='PASS').length;
const report={
 schemaVersion:2,source:'owner-invoked-local-final-acceptance',
 startedAt:started,completedAt:now(),gitSha:sha,dirty,dirtyPaths,
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
