import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots {
 const ready=process.env.NEXT_PUBLIC_SITE_READY==='true';
 return {rules:{userAgent:'*',allow:ready?'/':undefined,disallow:ready?undefined:'/'}};
}
