import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import CaseStudy from '@/components/CaseStudy';
import {projects,type ProjectId} from '@/data/portfolio';
import {siteApproved,publicCanonical} from '@/lib/siteRelease';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
const {slug}=await params;const p=projects.find(x=>x.id===slug);
if(!p)return {title:'Not found'};
return {
 title:p.brand+' — Case Study | Saeid Shamsaei',
 description:p.intro.en,
 robots:{index:siteApproved,follow:siteApproved},
 alternates:siteApproved?{canonical:publicCanonical('/work/'+p.id+'/')}:undefined,
 openGraph:{type:'article',title:p.brand+' — Case Study | Saeid Shamsaei',
  description:p.intro.en,images:[{url:'/assets/hires/project-'+p.id+'.webp',
   width:1448,height:1086,alt:p.brand+' — editorial project illustration'}]}
};
}
export default async function CasePage({params}:{params:Promise<{slug:string}>}){
const {slug}=await params;if(!projects.some(p=>p.id===slug))notFound();
return <CaseStudy id={slug as ProjectId}/>;
}
