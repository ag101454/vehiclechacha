import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET - Fetch all vehicles
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

// POST - Create new vehicle
export async function POST(request) {
  try {
    const data = await request.json();
    
    // TRIM the brand name
    const brandName = (data.brand || '').trim();
    
    if (!brandName) {
      return NextResponse.json({ message: 'Brand name required' }, { status: 400 });
    }
    
    console.log('Creating vehicle with brand:', brandName);

    // Find brand - case insensitive, check for trailing spaces too
    let brand = await prisma.brand.findFirst({
      where: {
        name: {
          equals: brandName,
          mode: 'insensitive',
        },
      },
    });

    // If not found, also try to find by checking if any brand name contains this name
    if (!brand) {
      brand = await prisma.brand.findFirst({
        where: {
          OR: [
            { name: { contains: brandName, mode: 'insensitive' } },
            { slug: brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') },
          ],
        },
      });
    }

    // If still not found, create new brand
    if (!brand) {
      const slug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      
      // Check if slug exists (with different name)
      const existingSlug = await prisma.brand.findUnique({ where: { slug } });
      
      if (existingSlug) {
        // Use existing brand with this slug
        brand = existingSlug;
        console.log('Found brand by slug:', brand.name);
      } else {
        // Create new brand
        brand = await prisma.brand.create({
          data: {
            name: brandName,
            slug: slug,
          },
        });
        console.log('Created new brand:', brandName, 'with slug:', slug);
      }
    } else {
      console.log('Found existing brand:', brand.name, '| ID:', brand.id);
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

    console.log('✅ Vehicle created:', vehicle.name, 'under brand:', brand.name);
    return NextResponse.json({ success: true, vehicle });

  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}