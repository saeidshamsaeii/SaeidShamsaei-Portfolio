import type {MetadataRoute} from 'next';
import {siteApproved} from '@/lib/siteRelease';
export const dynamic='force-static';
export default function robots():MetadataRoute.Robots {
 if(!siteApproved)return {rules:{userAgent:'*',disallow:'/'}};
 return {rules:{userAgent:'*',allow:'/'}};
}
