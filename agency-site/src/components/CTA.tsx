import Link from 'next/link';

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--foreground)]/5">
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none opacity-5">
        <div className="w-[600px] h-[300px] bg-[var(--accent)] blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Ready to engineer your <br className="hidden sm:block"/> next unfair advantage?
        </h2>
        <p className="text-lg opacity-70 mb-10 max-w-xl">
          Stop relying on slow, bloated templates. Let's build a lightning-fast digital experience that dominates search and converts.
        </p>
        
        <Link 
          href="/contact" 
          className="px-8 py-4 rounded-[12px] bg-[var(--accent)] text-[var(--background)] font-bold text-lg flex items-center gap-2 group transition-all duration-[160ms] ease-out-custom hover:scale-[1.02] active:scale-[0.97] select-none shadow-xl"
        >
          Start a Conversation
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-[160ms] ease-out-custom"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  );
}
