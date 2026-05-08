import React from 'react'

export const metadata = { 
  title: 'Terms of Service - WebToolkit Pro', 
  description: 'WebToolkit Pro terms of service and usage agreement for wtkpro.site.',
  alternates: {
    canonical: 'https://wtkpro.site/terms/',
  },
}

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-400 dark:text-slate-500 mb-12">Last updated: May 6, 2026</p>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              By accessing and using WebToolkit Pro (wtkpro.site), you accept and agree to be bound by these Terms of Service. If you do not agree with any part, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use of Service</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              WebToolkit Pro provides free online developer tools. You may use these tools for personal or commercial purposes. You agree not to misuse the service, attempt to disrupt its operation, or use the tools for any illegal activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              The content, design, and code of WebToolkit Pro are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without express permission from the owners of wtkpro.site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              WebToolkit Pro is provided "as is" without any warranties. We are not responsible for any data loss, damages, or issues arising from the use of our tools. Users are encouraged to verify results for critical production applications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Advertising & Cookies</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              We display advertisements (via Google AdSense) to support the free operation of this service. These ads use cookies to personalize content and analyze traffic as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Governing Law</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              These terms are governed by the laws of the United States. Any disputes shall be resolved in the appropriate courts of the jurisdiction where the site is operated.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

