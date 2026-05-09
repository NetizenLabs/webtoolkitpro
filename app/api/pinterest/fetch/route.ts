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

    const html = await response.text();
    
    // Extract Board ID and Initial Data from multiple possible script tags
    const patterns = [
      /<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
      /<script id="__PWS_INITIAL_PROPS__" type="application\/json">([\s\S]*?)<\/script>/
    ];

    let initialData: any = null;
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        try {
          initialData = JSON.parse(match[1]);
          break;
        } catch (e) {}
      }
    }

    if (!initialData) {
      return NextResponse.json({ error: 'Could not find board data. The link might be private or invalid.' }, { status: 404 });
    }

    // Robust Board ID detection
    const reduxState = initialData.props?.initialReduxState || initialData.initialReduxState || {};
    const boards = reduxState.boards || {};
    const boardId = (Object.values(boards).find((b: any) => b.id) as any)?.id || 
                    initialData.props?.data?.board?.id ||
                    initialData.page_props?.data?.board?.id;
    
    if (!boardId) {
       // Fallback: Just return the initial data if we can't find a board ID for bulk fetching
       return NextResponse.json(initialData);
    }

    // Now we have the board ID, let's fetch in bulk using Pinterest API
    let allPins: any[] = [];
    let bookmark = '';
    const MAX_PINS = 1000;
    const BATCH_SIZE = 50;

    // First, add pins from initial state
    const initialPins = initialData.props?.initialReduxState?.pins || {};
    allPins = Object.values(initialPins);

    // Loop to fetch more if needed
    while (allPins.length < MAX_PINS) {
      const resourceUrl = `https://www.pinterest.com/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(url)}&data=${encodeURIComponent(JSON.stringify({
        options: {
          board_id: boardId,
          page_size: BATCH_SIZE,
          bookmarks: bookmark ? [bookmark] : []
        },
        context: {}
      }))}&_=${Date.now()}`;

      const res = await fetch(resourceUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        }
      });

      if (!res.ok) break;

      const batchData = await res.json();
      const newPins = batchData.resource_response?.data || [];
      if (newPins.length === 0) break;

      allPins = [...allPins, ...newPins];
      bookmark = batchData.resource_response?.bookmark;
      
      if (!bookmark) break;
    }

    return NextResponse.json({ 
      props: { 
        initialReduxState: { 
          pins: allPins.reduce((acc, pin) => ({ ...acc, [pin.id]: pin }), {}) 
        } 
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
