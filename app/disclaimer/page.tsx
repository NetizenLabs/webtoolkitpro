import React from 'react'

export const metadata = {
  title: 'Disclaimer & DMCA - WebToolkit Pro',
  description: 'Legal disclaimer and DMCA policy for WebToolkit Pro. Learn about our content usage and copyright policies.',
}

export default function DisclaimerPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Disclaimer & DMCA</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 4, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">1. General Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The information provided by WebToolkit Pro is for general informational purposes only. All tools and information on the site are provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or tool on the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">2. External Links Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">3. Errors and Omissions Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, WebToolkit Pro is not responsible for any errors or omissions, or for the results obtained from the use of this information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">4. DMCA Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              WebToolkit Pro respects the intellectual property rights of others. In accordance with the Digital Millennium Copyright Act ("DMCA"), we will respond promptly to notices of alleged infringement that are reported to us.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent with the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
              <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing.</li>
              <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Please send DMCA notices to: <strong>contact@webtoolkitpro.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
