import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse(JSON.stringify({ error: "Payment required" }), {
    status: 402,
    headers: {
      'Content-Type': 'application/json',
      'X-402-Payment-Required': 'true',
      'X-402-Facilitator': 'https://stripe.com',
      'X-402-Wallet': 'acct_1032D82eB69zArt5'
    }
  });
}
