import PortfolioExperience from '@/components/PortfolioExperience';
import {siteApproved,siteOrigin} from '@/lib/siteRelease';

const pageIdentity={
 '@context':'https://schema.org',
 '@graph':[
  {'@type':'WebSite','@id':siteOrigin+'/#website',url:siteOrigin+'/',
   name:'Saeid Shamsaei',alternateName:'Saeid Shamsaei Portfolio',inLanguage:'en'},
  {'@type':'WebPage','@id':siteOrigin+'/#webpage',url:siteOrigin+'/',
   name:'Saeid Shamsaei | Software Architect & Product Engineer',
   isPartOf:{'@id':siteOrigin+'/#website'},inLanguage:'en',
   mainEntity:{'@id':siteOrigin+'/#person'},
   primaryImageOfPage:{
    '@type':'ImageObject',
    contentUrl:siteOrigin+'/assets/hires/portrait-office.webp',
    name:'Saeid Shamsaei in his workspace'
   }
  }
 ]
};

export default function Page(){return <>
 {siteApproved&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(pageIdentity).replace(/</g,'\\u003c')}}/>}
 <PortfolioExperience/>
 </>;}
