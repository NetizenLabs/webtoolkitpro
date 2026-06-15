export default function Services() {
  const services = [
    {
      title: "High-Intent SEO Architecture",
      description: "We don't just write blogs. We engineer Next.js architectures that Google crawls instantly, leveraging edge-rendering for maximum ranking potential.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
      )
    },
    {
      title: "Free Tool Funnels",
      description: "We build lightning-fast, client-side utility tools that attract enterprise developers and convert them into warm leads.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      )
    },
    {
      title: "100/100 Performance Audits",
      description: "Core Web Vitals matter. We tear down slow, bloated templates and rebuild them to achieve perfect Lighthouse scores.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7 3 5-3 5"/><path d="m19 7-3 5 3 5"/></svg>
      )
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Capabilities</h2>
          <p className="text-lg opacity-70">We focus on specialized engineering services that directly drive traffic, conversions, and speed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="p-8 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:border-[var(--accent)]/50 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--background)] flex items-center justify-center mb-6 text-[var(--accent)] shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="opacity-70 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
