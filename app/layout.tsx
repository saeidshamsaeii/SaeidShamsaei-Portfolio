import type {Metadata,Viewport} from 'next';
import {siteApproved,siteOrigin,publicCanonical} from '@/lib/siteRelease';
import './globals.css';
import './motion.css';
import './cinematic.css';
import './polished.css';
import './scroll-experience.css';
import './editorial-refinement.css';
import './atelier.css';
import './release-polish.css';
import './v3-experience.css';
import './v4-minimal-scroll.css';
import './v4-detail.css';
import './office-hero-v5.css';
import './guided-story.css';
import './edition07.css';
import './edition08.css';
import './edition09.css';
import './edition10.css';
import './edition11.css';
import './edition13.css';
import './edition14.css';
import './edition16.css';
import './edition18.css';
import './edition19.css';
import './edition20.css';
import './quality.css';
import './case-editorial.css';
import './biography-and-reveal.css';

const title='Saeid Shamsaei — Software Architecture & Product Engineering';
const description='Independent software architecture, product engineering and source-informed case studies for GARTAL, DigiRezhim, AI Factory and Petiwoo.';
export const metadata:Metadata={
 title,description,metadataBase:new URL(siteOrigin||'https://example.invalid'),
 robots:{index:siteApproved,follow:siteApproved},
 alternates:siteApproved?{canonical:publicCanonical('/')}:undefined,
 openGraph:{type:'website',locale:'en_US',title,description,siteName:'Saeid Shamsaei',images:[{url:'/assets/hires/logo.webp',width:1254,height:1254,alt:'Saeid Shamsaei'}]},
 twitter:{card:'summary_large_image',title,description,images:['/assets/hires/logo.webp']},
 icons:{icon:'/assets/hires/logo.webp'}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#000000'};
const identity={
 '@context':'https://schema.org','@type':'Person',name:'Saeid Shamsaei',
 jobTitle:'Software Architect and Product Engineer',
 url:siteApproved?siteOrigin!:undefined,
 email:'saeidshamsaeii00@gmail.com',
 telephone:'+989017470729',
 sameAs:['https://github.com/saeidshamsaeii','https://www.linkedin.com/in/saeidshamsaei/','https://t.me/sd_shms']
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" dir="ltr">
  <head>
   {/* The first paint hides mobile intro words until the photo hold ends.
       Without JS there is no phase transition, so keep content readable. */}
   <noscript><style>{`
    @media (max-width:760px){
     .sx-v18-site #intro.sx-v19-cover .sx-v19-cover-content,
     .sx-v18-site #intro.sx-v19-cover .sx-v19-cover-content *,
     .sx-v18-site #intro.sx-v19-cover [data-reveal-word]{
      visibility:visible!important;
      opacity:1!important;
      clip-path:none!important;
      pointer-events:auto!important;
     }
    }
    .sx-v18-site #intro.sx-v19-cover .sx-v18-cover-links{
     visibility:visible!important;
     opacity:1!important;
     pointer-events:auto!important;
    }
   `}</style></noscript>
   {/* Avoid preloading home-only images on the five non-home routes.
       The hero portrait itself has fetchPriority="high" on the homepage. */}
   {siteApproved&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(identity).replace(/</g,'\\u003c')}}/>}
  </head>
  <body>{children}</body>
 </html>;
}
