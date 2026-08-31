import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        vehicle: {
          include: {
            brand: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}