import React from 'react';
import type { Metadata } from 'next';
import { Shield, Zap, Lock, Terminal, FileCode2, Download, CheckCircle2, ShieldCheck, FileKey, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing & Enterprise Licensing — WebToolkit Pro',
  description: 'WebToolkit Pro is free for individuals. For corporate data compliance, SOC 2 environments, and air-gapped security, explore our standalone Enterprise license.',
  alternates: {
    canonical: 'https://wtkpro.site/pricing/',
  },
  openGraph: {
    title: 'Pricing & Enterprise Licensing — WebToolkit Pro',
    description: 'Free for developers. Paid for corporate compliance. Get the Air-Gapped Enterprise Desktop App for zero cloud leakage and strict SOC 2 / HIPAA compliance.',
    url: 'https://wtkpro.site/pricing/',
    type: 'website',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "WebToolkit Pro Subscription Tiers",
  "description": "Privacy-first developer tools with corporate compliance features including an air-gapped desktop application.",
  "brand": {
    "@type": "Brand",
    "name": "WebToolkit Pro"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Team Pro",
      "price": "19.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://wtkpro.site/pricing/#pro"
    },
    {
      "@type": "Offer",
      "name": "Air-Gapped Enterprise",
      "price": "99.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://wtkpro.site/pricing/#enterprise"
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
            <ShieldCheck className="w-4 h-4" /> Built for Regulated Environments
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-foreground">
            Free for Developers.<br /> Paid for Corporate Compliance.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Individual engineers can use WebToolkit Pro&apos;s 150+ browser tools completely free. But if you operate in a <strong className="text-foreground">SOC 2, HIPAA, or GDPR</strong> regulated environment, you cannot risk production credentials touching a public website. That is what our Enterprise Desktop license is for.
          </p>
        </div>

        {/* Value Proposition / Fear & Compliance Selling */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="card-premium p-8 rounded-2xl border-l-4 border-l-rose-500">
            <Lock className="w-8 h-8 text-rose-500 mb-4" />
            <h3 className="text-lg font-bold mb-3 text-foreground">Zero Cloud Leakage</h3>
            <p className="text-sm text-muted-foreground">
              Browser extensions and online JSON formatters are notorious for leaking proprietary DB strings and JWT tokens. Our desktop app processes everything 100% locally. Your data never hits a server.
            </p>
          </div>

          <div className="card-premium p-8 rounded-2xl border-l-4 border-l-blue-500">
            <FileKey className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold mb-3 text-foreground">Automated Audit Trails</h3>
            <p className="text-sm text-muted-foreground">
              Pass your security audits effortlessly. The Enterprise edition automatically generates local, encrypted logs of all cryptographic and hashing activities, ready for compliance review.
            </p>
          </div>

          <div className="card-premium p-8 rounded-2xl border-l-4 border-l-[#00D4B4]">
            <Scale className="w-8 h-8 text-[#00D4B4] mb-4" />
            <h3 className="text-lg font-bold mb-3 text-foreground">PII & HR Data Scrubbing</h3>
            <p className="text-sm text-muted-foreground">
              Includes full access to the Severance Calculator and CSV manipulation pipelines. HR and Ops teams can safely scrub and analyze proprietary payroll data entirely offline.
            </p>
          </div>
        </div>

        {/* Pricing Strategy / Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          
          {/* Tier 1: Free Public Utility */}
          <div className="card-premium p-8 rounded-3xl flex flex-col relative overflow-hidden border border-border">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-foreground mb-2">Public Utility</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-foreground">$0</span>
                <span className="text-muted-foreground font-medium">/ forever</span>
              </div>
              <p className="text-sm text-muted-foreground">
                For solo developers, students, and open-source contributors.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                Access all 150+ browser tools
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                Client-side execution
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                Community support
              </li>
            </ul>

            <a 
              href="/tools/"
              className="w-full py-3.5 rounded-xl text-center font-bold bg-white/5 hover:bg-white/10 text-foreground transition-all shadow-sm border border-white/10"
            >
              Start Formatting
            </a>
          </div>

          {/* Tier 2: Team Pro */}
          <div className="card-premium p-8 rounded-3xl flex flex-col relative overflow-hidden border border-blue-500/30 shadow-lg shadow-blue-500/5">
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-4">
                Most Popular for Startups
              </div>
              <h3 className="text-2xl font-black text-foreground mb-2">Team Pro</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-foreground">$19</span>
                <span className="text-muted-foreground font-medium">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                For small engineering teams (up to 5 seats) needing reliability and priority support.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Everything in Public Utility
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Up to 5 team members
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Priority email support (24h SLA)
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Early access to new beta tools
              </li>
            </ul>

            <a 
              href="#"
              className="w-full py-3.5 rounded-xl text-center font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
            >
              Upgrade to Pro
            </a>
          </div>

          {/* Tier 3: Air-Gapped Enterprise */}
          <div className="card-premium p-8 rounded-3xl flex flex-col relative overflow-hidden border-2 border-[#00D4B4] shadow-2xl shadow-[#00D4B4]/20 scale-105 z-10 bg-background">
            <div className="absolute top-0 left-0 w-full bg-[#00D4B4] text-[#0D1117] text-xs font-black uppercase tracking-widest py-1.5 text-center">
              Commercial Compliance
            </div>
            
            <div className="mb-8 mt-6">
              <h3 className="text-2xl font-black text-foreground mb-2">Air-Gapped Enterprise</h3>
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-foreground">$99</span>
                  <span className="text-muted-foreground font-medium">/ month</span>
                </div>
                <div className="text-xs font-bold text-[#00D4B4] uppercase tracking-wider">
                  Or $899 / year (Save ~25%)
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                For corporate engineers and compliance officers. Full offline capability.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Download className="w-5 h-5 text-[#00D4B4] shrink-0" />
                <strong>Standalone Compiled Desktop App</strong>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Shield className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Air-gapped offline processing (No internet required)
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <FileCode2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Automated local compliance audit logs
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Terminal className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Bulk-file batch processing pipelines
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0" />
                Compliance documentation & SOC 2 mapping
              </li>
            </ul>

            <a 
              href="#"
              className="w-full py-4 rounded-xl text-center font-bold bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0D1117] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Enterprise Access
            </a>
          </div>
        </div>

        {/* Whop Trust Signal */}
        <div className="max-w-2xl mx-auto text-center border-t border-border pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Secure Payments Powered by Whop</strong><br />
            All subscription payments are securely processed and managed by Whop.com. WebToolkit Pro never sees or stores your credit card data, and Whop has absolutely zero access to your offline Desktop App data. Your compliance boundaries are strictly maintained.
          </p>
        </div>

      </div>
    </main>
  );
}
