import React from 'react';
import { Workflow, Sparkles, Box, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Visual Pipeline Builder (Coming Soon) | WebToolkit Pro',
  description: 'Chain multiple developer tools together into powerful automated workflows.',
  alternates: {
    canonical: 'https://wtkpro.site/pipeline/',
  },
};

export default function PipelineStubPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl mb-4">
            <Workflow className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Visual Pipeline <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Builder</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We are building a revolutionary node-based canvas where you can drag, drop, and chain multiple developer tools together to automate complex data transformations in your browser.
          </p>
        </div>

        {/* Coming Soon Graphic */}
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 opacity-60">
            {/* Node 1 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 w-48">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Box className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Base64 Decode</span>
            </div>

            <ArrowRight className="w-8 h-8 text-slate-300 dark:text-slate-600 hidden md:block" />

            {/* Node 2 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 w-48">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">JSON Format</span>
            </div>

            <ArrowRight className="w-8 h-8 text-slate-300 dark:text-slate-600 hidden md:block" />

            {/* Node 3 */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center gap-3 w-48 shadow-[0_0_30px_rgba(79,70,229,0.15)] border-indigo-200 dark:border-indigo-500/30">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl relative">
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-indigo-500 animate-ping" />
                <Box className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-bold text-sm text-indigo-700 dark:text-indigo-300">YAML Export</span>
            </div>
          </div>

          <div className="relative z-20 mt-16 text-center">
            <span className="inline-block px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold tracking-widest uppercase border border-indigo-100 dark:border-indigo-800/50">
              In Development • Coming Soon
            </span>
          </div>
        </div>

        {/* SEO Content Block (Resolves Thin Content Penalty) */}
        <section className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Engineering Roadmap & Security Standards</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The WebToolkit Pro visual pipeline builder is currently in active development by our core engineering team. As web applications become increasingly complex, developers often need to chain multiple transformations together—for example, intercepting a Base64 encoded payload, decoding it, parsing the resulting JSON, extracting a specific JWT, and finally verifying its signature. Historically, this required writing custom Python scripts or bouncing between five different browser tabs.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Our upcoming Pipeline feature will allow you to construct these exact workflows using a drag-and-drop, node-based canvas. You will be able to pipe the output of our <strong>Hash Generators</strong> directly into our <strong>Diff Checkers</strong>, or feed the results of a <strong>Regex Matcher</strong> straight into a <strong>Code Minifier</strong>. 
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Most importantly, this entire pipeline engine is being built on our strict, zero-knowledge security architecture. Every single node in the pipeline will execute locally via WebAssembly and client-side JavaScript. Your complex data transformations will occur entirely within your device&apos;s memory, ensuring that sensitive API keys, database dumps, and proprietary algorithms are never transmitted to an external server. We anticipate launching the beta version of the Visual Pipeline Builder in Q4.
          </p>
        </section>

      </div>
    </div>
  );
}
