import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
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