import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ guides, total: guides.length });
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { title, slug, content, excerpt, category } = data;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content required' }, { status: 400 });
    }

    const guide = await prisma.guide.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content,
        excerpt: excerpt || content.substring(0, 150),
        category: category || 'General',
      },
    });

    return NextResponse.json({ message: 'Guide created', guide }, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}