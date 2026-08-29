import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ vehicles: [] });
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { brand: { name: { contains: query, mode: 'insensitive' } } },
          { bodyType: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        brand: true,
      },
      take: 10,
    });

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Search failed', error: error.message },
      { status: 500 }
    );
  }
}