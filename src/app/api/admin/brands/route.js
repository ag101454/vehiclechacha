import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        vehicles: {
          select: {
            id: true,
            name: true,
            price: true,
            isAvailable: true,
            isPopular: true,
          },
        },
        _count: {
          select: { vehicles: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ 
      brands,
      total: brands.length,
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { message: 'Failed to fetch brands', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, country, description, logo } = data;

    if (!name) {
      return NextResponse.json({ message: 'Brand name required' }, { status: 400 });
    }

    // Check if brand exists
    const existing = await prisma.brand.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Brand already exists', brand: existing },
        { status: 200 }
      );
    }

    // Create new brand
    const brand = await prisma.brand.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        country: country || null,
        description: description || null,
        logo: logo || null,
      },
    });

    return NextResponse.json({ message: 'Brand created', brand }, { status: 201 });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}