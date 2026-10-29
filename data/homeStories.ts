import type {ProjectId} from './portfolio';

/**
 * The homepage is four distinct editorial introductions, not twenty-four
 * repeating case-study excerpt panels. The full, sourced technical record
 * remains in caseNarratives.ts and /work/[slug].
 */
export type HomeBeat={eyebrow:string;headline:string;copy:string;notes:string[];pace:number;duration:number;mode:'statement'|'system'|'experience'};
export const homeStories:Record<ProjectId,{signature:string;beats:[HomeBeat,HomeBeat,HomeBeat];ending:string}>={
 gartal:{
  signature:'A service website for project inquiries. A separate platform for product contracts.',
  beats:[
   {eyebrow:'01 / THE FRONT DOOR',headline:'Service routes. A real inquiry workflow.',
    copy:'GARTAL-SITE implements a Next.js service website for web design, custom software and automation, with localized public routes and a validated project-request API backed by PostgreSQL. The separate Gartal-Platform repository defines versioned contracts for independent products; it is not the studio website.',
    notes:['Services shaped around client intent','Dedicated inquiry and privacy flows'],
    pace:.69,duration:12,mode:'statement'},
   {eyebrow:'02 / THE FOUNDATIONS',headline:'Four applications. Shared contracts.',
    copy:'Gartal-Platform documents independent admin, server, storefront and licensing runtimes. Industry-pack manifests coordinate their versions without merging them into one application.',
    notes:['Independent application boundaries','Versioned industry-pack contracts'],
    pace:1.08,duration:13,mode:'system'},
   {eyebrow:'03 / THE DECISION',headline:'Separate what is built from what is verified.',
    copy:'A checked-in service page, inquiry route or versioned pack is verifiable in code. A public launch, customer outcome or completed integration needs separate acceptance evidence.',
    notes:['GARTAL-SITE · presentation and intake','Gartal-Platform · reusable product contracts'],
    pace:.86,duration:11,mode:'experience'}],
  ending:'Services on the front end. Contracts behind the products.'
 },
 factory:{
  signature:'GitHub updates and Windows checkouts are two different states.',
  beats:[
   {eyebrow:'01 / THE REAL PROBLEM',headline:'A commit does not mean a machine is updated.',
    copy:'The Factory reads GitHub revisions and coordinates one owner-controlled Windows Worker. It distinguishes a remote commit from the installed checkout and avoids overwriting uncommitted local work.',
    notes:['GitHub HEAD is source truth','The owner machine needs separate verification'],
    pace:.71,duration:12,mode:'statement'},
   {eyebrow:'02 / THE MECHANISM',headline:'One Windows Worker, guarded Git operations.',
    copy:'The Worker monitors active repositories and uses safe fast-forward Fetch/Pull. An allowlisted local code change can be committed and pushed when guards permit; dirty or divergent checkouts block destructive operations.',
    notes:['Active-project lifecycle','No silent reset of local work'],
    pace:1.16,duration:13,mode:'system'},
   {eyebrow:'03 / THE PRINCIPLE',headline:'No evidence means NOT_TESTED, not PASS.',
    copy:'Guardian reports are connected to exact Git evidence and may be present, stale or NOT_TESTED. Factory CI, automated builds, scans and managed previews remain disabled under owner policy.',
    notes:['Source-anchored Guardian reports','Human-directed quality verification'],
    pace:.79,duration:11,mode:'experience'}],
  ending:'Know what is in GitHub and what is on the machine.'
 },
 digirezhim:{
  signature:'A physician workspace backed by clinical workflows.',
  beats:[
   {eyebrow:'01 / PROFESSIONAL CONTEXT',headline:'Physician identity, patient context and nutrition rules.',
    copy:'DigiRezhim includes doctor registration and access flows, patient information and structured clinical nutrition workflows. Scientific Excel rules are being migrated into explicit data and nutrition-engine logic; medical review is not replaced by the UI.',
    notes:['Professional registration and readiness','Authenticated patient views'],
    pace:.65,duration:13,mode:'statement'},
   {eyebrow:'02 / SOFTWARE SHAPE',headline:'Four services with different responsibilities.',
    copy:'The repository describes separate public web, admin web, API and admin API services. Next.js and NestJS use PostgreSQL, Prisma and Redis; startup order and ports are coordinated for local development.',
    notes:['Independent UI and API surfaces','Structured persistence and permissions'],
    pace:1.13,duration:12,mode:'system'},
   {eyebrow:'03 / THE HUMAN DETAIL',headline:'Clinical source review stays explicit.',
    copy:'The source documents Excel-to-UI parity and reference-data migration, while scientific exceptions and physician acceptance need separate review. The portfolio does not claim clinical outcomes or production certification.',
    notes:['Longitudinal nutrition workflows','Clinical validation remains separate'],
    pace:.74,duration:12,mode:'experience'}],
  ending:'Structured nutrition software, with clinical review kept separate.'
 },
 petiwoo:{
  signature:'A pet storefront with products, cart and checkout.',
  beats:[
   {eyebrow:'01 / THE STARTING POINT',headline:'Products, search, basket and checkout.',
    copy:'The Next.js pet storefront includes product listings, product details, search, cart and checkout pages. Its catalogue supports category-based discovery, while the cart state persists locally using Zustand.',
    notes:['Species-led navigation','Product discovery by need'],
    pace:.82,duration:12,mode:'statement'},
   {eyebrow:'02 / THE ENGINE',headline:'Product data comes from commerce APIs.',
    copy:'The store uses API requests for product lists and detail records. Basket quantity and totals are computed in state; stock, prices and checkout requests depend on the connected commerce backend.',
    notes:['Catalog transformations','Stock and promotion semantics'],
    pace:1.22,duration:12,mode:'system'},
   {eyebrow:'03 / THE EXPERIENCE',headline:'The checkout route exists; sales are unverified.',
    copy:'The repository has cart and checkout routes plus order API wiring. A real payment launch, completed orders or sales performance cannot be inferred from those routes alone.',
    notes:['Next.js storefront and cart','Connected checkout pathways'],
    pace:.90,duration:11,mode:'experience'}],
  ending:'A traceable shopping flow, not invented sales results.'
 }
};
