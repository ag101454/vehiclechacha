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
          take: 1,
        },
        _count: {
          select: {
            participants: true,
            messages: true,
          },
        },
      },
    });

    const sortedChats = chats
      .map(chat => ({
        id: chat.id,
        vehicle: chat.vehicle,
        participantCount: chat._count.participants,
        messageCount: chat._count.messages,
        lastMessage: chat.messages[0] || null,
        participants: chat.participants,
      }))
      .sort((a, b) => b.participantCount - a.participantCount);

    return NextResponse.json({ 
      chats: sortedChats.slice(0, 3),
      total: sortedChats.length,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}