import React from 'react'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Contact Us - WebToolkit Pro',
  description: 'Get in touch with the WebToolkit Pro team. We love hearing from developers!',
}

export default function ContactPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-500">Have a question, suggestion, or found a bug? We&apos;d love to hear from you.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
            </div>
            <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" /></div>
            <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Message</label>
              <textarea rows={6} placeholder="Your message..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" /></div>
            <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2"><Mail className="w-5 h-5" /> contact@webtoolkitpro.com</p>
        </div>

        <div className="mt-12 h-[250px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
