import Link from 'next/link';
export default function NotFound(){
 return <main className="sx-not-found" id="main-content">
  <div className="sx-not-found-inner">
   <p className="sx-not-found-code">404 / PAGE NOT FOUND</p>
   <h1>The page moved. The work remains.</h1>
   <p>The address you requested isn't available. Return to the portfolio, or inspect the documented engineering work.</p>
   <nav aria-label="Recovery navigation">
    <Link href="/">← Back to portfolio</Link>
    <Link href="/engineering/">Engineering index ↗</Link>
   </nav>
  </div>
 </main>;
}
