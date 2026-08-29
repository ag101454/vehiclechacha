import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { brand: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Creating vehicle:', data);

    let brand = await prisma.brand.findFirst({
      where: { name: data.brand },
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          name: data.brand,
          slug: data.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brandId: brand.id,
        name: data.name,
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        bodyType: data.bodyType || 'Sedan',
        price: Number(data.price) || 0,
        oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
        engine: data.engine || null,
        transmission: data.transmission || null,
        fuelType: data.fuelType || null,
        fuelEconomy: data.fuelEconomy || null,
        seats: data.seats ? Number(data.seats) : null,
        description: data.description || null,
        image: data.image || null,
        images: JSON.stringify(data.images || []),
        isPopular: Boolean(data.isPopular),
        isAvailable: data.isAvailable !== false,
        launchYear: data.launchYear ? Number(data.launchYear) : null,
        horsepower: data.horsepower ? Number(data.horsepower) : null,
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
      include: { brand: true },
    });

    console.log('Vehicle created successfully:', vehicle);
    return NextResponse.json({ 
      success: true, 
      message: 'Vehicle added successfully', 
      vehicle 
    });

  } catch (error) {
    console.error('POST error:', error.message);
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: 500 });
  }
}
