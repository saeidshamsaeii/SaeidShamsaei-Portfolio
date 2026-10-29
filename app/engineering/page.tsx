import type {Metadata} from 'next';
import EngineeringIndex from '@/components/EngineeringIndex';
import {siteApproved,publicCanonical} from '@/lib/siteRelease';
import '../engineering.css';

export const metadata:Metadata={
 robots:{index:siteApproved,follow:siteApproved},
 alternates:siteApproved?{canonical:publicCanonical('/engineering/')}:undefined,
 title:'Engineering Index | Saeid Shamsaei',
 description:'Examine documented architecture decisions, trade-offs and GitHub evidence for GARTAL, AI Development Factory, DigiRezhim and Petiwoo.',
 openGraph:{
  title:'Engineering Index — Saeid Shamsaei',
  description:'Source-grounded technical decisions, architecture boundaries and source references for four software product families.'
 }
};

export default function EngineeringPage(){return <EngineeringIndex/>;}
