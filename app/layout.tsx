import type {Metadata,Viewport} from 'next';
import './globals.css';
import './motion.css';
import './cinematic.css';
const ready=process.env.NEXT_PUBLIC_SITE_READY==='true';
const base=process.env.NEXT_PUBLIC_SITE_URL||'https://example.invalid';
export const metadata:Metadata={title:'Saeid Shamsaei — Software Architect',description:'GARTAL, AI Development Factory, DigiRezhim, Petiwoo. An editorial scroll-driven portfolio.',metadataBase:new URL(base),robots:{index:ready,follow:ready},icons:{icon:'/assets/ss-gold.webp'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#080b0f'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='en' dir='ltr'><head><link rel='preload' href='/assets/portrait.webp' as='image'/><link rel='preload' href='/assets/ss-gold.webp' as='image'/><link rel='preload' href='/assets/projects.webp' as='image'/></head><body>{children}</body></html>;}
