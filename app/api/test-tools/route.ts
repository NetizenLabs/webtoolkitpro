import { NextResponse } from 'next/server';
import { getTools } from '@/lib/tools';

export async function GET() {
  const tools = getTools();
  return NextResponse.json({
    total: tools.length,
    active: tools.filter(t => !t.isComingSoon).length,
    comingSoon: tools.filter(t => t.isComingSoon).length,
    tools: tools.map(t => ({ slug: t.slug, isComingSoon: t.isComingSoon }))
  });
}
