import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { messageId, isPinned } = data;

    if (!messageId) {
      return NextResponse.json({ message: 'Message ID required' }, { status: 400 });
    }

    const message = await prisma.chatMessage.update({
      where: { id: messageId },
      data: { isPinned },
    });

    return NextResponse.json({ success: true, message });

  } catch (error) {
    console.error('Pin error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
