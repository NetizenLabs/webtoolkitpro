'use server';

import * as cheerio from 'cheerio';

export async function analyzeTechStack(url: string) {
  try {
    new URL(url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const headers = Object.fromEntries(response.headers.entries());
    const html = await response.text();
    const $ = cheerio.load(html);

    const stack: { name: string; category: string; confidence: number; hint: string }[] = [];

    // 1. Check Headers
    if (headers['server']) {
      if (headers['server'].toLowerCase().includes('cloudflare')) {
        stack.push({ name: 'Cloudflare', category: 'CDN / Security', confidence: 100, hint: 'Server header' });
      } else if (headers['server'].toLowerCase().includes('nginx')) {
        stack.push({ name: 'Nginx', category: 'Web Server', confidence: 100, hint: 'Server header' });
      } else if (headers['server'].toLowerCase().includes('vercel')) {
        stack.push({ name: 'Vercel', category: 'Hosting', confidence: 100, hint: 'Server header' });
      }
    }
    if (headers['x-powered-by']) {
      if (headers['x-powered-by'].toLowerCase().includes('next.js')) {
        stack.push({ name: 'Next.js', category: 'Framework', confidence: 100, hint: 'X-Powered-By header' });
      } else if (headers['x-powered-by'].toLowerCase().includes('express')) {
        stack.push({ name: 'Express', category: 'Server', confidence: 100, hint: 'X-Powered-By header' });
      }
    }

    // 2. Check DOM structure for frameworks
    if ($('#__next').length > 0 || $('script[id="__NEXT_DATA__"]').length > 0) {
      if (!stack.find(s => s.name === 'Next.js')) {
        stack.push({ name: 'Next.js', category: 'Framework', confidence: 100, hint: 'DOM structure (#__next)' });
      }
      stack.push({ name: 'React', category: 'Library', confidence: 100, hint: 'Next.js dependency' });
    }
    
    if ($('[data-reactroot]').length > 0) {
      if (!stack.find(s => s.name === 'React')) {
        stack.push({ name: 'React', category: 'Library', confidence: 90, hint: 'DOM attributes' });
      }
    }

    if ($('#__nuxt').length > 0 || $('script[id="__NUXT__"]').length > 0) {
      stack.push({ name: 'Nuxt.js', category: 'Framework', confidence: 100, hint: 'DOM structure (#__nuxt)' });
      stack.push({ name: 'Vue.js', category: 'Library', confidence: 100, hint: 'Nuxt.js dependency' });
    }

    if ($('[data-v-app]').length > 0 || $('[data-server-rendered="true"]').length > 0) {
      if (!stack.find(s => s.name === 'Vue.js')) {
        stack.push({ name: 'Vue.js', category: 'Library', confidence: 80, hint: 'DOM attributes' });
      }
    }

    // 3. Check for styling frameworks
    const allClasses = $('body *').map((i, el) => $(el).attr('class')).get().join(' ');
    if (allClasses.includes('text-') && allClasses.includes('flex') && allClasses.includes('bg-')) {
      stack.push({ name: 'Tailwind CSS', category: 'Styling', confidence: 95, hint: 'Utility class signature' });
    } else if (allClasses.includes('col-md-') || allClasses.includes('btn-primary')) {
      stack.push({ name: 'Bootstrap', category: 'Styling', confidence: 90, hint: 'Class signature' });
    }

    // 4. Check Scripts
    $('script').each((i, el) => {
      const src = $(el).attr('src') || '';
      if (src.includes('jquery')) {
        if (!stack.find(s => s.name === 'jQuery')) stack.push({ name: 'jQuery', category: 'Library', confidence: 100, hint: 'Script source' });
      }
      if (src.includes('analytics.js') || src.includes('gtm.js') || src.includes('googletagmanager.com')) {
        if (!stack.find(s => s.name === 'Google Analytics / GTM')) stack.push({ name: 'Google Analytics / GTM', category: 'Analytics', confidence: 100, hint: 'Script source' });
      }
    });

    return {
      success: true,
      data: {
        url,
        headers: Object.keys(headers).length,
        stack
      }
    };
  } catch (error: any) {
    console.error('Tech Stack Action Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze URL'
    };
  }
}
