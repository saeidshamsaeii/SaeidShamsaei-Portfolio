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
   aria-label={siteText(locale).uiLanguage} aria-haspopup="true" aria-expanded={open}
   onClick={()=>setOpen(value=>!value)}>
   <span className="sx-language-globe" aria-hidden="true">◎</span>
   <span>{selected.short}</span>
   <span className="sx-language-caret" aria-hidden="true">{open?'−':'+'}</span>
  </button>
  {open&&<div className="sx-language-menu" role="group" aria-label={siteText(locale).uiLanguage}>
   {languages.map(item=><button type="button" key={item.code}
    className={locale===item.code?'is-selected':''}
    lang={item.code} dir={item.dir}
    aria-pressed={locale===item.code}
    onClick={()=>{setLocale(item.code);setOpen(false);}}>
    <span className="sx-language-code" dir="ltr">{item.short}</span>
    <span className="sx-language-native">{item.native}</span>
    <span aria-hidden="true" className="sx-language-tick">{locale===item.code?'●':''}</span>
   </button>)}
  </div>}
 </div>;
}
