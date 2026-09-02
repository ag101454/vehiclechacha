import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request) {
  try {
    const data = await request.json();
    const { messageId, isPinned, isAdmin } = data;

    if (!messageId) {
      return NextResponse.json({ message: 'Message ID required' }, { status: 400 });
    }

    // Check if admin (simple check - can be enhanced)
    if (!isAdmin) {
      return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
    }

    const message = await prisma.chatMessage.update({
      where: { id: messageId },
      data: { isPinned },
    });

    return NextResponse.json({ success: true, message });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}