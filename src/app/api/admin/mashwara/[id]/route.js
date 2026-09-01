import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const updated = await prisma.mashwaraRequest.update({
      where: { id },
      data: {
        paymentStatus: data.paymentStatus,
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}