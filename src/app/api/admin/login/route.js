import { NextResponse } from 'next/server';
import { verifyAdmin, createAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Login attempt:', { username, password });

    if (!username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Username and password are required' 
        },
        { status: 400 }
      );
    }

    const isValid = verifyAdmin(username, password);

    if (!isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid username or password. Use admin / vehiclechacha2024' 
        },
        { status: 401 }
      );
    }

    const token = createAdminToken(username);

    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error: ' + error.message 
      },
      { status: 500 }
    );
  }
}