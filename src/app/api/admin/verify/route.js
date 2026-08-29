import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Get token from cookie
    const cookieHeader = request.headers.get('cookie');
    const token = cookieHeader
      ?.split(';')
      .find(c => c.trim().startsWith('admin_token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const isValid = verifyAdminToken(token);

    if (!isValid) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });

  } catch (error) {
    console.error('Verify admin error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}