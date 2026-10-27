import type {ProjectId} from './portfolio';

export type Discipline='architecture'|'experience'|'delivery';
export type SourceFile={label:string;repo:string;path:string;why:string};
export type EngineeringDecision={
 id:string;discipline:Discipline;question:string;design:string;tradeoff:string;
 evidence:string;files:number[];
};
export type EngineeringRecord={
 id:ProjectId;scope:string;differentiator:string;boundary:string;
 files:SourceFile[];decisions:EngineeringDecision[];unverified:string[];
};

/**
 * A navigable source index, not a production-status dashboard.
 * References were checked against their GitHub main repository trees.
 * Text is restricted to what the underlying READMEs/code describe;
 * implementation, local activation, test success, and public deployment
 * are explicitly separate evidence questions.
 */
export const engineeringEvidence:EngineeringRecord[]=[
 {
  id:'gartal',scope:'Digital studio and independently versioned business platform',
  differentiator:'The GARTAL studio website is not the GARTAL product runtime.',
  boundary:'Independent marketing, platform contract and product repositories must not be described as a single deployed service.',
  files:[
   {label:'Studio scope & operational boundaries',repo:'GARTAL-SITE',path:'README.md',why:'WSGI, service routes, intake, privacy, SEO and deployment gates'},
   {label:'Canonical marketing content',repo:'GARTAL-SITE',path:'content.py',why:'Actual page inventory and service copy'},
   {label:'Cross-product platform architecture',repo:'Gartal-Platform',path:'README.md',why:'Independent server, admin, store and licensing runtimes'},
   {label:'Industry pack version contract',repo:'Gartal-Platform',path:'platform/industry-packs/README.md',why:'Industry-pack contracts and ownership'}
  ],
  decisions:[
   {id:'studio',discipline:'experience',question:'How should a potential client discover the right service?',
    design:'Distinct service-focused routes and a validated project-inquiry flow in a server-rendered studio site.',
    tradeoff:'A purpose-built marketing layer is simpler to explain but must remain separate from transactional applications.',
    evidence:'The studio README documents service pages, request validation, lead administration and privacy controls.',
    files:[0,1]},
   {id:'contracts',discipline:'architecture',question:'How can multiple vertical products reuse infrastructure without merging runtimes?',
    design:'Cross-product manifests and versioned industry packs coordinate four separately owned application runtimes.',
    tradeoff:'Contracts reduce duplicated definitions but require deliberate cross-repository compatibility checks.',
    evidence:'The platform README defines Core Server, Core Admin, tenant store, Super Admin and the pack verification workflow.',
    files:[2,3]},
   {id:'release',discipline:'delivery',question:'Which parts are source-defined versus actually released?',
    design:'Keep local code checks, brand/SEO review, authorization and public indexing as separate release gates.',
    tradeoff:'A conservative launch policy adds review steps but avoids confusing a GitHub commit with a live site.',
    evidence:'GARTAL-SITE README explicitly requires approval before production domain configuration and indexing.',
    files:[0]}
  ],
  unverified:['Publicly accessible production endpoint and acceptance','Measured SEO traffic, leads and conversion outcomes','Installed environment and real user adoption']
 },
 {
  id:'factory',scope:'GitHub-to-local owner engineering control',
  differentiator:'A GitHub revision, a locally installed Worker and a verified delivery are three different facts.',
  boundary:'The current Factory policy does not authorize automatic CI, build, tests, scans, previews or deployment.',
  files:[
   {label:'Current operations policy',repo:'AI-Development-Factory',path:'README.md',why:'Owner Worker, active repo sync, disabled automatic CI and evidence boundaries'},
   {label:'Owner Worker implementation',repo:'AI-Development-Factory',path:'scripts/owner-full-worker/owner-worker.mjs',why:'Local Worker control and synchronization logic'},
   {label:'Guardian Hub evidence contract',repo:'AI-Development-Factory',path:'docs/guardian-hub/CONTRACT.md',why:'Status provenance and source-anchored plugin reports'},
   {label:'Worker operator documentation',repo:'AI-Development-Factory',path:'scripts/owner-full-worker/README.md',why:'Local operational workflow'}
  ],
  decisions:[
   {id:'local',discipline:'architecture',question:'How can one owner coordinate several repositories?',
    design:'Use GitHub as source truth and a single authorized Windows Worker for the local checkout boundary.',
    tradeoff:'Central ownership simplifies provenance but requires knowing which Worker revision is actually installed.',
    evidence:'The current README specifies one local Owner Worker and active-project monitoring.',
    files:[0,1,3]},
   {id:'preserve',discipline:'delivery',question:'What happens if GitHub changes but the local repository has owner edits?',
    design:'Guarded fast-forward fetch/pull is permitted only within the Worker\'s safe synchronization policy.',
    tradeoff:'Preserving an unresolved checkout is safer than destructive resets, at the cost of delayed synchronization.',
    evidence:'The current policy explicitly requires preservation of local edits and separates remote state from installed state.',
    files:[0,3]},
   {id:'guardian',discipline:'experience',question:'How should engineering quality be represented without claiming checks that never ran?',
    design:'Present plugin evidence with source identifiers and states such as missing, stale or explicitly reported.',
    tradeoff:'Evidence can be incomplete, but an honest NOT_TESTED is more useful than a fabricated pass.',
    evidence:'The Guardian contract treats report files as evidence handoffs, not independently verified release gates.',
    files:[0,2]}
  ],
  unverified:['Exact installed Worker SHA on the owner device','Current active-project sync success and local run state','Actual locally executed quality checks or deployment']
 },
 {
  id:'digirezhim',scope:'Clinical nutrition application with physician and administrative boundaries',
  differentiator:'The software supports clinical workflows without representing source code as medical certification.',
  boundary:'Patient data, personal health records and invented clinical outcomes do not belong in a public portfolio.',
  files:[
   {label:'System architecture and current baseline',repo:'DigiRezhim',path:'README.md',why:'Application stack, runtime division and release caveats'},
   {label:'Doctor dashboard implementation',repo:'DigiRezhim',path:'apps/web/src/components/doctor/doctor-dashboard.tsx',why:'Professional profile, verification, access and patient views'},
   {label:'Application API modules',repo:'DigiRezhim',path:'apps/api/package.json',why:'NestJS, Prisma and backend dependencies'},
   {label:'Documentation and update index',repo:'DigiRezhim',path:'docs/README.md',why:'Project documentation and links to owner/release records'}
  ],
  decisions:[
   {id:'surfaces',discipline:'architecture',question:'Why separate the public product from administrative operations?',
    design:'The repository documents dedicated public/admin web and API runtimes with PostgreSQL, Prisma and Redis.',
    tradeoff:'Clear responsibility boundaries introduce operational coordination between services.',
    evidence:'README and project scripts describe independently started web/admin surfaces and API services.',
    files:[0,2]},
   {id:'physician',discipline:'experience',question:'How do physicians see reliable rather than invented account or patient states?',
    design:'Use authenticated server-backed doctor profile, verification, subscription and patient records.',
    tradeoff:'State can be unavailable or restricted; honest error and access feedback takes precedence over decorative metrics.',
    evidence:'The checked-in doctor dashboard reads profile/verification/subscription state and protected patient-list data.',
    files:[1]},
   {id:'nutrition',discipline:'delivery',question:'How do spreadsheet-derived scientific rules move into software?',
    design:'Document rule/form migration, source acceptance and explicit scientific exceptions instead of executing workbooks in production.',
    tradeoff:'The migration process needs scientific review separate from routine code or UI acceptance.',
    evidence:'The README links to nutrition-engine migration records and notes that current production readiness is not CI-verified.',
    files:[0,3]}
  ],
  unverified:['Independent clinical efficacy or regulatory certification','Current production readiness and complete cross-service verification','Patient outcomes or measured clinical impact']
 },
 {
  id:'petiwoo',scope:'Species-aware pet commerce on a shared product family',
  differentiator:'Product discoverability begins with the animal and its needs rather than a generic stock image grid.',
  boundary:'A source-defined checkout pathway does not prove a successful order, deployed payment or revenue.',
  files:[
   {label:'Storefront scope and shopping flow',repo:'Core-Petshop-Store',path:'README.md',why:'Product search, details, cart, checkout and API contract'},
   {label:'Main storefront composition',repo:'Core-Petshop-Store',path:'pages/index.tsx',why:'Current homepage and catalog/category integration'},
   {label:'Current application dependencies',repo:'Core-Petshop-Store',path:'package.json',why:'Next.js, React Query, Zustand and verification scripts'},
   {label:'Shared platform industry packs',repo:'Gartal-Platform',path:'README.md',why:'Petiwoo and the petshop/veterinary pack relationship'}
  ],
  decisions:[
   {id:'discovery',discipline:'experience',question:'How do shoppers navigate different animal product needs?',
    design:'Species-aware browsing, category hierarchy, product search and promotional catalog discovery.',
    tradeoff:'More specific navigation depends on consistent taxonomy and inventory data.',
    evidence:'The storefront README and homepage source identify product and category retrieval paths.',
    files:[0,1]},
   {id:'basket',discipline:'architecture',question:'How does the storefront connect selection with commerce operations?',
    design:'Typed product pages, client basket state and backend catalog/order interfaces are separate concerns.',
    tradeoff:'Local cart persistence improves continuity but must not be mistaken for server-confirmed payment or order creation.',
    evidence:'The repository documents Zustand cart state, product retrieval and checkout pathways.',
    files:[0,2]},
   {id:'family',discipline:'delivery',question:'What can Petiwoo reuse from GARTAL?',
    design:'The platform describes petshop and veterinary versioned industry packs rather than cloning shared runtimes.',
    tradeoff:'Pack releases require compatibility checks across independently versioned product repositories.',
    evidence:'The shared-platform README lists the pack and verification workflow.',
    files:[3]}
  ],
  unverified:['Actual live checkout and payment success','Current production stock/order figures','Commercial sales, conversion rate or retained customers']
 }
];

// Immutable evidence references: never silently change the proof when main moves.
// SHA values were read from the repositories' GitHub main branches during the
// October 2026 portfolio research audit. Deployment verification is separate.
export const sourceSnapshots:Record<string,string>={
 'GARTAL-SITE':'f0a98cae736d19f20ba6b4b1d879c1c9a172a666',
 'Gartal-Platform':'1169fa3c862a942899aa49c96bdeeabc838f5b57',
 'AI-Development-Factory':'6813e65f9709ef1be83be62511dd75f4468d6f8b',
 'DigiRezhim':'c9b35ca732d8fe8957b1b2e75337b6bb227a4c56',
 'Core-Petshop-Store':'92e613ad1e51f94ec694a7b51971a86ca6c2a38b'
};
export const fileUrl=(file:SourceFile)=>
 'https://github.com/saeidshamsaeii/'+file.repo+'/blob/'+
 (sourceSnapshots[file.repo]??'main')+'/'+file.path;
