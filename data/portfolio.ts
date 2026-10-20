export type Locale = 'fa'|'en';
export type Translated = {fa:string;en:string};
export type ProjectId = 'gartal'|'factory'|'digirezhim'|'petiwoo';
export type Project = {
 id:ProjectId; index:string; brand:string; kicker:Translated; title:Translated; tagline:Translated;
 intro:Translated; problem:Translated; solution:Translated; outcome:Translated;
 architecture:Translated[]; features:Translated[]; stack:string[]; visual:'enterprise'|'ai'|'clinic'|'pets';
 source:string; };
export const txt=(lang:Locale,value:Translated)=>value[lang];
export const projects:Project[]=[
 {id:'gartal',index:'01',brand:'GARTAL',visual:'enterprise',
 kicker:{fa:'پلتفرم سازمانی / معمار‌ی چندمستأجری',en:'ENTERPRISE PLATFORM / MULTI-TENANT'},
 title:{fa:'یک هسته. چندین محصول.',en:'One foundation. Multiple businesses.'},
 tagline:{fa:'پلتفرم سازمانی چندمستأجری',en:'Multi-Tenant Enterprise SaaS Platform'},
 intro:{fa:'گرتال یک زیربنای نرم‌افزاری مشترک برای سیستم‌های عملیاتی کسب‌وکار و محصولات تخصصی صنایع مختلف است؛ قابلیت‌های زیرساختی یک بار ساخته می‌شوند و در محصولات عمودی استفاده می‌شوند.',en:'GARTAL is a reusable enterprise software foundation for business operating systems and vertical SaaS products. Platform capabilities are built once and extended through industry packs.'},
 problem:{fa:'ساخت اپلیکیشن‌های مجزا برای هر صنعت، احراز هویت، مدیریت، استقرار و منطق تجاری را بارها تکرار می‌کند.',en:'Independent applications repeatedly rebuild authentication, administration, deployment and business logic.'},
 solution:{fa:'هسته مشترک، قراردادهای نسخه‌بندی‌شده، Runtimeهای جداگانه و بسته‌های صنعتی با مرزهای امنیتی مستأجرمحور.',en:'A shared core, versioned platform contracts, independent runtimes and tenant-aware authorization boundaries.'},
 outcome:{fa:'معماری معرفی‌شده در مستندات پروژه شامل Core Server، Core Admin، Storefront، Super Admin و موتور گردش‌کار است. آمادگی تولید و استقرار عمومی همچنان نیازمند تأیید فنی است.',en:'The documented architecture includes Core Server, Core Admin, Storefront, Super Admin and a workflow engine. Production rollout is subject to validation, not presented as a verified live deployment.'},
 architecture:[{fa:'Core Server / API، ERP و همگام‌سازی',en:'Core Server / API, ERP and synchronization'},{fa:'Core Admin / فضای مدیریتی مستقل',en:'Core Admin / separate administration runtime'},{fa:'Storefront / تجارت مستأجرمحور',en:'Storefront / tenant-facing commerce'},{fa:'Super Admin / مجوز و چرخه عمر مستأجر',en:'Super Admin / licensing and tenant lifecycle'},{fa:'امنیت / Tenant Context، RBAC، Audit',en:'Security / tenant context, RBAC and audit'},{fa:'بسته‌های صنعتی نسخه‌بندی‌شده',en:'Versioned industry-specific product packs'}],
 features:[{fa:'معماری چندمستأجری',en:'Multi-tenant architecture'},{fa:'موتور گردش‌کار',en:'Workflow automation'},{fa:'محصولات عمودی',en:'Vertical SaaS'},{fa:'قراردادهای مشترک',en:'Shared contracts'}],
 stack:['Laravel','NestJS','TypeScript','React','PostgreSQL','MySQL','REST APIs'],
 source:'GARTAL LinkedIn Case Study and GARTAL Case Study v2, owner-provided PDF pages 2–8.'},
 {id:'factory',index:'02',brand:'AI Development Factory',visual:'ai',
 kicker:{fa:'مهندسی نرم‌افزار / اتوماسیون کنترل‌شده',en:'ENGINEERING SYSTEMS / CONTROLLED AUTOMATION'},
 title:{fa:'از مخزن کد تا تحویل قابل‌ردیابی.',en:'From repository to governed delivery.'},
 tagline:{fa:'کارخانه توسعه مبتنی بر AI',en:'Owner-directed AI Engineering Factory'},
 intro:{fa:'سامانه هماهنگی توسعه برای پروژه‌های متعدد با GitHub، کنترل CI، پایش تغییرات، استانداردهای UI/UX و فرایندهای تأیید انسانی. اتوماسیون در مرز مجوزهای مشخص و با شواهد قابل پیگیری عمل می‌کند.',en:'An owner-directed engineering system linking GitHub workflows, CI evidence, source review, UI/UX governance and controlled multi-project coordination.'},
 problem:{fa:'کار کردن روی چند محصول و مخزن بدون مسیر یکپارچه بررسی، گزارش‌دهی و کنترل ریسک پیچیده می‌شود.',en:'Multi-repository engineering is difficult to govern without consistent source, risk and CI evidence.'},
 solution:{fa:'یک لایه هماهنگی با اجرای محدود، ردیابی SHA، دروازه‌های CI و ابزار QA برای پروژه‌های مجاز.',en:'A controlled coordination layer with exact-SHA evidence, CI gates and opt-in quality tooling.'},
 outcome:{fa:'سورس، مستندات و فرایندهای Factory روی GitHub توسعه یافته‌اند. اجرای Worker محلی و موفقیت همه CIها یا استقرار خودکار در این نمونه‌کار ادعا نمی‌شود.',en:'The Factory has a GitHub-based source, policies and tooling; this case study does not claim universal green CI, autonomous model coding or an active remote worker.'},
 architecture:[{fa:'GitHub / منبع اصلی کد',en:'GitHub / source of truth'},{fa:'حاکمیت دسترسی / Owner Directed',en:'Owner-directed authorization'},{fa:'بازبینی / ریسک و تفاوت کد',en:'Diff and risk inspection'},{fa:'CI / تست روی SHA مشخص',en:'CI checks per exact commit SHA'},{fa:'UI/UX Studio / معیارهای تجربه کاربری',en:'UI/UX Studio / quality standards'},{fa:'همگام‌سازی ایمن / فقط Fast-forward',en:'Safe local sync / opt-in fast-forward'}],
 features:[{fa:'هماهنگی پروژه‌ها',en:'Project orchestration'},{fa:'تست و شواهد CI',en:'CI evidence'},{fa:'کنترل دسترسی',en:'Permission boundaries'},{fa:'بررسی تجربه کاربری',en:'Visual QA standards'}],
 stack:['GitHub Actions','Node.js','TypeScript','Playwright','GitHub API','Windows PowerShell'],
 source:'Owner-authorized AI-Development-Factory source and governance documentation on GitHub.'},
 {id:'digirezhim',index:'03',brand:'DigiRezhim',visual:'clinic',
 kicker:{fa:'سلامت دیجیتال / فرایند بالینی',en:'HEALTHTECH / CLINICAL WORKFLOWS'},
 title:{fa:'دانش تغذیه، در قالب تصمیم قابل پیگیری.',en:'Physician knowledge. Structured decisions.'},
 tagline:{fa:'پلتفرم مدیریت تغذیه بالینی',en:'Clinical Nutrition Management Platform'},
 intro:{fa:'دیجی‌رژیم پژوهش‌ها و قواعد تغذیه تدوین‌شده توسط پزشک را به فرایندهای ساختاریافته دیجیتال تبدیل می‌کند؛ از پرونده بیمار تا بررسی بالینی، تصمیم‌یار و تدوین برنامه غذایی.',en:'DigiRezhim translates physician-developed nutrition knowledge into clinical workflows — spanning patient records, review, decision logic and nutrition plans.'},
 problem:{fa:'اطلاعات پراکنده، صفحات محاسباتی مستقل و مراحل دستی، حفظ یکپارچگی تصمیم‌های تغذیه‌ای را دشوار می‌کند.',en:'Fragmented research, spreadsheets and manual reviews make clinical nutrition pathways difficult to standardize.'},
 solution:{fa:'مدل داده ساختاریافته، تاریخچه طولی بیمار و مسیر ارزیابی تا پیگیری با منطق بالینی توسعه‌پذیر.',en:'Structured patient records, longitudinal context and configurable clinical pathways from intake through follow-up.'},
 outcome:{fa:'مستندات تصویری ارسالی شامل پرونده بیمار، ماژول‌های تخصصی، منطق تصمیم‌گیری و مسیر کار پزشک است. تصاویر ارائه، تأیید مستقلی از نسخه عملیاتی یا انطباق پزشکی نیستند.',en:'Owner-supplied visual documentation illustrates patient records, clinical logic and physician workflows. These presentation visuals do not establish certified medical compliance or production metrics.'},
 architecture:[{fa:'پذیرش و تشکیل پرونده بیمار',en:'Patient intake and structured registry'},{fa:'ثبت تاریخچه، آزمایش و دارو',en:'Medical history, labs and medication context'},{fa:'بازبینی بالینی و عوامل خطر',en:'Clinical review and nutrition risk factors'},{fa:'قوانین و مسیرهای تغذیه قابل پیکربندی',en:'Configurable nutrition decision pathways'},{fa:'تدوین برنامه غذایی شخصی',en:'Personalized nutrition plan builder'},{fa:'گزارش، سابقه و پیگیری',en:'Reporting, history and longitudinal follow-up'}],
 features:[{fa:'پرونده بیمار',en:'Patient records'},{fa:'گردش‌کار پزشک',en:'Physician workflow'},{fa:'برنامه غذایی',en:'Nutrition plans'},{fa:'منطق تصمیم',en:'Decision support'}],
 stack:['Clinical Workflows','Patient Records','Decision Logic','Nutrition Planning','HealthTech'],
 source:'DigiRezhim feature, owner-provided illustrated PDF pages 1–8.'},
 {id:'petiwoo',index:'04',brand:'Petiwoo',visual:'pets',
 kicker:{fa:'خرده‌فروشی حیوانات / کلینیک دامپزشکی',en:'VERTICAL SAAS / PET RETAIL & VETERINARY'},
 title:{fa:'دو حوزه تخصصی روی یک زیرساخت.',en:'Specialist products. Shared platform.'},
 tagline:{fa:'خرده‌فروشی و دامپزشکی، عضو خانواده گرتال',en:'Pet Retail + Veterinary Vertical on GARTAL'},
 intro:{fa:'پتیوو از اعضای خانواده محصولات گرتال است؛ بسته‌های صنعتی خرده‌فروشی حیوانات و دامپزشکی از زیرساخت مشترک پلتفرم استفاده می‌کنند.',en:'Petiwoo is part of the GARTAL product family. Pet retail and veterinary packs extend shared platform capabilities with domain-specific workflows.'},
 problem:{fa:'فروشگاه حیوانات و کلینیک دامپزشکی به عملیات، داده‌ها و فرایندهای متفاوتی نیاز دارند؛ پیاده‌سازی تکراری زیرساخت‌ها توسعه را سخت می‌کند.',en:'Pet retail and veterinary practices have distinct workflows but can share reliable platform foundations.'},
 solution:{fa:'ترکیب خدمات مشترک گرتال با امکانات تخصصی انبار، تأمین‌کننده، سفارش، نوبت، پرونده حیوان و پیگیری خدمات.',en:'Build dedicated inventory, supplier, commerce, appointments and clinical-record workflows on top of GARTAL core services.'},
 outcome:{fa:'در سند گرتال، پتیوو خرده‌فروشی و دامپزشکی به‌عنوان نخستین بسته‌های صنعتی فعال معرفی شده‌اند. این صفحه تصویر مفهومی محصول را نشان می‌دهد، نه اطلاعات واقعی مشتری یا ادعای استقرار.',en:'GARTAL documentation describes retail and veterinary as its first active verticals. Visuals here are conceptual, not customer records or verified live product screens.'},
 architecture:[{fa:'بسته خرده‌فروشی / محصول، انبار و سفارش',en:'Retail pack / products, inventory and orders'},{fa:'تأمین و پرداخت / جریان عملیاتی فروشگاه',en:'Suppliers, payments and commerce operations'},{fa:'بسته دامپزشکی / پرونده حیوان و سابقه',en:'Veterinary pack / animals and clinical records'},{fa:'نوبت‌ها و واکسیناسیون',en:'Appointments and vaccination workflows'},{fa:'هسته مشترک گرتال / Tenant، Auth و Licensing',en:'GARTAL core / tenancy, auth and licensing'},{fa:'مدیریت و گزارش‌دهی مشترک',en:'Shared administration and reporting'}],
 features:[{fa:'فروشگاه حیوانات',en:'Pet retail'},{fa:'انبار و تأمین‌کنندگان',en:'Inventory & suppliers'},{fa:'دامپزشکی',en:'Veterinary services'},{fa:'نوبت‌دهی',en:'Appointments'}],
 stack:['GARTAL Core','Vertical SaaS','Retail Ops','Veterinary Ops','React','REST APIs'],
 source:'Owner-provided GARTAL v2 PDF, vertical SaaS section, page 7; GARTAL case-study PDF page 6.'}
];
export const publicContact={email:'saeidshamsaeii00@gmail.com',github:'https://github.com/saeidshamsaeii',linkedin:'https://www.linkedin.com/in/saeid-shamsaei-938016202/'};
