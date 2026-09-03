import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { messageId } = params;

    await prisma.chatMessage.delete({
      where: { id: messageId },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
