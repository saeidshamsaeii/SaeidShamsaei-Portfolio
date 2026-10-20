import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import CaseStudy from '@/components/CaseStudy';
import {projects,type ProjectId} from '@/data/portfolio';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.id}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
const {slug}=await params;const p=projects.find(x=>x.id===slug);
if(!p)return {title:'Not found'};
return {title:p.brand+' — Case Study',description:p.intro.en,robots:{index:process.env.NEXT_PUBLIC_SITE_READY==='true',follow:true}};
}
export default async function CasePage({params}:{params:Promise<{slug:string}>}){
const {slug}=await params;if(!projects.some(p=>p.id===slug))notFound();
return <CaseStudy id={slug as ProjectId}/>;
}
