import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { brand, model, userName, userEmail } = data;

    if (!brand || !model || !userName) {
      return NextResponse.json({ message: 'Brand, model, and username required' }, { status: 400 });
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

    // Check if user already joined (by email or name)
    const existingParticipant = await prisma.chatParticipant.findFirst({
      where: {
        chatId: groupChat.id,
        OR: [
          { userEmail: userEmail || null },
          { userName },
        ],
      },
    });

    if (!existingParticipant) {
      await prisma.chatParticipant.create({
        data: {
          chatId: groupChat.id,
          userName,
          userEmail: userEmail || null,
        },
      });
    }

    // Welcome message
    await prisma.chatMessage.create({
      data: {
        chatId: groupChat.id,
        userName: 'System',
        message: `${userName} joined the chat! 👋`,
        isAdmin: false,
      },
    });

    return NextResponse.json({ success: true, message: 'Joined chat successfully' });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}