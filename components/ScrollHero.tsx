'use client';

/**
 * Edition 07: a single image-led first viewport. The authentic portrait and
 * office atmosphere remain real versioned assets; no substitute faces.
 */
export function ScrollHero(){
 return <section className="sx-work-hero sx-v3-hero sx-v4-hero sx-ed7-hero" id="top" aria-labelledby="sx-work-title">
  <div className="sx-v3-hero-stage sx-v4-hero-stage sx-ed7-stage">
   <div className="sx-v4-hero-content sx-ed7-copy">
    <div className="sx-work-copy">
     <p className="sx-kicker">INDEPENDENT SOFTWARE ARCHITECT / PRODUCT ENGINEER</p>
     <h1 id="sx-work-title"><span>SAEID</span><br/><em>SHAMSAEI.</em></h1>
     <p>I build thoughtful digital products and the systems behind them.</p>
     <div className="sx-hero-actions">
      <a href="#selected-projects" className="sx-action">Explore work <span aria-hidden="true">↘</span></a>
     </div>
    </div>
   </div>
   <div className="sx-v4-hero-persona sx-ed7-persona">
    <img src="/assets/hires/portrait.webp" width={1122} height={1402} loading="eager" fetchPriority="high" decoding="async" alt="Saeid Shamsaei wearing dark sunglasses and a black suit"/>
    <span className="sx-v5-office-label" aria-hidden="true">THE PERSON BEHIND THE WORK</span>
   </div>
   <div className="sx-hero-bottom"><span>SELECTED WORK / 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
  </div>
 </section>;
}
