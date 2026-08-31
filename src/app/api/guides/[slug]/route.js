import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const guide = await prisma.guide.findUnique({
      where: { slug },
    });

    if (!guide) {
      return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
    }

    return NextResponse.json({ guide });
  } catch (error) {
    console.error('Error fetching guide:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}