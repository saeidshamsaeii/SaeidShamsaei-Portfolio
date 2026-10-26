import type {ProjectId} from './portfolio';

/**
 * The homepage is four distinct editorial introductions, not twenty-four
 * repeating case-study excerpt panels. The full, sourced technical record
 * remains in caseNarratives.ts and /work/[slug].
 */
export type HomeBeat={eyebrow:string;headline:string;copy:string;notes:string[];pace:number;duration:number;mode:'statement'|'system'|'experience'};
export const homeStories:Record<ProjectId,{signature:string;beats:[HomeBeat,HomeBeat,HomeBeat];ending:string}>={
 gartal:{
  signature:'A studio at the front. A platform underneath.',
  beats:[
   {eyebrow:'01 / THE FRONT DOOR',headline:'A clear route from idea to inquiry.',
    copy:'The studio experience explains website design, bespoke software and automation through focused service paths. The job of the interface is to help a real person make the next decision — not to impress them with invented statistics.',
    notes:['Services shaped around client intent','Dedicated inquiry and privacy flows'],
    pace:.69,duration:12,mode:'statement'},
   {eyebrow:'02 / THE FOUNDATIONS',headline:'Reuse without forcing everything together.',
    copy:'Behind the studio is a different codebase: a versioned business-platform contract. Core Server, Core Admin and specialist storefronts keep their own runtimes while sharing definitions that need to agree.',
    notes:['Independent application boundaries','Versioned industry-pack contracts'],
    pace:1.08,duration:13,mode:'system'},
   {eyebrow:'03 / THE DECISION',headline:'Distinguish the promise from the platform.',
    copy:'A service page and an operations dashboard solve different problems. Presenting them distinctly makes the architecture understandable and keeps the brand experience grounded in the actual software.',
    notes:['GARTAL-SITE · presentation and intake','Gartal-Platform · reusable product contracts'],
    pace:.86,duration:11,mode:'experience'}],
  ending:'Digital ambition, engineered with boundaries.'
 },
 factory:{
  signature:'The remote commit is not the local machine.',
  beats:[
   {eyebrow:'01 / THE REAL PROBLEM',headline:'A push is not a deployment.',
    copy:'GitHub can report a new revision while a Windows checkout is out of date or contains local changes. Conflating those states creates the illusion of automation without evidence.',
    notes:['GitHub HEAD is source truth','The owner machine needs separate verification'],
    pace:.71,duration:12,mode:'statement'},
   {eyebrow:'02 / THE MECHANISM',headline:'One worker. Guarded synchronization.',
    copy:'The design centers on a single owner-controlled Windows Worker. Active repositories are inspected against trusted origins and updated with protected fast-forward behavior rather than destructive cleanup.',
    notes:['Active-project lifecycle','No silent reset of local work'],
    pace:1.16,duration:13,mode:'system'},
   {eyebrow:'03 / THE PRINCIPLE',headline:'Unknown is a useful answer.',
    copy:'Guardian evidence can be present, stale or not tested. The dashboard keeps those differences visible, and current source policy leaves automatic Worker CI, builds and previews disabled.',
    notes:['Source-anchored Guardian reports','Human-directed quality verification'],
    pace:.79,duration:11,mode:'experience'}],
  ending:'Control begins with a verifiable state.'
 },
 digirezhim:{
  signature:'Design for the clinician, not the dashboard.',
  beats:[
   {eyebrow:'01 / PROFESSIONAL CONTEXT',headline:'The physician comes first.',
    copy:'The doctor workspace takes identity, medical registration, account access and patient information from server-backed state. It should never invent a verified profile or a successful clinical result for the sake of a beautiful screen.',
    notes:['Professional registration and readiness','Authenticated patient views'],
    pace:.65,duration:13,mode:'statement'},
   {eyebrow:'02 / SOFTWARE SHAPE',headline:'Four surfaces. Clear responsibilities.',
    copy:'Public web, administrative web, public API and administrative API are separated in the source architecture. Next.js, NestJS, PostgreSQL and Redis support the practical boundaries of the product.',
    notes:['Independent UI and API surfaces','Structured persistence and permissions'],
    pace:1.13,duration:12,mode:'system'},
   {eyebrow:'03 / THE HUMAN DETAIL',headline:'A treatment pathway is not a metric.',
    copy:'Nutrition intake, structured review and follow-up require context and professional interpretation. This case tells the implementation story without borrowing patient records or promising unverified clinical efficacy.',
    notes:['Longitudinal nutrition workflows','Clinical validation remains separate'],
    pace:.74,duration:12,mode:'experience'}],
  ending:'Precision is a product decision.'
 },
 petiwoo:{
  signature:'Commerce that understands who you shop for.',
  beats:[
   {eyebrow:'01 / THE STARTING POINT',headline:'A catalogue with a point of view.',
    copy:'Shopping for dogs, cats and birds is not the same journey. A species-aware category tree shortens the distance between the animal a customer cares for and the products worth considering.',
    notes:['Species-led navigation','Product discovery by need'],
    pace:.82,duration:12,mode:'statement'},
   {eyebrow:'02 / THE ENGINE',headline:'Real stock. Real product context.',
    copy:'The storefront transforms category, brand, price, discount and availability feeds into consistent product views. Inventory state belongs to commerce logic, not to decorative mock data.',
    notes:['Catalog transformations','Stock and promotion semantics'],
    pace:1.22,duration:12,mode:'system'},
   {eyebrow:'03 / THE EXPERIENCE',headline:'Make checkout feel inevitable.',
    copy:'Search, detail pages, basket state and checkout form a clear retail journey. The portfolio shows the actual feature boundaries without inventing orders, conversion figures or sales success.',
    notes:['Next.js storefront and cart','Connected checkout pathways'],
    pace:.90,duration:11,mode:'experience'}],
  ending:'Care begins before the checkout.'
 }
};
