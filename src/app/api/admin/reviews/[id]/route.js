import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const review = await prisma.review.update({
      where: { id },
      data: {
        isApproved: data.isApproved,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { message: 'Failed to update review', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { message: 'Failed to delete review', error: error.message },
      { status: 500 }
    );
  }
}