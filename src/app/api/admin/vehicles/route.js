import { NextResponse } from 'next/server';
import { prisma, ensureConnection } from '@/lib/db';

// GET - Fetch all vehicles
export async function GET() {
  try {
    // Wake up database first
    const connected = await ensureConnection();
    
    if (!connected) {
      // Try one more time
      await new Promise(resolve => setTimeout(resolve, 2000));
      await ensureConnection();
    }
    
    const vehicles = await prisma.vehicle.findMany({
      include: { brand: true },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('✅ Vehicles fetched:', vehicles.length);
    return NextResponse.json({ vehicles });
    
  } catch (error) {
    console.error('GET error:', error.message);
    
    // Final retry
    try {
      await ensureConnection();
      const vehicles = await prisma.vehicle.findMany({
        include: { brand: true },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ vehicles });
    } catch (finalError) {
      console.error('Final error:', finalError.message);
      return NextResponse.json(
        { message: 'Database connection failed. Please refresh the page.', error: finalError.message },
        { status: 500 }
      );
    }
  }
}

// POST - Create new vehicle
export async function POST(request) {
  try {
    await ensureConnection();
    
    const data = await request.json();
    const brandName = (data.brand || '').trim();
    
    if (!brandName) {
      return NextResponse.json({ message: 'Brand name required' }, { status: 400 });
    }

    // Find or create brand
    let brand = await prisma.brand.findFirst({
      where: { name: { equals: brandName, mode: 'insensitive' } },
    });

    if (!brand) {
      const slug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      brand = await prisma.brand.create({
        data: { name: brandName, slug },
      });
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        brandId: brand.id,
        name: (data.name || '').trim(),
        slug: (data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
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
        isPopular: data.isPopular === true || data.isPopular === 'true',
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

    return NextResponse.json({ success: true, vehicle });

  } catch (error) {
    console.error('POST error:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}