import Link from 'next/link';

export default function Team() {
  return (
    <section id="team" className="py-24 bg-[var(--background)] border-t border-[var(--foreground)]/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Engineering Leadership</h2>
            <p className="text-lg opacity-80">Our architecture is driven by engineers who have built and scaled enterprise platforms handling millions of users.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Team Member: Abu Sufyan */}
          <div className="group rounded-3xl border border-[var(--foreground)]/10 p-8 hover:bg-[var(--foreground)]/5 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Abu Sufyan</h3>
            <p className="text-sm font-mono text-[var(--accent)] mb-4">Lead Technical Architect</p>
            <p className="opacity-70 mb-6 leading-relaxed">
              Specialist in edge-deployed web applications, zero-server architecture, and technical SEO. Creator of WebToolkit Pro and driving force behind Netizen Labs' high-performance infrastructure.
            </p>
            
            <Link 
              href="https://abusufyan.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--accent)] transition-colors group/link"
            >
              View Portfolio
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>

        </div>
        
      </div>
    </section>
  );
}
