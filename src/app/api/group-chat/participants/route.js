import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');

    if (!brand || !model) {
      return NextResponse.json({ message: 'Brand and model required' }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.findFirst({
      where: { slug: model, brand: { slug: brand } },
    });

    if (!vehicle) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    const groupChat = await prisma.groupChat.findUnique({
      where: { vehicleId: vehicle.id },
    });

    if (!groupChat) {
      return NextResponse.json({ participants: [] });
    }

    const participants = await prisma.chatParticipant.findMany({
      where: { chatId: groupChat.id },
      orderBy: { joinedAt: 'asc' },
    });

    return NextResponse.json({ participants });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}