import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, email, budgetMin, budgetMax, bodyType, familySize, message, transactionId, screenshot } = data;

    if (!name || !phone || !transactionId) {
      return NextResponse.json({ message: 'Name, Phone, and Transaction ID are required' }, { status: 400 });
    }

    const mashwara = await prisma.mashwaraRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        budgetMin: budgetMin ? parseFloat(budgetMin) : null,
        budgetMax: budgetMax ? parseFloat(budgetMax) : null,
        bodyType: bodyType || null,
        familySize: familySize || null,
        message: message || null,
        transactionId,
        screenshot: screenshot || null,
        paymentStatus: 'pending',
      },
    });

    return NextResponse.json({ success: true, message: 'Request submitted', mashwara }, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await prisma.mashwaraRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}