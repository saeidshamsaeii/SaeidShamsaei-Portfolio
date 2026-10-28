'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';

export const languages=[
 {code:'en',native:'English',short:'EN',dir:'ltr',icon:'/flags/gb.svg'},
 {code:'fa',native:'فارسی',short:'فا',dir:'rtl',icon:'/flags/ir.svg'},
 {code:'ar',native:'العربية',short:'AR',dir:'rtl',icon:'/flags/sa.svg'},
 {code:'it',native:'Italiano',short:'IT',dir:'ltr',icon:'/flags/it.svg'},
 {code:'de',native:'Deutsch',short:'DE',dir:'ltr',icon:'/flags/de.svg'},
 {code:'fr',native:'Français',short:'FR',dir:'ltr',icon:'/flags/fr.svg'},
 {code:'zh',native:'中文',short:'中',dir:'ltr',icon:'/flags/cn.svg'},
 {code:'ru',native:'Русский',short:'RU',dir:'ltr',icon:'/flags/ru.svg'}
] as const;
export type SiteLocale=typeof languages[number]['code'];
export const isSiteLocale=(value:string|null):value is SiteLocale=>
 languages.some(entry=>entry.code===value);
// Each language follows its natural script and accessible reading order.
export const directionFor=(locale:SiteLocale)=>locale==='fa'||locale==='ar'?'rtl':'ltr';

type LocaleState={locale:SiteLocale;setLocale:(locale:SiteLocale)=>void};
const LocaleContext=createContext<LocaleState|undefined>(undefined);
const STORAGE_KEY='saeid-portfolio-language-v1';
export function LocaleProvider({children}:{children:React.ReactNode}){
 const [locale,setLocale]=useState<SiteLocale>('en');
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{
  try{
   const params=new URLSearchParams(window.location.search);
   const query=params.get('lang');
   const stored=window.localStorage.getItem(STORAGE_KEY);
   if(isSiteLocale(query))setLocale(query);
   else if(isSiteLocale(stored))setLocale(stored);
   else{
    const browser=navigator.language.split('-')[0].toLowerCase();
    if(isSiteLocale(browser))setLocale(browser);
   }
  }catch{/* Storage can be blocked; English stays available. */}
  setHydrated(true);
 },[]);
 useEffect(()=>{
  if(!hydrated)return;
  document.documentElement.lang=locale;
  document.documentElement.dir=directionFor(locale);
  try{window.localStorage.setItem(STORAGE_KEY,locale);}catch{/* Private mode */}
 },[locale,hydrated]);
 // An explicit selection is also shareable as ?lang=fa / ?lang=de,
 // while storage preserves the choice when navigating between page routes.
 const chooseLocale=useCallback((next:SiteLocale)=>{
  setLocale(next);
  try{
   const url=new URL(window.location.href);
   url.searchParams.set('lang',next);
   window.history.replaceState(window.history.state,'',url.pathname+url.search+url.hash);
  }catch{/* URL updates are optional; language state still works. */}
 },[]);
 const value=useMemo(()=>({locale,setLocale:chooseLocale}),[locale,chooseLocale]);
 return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useSiteLocale(){
 const context=useContext(LocaleContext);
 if(!context)throw new Error('Language controls require LocaleProvider');
 return context;
}
