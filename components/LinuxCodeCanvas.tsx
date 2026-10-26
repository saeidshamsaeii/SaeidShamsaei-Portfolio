'use client';

/**
 * A real DOM-based Linux editor scene. Scroll progress reveals the characters
 * of one coherent TypeScript program; there is no video, background image,
 * timed fake build or terminal process. The snippet is authored for this
 * portfolio experience, not presented as a captured repository file.
 */
export const codeStory=[
  "type Product = { idea: string; users: string[] };",
  "",
  "const mission = 'Build things that matter';",
  "const principles = [",
  "  'Clarity before complexity',",
  "  'Systems designed to evolve',",
  "  'Interfaces made for people',",
  "];",
  "",
  "export function buildProduct(input: Product) {",
  "  const purpose = understand(input.users);",
  "  const design = shapeExperience(purpose);",
  "  const system = engineer(design);",
  "  return { ...system, mission };",
  "}",
] as const;

const fullProgram=codeStory.join('\n');
const progressClamp=(value:number)=>Math.min(1,Math.max(0,value));

export function LinuxCodeCanvas({progress=0,reduced=false}:{progress?:number;reduced?:boolean}){
 const amount=progressClamp(reduced?1:progress);
 // The code completes over most of the section, then the terminal takes over.
 const reveal=Math.min(fullProgram.length,Math.floor(Math.min(1,amount/.88)*fullProgram.length));
 const lines=fullProgram.slice(0,reveal).split('\n');
 const completion=reveal===fullProgram.length;
 return <div className="sx-linux-scene" aria-hidden="true" data-complete={completion?'true':'false'}>
  <div className="sx-linux-ambient sx-linux-ambient--one"/>
  <div className="sx-linux-ambient sx-linux-ambient--two"/>
  <div className="sx-linux-workspace">
   <div className="sx-linux-topbar"><span className="sx-linux-distro">◆</span><span>saeid@studio</span><span className="sx-linux-topbar-end">tty1 / source-first</span></div>
   <div className="sx-linux-editor">
    <div className="sx-linux-editor-header"><span className="sx-linux-dots"><i/><i/><i/></span><span>nvim ~/work/portfolio/vision.ts</span><span className="sx-linux-mode">NORMAL</span></div>
    <div className="sx-linux-editor-body">
     <div className="sx-linux-gutter">{codeStory.map((_,i)=><span key={i}>{String(i+1).padStart(2,'0')}</span>)}</div>
     <pre className="sx-linux-code"><code>{codeStory.map((line,i)=>{
      const current=lines[i]??'';
      const isCursor=i===lines.length-1&&!completion;
      const visible=lines.length>i;
      return <span key={i} className={'sx-linux-code-line'+(visible?' is-visible':'')+(isCursor?' is-cursor':'')}>
       {current||'\u00a0'}{isCursor&&<span className="sx-linux-caret"> </span>}
      </span>;
     })}</code></pre>
    </div>
    <div className="sx-linux-editor-status"><span>{completion?'FILE COMPLETE':'INSERT / SCROLL'}</span><span>TypeScript</span><span>{Math.round(amount*100)}%</span></div>
   </div>
   <div className="sx-linux-shell">
    <div className="sx-linux-shell-title"><span>~/work/portfolio</span><span>zsh</span></div>
    <div className="sx-linux-shell-body">
     <p><span className="sx-linux-prompt">➜</span> <span className="sx-linux-path">~/work/portfolio</span> nvim vision.ts</p>
     <p className="sx-linux-hint">{completion?'# the idea becomes a system':'# write the system, one scroll at a time'}</p>
     {completion?<p><span className="sx-linux-prompt">➜</span> <span className="sx-linux-path">~/work/portfolio</span> <span className="sx-linux-command">:wq</span><span className="sx-linux-caret"> </span></p>:<p className="sx-linux-pending">↳ editing vision.ts<span className="sx-linux-ellipsis">…</span></p>}
    </div>
   </div>
  </div>
  <div className="sx-linux-side-note"><span>01 / INPUT</span><span>02 / DESIGN</span><span>03 / SYSTEM</span><span>04 / PRODUCT</span></div>
  <div className="sx-linux-foot"><span>INTERACTIVE CODE COMPOSITION</span><span>{String(Math.round(amount*100)).padStart(2,'0')}% / SCROLL TO WRITE</span></div>
 </div>;
}
