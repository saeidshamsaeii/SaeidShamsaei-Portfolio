'use client';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';

/** A genuinely split portrait composition: the authentic image never sits
 * behind any text. Only native scrolling and line-by-line text reveal.
 */
export function SignatureOpening(){
 return <section id="intro" className="sx-v16-cover sx-v18-cover"
  data-tour-stop data-tour-label="Introducing Saeid" data-tour-duration="13" data-tour-pace=".77"
  aria-labelledby="sx-v16-name">
  <div className="sx-v18-cover-layout">
   <div className="sx-v18-cover-copy">
    <h1 id="sx-v16-name">
     <WordReveal as="span" text={'SAEID\nSHAMSAEI'} mode="lines"/>
    </h1>
    <WordReveal className="sx-v18-cover-lead" text="Design. Code. Architecture." mode="lines"/>
    <div className="sx-v18-cover-links">
     <a href="#work-index">View work <span aria-hidden="true">↗</span></a>
     <Link href="/engineering/">Engineering <span aria-hidden="true">↗</span></Link>
    </div>
   </div>
   <figure className="sx-v16-cover-image sx-v18-portrait-frame">
    <img src="/assets/hires/portrait.webp" width={1122} height={1402}
     alt="Portrait of Saeid Shamsaei" decoding="async" fetchPriority="high"/>
   </figure>
  </div>
  <div className="sx-v18-cover-rule" aria-hidden="true"/>
 </section>;
}
