import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { vehicles: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ brands });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}