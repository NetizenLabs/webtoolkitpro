import Link from 'next/link';

export default function Portfolio() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-[var(--foreground)] text-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">We Practice What We Preach</h2>
            <p className="text-lg opacity-80">Explore our flagship zero-server developer toolkit. It's the exact same edge-optimized architecture we build for our clients.</p>
          </div>
          <Link 
            href="https://wtkpro.site" 
            className="px-6 py-3 rounded-full border border-[var(--background)]/20 font-bold hover:bg-[var(--background)]/10 transition-colors whitespace-nowrap"
          >
            View WebToolkit Pro
          </Link>
        </div>

        <div className="rounded-3xl bg-[var(--background)] p-1 overflow-hidden group">
          <div className="relative w-full aspect-video bg-[var(--background)] rounded-[22px] overflow-hidden flex items-center justify-center">
            {/* Mockup UI for WebToolkit Pro */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] to-[var(--foreground)]/5"></div>
            
            <div className="relative z-10 text-center w-full max-w-lg p-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--foreground)]/20 text-sm font-mono text-[var(--foreground)] mb-6 bg-[var(--background)]/50 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
                Zero-Server Architecture
              </div>
              <h3 className="text-4xl font-extrabold text-[var(--foreground)] mb-4 tracking-tight group-hover:scale-105 transition-transform duration-500">
                WebToolkit Pro
              </h3>
              <p className="text-[var(--foreground)]/60 text-lg">
                150+ instant-execution utilities. No tracking, no latency.
              </p>
              
              <div className="mt-12 flex justify-center gap-4">
                <div className="w-32 h-8 rounded-md bg-[var(--foreground)]/10 animate-pulse"></div>
                <div className="w-32 h-8 rounded-md bg-[var(--foreground)]/10 animate-pulse delay-150"></div>
                <div className="w-32 h-8 rounded-md bg-[var(--foreground)]/10 animate-pulse delay-300"></div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
