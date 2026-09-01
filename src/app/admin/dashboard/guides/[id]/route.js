import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const guide = await prisma.guide.findUnique({
      where: { id },
    });

    if (!guide) {
      return NextResponse.json({ message: 'Guide not found' }, { status: 404 });
    }

    await prisma.guide.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Guide deleted successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Delete guide error:', error);
    return NextResponse.json(
      { message: 'Failed to delete guide', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const guide = await prisma.guide.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        slug: data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined,
      },
    });

    return NextResponse.json({ success: true, guide });
  } catch (error) {
    console.error('Update guide error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}