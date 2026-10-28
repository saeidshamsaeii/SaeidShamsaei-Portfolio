'use client';
import {useEffect,useRef,useState} from 'react';
import {languages,useSiteLocale} from '@/components/LocaleProvider';
import {siteText} from '@/data/siteTranslations';

/** Flag-only, *inline* expanding ribbon. Never an absolute popover. */
export function LanguageSwitcher(){
 const {locale,setLocale}=useSiteLocale();
 const [open,setOpen]=useState(false);
 const host=useRef<HTMLDivElement>(null);
 const firstOption=useRef<HTMLButtonElement>(null);
 const selected=languages.find(item=>item.code===locale)!;
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{
   if(!host.current?.contains(event.target as Node))setOpen(false);
  };
  const escape=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){
    setOpen(false);
    host.current?.querySelector<HTMLButtonElement>('.sx-language-trigger')?.focus();
   }
  };
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  return()=>{
   document.removeEventListener('pointerdown',outside);
   document.removeEventListener('keydown',escape);
  };
 },[open]);
 return <div ref={host} className="sx-language-switcher" dir="ltr"
  data-language-open={open?'true':'false'}>
  <button type="button" className="sx-language-trigger"
   aria-label={siteText(locale).uiLanguage+' / '+selected.native}
   title={selected.native}
   aria-haspopup="true" aria-expanded={open}
   aria-controls="sx-inline-language-list"
   onClick={()=>setOpen(value=>!value)}>
   <img className="sx-language-flag" src={selected.icon}
    width={26} height={20} alt="" aria-hidden="true" decoding="async"/>
  </button>
  {open&&<div id="sx-inline-language-list" className="sx-language-menu"
   role="group" aria-label={siteText(locale).uiLanguage}>
   {languages.map((item,index)=><button type="button" key={item.code}
    ref={index===0?firstOption:undefined}
    className={locale===item.code?'is-selected':''}
    lang={item.code} dir={item.dir} title={item.native}
    aria-label={item.native} aria-pressed={locale===item.code}
    onClick={()=>{setLocale(item.code);setOpen(false);}}>
    <img className="sx-language-flag" src={item.icon}
     width={26} height={20} alt="" aria-hidden="true" decoding="async"/>
   </button>)}
  </div>}
 </div>;
}
