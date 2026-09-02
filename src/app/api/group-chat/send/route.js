import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { brand, model, userName, message, image } = data;

    if (!brand || !model || !userName || !message) {
      return NextResponse.json({ message: 'Brand, model, username, and message required' }, { status: 400 });
    }

    // Find vehicle
    const vehicle = await prisma.vehicle.findFirst({
      where: { slug: model, brand: { slug: brand } },
    });

    if (!vehicle) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    // Find or create group chat
    let groupChat = await prisma.groupChat.findUnique({
      where: { vehicleId: vehicle.id },
    });

    if (!groupChat) {
      groupChat = await prisma.groupChat.create({
        data: { vehicleId: vehicle.id },
      });
    }

    // Create message
    const chatMessage = await prisma.chatMessage.create({
      data: {
        chatId: groupChat.id,
        userName,
        message,
        image: image || null,
        isAdmin: false,
      },
    });

    return NextResponse.json({ success: true, message: chatMessage }, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}