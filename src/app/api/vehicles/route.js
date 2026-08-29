import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const bodyType = searchParams.get('bodyType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'price_asc';

    // Build where clause
    const where = {
      isAvailable: true,
    };

    if (brand) {
      where.brand = {
        slug: brand,
      };
    }

    if (bodyType) {
      where.bodyType = bodyType;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Build order by
    let orderBy = {};
    switch (sort) {
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      case 'name_desc':
        orderBy = { name: 'desc' };
        break;
      default:
        orderBy = { price: 'asc' };
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy,
      include: {
        brand: true,
      },
    });

    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { message: 'Failed to fetch vehicles', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.brand || !data.name || !data.price || !data.bodyType) {
      return NextResponse.json(
        { message: 'Brand, name, price, and bodyType are required' },
        { status: 400 }
      );
    }

    // Find or create brand
    let brand = await prisma.brand.findFirst({
      where: { 
        name: { equals: data.brand, mode: 'insensitive' } 
      },
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          name: data.brand,
          slug: data.brand.toLowerCase().replace(/\s+/g, '-'),
        },
      });
    }

    // Create slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, '-');

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        brandId: brand.id,
        name: data.name,
        slug,
        bodyType: data.bodyType,
        price: parseFloat(data.price),
        oldPrice: data.oldPrice ? parseFloat(data.oldPrice) : null,
        engine: data.engine || null,
        transmission: data.transmission || null,
        fuelType: data.fuelType || null,
        fuelEconomy: data.fuelEconomy || null,
        seats: data.seats ? parseInt(data.seats) : null,
        description: data.description || null,
        image: data.image || null,
        isPopular: data.isPopular || false,
        isAvailable: data.isAvailable !== false,
        launchYear: data.launchYear ? parseInt(data.launchYear) : null,
        horsepower: data.horsepower ? parseInt(data.horsepower) : null,
        torque: data.torque || null,
        groundClearance: data.groundClearance || null,
        bootSpace: data.bootSpace || null,
        length: data.length || null,
        width: data.width || null,
        height: data.height || null,
        wheelbase: data.wheelbase || null,
        fuelTankCapacity: data.fuelTankCapacity || null,
        kerbWeight: data.kerbWeight || null,
        features: JSON.stringify(data.features || []),
        pros: JSON.stringify(data.pros || []),
        cons: JSON.stringify(data.cons || []),
      },
      include: {
        brand: true,
      },
    });

    return NextResponse.json(
      { message: 'Vehicle created successfully', vehicle },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { message: 'Failed to create vehicle', error: error.message },
      { status: 500 }
    );
  }
}