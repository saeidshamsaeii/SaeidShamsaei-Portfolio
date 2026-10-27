import type {Metadata} from 'next';
import EngineeringIndex from '@/components/EngineeringIndex';
import '../engineering.css';

export const metadata:Metadata={
 title:'Engineering Index | Saeid Shamsaei',
 description:'Examine documented architecture decisions, trade-offs and GitHub evidence for GARTAL, AI Development Factory, DigiRezhim and Petiwoo.',
 openGraph:{
  title:'Engineering Index — Saeid Shamsaei',
  description:'Source-grounded technical decisions, architecture boundaries and source references for four software product families.'
 }
};

export default function EngineeringPage(){return <EngineeringIndex/>;}
