'use client';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';
import {useSiteLocale} from '@/components/LocaleProvider';
import {siteText} from '@/data/siteTranslations';

/**
 * Full-bleed, owner-supplied grayscale portrait, positioned higher and
 * entirely unframed. Large type lives in the left negative-space region;
 * the photo remains crisp and visible on the right, never washed out.
 */
export function SignatureOpening({ready=false}:{ready?:boolean}){
 const {locale}=useSiteLocale();
 const t=siteText(locale);
 return <section id="intro" className="sx-v16-cover sx-v18-cover sx-v19-cover"
  data-tour-stop data-tour-label="Introducing Saeid" data-tour-duration="13" data-tour-pace=".77"
  aria-labelledby="sx-v16-name">
  <div className="sx-v19-photo-background">
   <img src="/assets/hires/portrait.webp" width={1122} height={1402}
    alt="Portrait of Saeid Shamsaei" decoding="async" fetchPriority="high"/>
  </div>
  <div className="sx-v19-cover-content">
   <h1 id="sx-v16-name">
    <WordReveal as="span" text={'SAEID\nSHAMSAEI'} mode="lines" ready={ready}/>
   </h1>
   <WordReveal as="p" className="sx-v18-cover-lead"
    text={t.coverLead}
    mode="lines" ready={ready}/>
   <div className="sx-v18-cover-links">
    <a href="#work-index">{t.viewWork} <span aria-hidden="true">↗</span></a>
    <Link href="/engineering/">{t.nav[2]} <span aria-hidden="true">↗</span></Link>
   </div>
  </div>
 </section>;
}
