import type {MetadataRoute} from 'next';
import {projects} from '@/data/portfolio';
export default function sitemap():MetadataRoute.Sitemap{
const url=process.env.NEXT_PUBLIC_SITE_URL;
if(process.env.NEXT_PUBLIC_SITE_READY!=='true'||!url)return [];
return [{url:url+'/',changeFrequency:'monthly',priority:1},...projects.map(p=>({url:url+'/work/'+p.id+'/',changeFrequency:'monthly' as const,priority:.7}))];
}