import Link from 'next/link';
import TechStack from '@/components/TechStack';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Philosophy from '@/components/Philosophy';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col items-center justify-center pt-32 pb-16 transition-colors duration-500">
        
        {/* Bespoke Background Element instead of generic mesh */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-20 dark:opacity-10">
          <div className="w-[800px] h-[400px] bg-[var(--accent)] blur-[150px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          
          {/* Announcement Badge / Theme Toggle area */}
          <div className="hero-enter mb-8">
            <Link href="/tools" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--foreground)]/10 text-sm opacity-80 transition-transform duration-[160ms] ease-out-custom hover:opacity-100 active:scale-[0.97] select-none bg-[var(--foreground)]/5 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]"></span>
              <span className="font-medium">Try our developer tools ecosystem</span>
            </Link>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-8 hero-enter delay-50 leading-[1.05]">
            We Engineer Web Apps <br className="hidden md:block" /> That Dominate Search.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mb-12 leading-relaxed hero-enter delay-100">
            Led by elite technical architects. We build enterprise-grade SaaS, edge-deployed tools, and lightning-fast digital experiences with perfect performance scores.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center hero-enter delay-150">
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-[12px] bg-[var(--foreground)] text-[var(--background)] font-bold flex items-center gap-2 group transition-all duration-[160ms] ease-out-custom hover:scale-[1.02] active:scale-[0.97] select-none shadow-lg"
            >
              Get a Free Technical Audit
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-[160ms] ease-out-custom"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link 
              href="/tools" 
              className="px-8 py-4 rounded-[12px] border border-[var(--foreground)]/20 font-bold transition-all duration-[160ms] ease-out-custom hover:bg-[var(--foreground)]/5 active:scale-[0.97] select-none backdrop-blur-sm"
            >
              Explore Free Tools
            </Link>
          </div>

          {/* Trust/Authority Bridge */}
          <div className="mt-24 pt-8 border-t border-[var(--foreground)]/10 w-full max-w-3xl flex flex-col items-center hero-enter delay-300">
            <p className="text-sm opacity-50 uppercase tracking-[0.2em] mb-6 font-mono font-semibold">
              Architected for scale. Engineered for speed.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm font-bold uppercase tracking-widest opacity-80">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                Zero-Server Model
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                Instant Execution
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TechStack />
      <Services />
      <Philosophy />
      <Portfolio />
      <CTA />
    </>
  );
}
