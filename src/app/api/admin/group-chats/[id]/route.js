import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const chat = await prisma.groupChat.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: { brand: true },
        },
        messages: {
          orderBy: [
            { isPinned: 'desc' },
            { createdAt: 'asc' },
          ],
        },
        participants: {
          orderBy: { joinedAt: 'asc' },
        },
      },
    });

    if (!chat) {
      return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({
      chat,
      messages: chat.messages,
      participants: chat.participants,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}