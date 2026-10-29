import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,resolve,sep} from 'node:path';

const root=resolve(process.cwd(),'out');
const port=Number(process.env.PORT||process.argv[2]||3200);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname);}
 catch{res.writeHead(400);res.end('Bad request');return;}
 if(!extname(pathname)&&!pathname.endsWith('/')){
  res.writeHead(308,{Location:pathname+'/'+new URL(req.url||'/','http://localhost').search});
  res.end();return;
 }
 const relative=pathname.endsWith('/')?pathname+'index.html':pathname;
 const file=resolve(root,'.'+relative);
 if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end('Forbidden');return;}
 try{
  const body=await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  res.end(body);
 }catch{
  // Serve the Next.js static-export 404 artwork with a real 404 status.
  // This also makes local browser acceptance match an ordinary static host.
  try{
   const fallback=await readFile(resolve(root,'404.html'));
   res.writeHead(404,{'Content-Type':'text/html; charset=utf-8',
    'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
   res.end(fallback);
  }catch{
   res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
   res.end('Not found: run npm run build first');
  }
 }
});
server.listen(port,'127.0.0.1',()=>{console.log('Portfolio preview: http://localhost:'+port);});
