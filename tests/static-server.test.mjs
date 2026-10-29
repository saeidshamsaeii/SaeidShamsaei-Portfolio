import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer,request as httpRequest} from 'node:http';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const script=fileURLToPath(new URL('../scripts/serve-static.mjs',import.meta.url));
async function unusedPort(){
 return await new Promise((resolvePort,reject)=>{
  const probe=createServer();
  probe.once('error',reject);
  probe.listen(0,'127.0.0.1',()=>{
   const addr=probe.address();
   if(!addr||typeof addr==='string'){probe.close();reject(new Error('No TCP port'));return;}
   probe.close(()=>resolvePort(addr.port));
  });
 });
}
async function requestPath(port,path){
 return await new Promise((done,fail)=>{
  const req=httpRequest({hostname:'127.0.0.1',port,path,method:'GET'},res=>{
   const chunks=[];
   res.on('data',chunk=>chunks.push(chunk));
   res.on('end',()=>done({status:res.statusCode,location:res.headers.location,
    type:res.headers['content-type'],body:Buffer.concat(chunks).toString('utf8')}));
  });
  req.once('error',fail);req.end();
 });
}
test('static export preview serves routes, 404 and unsafe-path refusals',async t=>{
 const temp=mkdtempSync(join(tmpdir(),'portfolio-static-qa-'));
 mkdirSync(join(temp,'out','engineering'),{recursive:true});
 writeFileSync(join(temp,'out','index.html'),'HOME TEST');
 writeFileSync(join(temp,'out','engineering','index.html'),'ENGINEERING TEST');
 writeFileSync(join(temp,'out','404.html'),'<h1>CUSTOM 404 TEST</h1>');
 const port=await unusedPort();
 const child=spawn(process.execPath,[script],{
  cwd:temp,env:{...process.env,PORT:String(port)},stdio:['ignore','pipe','pipe']
 });
 t.after(async()=>{
  // On Windows, allow the subprocess to actually exit before unlinking
  // its temporary working directory (otherwise cleanup can hit EBUSY).
  if(child.exitCode===null&&child.signalCode===null){
   const closed=new Promise(done=>{
    const timer=setTimeout(done,3000);
    child.once('exit',()=>{clearTimeout(timer);done();});
   });
   child.kill();
   await closed;
  }
  rmSync(temp,{recursive:true,force:true,maxRetries:5,retryDelay:100});
 });
 await new Promise((ok,fail)=>{
  const timeout=setTimeout(()=>fail(new Error('Preview server failed to start')),6000);
  const ready=()=>{clearTimeout(timeout);ok();};
  child.stdout.once('data',ready);
  child.once('error',error=>{clearTimeout(timeout);fail(error);});
  child.once('exit',code=>{clearTimeout(timeout);fail(new Error('Preview exited '+code));});
 });
 const home=await requestPath(port,'/');
 assert.equal(home.status,200);
 assert.equal(home.body,'HOME TEST');
 assert.match(home.type,/text\/html/);
 const inner=await requestPath(port,'/engineering/');
 assert.equal(inner.status,200);
 assert.equal(inner.body,'ENGINEERING TEST');
 const canonical=await requestPath(port,'/engineering?x=1');
 assert.equal(canonical.status,308);
 assert.equal(canonical.location,'/engineering/?x=1');
 const missing=await requestPath(port,'/missing-page/');
 assert.equal(missing.status,404);
 assert.match(missing.body,/CUSTOM 404 TEST/);
 for(const path of ['/%2e%2e/%2e%2e/etc/passwd','/./engineering/','/%ZZ']){
  const invalid=await requestPath(port,path);
  assert.equal(invalid.status,400,'invalid path '+path);
 }
});
