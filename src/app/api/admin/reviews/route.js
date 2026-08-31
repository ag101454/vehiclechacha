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

    console.log('Admin API - Reviews found:', reviews.length);
    
    // Log each review
    reviews.forEach((r, i) => {
      console.log(`${i + 1}. ${r.userName} - ${r.vehicle?.brand?.name} ${r.vehicle?.name}`);
    });

    return NextResponse.json({ 
      reviews,
      count: reviews.length,
    });
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json(
      { reviews: [], count: 0, error: error.message },
      { status: 500 }
    );
  }
}