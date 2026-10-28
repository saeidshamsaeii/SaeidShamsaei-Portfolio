import type {SiteLocale} from '@/components/LocaleProvider';
export type SiteText={
 nav:[string,string,string,string];
 skip:string; viewWork:string; coverLead:string;
 hero:[{a:string;b:string;description:string},{a:string;b:string;description:string},{a:string;b:string;description:string}];
 aboutTitle:string;aboutSummary:string;specialties:[string,string,string];
 selectedWork:string;projectsCount:string;caseStudy:string;source:string;
 workIntro:string;contactTitle:string;contactLabels:[string,string,string,string];
 next:string;letsTalk:string;readCase:string;readStory:string;
 back:string;caseLabel:string;sourceIndex:string;technical:string;
 sourceEvidence:string;sourceContext:string;nextStory:string;inspect:string;
 evidenceNote:string;uiLanguage:string;
};
export const siteTranslations:Record<SiteLocale,SiteText>={
 en:{
  nav:['Work','About','Engineering','Contact'],skip:'Skip to work',viewWork:'View work',
  coverLead:'I make complex digital systems\nfeel considered, useful and human.',
  hero:[{a:'I BUILD DIGITAL',b:'THINGS THAT MATTER.',description:'I design useful digital products — thoughtful experiences built on dependable engineering.'},
  {a:'COMPLEX IDEAS.',b:'CLEAR EXPERIENCES.',description:'A clear problem, a considered interface and the systems underneath it. Every decision serves a purpose.'},
  {a:'ARCHITECTURE.',b:'PRODUCT. PEOPLE.',description:'From the first line of code to the full product experience, I build for people and for what comes next.'}],
  aboutTitle:'Clarity in design. Precision in code.',aboutSummary:'I build thoughtful digital products — from architecture to the experience people use.',
  specialties:['Architecture','Engineering','Experience'],
  selectedWork:'Selected work.',projectsCount:'04 projects',caseStudy:'Case study',source:'Source',
  workIntro:'Behind the work.',contactTitle:"Let’s build something that matters.",
  contactLabels:['Email','Phone','LinkedIn','Telegram'],next:'NEXT',letsTalk:"LET’S TALK",readCase:'READ THE CASE STUDY',
  readStory:'READ THE ENGINEERING STORY',back:'BACK TO PORTFOLIO',caseLabel:'CASE STUDY',sourceIndex:'SOURCE INDEX',
  technical:'Technical considerations',sourceEvidence:'SOURCE / EVIDENCE & DELIVERY',sourceContext:'Source context',
  nextStory:'NEXT ENGINEERING STORY',inspect:'INSPECT ARCHITECTURE DECISIONS & VERIFIED SOURCE PATHS',
  evidenceNote:'Follow source references for documented implementation; deployed behavior requires separate verification.',uiLanguage:'Language'
 },
 fa:{
  nav:['پروژه‌ها','درباره من','مهندسی','ارتباط'],skip:'رفتن به پروژه‌ها',viewWork:'مشاهده پروژه‌ها',
  coverLead:'سیستم‌های دیجیتال پیچیده را\nکارآمد، سنجیده و انسانی می‌سازم.',
  hero:[{a:'محصولات دیجیتال',b:'اثرگذار می‌سازم.',description:'محصولاتی کاربردی با تجربه‌ای سنجیده و زیرساخت مهندسی قابل اتکا طراحی می‌کنم.'},
  {a:'ایده‌های پیچیده.',b:'تجربه‌های روشن.',description:'مسئله‌ای روشن، رابطی دقیق و سیستم‌هایی منسجم؛ هر تصمیم باید هدفی داشته باشد.'},
  {a:'معماری.',b:'محصول. انسان.',description:'از اولین خط کد تا تجربه کامل محصول، برای انسان‌ها و آینده طراحی می‌کنم.'}],
  aboutTitle:'شفافیت در طراحی. دقت در کد.',aboutSummary:'محصولات دیجیتال را از معماری سیستم تا تجربه واقعی کاربران با نگاهی یکپارچه می‌سازم.',
  specialties:['معماری','مهندسی','تجربه کاربری'],
  selectedWork:'پروژه‌های منتخب.',projectsCount:'۰۴ پروژه',caseStudy:'مطالعه پروژه',source:'مستندات',
  workIntro:'پشت صحنه پروژه‌ها.',contactTitle:'بیایید چیزی ارزشمند بسازیم.',
  contactLabels:['ایمیل','تلفن','لینکدین','تلگرام'],next:'بعدی',letsTalk:'گفت‌وگو کنیم',readCase:'مطالعه کامل پروژه',
  readStory:'داستان مهندسی پروژه',back:'بازگشت به پورتفولیو',caseLabel:'مطالعه پروژه',sourceIndex:'فهرست منابع',
  technical:'ملاحظات فنی',sourceEvidence:'منابع / شواهد و تحویل',sourceContext:'مبنای مستندات',
  nextStory:'پروژه مهندسی بعدی',inspect:'بررسی تصمیم‌های معماری و مستندات کد',
  evidenceNote:'برای پیاده‌سازی مستندشده به منابع کد مراجعه کنید؛ عملکرد نسخه منتشرشده نیازمند راستی‌آزمایی جداگانه است.',uiLanguage:'زبان'
 },
 ar:{
  nav:['الأعمال','نبذة عني','الهندسة','التواصل'],skip:'الانتقال إلى الأعمال',viewWork:'استعرض الأعمال',
  coverLead:'أحوّل الأنظمة الرقمية المعقّدة\nإلى تجارب مدروسة ومفيدة وإنسانية.',
  hero:[{a:'أبني منتجات رقمية',b:'تصنع فرقاً.',description:'أصمّم منتجات نافعة وتجارب مدروسة تستند إلى هندسة برمجية موثوقة.'},
  {a:'أفكار معقّدة.',b:'تجارب واضحة.',description:'مشكلة واضحة وواجهة مدروسة وأنظمة متينة؛ لكل قرار غاية.'},
  {a:'العمارة.',b:'المنتج. الإنسان.',description:'من أول سطر برمجي إلى التجربة الكاملة، أبني للناس وللمستقبل.'}],
  aboutTitle:'وضوح في التصميم. دقّة في البرمجة.',aboutSummary:'أبني منتجات رقمية بعناية، من عمارة النظام إلى التجربة التي يستخدمها الناس.',
  specialties:['العمارة','الهندسة','تجربة المستخدم'],
  selectedWork:'أعمال مختارة.',projectsCount:'٠٤ مشاريع',caseStudy:'دراسة المشروع',source:'المصدر',
  workIntro:'ما وراء العمل.',contactTitle:'لنبنِ شيئاً ذا قيمة.',
  contactLabels:['البريد','الهاتف','لينكدإن','تلغرام'],next:'التالي',letsTalk:'لنتحدث',readCase:'اقرأ دراسة المشروع',
  readStory:'اقرأ القصة الهندسية',back:'العودة إلى المعرض',caseLabel:'دراسة المشروع',sourceIndex:'فهرس المصادر',
  technical:'اعتبارات تقنية',sourceEvidence:'المصادر / الأدلة والتسليم',sourceContext:'سياق المصدر',
  nextStory:'المشروع الهندسي التالي',inspect:'استعراض قرارات العمارة ومراجع الشيفرة الموثقة',
  evidenceNote:'راجع ملفات المصدر للاطلاع على التنفيذ الموثق؛ التحقق من التشغيل المنشور خطوة منفصلة.',uiLanguage:'اللغة'
 },
 it:{
  nav:['Progetti','Chi sono','Ingegneria','Contatti'],skip:'Vai ai progetti',viewWork:'Scopri i progetti',
  coverLead:'Rendo i sistemi digitali complessi\nintuitivi, utili e vicini alle persone.',
  hero:[{a:'CREO PRODOTTI DIGITALI',b:'CHE CONTANO.',description:'Progetto prodotti utili: esperienze curate su solide basi ingegneristiche.'},
  {a:'IDEE COMPLESSE.',b:'ESPERIENZE CHIARE.',description:'Un problema definito, un’interfaccia attenta e sistemi affidabili. Ogni scelta ha uno scopo.'},
  {a:'ARCHITETTURA.',b:'PRODOTTO. PERSONE.',description:'Dalla prima riga di codice all’esperienza completa, costruisco per le persone e per il futuro.'}],
  aboutTitle:'Chiarezza nel design. Precisione nel codice.',aboutSummary:'Creo prodotti digitali con cura, dall’architettura all’esperienza quotidiana delle persone.',
  specialties:['Architettura','Ingegneria','Esperienza'],
  selectedWork:'Progetti scelti.',projectsCount:'04 progetti',caseStudy:'Caso studio',source:'Fonte',
  workIntro:'Dietro i progetti.',contactTitle:'Costruiamo qualcosa di importante.',
  contactLabels:['Email','Telefono','LinkedIn','Telegram'],next:'PROSSIMO',letsTalk:'PARLIAMONE',readCase:'LEGGI IL CASO STUDIO',
  readStory:'LEGGI LA STORIA TECNICA',back:'TORNA AL PORTFOLIO',caseLabel:'CASO STUDIO',sourceIndex:'FONTI',
  technical:'Considerazioni tecniche',sourceEvidence:'FONTI / PROVE E CONSEGNA',sourceContext:'Contesto delle fonti',
  nextStory:'PROSSIMO PROGETTO',inspect:'ESPLORA LE SCELTE ARCHITETTURALI E LE FONTI',
  evidenceNote:'Le fonti documentano l’implementazione; il comportamento in produzione richiede una verifica separata.',uiLanguage:'Lingua'
 },
 de:{
  nav:['Arbeiten','Über mich','Engineering','Kontakt'],skip:'Zu den Arbeiten',viewWork:'Arbeiten ansehen',
  coverLead:'Ich mache komplexe digitale Systeme\ndurchdacht, nützlich und menschlich.',
  hero:[{a:'ICH ENTWICKLE DIGITALES,',b:'DAS WIRKLICH ZÄHLT.',description:'Ich gestalte nützliche digitale Produkte: durchdachte Erlebnisse auf verlässlicher technischer Basis.'},
  {a:'KOMPLEXE IDEEN.',b:'KLARE ERLEBNISSE.',description:'Ein klares Problem, eine sorgfältige Oberfläche und die Systeme dahinter. Jede Entscheidung hat ihren Zweck.'},
  {a:'ARCHITEKTUR.',b:'PRODUKT. MENSCHEN.',description:'Von der ersten Codezeile bis zum fertigen Produkterlebnis entwickle ich für Menschen und die Zukunft.'}],
  aboutTitle:'Klarheit im Design. Präzision im Code.',aboutSummary:'Ich entwickle durchdachte digitale Produkte – von der Architektur bis zur täglichen Nutzung.',
  specialties:['Architektur','Engineering','Nutzererlebnis'],
  selectedWork:'Ausgewählte Arbeiten.',projectsCount:'04 Projekte',caseStudy:'Fallstudie',source:'Quellen',
  workIntro:'Hinter den Projekten.',contactTitle:'Lass uns etwas Bedeutendes schaffen.',
  contactLabels:['E-Mail','Telefon','LinkedIn','Telegram'],next:'WEITER',letsTalk:'KONTAKT',readCase:'FALLSTUDIE LESEN',
  readStory:'TECHNISCHE GESCHICHTE LESEN',back:'ZURÜCK ZUM PORTFOLIO',caseLabel:'FALLSTUDIE',sourceIndex:'QUELLEN',
  technical:'Technische Überlegungen',sourceEvidence:'QUELLEN / NACHWEISE & AUSLIEFERUNG',sourceContext:'Quellenkontext',
  nextStory:'NÄCHSTE FALLSTUDIE',inspect:'ARCHITEKTURENTSCHEIDUNGEN UND QUELLCODE PRÜFEN',
  evidenceNote:'Die Quellen dokumentieren die Implementierung; der Betrieb in Produktion muss separat geprüft werden.',uiLanguage:'Sprache'
 },
 fr:{
  nav:['Projets','À propos','Ingénierie','Contact'],skip:'Aller aux projets',viewWork:'Voir les projets',
  coverLead:'Je rends les systèmes numériques complexes\nréfléchis, utiles et humains.',
  hero:[{a:'JE CONÇOIS DES PRODUITS',b:'QUI COMPTENT.',description:'Je crée des produits numériques utiles, avec des expériences soignées et une ingénierie fiable.'},
  {a:'IDÉES COMPLEXES.',b:'EXPÉRIENCES CLAIRES.',description:'Un problème précis, une interface réfléchie et une architecture solide. Chaque choix a un sens.'},
  {a:'ARCHITECTURE.',b:'PRODUIT. HUMAINS.',description:'De la première ligne de code à l’expérience complète, je construis pour les personnes et l’avenir.'}],
  aboutTitle:'Clarté du design. Précision du code.',aboutSummary:'Je conçois des produits numériques avec soin, de l’architecture à l’expérience vécue.',
  specialties:['Architecture','Ingénierie','Expérience'],
  selectedWork:'Projets choisis.',projectsCount:'04 projets',caseStudy:'Étude de cas',source:'Sources',
  workIntro:'Derrière les projets.',contactTitle:'Construisons quelque chose qui compte.',
  contactLabels:['E-mail','Téléphone','LinkedIn','Telegram'],next:'SUIVANT',letsTalk:'PARLONS-EN',readCase:'LIRE L’ÉTUDE DE CAS',
  readStory:'LIRE LE PARCOURS TECHNIQUE',back:'RETOUR AU PORTFOLIO',caseLabel:'ÉTUDE DE CAS',sourceIndex:'SOURCES',
  technical:'Considérations techniques',sourceEvidence:'SOURCES / PREUVES ET LIVRAISON',sourceContext:'Contexte des sources',
  nextStory:'PROCHAINE ÉTUDE DE CAS',inspect:'EXPLORER LES CHOIX D’ARCHITECTURE ET LE CODE SOURCE',
  evidenceNote:'Les références attestent du code documenté ; une vérification distincte est requise pour la production.',uiLanguage:'Langue'
 },
 zh:{
  nav:['作品','关于','工程实践','联系'],skip:'跳转到作品',viewWork:'查看作品',
  coverLead:'让复杂的数字系统\n变得周到、实用且富有人情味。',
  hero:[{a:'打造真正有价值的',b:'数字产品。',description:'以可靠的工程基础，设计实用的数字产品与细致的用户体验。'},
  {a:'复杂的想法。',b:'清晰的体验。',description:'明确问题、打磨界面、构建稳健系统；让每一项设计决策都有意义。'},
  {a:'架构。',b:'产品。人。',description:'从第一行代码到完整体验，面向使用者与未来构建。'}],
  aboutTitle:'设计求清晰，代码求精准。',aboutSummary:'从系统架构到用户的实际体验，我用严谨的方法打造数字产品。',
  specialties:['系统架构','工程开发','用户体验'],
  selectedWork:'精选作品。',projectsCount:'04 个项目',caseStudy:'项目案例',source:'源码',
  workIntro:'作品背后。',contactTitle:'一起创造有意义的产品。',
  contactLabels:['邮箱','电话','领英','Telegram'],next:'下一个',letsTalk:'联系我',readCase:'阅读完整案例',
  readStory:'阅读工程实践',back:'返回作品集',caseLabel:'项目案例',sourceIndex:'源码索引',
  technical:'技术考量',sourceEvidence:'源码 / 证据与交付',sourceContext:'源码说明',
  nextStory:'下一个工程案例',inspect:'查看架构决策与已核实的代码路径',
  evidenceNote:'源码可证明已记录的实现，实际部署与运行情况仍需单独验证。',uiLanguage:'语言'
 },
 ru:{
  nav:['Проекты','Обо мне','Инженерия','Контакты'],skip:'К проектам',viewWork:'Смотреть проекты',
  coverLead:'Превращаю сложные цифровые системы\nв продуманные, полезные и понятные.',
  hero:[{a:'СОЗДАЮ ЦИФРОВЫЕ',b:'ПРОДУКТЫ СО СМЫСЛОМ.',description:'Проектирую полезные продукты с продуманным интерфейсом и надёжной инженерной основой.'},
  {a:'СЛОЖНЫЕ ИДЕИ.',b:'ПОНЯТНЫЙ ОПЫТ.',description:'Чёткая задача, удобный интерфейс и системы за ним. У каждого решения есть цель.'},
  {a:'АРХИТЕКТУРА.',b:'ПРОДУКТ. ЛЮДИ.',description:'От первой строки кода до полного опыта использования — создаю для людей и будущего.'}],
  aboutTitle:'Ясность в дизайне. Точность в коде.',aboutSummary:'Создаю продуманные цифровые продукты — от архитектуры до пользовательского опыта.',
  specialties:['Архитектура','Инженерия','Опыт'],
  selectedWork:'Избранные проекты.',projectsCount:'04 проекта',caseStudy:'Кейс',source:'Исходники',
  workIntro:'За кулисами проектов.',contactTitle:'Создадим что-то значимое.',
  contactLabels:['Почта','Телефон','LinkedIn','Telegram'],next:'ДАЛЕЕ',letsTalk:'ОБСУДИМ',readCase:'ПОДРОБНЕЕ О ПРОЕКТЕ',
  readStory:'ИСТОРИЯ РАЗРАБОТКИ',back:'НАЗАД К ПОРТФОЛИО',caseLabel:'КЕЙС',sourceIndex:'ИСХОДНЫЙ КОД',
  technical:'Технические решения',sourceEvidence:'ИСХОДНИКИ / ДОКАЗАТЕЛЬСТВА И РЕЛИЗ',sourceContext:'Сведения об исходниках',
  nextStory:'СЛЕДУЮЩИЙ ПРОЕКТ',inspect:'АРХИТЕКТУРНЫЕ РЕШЕНИЯ И ПРОВЕРЕННЫЙ ИСХОДНЫЙ КОД',
  evidenceNote:'Исходники подтверждают описанную реализацию; фактическое развёртывание требует отдельной проверки.',uiLanguage:'Язык'
 }
};
export const siteText=(locale:SiteLocale)=>siteTranslations[locale];
