import type {ProjectId} from './portfolio';

/**
 * Each project has EXACTLY three evidence-led homepage slides:
 * 01 / Problem: the specific job or operational constraint
 * 02 / Implementation: what the checked-in software actually does
 * 03 / Evidence: what is confirmed and what still needs acceptance
 * Links to the full sourced case study appear on the third slide.
 * No invented customers, conversions, clinical outcomes or revenue.
 */
export type HomeBeat={
 eyebrow:string;headline:string;copy:string;notes:string[];
 pace:number;duration:number;mode:'statement'|'system'|'experience';
};
export const homeStories:Record<ProjectId,{beats:[HomeBeat,HomeBeat,HomeBeat]}>={
 gartal:{beats:[
  {eyebrow:'01 / THE PROBLEM',headline:'A client inquiry is not a product platform.',
   copy:'The studio needs service-specific pages and a reliable way to receive project briefs. The separate product platform needs shared contracts without forcing independent applications into a single runtime.',
   notes:['Client task: choose a service and send a brief','Engineering task: avoid duplicating product contracts'],
   pace:.69,duration:12,mode:'statement'},
  {eyebrow:'02 / IMPLEMENTATION',headline:'Next.js intake. Versioned product contracts.',
   copy:'GARTAL-SITE uses Next.js service routes and a validated lead API with PostgreSQL and Drizzle. Gartal-Platform separately defines contracts for administration, servers, commerce and industry packs.',
   notes:['Zod validation on project requests','Separate admin, server and storefront boundaries'],
   pace:1.08,duration:13,mode:'system'},
  {eyebrow:'03 / WHAT IS VERIFIED',headline:'Source exists. Launch results need proof.',
   copy:'The repositories contain service routes, inquiry handling and industry-pack descriptors. A production launch, paying customers or completed cross-product integration cannot be concluded from source files alone.',
   notes:['Evidence: GARTAL-SITE and Gartal-Platform repositories','Status: implementation documented; deployment not certified'],
   pace:.86,duration:11,mode:'experience'}
 ]},
 factory:{beats:[
  {eyebrow:'01 / THE PROBLEM',headline:'A GitHub commit does not update a Windows checkout.',
   copy:'Managing many repositories creates two different states: the remote revision and what the owner’s machine actually has. Uncommitted local files also need protection during synchronization.',
   notes:['Check remote and installed revisions separately','Never overwrite local edits to make a dashboard look green'],
   pace:.71,duration:12,mode:'statement'},
  {eyebrow:'02 / IMPLEMENTATION',headline:'One Windows Worker. Guarded Git synchronization.',
   copy:'The local Worker monitors active repositories, distinguishes pull and push needs, and uses fast-forward operations when safe. A loopback dashboard reports sync status; dirty or diverged checkouts require review.',
   notes:['GitHub remains source of truth','One local Worker; explicit Git state and lifecycle'],
   pace:1.16,duration:13,mode:'system'},
  {eyebrow:'03 / WHAT IS VERIFIED',headline:'Report NOT_TESTED when no test ran.',
   copy:'Guardian evidence is tied to Git metadata and can identify unverified work. Under current owner policy, the Worker does not automatically run CI, builds, tests or previews; a pushed commit is not a release.',
   notes:['Evidence: AI-Development-Factory and Guardian contract','Manual acceptance remains separate from repository sync'],
   pace:.79,duration:11,mode:'experience'}
 ]},
 digirezhim:{beats:[
  {eyebrow:'01 / THE PROBLEM',headline:'Patient records and nutrition rules need one reviewable workflow.',
   copy:'Physicians need to handle registration, patient context and diet planning in connected steps. Clinical nutrition workflows also depend on scientific rules that must be reviewed rather than hidden inside UI defaults.',
   notes:['Physician identity and patient context','Clinical rule exceptions require expert review'],
   pace:.65,duration:13,mode:'statement'},
  {eyebrow:'02 / IMPLEMENTATION',headline:'Four services, with distinct clinical responsibilities.',
   copy:'DigiRezhim separates public web, doctor and admin views, and API services. Next.js and NestJS use PostgreSQL, Prisma and Redis to connect access control, patient records and nutrition workflow entry points.',
   notes:['Separate admin and clinical access surfaces','Structured persistence for physician workflows'],
   pace:1.13,duration:12,mode:'system'},
  {eyebrow:'03 / WHAT IS VERIFIED',headline:'Clinical acceptance is not a code-only decision.',
   copy:'Repository documentation covers doctor dashboards and Excel-to-UI rule migration. Medical accuracy, unresolved source-data exceptions and production compliance still need physician and operational verification.',
   notes:['Evidence: DigiRezhim repository and doctor dashboard','No unsupported clinical efficacy or certification claims'],
   pace:.74,duration:12,mode:'experience'}
 ]},
 petiwoo:{beats:[
  {eyebrow:'01 / THE PROBLEM',headline:'A pet catalog must reflect species and real stock.',
   copy:'Pet buyers browse by animal, category and product suitability. Storefront navigation must also show relevant prices and availability instead of treating every product as the same generic listing.',
   notes:['Species and category-driven discovery','Availability matters before checkout'],
   pace:.82,duration:12,mode:'statement'},
  {eyebrow:'02 / IMPLEMENTATION',headline:'Catalog APIs connect product pages to the cart.',
   copy:'The Next.js storefront provides search, product details, categories, basket and checkout routes. Commerce APIs supply catalog data, while Zustand manages local basket state and quantity calculations.',
   notes:['Product and brand data come from APIs','Cart quantities and totals are computed in state'],
   pace:1.22,duration:12,mode:'system'},
  {eyebrow:'03 / WHAT IS VERIFIED',headline:'Checkout code is not evidence of completed sales.',
   copy:'Source files confirm catalog pages, cart state and order-request pathways. Real payment processing, fulfilled orders and sales performance must be tested against deployed services, not inferred from a route.',
   notes:['Evidence: Core-Petshop-Store and platform contracts','No fabricated revenue, customers or conversion rates'],
   pace:.90,duration:11,mode:'experience'}
 ]}
};
