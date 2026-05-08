import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Password Generator | US-Standard Encryption | WebToolkit Pro',
  description: 'Generate cryptographically secure passwords using NIST-standard entropy. Customize length, symbols, and numbers for maximum security. 100% browser-based.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/password-generator/',
  },
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

