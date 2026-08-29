import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    // Skip auth check for now to test if upload works
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.log('No file received');
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json(
        { message: 'Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return NextResponse.json(
        { message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `car-${timestamp}-${randomString}.${extension}`;

    console.log('Generated filename:', filename);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to public/uploads/cars
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cars');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    console.log('File saved to:', filePath);

    // Return the public URL
    const publicUrl = `/uploads/cars/${filename}`;
    console.log('Public URL:', publicUrl);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'File uploaded successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to upload file: ' + error.message 
      },
      { status: 500 }
    );
  }
}