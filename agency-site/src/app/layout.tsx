import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Netizen Labs | Engineering Web Apps That Dominate Search",
    template: "%s | Netizen Labs",
  },
  description: "Led by elite technical architects. We build enterprise-grade SaaS, edge-deployed tools, and lightning-fast digital experiences with perfect performance scores.",
  keywords: ["Web Development Agency", "Next.js Experts", "Technical SEO", "Edge Computing", "React Architecture", "Core Web Vitals", "SaaS Development"],
  authors: [{ name: "Netizen Labs Team" }],
  creator: "Netizen Labs",
  metadataBase: new URL("https://netizenlabs.online"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Netizen Labs | High-Performance Engineering",
    description: "We engineer enterprise-grade SaaS and edge-deployed tools.",
    url: "https://netizenlabs.online",
    siteName: "Netizen Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netizen Labs | Engineering Web Apps That Dominate Search",
    description: "Led by elite technical architects. We build enterprise-grade SaaS, edge-deployed tools, and lightning-fast digital experiences.",
    creator: "@WebToolkitPro",
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
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Netizen Labs",
    "url": "https://netizenlabs.online",
    "logo": "https://netizenlabs.online/logo.png",
    "description": "Enterprise Next.js architecture agency specializing in technical SEO, edge-deployed web applications, and LLM search readiness.",
    "sameAs": [
      "https://twitter.com/WebToolkitPro"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an enterprise Next.js architecture agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An enterprise Next.js architecture agency focuses on building highly scalable, edge-deployed web applications using the Next.js framework. We ensure perfect Core Web Vitals, maximum SEO visibility, and optimal server-side rendering for large-scale SaaS businesses."
        }
      },
      {
        "@type": "Question",
        "name": "How do you achieve perfect Core Web Vitals scores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We achieve 100/100 Lighthouse performance scores by leveraging edge caching on Cloudflare and Vercel, aggressive image optimization, removing render-blocking JavaScript, and structuring Semantic HTML5 directly into our React component trees."
        }
      },
      {
        "@type": "Question",
        "name": "What is LLM search readiness consulting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LLM search readiness involves structuring a website's data, heading hierarchy, and entity relationships so that AI search engines (like ChatGPT, Perplexity, and Google SGE) can easily parse, understand, and recommend your services over competitors."
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
