import React from 'react'

export const metadata = { 
  title: 'Privacy Policy - WebToolkit Pro', 
  description: 'WebToolkit Pro privacy policy. Learn how we handle your data, our use of cookies, and our commitment to GDPR, CCPA, and Google Consent Mode v2.',
  alternates: {
    canonical: 'https://wtkpro.site/privacy/',
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400 dark:text-slate-500 mb-12">Last updated: May 6, 2026</p>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              At WebToolkit Pro (accessible via wtkpro.site), we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website. By using our site, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
              <strong>Local Processing:</strong> All tools provided on WebToolkit Pro run entirely in your web browser. We do not transmit, store, or see any of the data you input into these tools.
            </p>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              <strong>Log Files:</strong> Like most websites, we collect anonymous information such as IP addresses, browser type, internet service provider (ISP), and date/time stamps. This data is used solely for analyzing trends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Cookies and Google Consent Mode v2</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              We use cookies to store information about visitors' preferences. 
            </p>
            <div className="bg-blue-50 dark:bg-slate-900 p-6 rounded-xl border border-blue-100 dark:border-slate-800 mt-4">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2">Google Ads & Consent Mode</h3>
              <p className="text-blue-800 dark:text-slate-400 text-sm leading-relaxed mb-4">
                Google, as a third-party vendor, uses cookies to serve ads on WebToolkit Pro. We have implemented <strong>Google Consent Mode v2</strong> to respect your privacy preferences while enabling ad measurement.
              </p>
              <p className="text-blue-800 dark:text-slate-400 text-sm leading-relaxed">
                Users may opt out of personalized advertising by visiting the Google ad and content network privacy policy at: <a href="https://www.google.com/privacy_ads.html" className="underline text-blue-600 dark:text-blue-400">https://www.google.com/privacy_ads.html</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Advertising Partners</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              Our primary advertising partner is <strong>Google AdSense</strong>. Third-party ad servers or ad networks use technology in their respective advertisements that appear on WebToolkit Pro and which are sent directly to your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. GDPR and CCPA Compliance</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
              We respect your rights under the GDPR and CCPA.
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-slate-400 space-y-2">
              <li><strong>Right to access and erasure:</strong> You can request your data be deleted.</li>
              <li><strong>Right to opt-out:</strong> You can decline cookies through our consent banner.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              Questions? Contact us at <strong>hello@wtkpro.site</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

