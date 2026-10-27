import type {MetadataRoute} from 'next';
import {projects} from '@/data/portfolio';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{
const url=process.env.NEXT_PUBLIC_SITE_URL;
if(process.env.NEXT_PUBLIC_SITE_READY!=='true'||!url)return [];
return [{url:url+'/',changeFrequency:'monthly',priority:1},{url:url+'/engineering/',changeFrequency:'monthly',priority:.85},...projects.map(p=>({url:url+'/work/'+p.id+'/',changeFrequency:'monthly' as const,priority:.7}))];
}