import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if brand has vehicles
    const brand = await prisma.brand.findUnique({
      where: { id },
      include: { vehicles: true },
    });

    if (!brand) {
      return NextResponse.json({ message: 'Brand not found' }, { status: 404 });
    }

    if (brand.vehicles.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete brand with vehicles. Delete vehicles first.' },
        { status: 400 }
      );
    }

    await prisma.brand.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Brand deleted' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}