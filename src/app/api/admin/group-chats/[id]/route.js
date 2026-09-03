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
    console.error('GET error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const chat = await prisma.groupChat.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.groupChat.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Chat deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}