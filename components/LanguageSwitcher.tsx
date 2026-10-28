'use client';
import {useEffect,useRef,useState} from 'react';
import {languages,useSiteLocale} from '@/components/LocaleProvider';
import {siteText} from '@/data/siteTranslations';

export function LanguageSwitcher(){
 const {locale,setLocale}=useSiteLocale();
 const [open,setOpen]=useState(false);
 const host=useRef<HTMLDivElement>(null);
 const selected=languages.find(item=>item.code===locale)!;
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{
   if(!host.current?.contains(event.target as Node))setOpen(false);
  };
  const escape=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){setOpen(false);host.current?.querySelector('button')?.focus();}
  };
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  return()=>{
   document.removeEventListener('pointerdown',outside);
   document.removeEventListener('keydown',escape);
  };
 },[open]);
 return <div ref={host} className="sx-language-switcher" dir="ltr">
  <button type="button" className="sx-language-trigger"
   aria-label={siteText(locale).uiLanguage+' / '+selected.native}
   title={selected.native}
   aria-haspopup="true" aria-expanded={open}
   onClick={()=>setOpen(value=>!value)}>
   <span className="sx-language-flag" aria-hidden="true">{selected.flag}</span>
  </button>
  {open&&<div className="sx-language-menu" role="group" aria-label={siteText(locale).uiLanguage}>
   {languages.map(item=><button type="button" key={item.code}
    className={locale===item.code?'is-selected':''}
    lang={item.code} dir={item.dir} title={item.native}
    aria-label={item.native} aria-pressed={locale===item.code}
    onClick={()=>{setLocale(item.code);setOpen(false);}}>
    <span className="sx-language-flag" aria-hidden="true">{item.flag}</span>
   </button>)}
  </div>}
 </div>;
}
