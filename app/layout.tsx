import React from 'react'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/ui/CookieConsent'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://wtkpro.site'),
  title: 'WebToolkit Pro | Professional Online Developer Tools',
  description: 'Premium collection of 20+ free developer tools and technical guides. Secure, fast, and optimized for US enterprise development.',
  keywords: 'developer tools, JSON formatter, password generator, base64 encoder, online tools, web development, free tools',
  verification: {
    google: 'mDdN3EPYoUOznSZf30r9MWseEpejEY2n2l18mhlQX1k',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WebToolkit Pro - Free Online Developer Tools',
    description: 'Free, premium online developer tools and utilities for web professionals. Secure, fast, and optimized for enterprise development.',
    url: 'https://wtkpro.site',
    siteName: 'WebToolkit Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebToolkit Pro Official Logo - Professional Developer Tools',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebToolkit Pro | Professional Developer Tools',
    description: 'The ultimate suite of 20+ free developer tools. Build faster, better, and more securely.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-4234692080899883',
    'geo.region': 'US',
    'geo.placename': 'United States',
    'content-language': 'en-US',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Global SEO & Trust Signals */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'url': 'https://wtkpro.site',
              'logo': 'https://wtkpro.site/logo-full.png',
              'sameAs': [
                'https://github.com/abusufyan-netizen/webtoolkitpro'
              ],
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'New York',
                'addressRegion': 'NY',
                'addressCountry': 'US'
              },
              'description': 'Premium developer tools and technical guides for enterprise web development.'
            }),
          }}
        />
        {/* AdSense Script using Next.js Script component for better error handling and performance */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4234692080899883"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1QB54ZRCS5"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QB54ZRCS5');
          `}
        </Script>
      </head>
      <body className="bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 antialiased transition-colors duration-300">
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