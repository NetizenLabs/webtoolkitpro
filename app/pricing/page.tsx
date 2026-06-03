import React from 'react';
import type { Metadata } from 'next';
import { Shield, Zap, Lock, Terminal, Box, Globe, Download, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing & Plans — WebToolkit Pro Enterprise',
  description: 'Choose between Personal Pro and Air-Gapped Enterprise. Zero cloud leakage, 150+ privacy-first developer tools running entirely in your browser sandbox.',
  alternates: {
    canonical: 'https://wtkpro.site/pricing/',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WebToolkit Pro Subscription Tiers",
  "description": "150+ privacy-first developer tools. Formatters, converters, generators, and security utilities — zero cloud leakage.",
  "brand": {
    "@type": "Brand",
    "name": "WebToolkit Pro"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Personal Pro",
      "price": "9.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://whop.com/webtoolkit-pro/personal-pro-09"
    },
    {
      "@type": "Offer",
      "name": "Air-Gapped Enterprise",
      "price": "39.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://whop.com/webtoolkit-pro/air-gapped-enterprise"
    }
  ]
};

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00D4B4]/10 dark:bg-[#00D4B4]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#0094FF]/10 dark:bg-[#0094FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-[#00D4B4] text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-4 h-4" /> Secure Sandbox Processing
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
            What Kind of Developer Tools Are These?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Under the WebToolkit Pro and TradeConvert engines, our 150+ client-side utilities are broken down into four distinct, high-performance categories. Because they are built to run entirely inside the browser&apos;s local memory sandbox, they aren&apos;t just basic scripts; they are <strong className="text-foreground">deep parsing engines.</strong>
          </p>
        </div>

        {/* 4 Engines Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="card-premium p-8 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Box className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">1. Advanced Formatters & Visual Minifiers</h3>
            <p className="text-sm text-muted-foreground mb-4">
              These go far beyond basic &quot;code beautifiers.&quot; They parse code arrays into visual structure trees using the browser&apos;s local thread pool.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li><strong>Examples:</strong> Secure JSON/XML/YAML beautifiers, structural AST parsers, obfuscated JavaScript decoders, and multi-language minifiers.</li>
              <li><strong>The Privacy Edge:</strong> 0% risk of cloud leakage when formatting proprietary DB configs or JWTs.</li>
            </ul>
          </div>

          <div className="card-premium p-8 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">2. Context-Aware Converters & Data Shifters</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The TradeConvert pipeline shines here. These tools translate data structures cleanly without dropping attributes or corrupting encodings.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li><strong>Examples:</strong> Big-data CSV-to-JSON transformers, SQL schema-to-Typebox converters, XML-to-TypeScript interfaces.</li>
              <li><strong>The AI Edge:</strong> Convert legacy corporate data into clean JSON ready for LLM context windows or vector databases.</li>
            </ul>
          </div>

          <div className="card-premium p-8 rounded-2xl">
            <div className="w-12 h-12 bg-[#00D4B4]/10 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-[#00D4B4]" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">3. Entity-Linked & GEO Generators</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tools designed to write complex data structures automatically, specifically optimized for search engines and generative AI crawlers.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li><strong>Examples:</strong> Rich JSON-LD schema markup generators (Product, FAQ, WebApp), programmatic sitemap.xml builders.</li>
              <li><strong>Security Headers:</strong> Advanced Content-Security-Policy builders.</li>
            </ul>
          </div>

          <div className="card-premium p-8 rounded-2xl">
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">4. Client-Side Testing, Crypto & Audit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Lightweight sandbox testing utilities that require heavy client-side computing power but absolute data isolation.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li><strong>Examples:</strong> Regex testers, offline JWT decoders, client-side Bcrypt/Argon2 password hashers, RSA key-pair generators.</li>
              <li><strong>Network:</strong> Local network packet text inspectors.</li>
            </ul>
          </div>
        </div>

        {/* Pricing Strategy / Tiers */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you are a solo developer managing personal projects or a corporate engineer requiring strict air-gapped compliance, we have a tier for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tier 1: Personal Pro */}
          <div className="card-premium p-10 rounded-3xl flex flex-col relative overflow-hidden border border-border">
            <div className="mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
                For Individuals
              </div>
              <h3 className="text-3xl font-black text-foreground mb-2">Personal Pro</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-foreground">$9</span>
                <span className="text-muted-foreground font-medium">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Perfect for independent developers, remote freelancers, and digital marketers.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Unlimited concurrent local processing threads
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Access to beta generators and experimental tools
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Premium Whop Discord community access
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Request custom script additions
              </li>
            </ul>

            <a 
              href="https://whop.com/webtoolkit-pro/personal-pro-09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl text-center font-bold bg-blue-50 hover:bg-blue-100 dark:bg-white/5 dark:hover:bg-white/10 text-foreground transition-all shadow-sm"
            >
              Get Personal Pro
            </a>
          </div>

          {/* Tier 2: Air-Gapped Enterprise */}
          <div className="card-premium p-10 rounded-3xl flex flex-col relative overflow-hidden border-2 border-[#00D4B4] shadow-2xl shadow-[#00D4B4]/10">
            <div className="absolute top-0 right-0 bg-[#00D4B4] text-[#0D1117] text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">
              Most Secure
            </div>
            
            <div className="mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#00D4B4]/10 text-[#00D4B4] text-sm font-bold mb-6">
                For Teams & Corporations
              </div>
              <h3 className="text-3xl font-black text-foreground mb-2">Air-Gapped Enterprise</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-foreground">$39</span>
                <span className="text-muted-foreground font-medium">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                For corporate engineers, data analysts, and HR managers requiring absolute zero cloud-leakage.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Download className="w-5 h-5 text-[#00D4B4] shrink-0" />
                <strong>Standalone Compiled Desktop App</strong> (Tauri/Electron)
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Works with a physically disconnected internet adapter
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Automated local log generation for compliance audits
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Bulk-file batch processing (e.g. 100x 10MB corporate files)
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Full access to the Severance Calculator data scrubbing features
              </li>
            </ul>

            <a 
              href="https://whop.com/webtoolkit-pro/air-gapped-enterprise"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl text-center font-bold bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0D1117] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Enterprise Access
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
