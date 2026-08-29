import { NextResponse } from 'next/server';

// This route is no longer used — trending data is served from mock data in mockData.ts
export async function GET() {
  return NextResponse?.json({ tokens: [] });
}
