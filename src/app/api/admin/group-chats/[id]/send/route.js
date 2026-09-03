import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { message, isAdmin = true } = data;

    if (!message) {
      return NextResponse.json({ message: 'Message required' }, { status: 400 });
    }

    const chatMessage = await prisma.chatMessage.create({
      data: {
        chatId: id,
        userName: 'Chacha (Admin)',
        message,
        isAdmin: true,
      },
    });

    await prisma.groupChat.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: chatMessage });

  } catch (error) {
    console.error('Send error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
