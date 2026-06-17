export default function Philosophy() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
          Zero fluff. <br className="md:hidden" />
          <span className="text-[var(--accent)]">Pure engineering.</span>
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed opacity-70 mb-8 font-medium">
          Most agencies sell you bloated templates. We build bespoke digital infrastructure designed to dominate your market. As a specialized enterprise Next.js architecture agency, we know that if your site isn't loading in milliseconds, you're bleeding enterprise leads.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
            <div className="text-4xl font-extrabold text-[var(--accent)] mb-2">99.9%</div>
            <div className="font-bold text-lg mb-1">Guaranteed Uptime</div>
            <p className="text-sm opacity-70">Utilizing global edge networks like Cloudflare and Vercel, we ensure your high-performance Next.js application never goes offline.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10">
            <div className="text-4xl font-extrabold text-[var(--accent)] mb-2">&lt; 100ms</div>
            <div className="font-bold text-lg mb-1">Time to Interactive (TTI)</div>
            <p className="text-sm opacity-70">We aggressively optimize render paths, slashing Core Web Vitals to deliver a lightning-fast user experience.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest opacity-50 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            Technical SEO Optimization
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            Edge Rendered
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]"></span>
            LLM Search Readiness
          </div>
        </div>
      </div>
    </section>
  );
}
