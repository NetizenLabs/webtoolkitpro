
import React from 'react'

export const metadata = {
  title: 'Disclaimer & DMCA - WebToolkit Pro',
  description: 'Legal disclaimer and DMCA policy for WebToolkit Pro (wtkpro.site). Learn about our content usage and copyright policies.',
  alternates: {
    canonical: 'https://wtkpro.site/disclaimer/',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Disclaimer & DMCA</h1>
        <p className="text-sm text-gray-400 dark:text-slate-500 mb-12">Last updated: May 6, 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. General Disclaimer</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              The information provided by WebToolkit Pro (wtkpro.site) is for general informational purposes only. All tools and information on the site are provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tool on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Professional Disclaimer</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              The tools on WebToolkit Pro are intended for developers and technical professionals. They should not be used as a substitute for professional advice in critical systems without independent verification. Use of our tools is strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. External Links Disclaimer</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              The site may contain links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. DMCA Copyright Notice</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              WebToolkit Pro respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act (&quot;DMCA&quot;), we will respond promptly to notices of alleged infringement.
            </p>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mt-4">
              If you believe that your copyrighted work has been infringed, please notify our copyright agent at: <strong>hello@wtkpro.site</strong>
            </p>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mt-4">
              Your notice must include a detailed description of the copyrighted work and the location on our site where the alleged infringement occurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. AdSense & Third-Party Content</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              wtkpro.site displays third-party advertisements via Google AdSense. We do not personally endorse the products or services advertised. Any interactions with advertisers are solely between you and the third party.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

