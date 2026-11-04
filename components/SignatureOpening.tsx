'use client';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';

/** The cutout portrait is presentation-only; the office portrait owns SEO metadata. */
export function SignatureOpening({ready=false}:{ready?:boolean}){
 return <section id="intro" className="sx-v16-cover sx-v18-cover sx-v19-cover"
  data-mobile-photo-phase="photo"
  data-tour-stop data-tour-label="Introducing Saeid" data-tour-duration="13" data-tour-pace=".77"
  aria-labelledby="sx-v16-name">
  <div className="sx-v19-photo-background">
   <div className="sx-v19-portrait-art" aria-hidden="true"/>
  </div>
  <div className="sx-v19-cover-content">
   <h1 id="sx-v16-name">
    <WordReveal as="span" text={'SAEID\nSHAMSAEI'} mode="lines" ready={ready}/>
   </h1>
   <WordReveal as="p" className="sx-v18-cover-lead"
    text={'I make complex digital systems\nfeel considered, useful and human.'}
    mode="lines" ready={ready}/>
   <div className="sx-v18-cover-links">
    <a href="#work-index">View work <span aria-hidden="true">↗</span></a>
    <Link href="/engineering/">Engineering <span aria-hidden="true">↗</span></Link>
   </div>
  </div>
 </section>;
}
