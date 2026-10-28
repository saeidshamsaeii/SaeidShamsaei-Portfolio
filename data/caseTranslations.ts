import type {SiteLocale} from '@/components/LocaleProvider';
import type {ProjectId} from './portfolio';
export type LocalChapter={title:string;body:string};
export type LocalCase={chapters:[LocalChapter,LocalChapter,LocalChapter,LocalChapter,LocalChapter,LocalChapter]};
type OtherLocale=Exclude<SiteLocale,'en'>;
// Six faithful, source-limited editorial chapters per product and language.
// Technical identifiers, references and published-source links stay unchanged.
const translated:Record<OtherLocale,Record<ProjectId,LocalCase>>={
 fa:{
  gartal:{chapters:[
   {title:'دو سیستم؛ یک نگاه مهندسی',body:'گرتال دو هویت مستقل دارد: سایت استودیو برای خدمات طراحی و توسعه، و پلتفرمی جدا برای قراردادهای مشترک نرم‌افزاری. کاربرد و کاربران این دو یکسان نیستند.'},
   {title:'مسیر روشن مشتری؛ زیرساخت تکرارپذیر',body:'مشتری باید خدمات را بشناسد و درخواست پروژه را آسان ثبت کند. در سوی دیگر، محصولات به قراردادهای مشترک نیاز دارند، بدون آنکه سرویس‌های مستقل در یک برنامه ادغام شوند.'},
   {title:'مسیر ارتباط با مشتری در سایت استودیو',body:'مخزن GARTAL-SITE دارای صفحات خدمات با رندر سمت سرور، اعتبارسنجی فرم درخواست، حفظ حریم خصوصی و فراداده SEO است. هویت بصری مصوب، مستقل از اثبات انتشار یا موفقیت تجاری است.'},
   {title:'قراردادهای مشترک؛ سرویس‌های مستقل',body:'پلتفرم، مسئولیت‌های Core Server، Core Admin، فروشگاه و مدیریت مجوز را جدا می‌کند. بسته‌های صنعت با نسخه‌بندی مستقل گسترش می‌یابند و پیش از انتشار باید سازگاری آن‌ها بررسی شود.'},
   {title:'هدف قبل از تزئینات',body:'ناوبری سایت استودیو به پرسش‌های واقعی مشتری پاسخ می‌دهد. در پلتفرم، عملیات فروش، سفارش، موجودی و پرونده‌ها مرزهای داده‌ای متفاوت دارند؛ آمار ساختگی جایگزین مستندات نمی‌شود.'},
   {title:'زیرساخت مستند؛ نه داستان موفقیت ساختگی',body:'وجود مسیرها و قراردادها در کد قابل بررسی است؛ انتشار عمومی، پذیرش مشتری و شاخص‌های عملکرد نیاز به شواهد مستقل دارند. گام بعدی راستی‌آزمایی نسخه عملیاتی است.'}
  ]},
  factory:{chapters:[
   {title:'مهندسی فراتر از یک مخزن',body:'فکتوری چند پروژه را در یک مدل کاری زیر نظر مالک هماهنگ می‌کند. منشأ هر تغییر، نسخه مخزن و وضعیت نصب‌شده محلی باید مستقل و قابل پیگیری باشند.'},
   {title:'حقیقت گیت‌هاب با حقیقت دستگاه فرق دارد',body:'ثبت کامیت آنلاین به‌معنای دریافت آن روی سیستم ویندوز نیست. داشبورد باید تفاوت کد مخزن و checkout محلی را آشکار کند.'},
   {title:'فقط پروژه‌های فعال منابع مصرف کنند',body:'چرخه عمر پروژه‌ها شامل فعال، آینده، تکمیل‌شده و آرشیوشده است. پایش روزمره روی پروژه‌های فعال متمرکز می‌شود و سابقه سایر موارد حفظ می‌گردد.'},
   {title:'همگام‌سازی بدون تخریب کار مالک',body:'ورکر از Fetch و Pull کنترل‌شده استفاده می‌کند. تغییرات محلی ثبت‌نشده یا انشعاب‌های ناسازگار باید جلوی بازنویسی خطرناک فایل‌ها را بگیرند.'},
   {title:'اگر شواهد ناقص‌اند، صریح بگوییم',body:'گزارش‌های Guardian باید به نسخه کد متصل باشند و میان وضعیت معتبر، قدیمی و بررسی‌نشده تمایز قائل شوند. هیچ آزمونی که اجرا نشده نباید موفق گزارش شود.'},
   {title:'همگام‌سازی خودکار؛ کیفیت با تصمیم انسان',body:'طبق سیاست فعلی، CI، بیلد، تست، اسکن و پیش‌نمایش خودکار در ورکر غیرفعال‌اند. تأیید کیفیت به‌صورت جداگانه و با درخواست مالک انجام می‌شود.'}
  ]},
  digirezhim:{chapters:[
   {title:'تبدیل دانش بالینی به نرم‌افزار کاربردی',body:'دیجی‌رژیم دانش تغذیه و تجربه پزشکی را در فرایندهای ساختاریافته سازمان می‌دهد؛ ثبت و نمایش داده جایگزین قضاوت بالینی پزشک نیست.'},
   {title:'فرایند درمان فقط یک فرم نیست',body:'شرح حال، ارزیابی، قواعد تغذیه و پیگیری بیمار به هم مرتبط‌اند. سیستم باید دسترسی و مسئولیت متخصص را در هر مرحله روشن کند.'},
   {title:'چهار بخش با مسئولیت مشخص',body:'معماری شامل وب عمومی، وب مدیریت، API عمومی و API مدیریت است. داده‌ها با PostgreSQL و Prisma و نیازهای جانبی با Redis مدیریت می‌شوند.'},
   {title:'داشبورد متناسب با نقش پزشک',body:'ثبت‌نام، احراز هویت، آمادگی حساب و فهرست بیماران بر پایه داده‌های سرور طراحی شده‌اند؛ حالت‌های غیرواقعی نباید جای داده معتبر را بگیرند.'},
   {title:'از پذیرش بیمار تا پیگیری',body:'قواعد علمیِ موجود در فایل‌های Excel به منطق و داده قابل بررسی منتقل می‌شوند. موارد استثنا و تأیید نهایی باید در اختیار پزشک بمانند.'},
   {title:'اعتماد بالینی به شواهد نیاز دارد',body:'مخزن، مسیرهای کاری و مهاجرت داده را مستند می‌کند اما گواه تأیید علمی، انطباق قانونی یا آماده‌بودن محصول برای تولید نیست.'}
  ]},
  petiwoo:{chapters:[
   {title:'تجارت تخصصی به ناوبری تخصصی نیاز دارد',body:'نیازهای سگ، گربه و پرندگان یکسان نیست. فروشگاه باید دسته‌بندی کالاها را حول نوع حیوان و نیاز خریدار سازمان‌دهی کند.'},
   {title:'کاتالوگ باید خریدار را بشناسد',body:'جست‌وجو، فیلترها و دسته‌ها باید با داده صحیح محصول، موجودی و قیمت هماهنگ باشند. یک کاتالوگ عمومی برای همه نیازها کافی نیست.'},
   {title:'کشف محصول یک سیستم است',body:'فروشگاه Next.js دارای صفحات فهرست و جزئیات محصول، دسته‌بندی، برند و پیشنهادهای فروش است و داده محصولات را از API دریافت می‌کند.'},
   {title:'از مشاهده تا سبد خرید',body:'سبد خرید با Zustand مدیریت می‌شود. قیمت، تعداد و موجودی از داده فروشگاهی و خدمات مرتبط اثر می‌گیرند؛ مسیر تسویه به تأیید واقعی تراکنش وابسته است.'},
   {title:'محصول تخصصی روی زیرساخت مشترک',body:'خانواده گرتال بسته‌های نسخه‌بندی‌شده برای خرده‌فروشی حیوانات و خدمات دام‌پزشکی دارد. این دو حوزه داده‌ای باید متمایز بمانند.'},
   {title:'محصول واقعی، معیارهای واقعی',body:'کد، کاتالوگ و مسیرهای خرید را اثبات می‌کند؛ درآمد، سفارش موفق و نرخ تبدیل بدون داده تأییدشده نباید در پورتفولیو ادعا شوند.'}
  ]}
 },
 ar:{
  gartal:{chapters:[
   {title:'نظامان وفلسفة هندسية واحدة',body:'تضمّ GARTAL موقع استوديو للخدمات الرقمية ومنصة منتجات منفصلة للعقود المشتركة. يختلف جمهور النظامين وحدود تشغيلهما ولا يجوز معاملتهما كتطبيق واحد.'},
   {title:'واجهة واضحة ومحرك قابل لإعادة الاستخدام',body:'يحتاج العميل إلى فهم الخدمة وإرسال طلب مشروع بسهولة، بينما تحتاج المنتجات إلى عقود تقنية مشتركة دون دمج جميع التطبيقات في نظام هش.'},
   {title:'رحلة عميل مقصودة في موقع الاستوديو',body:'يحتوي GARTAL-SITE على صفحات خدمات وخطوات للتحقق من طلبات المشاريع والخصوصية وبيانات SEO. لا تثبت الهوية البصرية وحدها إطلاقاً تجارياً.'},
   {title:'عقود مشتركة وتطبيقات مستقلة',body:'تفصل المنصة بين Core Server وCore Admin والمتجر وإدارة التراخيص، مع حزم صناعية بإصدارات مستقلة تتطلب فحص التوافق.'},
   {title:'الغاية قبل الزخرفة',body:'تتبع واجهة الاستوديو أسئلة العملاء الحقيقية، وتفصل المنصة بين الطلبات والمنتجات والمخزون والسجلات الأخرى دون اختلاق مؤشرات أداء.'},
   {title:'أساس موثّق لا نجاح متخيّل',body:'وجود الشيفرة والمسارات قابل للتحقق، أمّا النشر والنتائج التجارية فيحتاجان إلى قبول وأدلة مستقلة.'}
  ]},
  factory:{chapters:[
   {title:'هندسة تتجاوز مستودعاً واحداً',body:'تنسّق المنظومة عدّة مستودعات مع الحفاظ على أثر كل تغيير وحالة النسخة المثبّتة محلياً.'},
   {title:'مصدر الشيفرة ليس حالة الجهاز',body:'لا يضمن الالتزام على GitHub أن Windows Worker قد حصل على التغيير. يجب عرض الحالتين منفصلتين.'},
   {title:'الاهتمام بالمشاريع النشطة',body:'تُفرّق دورة الحياة بين المشاريع النشطة والمستقبلية والمنجزة والمؤرشفة، مع متابعة العمل النشط دون فقد السجل.'},
   {title:'مزامنة دون إتلاف عمل المالك',body:'تستخدم المزامنة عمليات Git آمنة وتمنع الكتابة المدمّرة عند وجود تغييرات محلية أو اختلافات في الفروع.'},
   {title:'التصريح بنقص الأدلة',body:'تربط تقارير Guardian النتائج بمراجعات الشيفرة وتفرّق بين الأدلة الحالية والقديمة وغير المختبرة؛ لا يجوز إعلان النجاح دون اختبار.'},
   {title:'مزامنة المصدر وقرار الجودة البشري',body:'تظلّ CI والبناء والاختبارات والفحوص والمعاينات التلقائية معطّلة بحسب سياسة المالك الحالية.'}
  ]},
  digirezhim:{chapters:[
   {title:'من المعرفة السريرية إلى برنامج نافع',body:'ينظّم DigiRezhim معرفة التغذية وسير العمل الطبي في برامج قابلة للاستخدام دون استبدال حكم الطبيب.'},
   {title:'الرعاية أكثر من مجرد نماذج',body:'يرتبط تاريخ المريض وتقييمه وقواعد التغذية والمتابعة بصلاحيات واضحة ومراجعة مهنية.'},
   {title:'أربع واجهات بمسؤوليات محددة',body:'تفصل البنية بين الويب العام والإدارة وواجهتي API، مع PostgreSQL وPrisma وRedis.'},
   {title:'لوحة تراعي سياق الطبيب',body:'تعتمد هوية الطبيب والتحقق من الحساب والسجلات على بيانات موثقة من الخادم لا حالات شكلية.'},
   {title:'من التسجيل إلى المتابعة',body:'تُنقل قواعد Excel العلمية إلى بيانات ومنطق واضحين، مع توثيق الاستثناءات وموافقة الأطباء.'},
   {title:'الثقة السريرية تُكتسب بالأدلة',body:'تصف المستودعات العمل التقني لكنها لا تُعدّ شهادة اعتماد سريري أو موافقة تنظيمية أو إثبات تشغيل فعلي.'}
  ]},
  petiwoo:{chapters:[
   {title:'التجارة المتخصصة تحتاج إلى تصفح متخصص',body:'تختلف احتياجات القطط والكلاب والطيور، ولذلك تنطلق الملاحة من الحيوان والفئة والغرض.'},
   {title:'الفهرس يفهم حاجة المتسوّق',body:'تعتمد فاعلية البحث والفئات على بيانات متسقة للمنتجات والأسعار والمخزون.'},
   {title:'اكتشاف المنتج نظام متكامل',body:'يستخدم متجر Next.js قوائم المنتجات والتفاصيل والبحث والفئات ومعلومات العلامات التجارية من واجهات API.'},
   {title:'من التصفح إلى سلة الشراء',body:'تحفظ Zustand حالة السلة، بينما يتطلب إنشاء الطلب والدفع تأكيداً من خدمات التجارة الخلفية.'},
   {title:'منتج متخصص على أسس مشتركة',body:'تصف منصة GARTAL حزم تجارة الحيوانات والطب البيطري، مع فصل التسوق عن السجلات الطبية.'},
   {title:'منتج حقيقي ومقاييس حقيقية',body:'تؤكد الشيفرة مسارات الشراء والفهرس، لا المبيعات المدفوعة أو إيرادات التشغيل.'}
  ]}
 },
 it:{
  gartal:{chapters:[
   {title:'Due sistemi, una filosofia tecnica',body:'GARTAL distingue il sito dello studio per i servizi digitali dalla piattaforma di contratti condivisi. Clienti, responsabilità e runtime non coincidono.'},
   {title:'Un ingresso chiaro e fondamenta riutilizzabili',body:'I clienti devono capire l’offerta e inviare una richiesta. I prodotti, invece, richiedono contratti comuni senza fondere applicazioni indipendenti.'},
   {title:'Un percorso cliente mirato',body:'GARTAL-SITE documenta pagine di servizi, richieste validate, privacy e SEO. Un’identità visiva approvata non dimostra risultati commerciali.'},
   {title:'Contratti comuni, applicazioni separate',body:'Core Server, Core Admin, negozio e gestione licenze conservano responsabilità distinte; i pacchetti verticali sono versionati e richiedono controlli.'},
   {title:'La funzione prima dell’ornamento',body:'La navigazione risponde a domande reali. Cataloghi, ordini e altre attività della piattaforma restano distinti, senza dashboard o risultati inventati.'},
   {title:'Fondamenta documentate, non successi inventati',body:'Il codice prova percorsi e contratti, non un lancio approvato o vendite; la verifica operativa resta un passaggio distinto.'}
  ]},
  factory:{chapters:[
   {title:'Ingegneria oltre un singolo repository',body:'La Factory coordina più repository sotto il controllo del proprietario, mantenendo tracciabili le revisioni e lo stato locale.'},
   {title:'Il repository non è la macchina',body:'Un commit GitHub non equivale a un checkout Windows aggiornato; il sistema deve mostrare le due condizioni separatamente.'},
   {title:'Priorità ai progetti attivi',body:'La gestione distingue attività correnti, future, completate e archiviate senza perdere la cronologia.'},
   {title:'Sincronizzare senza distruggere il lavoro',body:'Fetch e pull protetti evitano di sovrascrivere modifiche locali o repository divergenti.'},
   {title:'Dichiarare chiaramente le prove mancanti',body:'I report Guardian collegano la qualità a commit precisi e distinguono prove valide, obsolete e non testate.'},
   {title:'Sync automatica, qualità governata dalle persone',body:'CI, build, test, scansioni e anteprime automatiche restano disabilitati secondo l’attuale policy.'}
  ]},
  digirezhim:{chapters:[
   {title:'Dalla conoscenza clinica a un software utile',body:'DigiRezhim trasforma i processi nutrizionali in flussi di lavoro strutturati, senza sostituire il giudizio medico.'},
   {title:'La clinica non è una semplice raccolta di moduli',body:'Anamnesi, dati del paziente, regole nutrizionali e follow-up devono rispettare ruoli e autorizzazioni professionali.'},
   {title:'Quattro servizi con responsabilità distinte',body:'Web pubblico e amministrativo, API pubblica e amministrativa, PostgreSQL, Prisma e Redis sono componenti separati.'},
   {title:'Una dashboard coerente con il lavoro medico',body:'Identità, verifica, accessi e cartelle pazienti si basano sul backend, evitando stati fittizi.'},
   {title:'Dall’accoglienza al follow-up',body:'Le regole scientifiche di Excel vengono trasferite a modelli di dati espliciti con eccezioni e revisione medica.'},
   {title:'La fiducia clinica richiede prove',body:'Il repository documenta processi e migrazioni, ma non certifica conformità clinica o prontezza produttiva.'}
  ]},
  petiwoo:{chapters:[
   {title:'Il commercio specialistico richiede percorsi dedicati',body:'Le esigenze di gatti, cani e uccelli differiscono; la navigazione deve rispecchiare specie e categorie.'},
   {title:'Un catalogo che capisce chi acquista',body:'Ricerca e filtri dipendono da tassonomie, prezzi e dati di disponibilità coerenti.'},
   {title:'Scoprire prodotti è un sistema',body:'Lo storefront Next.js include ricerca, schede, categorie e feed prodotto connessi alle API.'},
   {title:'Dalla navigazione al carrello',body:'Zustand gestisce il carrello; creazione ordini e pagamenti richiedono conferme dei servizi backend.'},
   {title:'Un prodotto verticale su basi comuni',body:'I pacchetti GARTAL per pet retail e veterinaria condividono contratti ma mantengono separati i relativi domini.'},
   {title:'Un prodotto reale, risultati da verificare',body:'Il codice conferma catalogo e checkout, ma non prova pagamenti, vendite o tassi di conversione.'}
  ]}
 },
 de:{
  gartal:{chapters:[
   {title:'Zwei Systeme, eine technische Haltung',body:'GARTAL trennt die Studio-Website für digitale Dienstleistungen von der Plattform für gemeinsame Verträge. Beide haben eigene Nutzer und Laufzeiten.'},
   {title:'Ein klarer Zugang, wiederverwendbare Bausteine',body:'Kunden brauchen einen nachvollziehbaren Weg zur Anfrage; die Produkte brauchen gemeinsame Standards ohne technische Zwangskopplung.'},
   {title:'Ein gezielter Weg für Kunden',body:'GARTAL-SITE dokumentiert Service-Seiten, validierte Anfragen, Datenschutz und SEO. Branding allein beweist keinen Markterfolg.'},
   {title:'Gemeinsame Verträge, getrennte Anwendungen',body:'Core Server, Core Admin, Shop und Lizenzverwaltung bleiben eigenständig. Branchenpakete werden versioniert und auf Kompatibilität geprüft.'},
   {title:'Zweck vor Dekoration',body:'Die Navigation beantwortet echte Kundenfragen. Bestellungen, Lager und andere Betriebsbereiche behalten klare Grenzen statt erfundener Kennzahlen.'},
   {title:'Dokumentierte Grundlagen, keine erfundene Erfolgsgeschichte',body:'Quellcode belegt Funktionen und Verträge, nicht aber einen bestätigten Launch, Kundenerfolg oder Umsatz.'}
  ]},
  factory:{chapters:[
   {title:'Engineering über ein Repository hinaus',body:'Die Factory koordiniert mehrere Quellcode-Repositories unter Kontrolle des Eigentümers und macht Versionen nachvollziehbar.'},
   {title:'Quellcode ist nicht gleich Maschinenzustand',body:'Ein GitHub-Commit bedeutet nicht, dass das lokale Windows-Checkout aktualisiert wurde. Beide Zustände werden getrennt dargestellt.'},
   {title:'Aktive Projekte haben Priorität',body:'Der Lebenszyklus unterscheidet aktive, künftige, abgeschlossene und archivierte Projekte mit erhaltenem Verlauf.'},
   {title:'Synchronisieren ohne Datenverlust',body:'Geschützte Fetch/Pull-Operationen verhindern, dass lokale Änderungen oder abweichende Branches überschrieben werden.'},
   {title:'Fehlende Belege klar benennen',body:'Guardian-Berichte werden an Quellcode-Versionen gebunden und unterscheiden aktuelle, veraltete und nicht geprüfte Ergebnisse.'},
   {title:'Automatischer Abgleich, Qualität unter menschlicher Kontrolle',body:'Automatische CI, Builds, Tests, Scans und Previews bleiben gemäß aktueller Richtlinie ausgeschaltet.'}
  ]},
  digirezhim:{chapters:[
   {title:'Vom medizinischen Wissen zur nutzbaren Software',body:'DigiRezhim strukturiert klinische Ernährungsabläufe, ohne die Beurteilung durch medizinisches Fachpersonal zu ersetzen.'},
   {title:'Medizinische Abläufe sind mehr als Formulare',body:'Anamnese, Patienteninformationen, Ernährungsregeln und Nachsorge benötigen klare Rechte und Zuständigkeiten.'},
   {title:'Vier Bereiche mit klarer Verantwortung',body:'Öffentliches und administratives Web sowie separate APIs nutzen PostgreSQL, Prisma und Redis.'},
   {title:'Ein Dashboard für die ärztliche Praxis',body:'Registrierung, Verifizierung und Patientenzugriff basieren auf Serverdaten statt erfundenen Zuständen.'},
   {title:'Von der Aufnahme bis zur Nachsorge',body:'Wissenschaftliche Excel-Regeln werden in nachvollziehbare Daten und Logik überführt, die medizinische Prüfung bleibt eigenständig.'},
   {title:'Klinisches Vertrauen braucht Nachweise',body:'Das Repository dokumentiert Funktionen, aber keine zertifizierte klinische Konformität oder Freigabe für den produktiven Einsatz.'}
  ]},
  petiwoo:{chapters:[
   {title:'Fachhandel braucht besondere Navigation',body:'Hunde, Katzen und Vögel haben unterschiedliche Bedürfnisse; die Suche orientiert sich an Tierarten und Produktgruppen.'},
   {title:'Ein Katalog für echte Bedürfnisse',body:'Produktsuche und Kategorien benötigen eine verlässliche Taxonomie sowie korrekte Preis- und Bestandsdaten.'},
   {title:'Produktentdeckung ist ein System',body:'Der Next.js-Shop verbindet Listen, Detailseiten, Marken und Kategorien mit Commerce-APIs.'},
   {title:'Vom Stöbern bis zum Warenkorb',body:'Zustand verwaltet den Warenkorb; tatsächliche Bestellungen und Zahlungen müssen vom Backend bestätigt werden.'},
   {title:'Ein Branchenprodukt auf gemeinsamem Fundament',body:'GARTAL beschreibt Pakete für Tierhandel und Veterinärarbeit, mit klaren Domänengrenzen.'},
   {title:'Echtes Produkt, überprüfbare Kennzahlen',body:'Der Code belegt Einkaufswege, aber keine realen Zahlungen, Verkäufe oder Umsätze.'}
  ]}
 },
 fr:{
  gartal:{chapters:[
   {title:'Deux systèmes, une même philosophie technique',body:'GARTAL distingue son site de studio de services de sa plateforme de contrats partagés. Les usages et les applications restent séparés.'},
   {title:'Une entrée claire, des bases réutilisables',body:'Le client doit comprendre l’offre et transmettre sa demande ; les produits ont besoin de contrats communs sans fusionner les services.'},
   {title:'Un parcours client ciblé',body:'GARTAL-SITE documente pages de services, validation des demandes, confidentialité et SEO. Une identité visuelle n’atteste pas de résultats commerciaux.'},
   {title:'Contrats communs, applications autonomes',body:'Core Server, Core Admin, boutique et gestion des licences conservent leurs responsabilités. Les modules métier sont versionnés et vérifiés.'},
   {title:'L’objectif avant l’ornement',body:'La navigation répond aux besoins réels ; commandes, stocks et opérations de plateforme conservent leurs frontières sans statistiques fictives.'},
   {title:'Des bases documentées, pas un succès inventé',body:'Le code atteste des fonctionnalités, pas d’un lancement public approuvé ni de résultats clients sans vérification indépendante.'}
  ]},
  factory:{chapters:[
   {title:'L’ingénierie au-delà d’un seul dépôt',body:'La Factory coordonne plusieurs dépôts sous le contrôle du propriétaire et conserve la traçabilité des versions locales.'},
   {title:'Le dépôt ne représente pas la machine',body:'Un commit GitHub ne signifie pas que le Worker Windows l’a reçu ; les deux états doivent rester distincts.'},
   {title:'Donner priorité aux projets actifs',body:'Le cycle de vie distingue les projets actifs, futurs, terminés et archivés sans perdre leur historique.'},
   {title:'Synchroniser sans détruire le travail',body:'Les opérations Git protégées évitent d’écraser des fichiers locaux modifiés ou des branches divergentes.'},
   {title:'Reconnaître les preuves incomplètes',body:'Les rapports Guardian associent les conclusions aux versions du code et distinguent les états récents, périmés et non testés.'},
   {title:'Synchronisation automatique, validation humaine',body:'CI, builds, tests, analyses et aperçus automatiques restent désactivés par la politique actuelle.'}
  ]},
  digirezhim:{chapters:[
   {title:'Du savoir clinique au logiciel utile',body:'DigiRezhim organise la connaissance nutritionnelle en parcours structurés sans remplacer le jugement du médecin.'},
   {title:'Les soins dépassent les formulaires',body:'Historique, données patient, règles nutritionnelles et suivi doivent respecter les autorisations professionnelles.'},
   {title:'Quatre services aux responsabilités définies',body:'Web public, web administratif et deux API séparées utilisent PostgreSQL, Prisma et Redis.'},
   {title:'Un tableau de bord adapté aux médecins',body:'Inscription, vérification et accès aux dossiers se fondent sur les données du serveur et non sur des états fictifs.'},
   {title:'De l’accueil au suivi',body:'Les règles scientifiques d’Excel migrent vers des données et une logique explicites avec contrôle médical indépendant.'},
   {title:'La confiance clinique se démontre',body:'Le dépôt décrit les fonctionnalités, mais ne certifie pas la conformité médicale ni la disponibilité en production.'}
  ]},
  petiwoo:{chapters:[
   {title:'Un commerce spécialisé exige une navigation dédiée',body:'Les besoins des chiens, chats et oiseaux diffèrent ; la navigation doit suivre l’espèce et la catégorie.'},
   {title:'Un catalogue qui comprend l’acheteur',body:'Recherche et filtres nécessitent des catégories cohérentes ainsi que des données fiables de prix et de stock.'},
   {title:'La découverte produit est un système',body:'La boutique Next.js relie listes, fiches, marques et catégories à des API e-commerce.'},
   {title:'De la navigation au panier',body:'Zustand gère le panier ; la création des commandes et les paiements exigent une confirmation du backend.'},
   {title:'Un produit spécialisé sur une base commune',body:'Les modules GARTAL pour la vente et les soins vétérinaires partagent des contrats sans confondre les domaines.'},
   {title:'Un produit réel, des chiffres à vérifier',body:'Le code confirme les parcours d’achat, pas les paiements, ventes ou revenus effectivement réalisés.'}
  ]}
 },
 zh:{
  gartal:{chapters:[
   {title:'两套系统，同一工程理念',body:'GARTAL 将面向客户的数字服务网站与可复用产品契约平台分开建设，两者服务不同用户，不能视为同一应用。'},
   {title:'清晰的入口与可复用的基础',body:'客户需要清楚了解服务并提交需求；产品团队需要共享契约，同时保持各应用独立。'},
   {title:'聚焦客户的服务路径',body:'GARTAL-SITE 具有服务页面、项目申请验证、隐私规则和 SEO 元数据；视觉品牌不能证明商业成果。'},
   {title:'共享契约，独立应用',body:'Core Server、Core Admin、商店与许可管理各有边界。行业包采用版本管理，并在发布前检查兼容性。'},
   {title:'功能优先于装饰',body:'网站导航回答客户真实问题；产品、订单、库存与其他运营数据保持独立，不展示虚构指标。'},
   {title:'有据可查的基础，而非虚构成功',body:'源码证明已记录的功能与契约，正式上线、客户成果和收入还需要独立证据。'}
  ]},
  factory:{chapters:[
   {title:'跨越单一仓库的工程管理',body:'Factory 在所有者控制下协调多个代码仓库，并追踪远程版本与本地工作状态。'},
   {title:'仓库版本不等于设备版本',body:'GitHub 新提交并不意味着 Windows 工作节点已经更新，必须分别显示两者状态。'},
   {title:'优先处理活跃项目',body:'项目分为活跃、计划中、已完成和已归档；日常同步侧重活跃任务，同时保留历史。'},
   {title:'同步时保护本地修改',body:'受控的 Fetch/Pull 操作避免覆盖尚未提交的文件和发生分叉的仓库。'},
   {title:'如实报告缺失的证据',body:'Guardian 报告绑定具体代码版本，并区分有效、过期及未测试的结果。未运行的测试不能标记为通过。'},
   {title:'源码可同步，质量由人工确认',body:'根据当前政策，自动 CI、构建、测试、扫描与预览均被关闭。'}
  ]},
  digirezhim:{chapters:[
   {title:'将临床知识转化为实用软件',body:'DigiRezhim 把临床营养知识组织成结构化流程，但不会取代医生的专业判断。'},
   {title:'医疗流程不只是表单',body:'患者病史、营养评估、科学规则与随访必须具备明确的权限和责任边界。'},
   {title:'四套职责明确的服务',body:'公开网站、管理网站及两组独立 API 使用 PostgreSQL、Prisma 和 Redis。'},
   {title:'符合医生工作场景的界面',body:'医生身份、认证与患者访问由真实的服务器数据支持，避免虚构账户状态。'},
   {title:'从接诊到随访',body:'科学 Excel 规则逐步迁移到可审计的数据与逻辑中，医学验证仍需单独进行。'},
   {title:'临床信任必须靠证据建立',body:'仓库描述了技术流程，但不能证明临床认证、法规批准或已完成生产验收。'}
  ]},
  petiwoo:{chapters:[
   {title:'专业电商需要专业导航',body:'猫、狗与鸟类的需求不同，产品导航应围绕宠物种类和用途组织。'},
   {title:'理解顾客需求的商品目录',body:'搜索、筛选与分类必须依赖一致的品类体系以及准确的价格和库存数据。'},
   {title:'商品发现是一个完整系统',body:'Next.js 商店将商品列表、详情、品牌和分类连接到电商 API。'},
   {title:'从浏览到购物车',body:'Zustand 管理客户端购物车；订单与支付结果需要后端确认。'},
   {title:'共享基础上的垂直产品',body:'GARTAL 的宠物零售与兽医业务包共享契约，但保留不同的业务数据边界。'},
   {title:'真实产品，真实指标',body:'源码能证明购物流程，但无法直接证明实际付款、销量或营收。'}
  ]}
 },
 ru:{
  gartal:{chapters:[
   {title:'Две системы — одна инженерная философия',body:'GARTAL разделяет сайт студии цифровых услуг и отдельную платформу общих контрактов. Их пользователи и технические границы различаются.'},
   {title:'Понятный вход и переиспользуемая основа',body:'Клиентам нужен прямой путь к заявке, а продуктам — общие контракты без объединения независимых сервисов.'},
   {title:'Продуманный путь клиента',body:'GARTAL-SITE документирует услуги, проверку заявок, конфиденциальность и SEO. Фирменный стиль не доказывает коммерческий успех.'},
   {title:'Общие контракты, независимые приложения',body:'Core Server, Core Admin, магазин и лицензирование разделены. Отраслевые модули версионируются и требуют проверок совместимости.'},
   {title:'Назначение важнее украшений',body:'Навигация отвечает на реальные вопросы клиентов, а товарные, складские и другие процессы остаются отделёнными без выдуманных показателей.'},
   {title:'Подтверждённая основа, не выдуманный успех',body:'Код подтверждает возможности и контракты, но не публичный запуск, продажи или результаты заказчиков без независимых доказательств.'}
  ]},
  factory:{chapters:[
   {title:'Инженерия за пределами одного репозитория',body:'Factory координирует несколько репозиториев под контролем владельца, сохраняя происхождение версий.'},
   {title:'Исходники не равны состоянию машины',body:'Коммит в GitHub не означает обновление локального Windows Worker; состояния должны отображаться отдельно.'},
   {title:'Внимание активным проектам',body:'Жизненный цикл различает активные, будущие, завершённые и архивные проекты с сохранением истории.'},
   {title:'Синхронизация без потери работы владельца',body:'Защищённые Fetch/Pull предотвращают перезапись локальных правок и конфликтующих веток.'},
   {title:'Честно говорить о недостающих доказательствах',body:'Отчёты Guardian привязаны к версиям исходников и различают актуальные, устаревшие и непроверенные результаты.'},
   {title:'Автоматическая синхронизация, ручная проверка качества',body:'Автоматические CI, сборки, тесты, сканирование и предпросмотры отключены действующей политикой.'}
  ]},
  digirezhim:{chapters:[
   {title:'От клинических знаний к полезному ПО',body:'DigiRezhim организует знания о питании в структурированные процессы, не заменяя решение врача.'},
   {title:'Медицинская работа — больше, чем формы',body:'Анамнез, записи пациентов, правила питания и наблюдение требуют чётких полномочий.'},
   {title:'Четыре сервиса с разными задачами',body:'Публичный веб, панель администрирования и отдельные API используют PostgreSQL, Prisma и Redis.'},
   {title:'Кабинет, отражающий работу врача',body:'Регистрация, проверка и доступ к пациентам опираются на серверные данные, а не выдуманные состояния.'},
   {title:'От приёма до последующего наблюдения',body:'Научные правила Excel переносятся в явные данные и логику с отдельной медицинской проверкой.'},
   {title:'Клиническое доверие требует доказательств',body:'Репозиторий описывает процессы, но не подтверждает клиническую сертификацию и готовность к эксплуатации.'}
  ]},
  petiwoo:{chapters:[
   {title:'Специализированная торговля требует особой навигации',body:'Потребности собак, кошек и птиц различаются, поэтому навигация учитывает вид животного и категорию товара.'},
   {title:'Каталог, который понимает покупателя',body:'Поиск и фильтры требуют согласованных категорий и достоверных цен и остатков.'},
   {title:'Поиск товара — полноценная система',body:'Магазин Next.js связывает списки, карточки, бренды и категории с API каталога.'},
   {title:'От просмотра к корзине',body:'Zustand управляет корзиной; создание заказов и оплата требуют подтверждения backend-сервисов.'},
   {title:'Отраслевой продукт на общих основах',body:'GARTAL описывает версии модулей для зоомагазина и ветеринарии с разделением данных.'},
   {title:'Реальный продукт, проверяемые метрики',body:'Исходники подтверждают каталог и оформление, но не реальные платежи, продажи и выручку.'}
  ]}
 }
};
export const caseText=(locale:SiteLocale,id:ProjectId)=>
 locale==='en'?null:translated[locale][id];
