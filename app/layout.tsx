import type { Metadata, Viewport } from 'next';
import './globals.css';
const live=process.env.NEXT_PUBLIC_SITE_READY==='true';
export const metadata:Metadata={
 title:{default:'Saeid Shamsaei | Systems & Software Architecture',template:'%s | Saeid Shamsaei'},
 description:'Saeid Shamsaei — enterprise SaaS architecture, software systems and source-backed project case studies.',
 robots:{index:live,follow:live}, metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://example.invalid'),
 openGraph:{title:'Saeid Shamsaei — Software, thoughtfully engineered.',type:'website'}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#101413'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}
