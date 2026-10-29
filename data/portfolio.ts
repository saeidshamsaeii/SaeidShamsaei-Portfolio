export type Locale = 'en';
export type Translated = {en:string};
export type ProjectId = 'gartal'|'factory'|'digirezhim'|'petiwoo';
export type Project = {
 id:ProjectId; index:string; brand:string; kicker:Translated; title:Translated; tagline:Translated;
 intro:Translated; problem:Translated; solution:Translated; outcome:Translated;
 architecture:Translated[]; features:Translated[]; stack:string[]; visual:'enterprise'|'ai'|'clinic'|'pets';
 source:string; };
export const txt=(_lang:Locale,value:Translated)=>value.en;
export const projects:Project[]=[
 {id:'gartal',index:'01',brand:'GARTAL',visual:'enterprise',
 kicker:{en:'DIGITAL STUDIO / PLATFORM ENGINEERING'},
 title:{en:'One foundation. Multiple businesses.'},
 tagline:{en:'Digital services and reusable product foundations'},
 intro:{en:'GARTAL combines a distinct web and software services studio with a separate multi-repository business platform. The main studio website communicates website design, custom development and automation; the platform coordinates reusable product foundations.'},
 problem:{en:'Businesses need a clear route from service discovery to project inquiry, while product teams need shared contracts instead of repeatedly building the same operational foundations.'},
 solution:{en:'The GARTAL studio site now uses Next.js App Router, React, TypeScript and multilingual service pages, with a validated project-intake API backed by PostgreSQL and Drizzle. The separate GARTAL Platform versions shared contracts for independent admin, server and commerce runtimes.'},
 outcome:{en:'The checked-in studio website defines individual service routes, project intake, privacy and SEO metadata. The separate platform defines versioned industry-pack contracts. Neither a launched website nor customer results are claimed without acceptance evidence.'},
 architecture:[{en:'GARTAL-SITE / Next.js App Router and localized service routes'},{en:'Brand identity, SEO and inquiry workflows'},{en:'React, TypeScript, PostgreSQL, Drizzle and validated API intake'},{en:'Gartal-Platform / cross-product contracts'},{en:'Core Server and Core Admin independent runtimes'},{en:'Petiwoo retail and veterinary industry packs'}],
 features:[{en:'Digital service discovery'},{en:'Project inquiry'},{en:'Shared platform contracts'},{en:'Vertical products'}],
 stack:['Next.js','React','TypeScript','PostgreSQL','Drizzle','Zod','GSAP'],
 source:'GARTAL-SITE/README.md · app/api/leads/route.ts · brand/GARTAL_OFFICIAL_IDENTITY.md · Gartal-Platform/README.md'},
 {id:'factory',index:'02',brand:'AI Development Factory',visual:'ai',
 kicker:{en:'ENGINEERING SYSTEMS / LOCAL AUTOMATION'},
 title:{en:'From source to controlled local delivery.'},
 tagline:{en:'One owner-controlled engineering system'},
 intro:{en:'A multi-repository engineering control center linking GitHub commits, a single local Windows Worker, protected fast-forward synchronization, project lifecycle controls and source-anchored Guardian Hub evidence.'},
 problem:{en:'A growing portfolio of repositories needs a repeatable way to inspect source changes and preserve local work, without treating an unverified status as a successful delivery.'},
 solution:{en:'Use GitHub as the source of truth and an owner-operated local Worker for active-project HEAD monitoring, safe source synchronization and a loopback-only control dashboard. Guardian reports remain evidence-based and tied to immutable Git metadata.'},
 outcome:{en:'The current October 2026 source policy disables automatic CI, build, tests and preview inside the Worker. Source updates are not proof of an installed release; the dashboard distinguishes actual machine state from unverified claims.'},
 architecture:[{en:'GitHub commit monitoring for active projects'},{en:'Single Windows Worker and local dashboard'},{en:'Protected fast-forward checkout synchronization'},{en:'Active, future, completed and archived lifecycle'},{en:'Guardian Hub / source-anchored evidence'},{en:'Local-file preservation and provenance'}],
 features:[{en:'Owner-directed workflows'},{en:'Safe repository sync'},{en:'Project lifecycle'},{en:'Evidence governance'}],
 stack:['Node.js','GitHub API','Git','Windows Worker','PowerShell','Local Dashboard'],
 source:'AI-Development-Factory/README.md · docs/guardian-hub/CONTRACT.md'},
 {id:'digirezhim',index:'03',brand:'DigiRezhim',visual:'clinic',
 kicker:{en:'HEALTHTECH / CLINICAL WORKFLOWS'},
 title:{en:'Physician knowledge. Structured workflows.'},
 tagline:{en:'Clinical nutrition SaaS for physicians'},
 intro:{en:'DigiRezhim connects public web surfaces, doctor workspaces, dedicated admin services and structured clinical nutrition records across a four-surface application architecture.'},
 problem:{en:'Nutrition and clinical follow-up work spans intake, patient history, scientific rules, physician review and access management. Disconnected tooling makes these processes difficult to coordinate.'},
 solution:{en:'A Next.js physician workspace backed by NestJS APIs, structured PostgreSQL data and Redis. Doctor dashboard source handles medical registration, profile readiness, account access, patient lists and clinical-workflow entry points.'},
 outcome:{en:'The repository documents a clinical nutrition system, an Excel-to-UI migration and physician administration workflows. Production readiness and clinical compliance are not presented as independently certified.'},
 architecture:[{en:'Public web and separate admin web'},{en:'NestJS public API and admin API'},{en:'Physician identity, verification and access'},{en:'Patient context and nutrition pathways'},{en:'PostgreSQL and Prisma persistence'},{en:'Redis and Docker development services'}],
 features:[{en:'Physician dashboard'},{en:'Patient records'},{en:'Nutrition workflow'},{en:'Clinical follow-up'}],
 stack:['Next.js','React','TypeScript','NestJS','PostgreSQL','Prisma','Redis'],
 source:'DigiRezhim/README.md · apps/web/src/components/doctor/doctor-dashboard.tsx'},
 {id:'petiwoo',index:'04',brand:'Petiwoo',visual:'pets',
 kicker:{en:'VERTICAL COMMERCE / PET RETAIL'},
 title:{en:'A storefront designed around pet care.'},
 tagline:{en:'Pet commerce on the GARTAL product family'},
 intro:{en:'Petiwoo is a pet-focused commerce experience. The storefront source includes product discovery by species and category, promotional offers, stock-aware product presentation, brands, basket and checkout.'},
 problem:{en:'Different animal needs and inventory conditions make a generic product catalog difficult to navigate, while store operations require accurate stock and pricing context.'},
 solution:{en:'Build a Next.js TypeScript storefront with category-tree navigation, search, species-based discovery and a cart, connected to shared catalog and commerce services in the GARTAL family.'},
 outcome:{en:'Repository source confirms storefront pages, product transformation, categories, brand feeds, inventory context and cart/checkout pathways. Illustrative sales figures or fabricated pet product records are deliberately excluded.'},
 architecture:[{en:'Next.js storefront and TypeScript components'},{en:'Species-aware navigation for dogs, cats and birds'},{en:'Catalog, category-tree and brand feeds'},{en:'Discount and availability presentation'},{en:'Cart and checkout journeys'},{en:'GARTAL product-family platform contracts'}],
 features:[{en:'Pet-category discovery'},{en:'Product search'},{en:'Stock-aware shopping'},{en:'Basket and checkout'}],
 stack:['Next.js','React','TypeScript','Zustand','Tailwind CSS','Commerce API'],
 source:'Core-Petshop-Store/README.md · pages/index.tsx · Gartal-Platform/README.md'}
];
export const publicContact={
 email:'saeidshamsaeii00@gmail.com',
 phone:'09017470729',
 phoneHref:'tel:+989017470729',
 telegram:'https://t.me/sd_shms',
 telegramHandle:'@sd_shms',
 github:'https://github.com/saeidshamsaeii',
 linkedin:'https://www.linkedin.com/in/saeidshamsaei/'
} as const;

/**
 * Verified public biography facts. Populate age/tenure only after the owner
 * supplies and approves exact information; null must never become a fake zero.
 */
export const publicBiography:{
 ageYears:number|null;
 yearsOfExperience:number|null;
}={
 ageYears:25,
 yearsOfExperience:5
};
