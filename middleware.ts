import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. URL parameter cleanup (SEO Canonicalization)
  // 301 Redirect to strip referral parameters and consolidate link equity
  if (request.nextUrl.searchParams.has('ref')) {
    const cleanUrl = request.nextUrl.clone()
    cleanUrl.searchParams.delete('ref')
    return NextResponse.redirect(cleanUrl, 301)
  }

  // 2. Intercept requests asking for Markdown (Agent/Crawler Negotiation)
  const acceptHeader = request.headers.get('accept') || ''
  
  if (acceptHeader.includes('text/markdown')) {
    try {
      // For the homepage, we serve the comprehensive llms.txt file natively as markdown
      if (request.nextUrl.pathname === '/') {
        const url = new URL('/llms.txt', request.url)
        const response = await fetch(url.toString())
        
        if (response.ok) {
          const text = await response.text()
          return new NextResponse(text, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'x-markdown-tokens': 'estimated-2048' // Optional signal for agents
            }
          })
        }
      }
      
      // For other pages, we provide a generic markdown fallback response
      // (Since edge middleware cannot easily parse complex React HTML trees to Markdown natively)
      const genericMd = `# WebToolkit Pro - ${request.nextUrl.pathname}\n\nWelcome to WebToolkit Pro. This page is currently being viewed by an AI agent requesting raw Markdown.\n\nPlease refer to our homepage for the full agent catalog.`
      
      return new NextResponse(genericMd, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': 'estimated-100'
        }
      })
      
    } catch (e) {
      // Fail silently and fallback to standard HTML
      return NextResponse.next()
    }
  }

  // Continue standard HTML processing for browsers
  return NextResponse.next()
}

// Match all routes except statics/api
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|xml|txt)).*)',
  ],
}
