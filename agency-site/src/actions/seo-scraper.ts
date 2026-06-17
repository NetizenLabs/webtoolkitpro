'use server';

import * as cheerio from 'cheerio';

export async function scrapeSEO(url: string) {
  try {
    new URL(url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Googlebot/2.1 (+http://www.google.com/bot.html)'
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. Meta Data
    const meta = {
      title: $('title').text() || '',
      description: $('meta[name="description"]').attr('content') || '',
      robots: $('meta[name="robots"]').attr('content') || 'index, follow (implied)',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
    };

    // 2. Headings
    const headings: { level: string; text: string }[] = [];
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      headings.push({
        level: el.tagName.toUpperCase(),
        text: $(el).text().trim().substring(0, 100) // truncate long headings
      });
    });

    // 3. Schema.org / JSON-LD
    const schemas: any[] = [];
    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        const json = JSON.parse($(el).html() || '{}');
        schemas.push(json);
      } catch (e) {
        // ignore parse errors
      }
    });

    // 4. Images & Links stats
    const images = $('img');
    const links = $('a');
    const imagesWithoutAlt = images.filter((i, el) => !$(el).attr('alt')).length;

    return {
      success: true,
      data: {
        url,
        meta,
        headings,
        schemas,
        stats: {
          totalImages: images.length,
          imagesWithoutAlt,
          totalLinks: links.length,
          wordCount: $('body').text().trim().split(/\s+/).length
        }
      }
    };

  } catch (error: any) {
    console.error('SEO Scraper Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to scrape URL'
    };
  }
}
