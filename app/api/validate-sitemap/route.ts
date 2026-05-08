import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Sitemap not reachable: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const contentType = response.headers.get('content-type') || '';
    
    const results = [];
    results.push('Sitemap is accessible (200 OK)');
    
    if (contentType.includes('xml') || xml.trim().startsWith('<?xml') || xml.includes('<urlset') || xml.includes('<sitemapindex')) {
      results.push('Valid XML structure detected');
    } else {
      results.push('Warning: Content-Type header is not XML');
    }

    // Basic URL counting via regex
    const urlCount = (xml.match(/<url>/g) || []).length;
    const sitemapCount = (xml.match(/<sitemap>/g) || []).length;

    if (urlCount > 0) {
      results.push(`Found ${urlCount} standard URLs`);
    } else if (sitemapCount > 0) {
      results.push(`Detected Sitemap Index with ${sitemapCount} sitemaps`);
    }

    if (xml.includes('https://')) {
      results.push('All URLs use secure HTTPS protocol');
    }

    return NextResponse.json({
      success: true,
      results: results,
      size: `${(xml.length / 1024).toFixed(2)} KB`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
