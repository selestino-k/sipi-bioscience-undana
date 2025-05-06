import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Validate resource type to prevent issues
const validateResourceType = (type: string) => {
  const allowedTypes = ['instrumen', 'barang', 'alat'];
  return allowedTypes.includes(type) ? type : 'general';
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  const resourceType = ((formData.get('resourceType') as string) || '').trim() || 'general';
  const validatedType = validateResourceType(resourceType);

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Only JPG and PNG are allowed' }, { status: 400 });
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File size exceeds limit of 5MB' }, { status: 400 });
  }

  try {
    // Create a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Store the file in the database
    const fileAsset = await prisma.fileasset.create({
      data: {
        filename: filename,
        mimeType: file.type,
        size: file.size,
        data: buffer,
        category: validatedType
      }
    });
    
    // Return the ID that can be used to retrieve the file
    return NextResponse.json({ 
      success: true, 
      fileId: fileAsset.id,
      // You'll access this file via an API endpoint, not directly
      imageUrl: `/api/images/${fileAsset.id}` 
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}