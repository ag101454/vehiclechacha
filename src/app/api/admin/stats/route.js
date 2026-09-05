import { NextResponse } from 'next/server';
import { prisma, ensureConnection } from '@/lib/db';

export async function GET() {
  try {
    // Ensure database connection is alive
    await ensureConnection();

    // Get all counts in parallel
    const [
      totalVehicles,
      totalBrands,
      totalReviews,
      totalGuides,
      popularVehicles,
      availableVehicles,
      pendingReviews,
      approvedReviews,
      recentVehicles,
      recentReviews,
    ] = await Promise.all([
      prisma.vehicle.count(),
      prisma.brand.count(),
      prisma.review.count(),
      prisma.guide.count(),
      prisma.vehicle.count({ where: { isPopular: true } }),
      prisma.vehicle.count({ where: { isAvailable: true } }),
      prisma.review.count({ where: { isApproved: false } }),
      prisma.review.count({ where: { isApproved: true } }),
      prisma.vehicle.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { brand: true },
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { vehicle: { include: { brand: true } } },
      }),
    ]);

    // Calculate average rating
    const vehiclesWithRating = await prisma.vehicle.findMany({
      where: { totalReviews: { gt: 0 } },
      select: { averageRating: true },
    });
    
    const avgRating = vehiclesWithRating.length > 0
      ? vehiclesWithRating.reduce((sum, v) => sum + v.averageRating, 0) / vehiclesWithRating.length
      : 0;

    return NextResponse.json({
      stats: {
        totalVehicles,
        totalBrands,
        totalReviews,
        totalGuides,
        popularVehicles,
        availableVehicles,
        pendingReviews,
        approvedReviews,
        averageRating: Math.round(avgRating * 10) / 10,
      },
      recentVehicles,
      recentReviews,
    });

  } catch (error) {
    console.error('Stats error:', error.message);
    
    // Try to reconnect on error
    try {
      await prisma.$disconnect();
      await prisma.$connect();
    } catch (reconnectError) {
      console.error('Reconnect failed:', reconnectError.message);
    }
    
    return NextResponse.json(
      { message: 'Failed to fetch stats', error: error.message },
      { status: 500 }
    );
  }
}