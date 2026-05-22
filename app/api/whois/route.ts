import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
  }

  try {
    const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
    const response = await fetch(`https://networkcalc.com/api/dns/whois/${encodeURIComponent(cleanDomain)}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WebToolkitPro-Backend/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WHOIS Proxy Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
