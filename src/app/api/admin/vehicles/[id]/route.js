import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: { brand: true },
    });

    if (!vehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }

    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    console.log('Updating vehicle:', id, data);

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }

    // Find or create brand
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

    // Prepare update data
    const updateData = {
      brandId: brand.id,
      name: data.name,
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
    };

    console.log('Update data:', updateData);

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: updateData,
      include: { brand: true },
    });

    console.log('Vehicle updated successfully:', vehicle);
    return NextResponse.json({ 
      success: true, 
      message: 'Vehicle updated successfully', 
      vehicle 
    });

  } catch (error) {
    console.error('PUT error:', error.message);
    console.error('Error details:', error);
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Vehicle deleted successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      success: false,
      message: error.message 
    }, { status: 500 });
  }
}
