import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        brand: true,
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { message: 'Vehicle not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ vehicle }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json(
      { message: 'Failed to fetch vehicle', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: data.name,
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
        features: JSON.stringify(data.features || []),
        pros: JSON.stringify(data.pros || []),
        cons: JSON.stringify(data.cons || []),
      },
    });

    return NextResponse.json(
      { message: 'Vehicle updated successfully', vehicle },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { message: 'Failed to update vehicle', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Vehicle deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { message: 'Failed to delete vehicle', error: error.message },
      { status: 500 }
    );
  }
}