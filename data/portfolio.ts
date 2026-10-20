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
 kicker:{en:'ENTERPRISE PLATFORM / MULTI-TENANT'},
 title:{en:'One foundation. Multiple businesses.'},
 tagline:{en:'Multi-Tenant Enterprise SaaS Platform'},
 intro:{en:'GARTAL is a reusable enterprise software foundation for business operating systems and vertical SaaS products. Platform capabilities are built once and extended through industry packs.'},
 problem:{en:'Independent applications repeatedly rebuild authentication, administration, deployment and business logic.'},
 solution:{en:'A shared core, versioned platform contracts, independent runtimes and tenant-aware authorization boundaries.'},
 outcome:{en:'The documented architecture includes Core Server, Core Admin, Storefront, Super Admin and a workflow engine. Production rollout is subject to validation, not presented as a verified live deployment.'},
 architecture:[{en:'Core Server / API, ERP and synchronization'},{en:'Core Admin / separate administration runtime'},{en:'Storefront / tenant-facing commerce'},{en:'Super Admin / licensing and tenant lifecycle'},{en:'Security / tenant context, RBAC and audit'},{en:'Versioned industry-specific product packs'}],
 features:[{en:'Multi-tenant architecture'},{en:'Workflow automation'},{en:'Vertical SaaS'},{en:'Shared contracts'}],
 stack:['Laravel','NestJS','TypeScript','React','PostgreSQL','MySQL','REST APIs'],
 source:'GARTAL LinkedIn Case Study and GARTAL Case Study v2, owner-provided PDF pages 2–8.'},
 {id:'factory',index:'02',brand:'AI Development Factory',visual:'ai',
 kicker:{en:'ENGINEERING SYSTEMS / CONTROLLED AUTOMATION'},
 title:{en:'From repository to governed delivery.'},
 tagline:{en:'Owner-directed AI Engineering Factory'},
 intro:{en:'An owner-directed engineering system linking GitHub workflows, CI evidence, source review, UI/UX governance and controlled multi-project coordination.'},
 problem:{en:'Multi-repository engineering is difficult to govern without consistent source, risk and CI evidence.'},
 solution:{en:'A controlled coordination layer with exact-SHA evidence, CI gates and opt-in quality tooling.'},
 outcome:{en:'The Factory has a GitHub-based source, policies and tooling; this case study does not claim universal green CI, autonomous model coding or an active remote worker.'},
 architecture:[{en:'GitHub / source of truth'},{en:'Owner-directed authorization'},{en:'Diff and risk inspection'},{en:'CI checks per exact commit SHA'},{en:'UI/UX Studio / quality standards'},{en:'Safe local sync / opt-in fast-forward'}],
 features:[{en:'Project orchestration'},{en:'CI evidence'},{en:'Permission boundaries'},{en:'Visual QA standards'}],
 stack:['GitHub Actions','Node.js','TypeScript','Playwright','GitHub API','Windows PowerShell'],
 source:'Owner-authorized AI-Development-Factory source and governance documentation on GitHub.'},
 {id:'digirezhim',index:'03',brand:'DigiRezhim',visual:'clinic',
 kicker:{en:'HEALTHTECH / CLINICAL WORKFLOWS'},
 title:{en:'Physician knowledge. Structured decisions.'},
 tagline:{en:'Clinical Nutrition Management Platform'},
 intro:{en:'DigiRezhim translates physician-developed nutrition knowledge into clinical workflows — spanning patient records, review, decision logic and nutrition plans.'},
 problem:{en:'Fragmented research, spreadsheets and manual reviews make clinical nutrition pathways difficult to standardize.'},
 solution:{en:'Structured patient records, longitudinal context and configurable clinical pathways from intake through follow-up.'},
 outcome:{en:'Owner-supplied visual documentation illustrates patient records, clinical logic and physician workflows. These presentation visuals do not establish certified medical compliance or production metrics.'},
 architecture:[{en:'Patient intake and structured registry'},{en:'Medical history, labs and medication context'},{en:'Clinical review and nutrition risk factors'},{en:'Configurable nutrition decision pathways'},{en:'Personalized nutrition plan builder'},{en:'Reporting, history and longitudinal follow-up'}],
 features:[{en:'Patient records'},{en:'Physician workflow'},{en:'Nutrition plans'},{en:'Decision support'}],
 stack:['Clinical Workflows','Patient Records','Decision Logic','Nutrition Planning','HealthTech'],
 source:'DigiRezhim feature, owner-provided illustrated PDF pages 1–8.'},
 {id:'petiwoo',index:'04',brand:'Petiwoo',visual:'pets',
 kicker:{en:'VERTICAL SAAS / PET RETAIL & VETERINARY'},
 title:{en:'Specialist products. Shared platform.'},
 tagline:{en:'Pet Retail + Veterinary Vertical on GARTAL'},
 intro:{en:'Petiwoo is part of the GARTAL product family. Pet retail and veterinary packs extend shared platform capabilities with domain-specific workflows.'},
 problem:{en:'Pet retail and veterinary practices have distinct workflows but can share reliable platform foundations.'},
 solution:{en:'Build dedicated inventory, supplier, commerce, appointments and clinical-record workflows on top of GARTAL core services.'},
 outcome:{en:'GARTAL documentation describes retail and veterinary as its first active verticals. Visuals here are conceptual, not customer records or verified live product screens.'},
 architecture:[{en:'Retail pack / products, inventory and orders'},{en:'Suppliers, payments and commerce operations'},{en:'Veterinary pack / animals and clinical records'},{en:'Appointments and vaccination workflows'},{en:'GARTAL core / tenancy, auth and licensing'},{en:'Shared administration and reporting'}],
 features:[{en:'Pet retail'},{en:'Inventory & suppliers'},{en:'Veterinary services'},{en:'Appointments'}],
 stack:['GARTAL Core','Vertical SaaS','Retail Ops','Veterinary Ops','React','REST APIs'],
 source:'Owner-provided GARTAL v2 PDF, vertical SaaS section, page 7; GARTAL case-study PDF page 6.'}
];
export const publicContact={email:'saeidshamsaeii00@gmail.com',github:'https://github.com/saeidshamsaeii',linkedin:'https://www.linkedin.com/in/saeid-shamsaei-938016202/'};
