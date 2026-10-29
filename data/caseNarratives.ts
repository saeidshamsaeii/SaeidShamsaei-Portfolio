import type {ProjectId} from './portfolio';

export type NarrativeSection={
 id:string; eyebrow:string; title:string; paragraphs:string[]; details:string[]; durationSeconds:number;
};
export type CaseNarrative={thesis:string; chapters:NarrativeSection[]; references:{label:string;href:string}[]};

/**
 * Evidence-led explanations distilled from checked-in project READMEs and code.
 * Architecture is presented as documented scope, not certified deployment.
 * No fictitious dates, customers, sales, benchmark scores or clinical outcomes.
 */
export const caseNarratives:Record<ProjectId,CaseNarrative>={
 gartal:{
  thesis:'A digital studio and a product platform, related in philosophy but separate in implementation.',
  chapters:[
   {id:'origin',eyebrow:'01 / CONTEXT',title:'Two systems. One engineering philosophy.',
    paragraphs:[
     'GARTAL has two distinct software identities. Its studio website introduces website design, ecommerce, custom software, interface design and business automation. A separate multi-repository platform coordinates shared contracts for independent business applications.',
     'The distinction matters. A marketing and project-inquiry website is not a tenant administration dashboard. They serve different users, have different technical boundaries and should be assessed on their own terms.',
     'For this case study, the visual language follows the real studio brand while the systems narrative explains how the platform supports reusable product foundations.'
    ],
    details:['Service-facing digital studio','Separate shared-platform engineering','Evidence from both repositories'],durationSeconds:11},
   {id:'problem',eyebrow:'02 / THE PROBLEM',title:'A clear front door. A reusable engine.',
    paragraphs:[
     'Clients evaluating digital services need a direct path from understanding an offer to describing a project. Ambiguous navigation, generic claims or invented success metrics weaken that process rather than improve it.',
     'On the product side, disconnected apps can independently recreate authentication, administration, product records, tenant boundaries and operations. Duplicated foundations raise the cost of maintaining industry-specific products.',
     'The engineering problem is to create clarity at the service layer without coupling unrelated runtime products into one fragile application.'
    ],
    details:['Explicit service discovery','Permission-aware project requests','Independent runtimes'],durationSeconds:12},
   {id:'studio',eyebrow:'03 / THE STUDIO WEBSITE',title:'A focused client journey.',
    paragraphs:[
     'The current GARTAL-SITE main branch is a Next.js App Router application using React and TypeScript. It retains service-specific content for website design, ecommerce, custom development, automation and project inquiries, and now also defines localized public routes with language-specific metadata.',
     'The Next.js source includes a Zod-validated project-intake endpoint, an administrative lead interface, PostgreSQL persistence through Drizzle, honeypot and same-origin checks, privacy content and canonical SEO metadata. If storage is unavailable, the intake endpoint returns HTTP 503 rather than claiming a request was saved.',
     'The GARTAL repository documents an owner-approved upward-arrow brand mark and wordmark, superseding earlier orange/G explorations. This portfolio presents that work in its own neutral black-and-white system; a visual identity does not prove a released service or a customer result.'
    ],
    details:['Current Next.js App Router and multilingual public pages','Validated PostgreSQL-backed inquiry intake','Owner-approved current brand assets'],durationSeconds:13},
   {id:'platform',eyebrow:'04 / SYSTEM ARCHITECTURE',title:'Shared contracts. Separate applications.',
    paragraphs:[
     'The Gartal-Platform repository describes four independent runtime responsibilities: an API and persistence server, a shared administration interface, a tenant-facing storefront and a licensing or tenant-lifecycle control plane.',
     'Its canonical industry-pack manifest gives domain-specific products a place to declare their capabilities and versions. Pet retail and veterinary workflows can evolve as specialized packs without copying an entire platform stack.',
     'A shared architectural contract does not remove the need to validate each affected repository. The documented workflow requires changing canonical descriptors, bumping industry versions and checking impacted runtimes before a release decision.'
    ],
    details:['Core Server and Core Admin','Storefront and Super Admin','Versioned industry-pack contracts'],durationSeconds:14},
   {id:'experience',eyebrow:'05 / INTERACTION DESIGN',title:'Purpose before ornament.',
    paragraphs:[
     'On the studio website, navigation follows actual client questions: what can be built, which problems fit, what a proposal involves and how a request is submitted. The interface is designed for direct answers rather than decorative claims.',
     'Within the platform, operating dashboards separate products, orders, customers, stock, appointments and animal-related records. They reflect different tasks even when they reuse authentication and data contracts.',
     'The resulting portfolio presentation uses written architectural evidence, not a fictitious administrator screenshot with fabricated revenue, customer counts or conversion figures.'
    ],
    details:['Sales-oriented information architecture','Operational domain separation','Accessible, responsive presentation'],durationSeconds:12},
   {id:'delivery',eyebrow:'06 / DELIVERY & EVIDENCE',title:'A documented foundation, not a fabricated success story.',
    paragraphs:[
     'The current Next.js source establishes service routes, localized metadata, protected lead-intake logic, brand definitions and platform contracts. This documents implementation, not a verified production rollout, client contract or business KPI.',
     'Security gates, runtime checks, deployment templates and visual reviews are documented as work to complete or verify. They are engineering evidence, not a substitute for owner acceptance.',
     'The next stage is to validate the deployed experiences, obtain permissioned screenshots and connect actual outcomes only when verifiable records exist.'
    ],
    details:['Repo-backed capabilities','Deployment remains separately verified','No invented commercial results'],durationSeconds:11}
  ],
  references:[
   {label:'GARTAL Studio',href:'https://github.com/saeidshamsaeii/GARTAL-SITE'},
   {label:'GARTAL Platform',href:'https://github.com/saeidshamsaeii/Gartal-Platform'},
   {label:'Core Admin',href:'https://github.com/saeidshamsaeii/Core-Admin'}]
 },
 factory:{
  thesis:'One owner-controlled workflow across many repositories, without treating a source commit as a verified local release.',
  chapters:[
   {id:'origin',eyebrow:'01 / CONTEXT',title:'Engineering beyond one repository.',
    paragraphs:[
     'The AI Development Factory coordinates several product repositories from one owner-facing operating model. Its central concern is provenance: which repository changed, which commit is current and whether the local machine actually has that revision.',
     'GitHub contains the source history. A single Windows Worker owns the local checkout boundary. The dashboard exists to make that relationship visible instead of hiding it behind generic success messages.',
     'This is an owner-operated development environment. It should not be confused with an unattended commercial AI coding service or a guarantee that every product is deployed.'
    ],
    details:['Multi-repository source coordination','One local Worker','Owner-operated control surface'],durationSeconds:11},
   {id:'problem',eyebrow:'02 / THE PROBLEM',title:'Source truth is not machine truth.',
    paragraphs:[
     'A successful push to GitHub says only that a revision exists in the remote repository. A laptop may be offline, running an older Worker, holding local edits or pointing at a mismatched Git remote.',
     'Blind pulls and destructive cleanups could overwrite work. In multi-project environments, repeated CI and browser-preview execution can also exceed available memory and reduce the reliability of the whole system.',
     'The Factory therefore needs separate evidence for GitHub state, owner authorization, local synchronization and any manually requested verification.'
    ],
    details:['Source versus installed state','Preservation of local changes','Bounded resource use'],durationSeconds:12},
   {id:'lifecycle',eyebrow:'03 / PROJECT LIFECYCLE',title:'Only active work should consume attention.',
    paragraphs:[
     'The source defines distinct project states, including active, future, completed and archived. This lets the owner control which repositories belong in the current development cycle.',
     'For active products, the intended Worker flow monitors GitHub heads and attempts guarded fast-forward synchronization when the repository and checkout pass identity and cleanliness checks.',
     'Completed or archived projects remain discoverable as history without continuously consuming the resources needed by active work.'
    ],
    details:['Active / future / completed / archived','GitHub commit monitoring','No blind all-project execution'],durationSeconds:11},
   {id:'safe-sync',eyebrow:'04 / SAFETY BOUNDARIES',title:'Synchronize without destroying ownership.',
    paragraphs:[
     'The design favors Git remote validation, branch checks and fast-forward updates instead of reset, stash or clean as automatic recovery techniques. Local tracked and untracked changes are protected from silent replacement.',
     'Legacy path conflicts and ignored files require special care: the existence of two local copies is not permission to delete one. A preserved conflict is a meaningful safety result, not necessarily a broken application.',
     'All of these controls must be evaluated against the installed Worker and the actual machine checkout. GitHub source changes alone do not prove that the laptop pulled them.'
    ],
    details:['Trusted origin and branch','Non-destructive fast-forward','Legacy file preservation'],durationSeconds:13},
   {id:'guardians',eyebrow:'05 / OBSERVABILITY',title:'Evidence can be incomplete. Say so.',
    paragraphs:[
     'The Guardian Hub contract describes source-anchored metadata from specialized quality tools, including design, security, API and data, reliability and SEO evaluation.',
     'A recorded report is not a substitute for a real scan. When evidence is unavailable the system can report NOT_TESTED; when the source changes, previous evidence can become stale.',
     'This keeps the dashboard useful as an evidence index without presenting an unrun check or a plugin-written PASS as independently verified release readiness.'
    ],
    details:['Source-anchored reports','NOT_TESTED and STALE semantics','No invented quality grades'],durationSeconds:12},
   {id:'operating-model',eyebrow:'06 / CURRENT OPERATING MODEL',title:'Automatic source sync. Human-directed quality.',
    paragraphs:[
     'The current October 2026 main-branch policy keeps automatic Worker CI, builds, scans and managed previews disabled. The local Worker is intended to monitor active repositories and perform safe source synchronization within its authorized scope.',
     'Project code can still be developed directly through reviewed GitHub changes. Expensive or intrusive verification stays a separate, deliberate action rather than silently running on every repository update.',
     'Whether a particular machine has installed this revision must be confirmed from fresh owner-device evidence. This case study documents the architecture and policy, not an unverified live deployment.'
    ],
    details:['CI and preview not automatic','Owner-directed verification','Runtime activation verified separately'],durationSeconds:13}
  ],
  references:[
   {label:'Factory source',href:'https://github.com/saeidshamsaeii/AI-Development-Factory'},
   {label:'Guardian contract',href:'https://github.com/saeidshamsaeii/AI-Development-Factory/blob/main/docs/guardian-hub/CONTRACT.md'}]
 },
 digirezhim:{
  thesis:'Clinical nutrition decisions deserve structured tools, deliberate permissions and auditable workflows.',
  chapters:[
   {id:'origin',eyebrow:'01 / CONTEXT',title:'From clinical knowledge to usable software.',
    paragraphs:[
     'DigiRezhim is a specialist clinical nutrition platform built around physicians, patient records, nutrition assessment and follow-up workflows.',
     'The repository contains separate web and admin surfaces with distinct APIs. This separation reflects the needs of public users, physicians and administrative operations instead of forcing every role into a single interface.',
     'The product has a documented history of converting scientific workbook logic into structured application forms and rules.'
    ],
    details:['Physician-first workspace','Four application surfaces','Structured nutrition knowledge'],durationSeconds:11},
   {id:'problem',eyebrow:'02 / THE PROBLEM',title:'Health workflows are more than forms.',
    paragraphs:[
     'Clinical nutrition work combines medical context, assessments, follow-ups and professional review. Spreadsheets may encode valuable rules, but the information needs explicit validation and traceable interactions when brought into software.',
     'Physicians also require reliable account readiness, medical registration verification, controlled subscription access and visibility into their patient registry.',
     'A polished interface must not conceal missing clinical evidence or imply that a software product is medically certified simply because its pages are present.'
    ],
    details:['Clinical context integrity','Professional verification','Responsible claims'],durationSeconds:12},
   {id:'architecture',eyebrow:'03 / ARCHITECTURE',title:'Four surfaces with defined responsibilities.',
    paragraphs:[
     'The source documents a public web runtime, an administrative web runtime, a public NestJS API and a separate administration API. The supporting stack includes Next.js, React, TypeScript, PostgreSQL, Prisma and Redis.',
     'Service boundaries distinguish what belongs to the physician workspace from platform management. Data storage, session handling and development infrastructure are documented separately from visual components.',
     'The architecture makes the clinical experience part of a larger operational platform, not merely a set of static nutrition screens.'
    ],
    details:['Next.js and NestJS','PostgreSQL / Prisma / Redis','Public and administrative boundaries'],durationSeconds:12},
   {id:'doctor',eyebrow:'04 / PHYSICIAN EXPERIENCE',title:'A dashboard that reflects professional context.',
    paragraphs:[
     'The doctor dashboard reads server-backed identity, profile, verification and subscription state. It displays access information rather than manufacturing a healthy or active account status on the client.',
     'Its patient digest comes from a protected patient-list endpoint, with request error states and authenticated navigation. The interface distinguishes real records from unavailable data.',
     'Profile readiness and professional registration influence what the physician can do. That makes permissions and accurate feedback an essential part of UX, not an afterthought.'
    ],
    details:['Authenticated dashboard state','Patient list and digest','Verification and access status'],durationSeconds:14},
   {id:'nutrition',eyebrow:'05 / CLINICAL PATHWAYS',title:'From intake to follow-up.',
    paragraphs:[
     'The documented nutrition engine work translates existing scientific material into a series of controlled application pathways for different patient contexts.',
     'Intake, medical history, clinical review, nutrition risk factors and plan building form a longitudinal process. Each step requires careful treatment of missing fields, validation and professional interpretation.',
     'For that reason this case study describes supported source workflows without displaying patient-specific values, sample diagnoses presented as real, or unverified treatment outcomes.'
    ],
    details:['Structured patient intake','Configurable decision pathways','Longitudinal follow-up'],durationSeconds:13},
   {id:'evidence',eyebrow:'06 / CURRENT STATE',title:'Clinical confidence must be earned.',
    paragraphs:[
     'The repository documents its software structure, migration history, routes and physician operations. Those are useful evidence of implementation scope.',
     'They do not independently establish regulatory compliance, clinical efficacy, deployment readiness or successful real-world patient outcomes. Each of those questions needs separate specialized verification.',
     'The design goal remains clear: a restrained professional experience where complex workflows are navigable and every consequential state is explained.'
    ],
    details:['Documented implementation','Clinical validation separate','No invented patient metrics'],durationSeconds:11}
  ],
  references:[
   {label:'DigiRezhim source',href:'https://github.com/saeidshamsaeii/DigiRezhim'},
   {label:'Physician dashboard',href:'https://github.com/saeidshamsaeii/DigiRezhim/blob/main/apps/web/src/components/doctor/doctor-dashboard.tsx'}]
 },
 petiwoo:{
  thesis:'Species-aware product discovery and reliable commerce operations for a specialized pet-care storefront.',
  chapters:[
   {id:'origin',eyebrow:'01 / CONTEXT',title:'Specialist commerce needs specialist navigation.',
    paragraphs:[
     'Petiwoo is a pet retail experience in the GARTAL product family. The public store focuses on the relationship between the customer, the animal they care for and the products available to purchase.',
     'The checked-in storefront is a Next.js TypeScript application with category navigation, product listings, product detail pages, basket and checkout pathways.',
     'Its vertical identity makes product discoverability and accurate inventory information central parts of the interface.'
    ],
    details:['Pet-focused storefront','Next.js / TypeScript','GARTAL product family'],durationSeconds:11},
   {id:'problem',eyebrow:'02 / THE PROBLEM',title:'A catalogue should understand the shopper.',
    paragraphs:[
     'A generic product grid ignores the differences between shopping for dogs, cats and birds. Visitors need intuitive species navigation, clear category context and a way to find the right product before comparing price or stock.',
     'Retail operations also need to account for discounts, availability, stock state and changing product information. A pretty image cannot replace those responsibilities.',
     'The product challenge is to connect specialist discovery with familiar and dependable ecommerce behavior.'
    ],
    details:['Species-aware wayfinding','Search and categories','Stock-aware product choices'],durationSeconds:12},
   {id:'discovery',eyebrow:'03 / STOREFRONT',title:'Discovery is a product system.',
    paragraphs:[
     'The homepage source composes company profile, banners, product feeds, brands and a nested category tree. It maps catalogue data into a consistent home-product representation.',
     'Categories can be filtered to second-level groups chosen for the homepage. Species normalization supports the navigation concepts of dogs, cats and birds.',
     'When external data is missing, the source uses guarded fetch behavior rather than presenting hard-coded sales and inventory numbers as live facts.'
    ],
    details:['Category hierarchy','Species normalization','Live catalogue boundaries'],durationSeconds:13},
   {id:'commerce',eyebrow:'04 / COMMERCE FLOWS',title:'From browsing to a completed basket.',
    paragraphs:[
     'The repository describes product search, product details, cart state and checkout flow. Its TypeScript components are organized around browsing and purchase tasks.',
     'The home route processes discount fields, sale prices, product attributes and stock context so the interface can distinguish a product promotion from normal catalogue presentation.',
     'Zustand-backed basket state and commerce API integrations keep the storefront experience connected to transactional application logic.'
    ],
    details:['Product details and variants','Cart and checkout','Price and availability context'],durationSeconds:13},
   {id:'vertical',eyebrow:'05 / PLATFORM RELATIONSHIP',title:'A vertical product on shared foundations.',
    paragraphs:[
     'Petiwoo is identified by GARTAL documentation as an early product family with active pet retail and veterinary industry packs.',
     'Retail and veterinary workflows need different domain models. The platform approach allows them to share contracts where appropriate while maintaining the distinction between shopping, appointments and care records.',
     'This case study focuses on publicly documented storefront capabilities. It does not present veterinary records as if they were ecommerce products.'
    ],
    details:['Retail industry pack','Veterinary pack boundary','Shared cross-product contracts'],durationSeconds:12},
   {id:'evidence',eyebrow:'06 / CURRENT STATE',title:'The product is real. The metrics must be too.',
    paragraphs:[
     'The code establishes a real storefront structure, catalog feeds and purchase routes. Its existence is not proof of conversion rate, revenue, order volume or a deployed public launch.',
     'Instead of stock dog photographs or a fake sales dashboard, this portfolio now explains the actual information architecture, catalogue transformations and product decisions.',
     'Future documented outcomes can be added when performance data and permissioned real captures are available.'
    ],
    details:['Repository-backed workflow','No invented sales figures','Documented next evidence'],durationSeconds:11}
  ],
  references:[
   {label:'Storefront source',href:'https://github.com/saeidshamsaeii/Core-Petshop-Store'},
   {label:'Storefront homepage',href:'https://github.com/saeidshamsaeii/Core-Petshop-Store/blob/main/pages/index.tsx'},
   {label:'Shared platform',href:'https://github.com/saeidshamsaeii/Gartal-Platform'}]
 }
};
