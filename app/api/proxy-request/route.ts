import { NextResponse } from 'next/server';

const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

export async function POST(request: Request) {
  // Simple in-memory rate limiting based on IP
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  
  const userRate = rateLimitCache.get(ip) || { count: 0, timestamp: now };
  if (now - userRate.timestamp > RATE_LIMIT_WINDOW) {
    userRate.count = 0;
    userRate.timestamp = now;
  }
  userRate.count++;
  rateLimitCache.set(ip, userRate);

  if (userRate.count > MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { url, method, headers, requestBody } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Only allow safe protocols
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
    }

    // Prevent proxying to local/internal IP addresses for security
    const urlObj = new URL(url);
    if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1' || urlObj.hostname.startsWith('192.168.')) {
        return NextResponse.json({ error: 'Internal network requests are blocked' }, { status: 403 });
    }

    const startTime = performance.now();
    
    // Convert arrays of headers [{key, value}] to an object
    const fetchHeaders: Record<string, string> = {};
    if (Array.isArray(headers)) {
      headers.forEach(h => {
        if (h.key && h.key.trim() !== '') {
          fetchHeaders[h.key] = h.value;
        }
      });
    }

    const fetchOptions: RequestInit = {
      method: method || 'GET',
      headers: fetchHeaders,
      // Don't follow redirects automatically so the user can see 3xx codes
      redirect: 'manual', 
    };

    if (method !== 'GET' && method !== 'HEAD' && requestBody) {
      fetchOptions.body = requestBody;
    }

    const response = await fetch(url, fetchOptions);
    const endTime = performance.now();

    // Extract response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let responseData = '';
    const contentType = response.headers.get('content-type') || '';
    
    // We only try to read text/json, otherwise we just say it's binary
    if (contentType.includes('application/json') || contentType.includes('text/') || contentType.includes('application/xml')) {
        responseData = await response.text();
    } else {
        responseData = `[Binary Data: ${contentType}]`;
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: responseData,
      timeMs: Math.round(endTime - startTime),
    });

  } catch (error: any) {
    console.error('API Verifier Proxy Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to execute request' 
    }, { status: 500 });
  }
}
