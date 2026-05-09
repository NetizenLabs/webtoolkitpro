import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    let finalResponse = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });

    const finalUrl = finalResponse.url;
    const html = await finalResponse.text();
    const pins: any[] = [];
    const seen = new Set();

    // Helper: Normalize URL for deduplication (removes query params)
    const normalize = (u: string) => u.split('?')[0].split('#')[0];

    const processItem = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      
      const imgData = obj.images || obj;
      const rawUrl = imgData.orig?.url || imgData['max']?.url || imgData['736x']?.url || (typeof obj.url === 'string' && obj.url.includes('pinimg.com') ? obj.url : null);
      
      if (rawUrl && (obj.images || (obj.id && obj.type === 'pin'))) {
        const normalizedUrl = normalize(rawUrl);
        if (!seen.has(normalizedUrl)) {
          seen.add(normalizedUrl);
          pins.push({
            id: obj.id || Math.random().toString(36).substr(2, 9),
            title: obj.title || obj.grid_title || obj.description || 'Pinterest Image',
            url: rawUrl,
            thumbnail: imgData['236x']?.url || imgData['474x']?.url || rawUrl
          });
        }
      }
    };

    const deepSearch = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      processItem(obj);
      Object.values(obj).forEach(val => {
        if (val && typeof val === 'object') deepSearch(val);
      });
    };

    // 1. Scan all JSON script tags
    const scriptMatches = Array.from(html.matchAll(/<script id=".*?" type="application\/json">([\s\S]*?)<\/script>/g));
    for (const match of scriptMatches) {
      try {
        const data = JSON.parse(match[1]);
        deepSearch(data);
      } catch (e) {}
    }

    // 2. Scan LD+JSON
    const ldMatches = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
    for (const match of ldMatches) {
      try {
        const data = JSON.parse(match[1]);
        const extractLD = (o: any) => {
          if (!o || typeof o !== 'object') return;
          if (o.itemListElement) {
            o.itemListElement.forEach((item: any) => processItem(item.item || item));
          }
          Object.values(o).forEach(v => { if (v && typeof v === 'object') extractLD(v); });
        };
        extractLD(data);
      } catch (e) {}
    }

    // 3. Board ID Detection & Mass Fetching (Simplified version of Step 190)
    let boardId = '';
    const idMatch = html.match(/"board":\{"id":"(\d+)"/) || html.match(/"board_id":"(\d+)"/);
    if (idMatch) boardId = idMatch[1];

    if (boardId && pins.length > 5) {
      // Just one extra batch of 250 pins to ensure we get a lot more without recursion complexity
      const resourceUrl = `https://www.pinterest.com/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(finalUrl)}&data=${encodeURIComponent(JSON.stringify({
        options: { board_id: boardId, page_size: 250 },
        context: {}
      }))}&_=${Date.now()}`;

      try {
        const res = await fetch(resourceUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
        if (res.ok) {
          const batchData = await res.json();
          deepSearch(batchData);
        }
      } catch (e) {}
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found.' }, { status: 404 });
    }

    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch images.' }, { status: 500 });
  }
}
