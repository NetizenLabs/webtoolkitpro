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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
