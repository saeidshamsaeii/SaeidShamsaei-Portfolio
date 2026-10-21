import type {Metadata,Viewport} from 'next';
import './globals.css';
import './motion.css';
import './cinematic.css';
import './polished.css';
import './scroll-experience.css';
import './editorial-refinement.css';
import './atelier.css';
const ready=process.env.NEXT_PUBLIC_SITE_READY==='true';
const base=process.env.NEXT_PUBLIC_SITE_URL||'https://example.invalid';
export const metadata:Metadata={title:'Saeid Shamsaei — Product Architect & Engineer',description:'Selected software architecture, product engineering and design work by Saeid Shamsaei. Scroll-driven case studies, built with intent.',metadataBase:new URL(base),robots:{index:ready,follow:ready},icons:{icon:'/assets/hires/logo.webp'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#080b0f'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='en' dir='ltr'><head><link rel='preload' href='/assets/hires/portrait.webp' as='image'/><link rel='preload' href='/assets/hires/logo.webp' as='image'/></head><body>{children}</body></html>;}
