import type {MetadataRoute} from 'next';
import {projects} from '@/data/portfolio';
import {siteApproved,publicCanonical} from '@/lib/siteRelease';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{
 if(!siteApproved)return [];
 return [
  {url:publicCanonical('/')!,changeFrequency:'monthly' as const,priority:1},
  {url:publicCanonical('/engineering/')!,changeFrequency:'monthly' as const,priority:.85},
  ...projects.map(project=>({
   url:publicCanonical('/work/'+project.id+'/')!,
   changeFrequency:'monthly' as const,priority:.7
  }))
 ];
}
