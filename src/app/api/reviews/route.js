import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json({ message: 'Vehicle ID required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        vehicleId,
        isApproved: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate breakdown
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(r => breakdown[r.rating]++);

    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    return NextResponse.json({ 
      reviews, 
      averageRating: avgRating,
      totalReviews: reviews.length,
      breakdown,
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { vehicleId, userName, email, rating, title, review, pros, cons } = data;

    if (!vehicleId || !userName || !email || !rating || !review) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingReview = await prisma.review.findUnique({
      where: { vehicleId_email: { vehicleId, email } },
    });

    if (existingReview) {
      return NextResponse.json(
        { message: 'You have already reviewed this vehicle with this email' },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { brand: true },
    });

    const newReview = await prisma.review.create({
      data: {
        vehicleId,
        userName,
        email,
        rating: parseInt(rating),
        title: title || null,
        review,
        pros: pros || null,
        cons: cons || null,
        isApproved: true,
      },
    });

    // Update vehicle rating
    const allReviews = await prisma.review.findMany({
      where: { vehicleId, isApproved: true },
    });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { averageRating: avgRating, totalReviews: allReviews.length },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully!',
      review: newReview,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}