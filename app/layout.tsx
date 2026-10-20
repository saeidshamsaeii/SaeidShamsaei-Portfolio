import type {Metadata,Viewport} from 'next';
import './globals.css';
const ready=process.env.NEXT_PUBLIC_SITE_READY==='true';
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://example.invalid';
export const metadata:Metadata={
 title:{default:'Saeid Shamsaei — Software Architect & Product Engineer',template:'%s | Saeid Shamsaei'},
 description:'Selected work by Saeid Shamsaei: GARTAL enterprise SaaS, AI Development Factory, DigiRezhim clinical nutrition and Petiwoo.',
 metadataBase:new URL(siteUrl),
 alternates:{canonical:'/'},
 openGraph:{title:'Saeid Shamsaei — Software Architecture & Selected Work',description:'Systems. Products. Experiences.',type:'website',url:siteUrl},
 robots:{index:ready,follow:ready},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0d0e10'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" dir="ltr"><body>{children}</body></html>;}
