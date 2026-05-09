import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Pinterest Downloader API (Professional Version)
 * Inspired by pinterest-dl's reverse-engineered API logic.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // 1. Follow redirects for shortened links (pin.it)
    const initialRes = await fetch(url, { 
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
      }
    });
    const finalUrl = initialRes.url;
    const html = await initialRes.text();

    // 2. Parse Username and Board Name from URL
    const boardMatch = finalUrl.match(/pinterest\.com\/([^/]+)\/([^/]+)/);
    const username = boardMatch?.[1];
    const boardName = boardMatch?.[2];

    const pins: any[] = [];
    const seen = new Set();
    const normalize = (u: string) => u.split('?')[0].split('#')[0];

    // Extraction helper (Professional logic)
    const extractPin = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      
      // Look for react_grid_pin or standard image structure
      const imgData = obj.images || obj;
      const rawUrl = imgData.orig?.url || imgData['max']?.url || imgData['736x']?.url || (typeof obj.url === 'string' && obj.url.includes('pinimg.com') ? obj.url : null);
      
      if (rawUrl) {
        const normalizedUrl = normalize(rawUrl);
        if (!seen.has(normalizedUrl)) {
          seen.add(normalizedUrl);
          pins.push({
            id: obj.id || obj.pin_id || Math.random().toString(36).substr(2, 9),
            title: obj.title || obj.grid_title || obj.description || 'Pinterest Image',
            url: rawUrl,
            thumbnail: imgData['236x']?.url || imgData['474x']?.url || rawUrl
          });
        }
      }
    };

    const deepSearch = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      extractPin(obj);
      Object.values(obj).forEach(val => {
        if (val && typeof val === 'object') deepSearch(val);
      });
    };

    // 3. Resolve Board ID (Crucial for stability)
    let boardId = '';
    const idMatch = html.match(/"board":\{"id":"(\d+)"/) || html.match(/"board_id":"(\d+)"/);
    if (idMatch) boardId = idMatch[1];

    // 4. Initial Scrape (HTML Data Blobs)
    const scriptMatches = Array.from(html.matchAll(/<script id=".*?" type="application\/json">([\s\S]*?)<\/script>/g));
    scriptMatches.forEach(m => { try { deepSearch(JSON.parse(m[1])); } catch {} });

    // 5. API Fetch (Professional Fallback - using BoardFeedResource)
    // This mimics pinterest-dl's scrape phase
    if (boardId && username && boardName) {
      const options = {
        board_id: boardId,
        board_url: `/${username}/${boardName}/`,
        page_size: 250,
        field_set_key: "react_grid_pin",
        redux_normalize_feed: true
      };

      const apiEndpoint = `https://www.pinterest.com/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(`/${username}/${boardName}/`)}&data=${encodeURIComponent(JSON.stringify({ options, context: {} }))}&_=${Date.now()}`;

      try {
        const apiRes = await fetch(apiEndpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'x-pinterest-pws-handler': 'www/pin/[id].js' // Stability header from pinterest-dl
          }
        });
        
        if (apiRes.ok) {
          const data = await apiRes.json();
          deepSearch(data);
        }
      } catch (e) {
        console.error("API Fetch Error:", e);
      }
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found. Please ensure the link is public.' }, { status: 404 });
    }

    // Return sanitized pins
    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process Pinterest link.' }, { status: 500 });
  }
}
