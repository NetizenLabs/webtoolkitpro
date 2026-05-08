import React from 'react'
import Link from 'next/link'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-3xl mb-8 animate-pulse">
          <AlertCircle className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-8xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-4">Tool or Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
          The tool you are looking for might have been moved or renamed. Try searching our toolkit for the latest version.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/20 transition-all"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link 
            href="/tools/" 
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-bold border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </div>
  )
}