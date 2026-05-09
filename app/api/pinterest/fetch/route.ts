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

    const html = await finalResponse.text();
    const pins: any[] = [];
    const seen = new Set();

    // Aggressive Pin Extraction from ALL script tags
    const scriptMatches = Array.from(html.matchAll(/<script id=".*?" type="application\/json">([\s\S]*?)<\/script>/g));
    
    const deepSearch = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      
      // Look for any object that has an image-like structure
      const imgData = obj.images || obj;
      const possibleUrl = imgData.orig?.url || imgData['max']?.url || imgData['736x']?.url || (typeof obj.url === 'string' && obj.url.includes('pinimg.com') ? obj.url : null);
      
      if (possibleUrl && (obj.images || (obj.id && obj.type === 'pin'))) {
        if (!seen.has(possibleUrl)) {
          seen.add(possibleUrl);
          pins.push({
            id: obj.id || obj.pin_id || Math.random().toString(36).substr(2, 9),
            title: obj.title || obj.grid_title || obj.description || 'Pinterest Image',
            url: possibleUrl,
            thumbnail: imgData['236x']?.url || imgData['474x']?.url || possibleUrl
          });
        }
      }
      
      // Exhaustive search of all children
      const values = Object.values(obj);
      for (const val of values) {
        if (val && typeof val === 'object') {
          deepSearch(val);
        }
      }
    };

    for (const match of scriptMatches) {
      try {
        const data = JSON.parse(match[1]);
        deepSearch(data);
      } catch (e) {}
    }

    // Fallback: LD+JSON (Very reliable for board initial pins)
    const ldMatches = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
    for (const match of ldMatches) {
      try {
        const data = JSON.parse(match[1]);
        const extractFromLD = (obj: any) => {
          if (!obj || typeof obj !== 'object') return;
          if (obj['@type'] === 'ItemList' && obj.itemListElement) {
            obj.itemListElement.forEach((item: any) => {
              const pinData = item.item || item;
              const imgUrl = pinData.image;
              const pinUrl = pinData.url || '';
              const id = pinUrl.match(/pin\/(\d+)/)?.[1] || Math.random().toString(36).substr(2, 9);
              
              if (imgUrl && !seen.has(imgUrl)) {
                seen.add(imgUrl);
                pins.push({
                  id,
                  title: pinData.name || 'Pinterest Image',
                  url: imgUrl,
                  thumbnail: imgUrl
                });
              }
            });
          }
          Object.values(obj).forEach(val => {
            if (val && typeof val === 'object') extractFromLD(val);
          });
        };
        extractFromLD(data);
      } catch (e) {}
    }

    // Final Fallback: Regex for originals
    if (pins.length < 5) {
      const imgRegex = /"(https:\/\/i\.pinimg\.com\/originals\/[a-z0-9\/]+\.jpg)"/gi;
      const matches = Array.from(html.matchAll(imgRegex));
      for (const match of matches) {
        if (!seen.has(match[1])) {
          seen.add(match[1]);
          pins.push({
            id: `reg_${pins.length}`,
            title: `Image ${pins.length + 1}`,
            url: match[1],
            thumbnail: match[1]
          });
        }
      }
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found. Ensure the link is public.' }, { status: 404 });
    }

    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to access the link.' }, { status: 500 });
  }
}
