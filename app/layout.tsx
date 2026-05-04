import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WebToolkit Pro - Free Online Developer Tools',
  description: 'Free, premium online developer tools and utilities. JSON formatter, password generator, Base64 encoder, color picker, and 10+ more tools for web professionals.',
  keywords: 'developer tools, JSON formatter, password generator, base64 encoder, online tools, web development, free tools',
  verification: {
    google: 'FftPyShaOpCI3ca1Cx9epz02Cl9CQ0cCLl87Kc69Iy8',
  },
  openGraph: {
    title: 'WebToolkit Pro - Free Online Developer Tools',
    description: 'Free, premium online developer tools and utilities for web professionals.',
    url: 'https://webtoolkit-pro.netlify.app',
    siteName: 'WebToolkit Pro',
    type: 'website',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* AdSense Script using Next.js Script component for better error handling and performance */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}