/**
 * A single conservative publication gate for metadata, sitemap and robots.
 * Committing code never implies owner approval or a public deployment.
 */
function approvedOrigin():string|null {
 const raw=process.env.NEXT_PUBLIC_SITE_URL?.trim();
 if(!raw)return null;
 try{
  const url=new URL(raw);
  const blocked=['localhost','127.0.0.1','0.0.0.0','example.invalid','example.com'];
  if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/'||
   blocked.includes(url.hostname)||url.hostname.endsWith('.local')||url.hostname.endsWith('.invalid'))
   return null;
  return url.origin;
 }catch{return null;}
}
export const siteOrigin=approvedOrigin();
export const siteApproved=process.env.NEXT_PUBLIC_SITE_READY==='true'&&siteOrigin!==null;
export function publicCanonical(pathname:string):string|undefined{
 if(!siteApproved||!siteOrigin)return undefined;
 const clean='/'+pathname.replace(/^\/+|\/+$/g,'');
 return siteOrigin+(clean==='/'?'/':clean+'/');
}
