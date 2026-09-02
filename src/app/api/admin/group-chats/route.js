import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const chats = await prisma.groupChat.findMany({
      include: {
        vehicle: {
          include: { brand: true },
        },
        participants: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ chats });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}