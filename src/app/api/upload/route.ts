import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Validate resource type to prevent directory traversal attacks
const validateResourceType = (type: string) => {
  const allowedTypes = ['instrumen', 'barang', 'alat'];
  return allowedTypes.includes(type) ? type : 'general';
};

// Make sure the directory exists
const ensureDirectory = (resourceType: string) => {
  const validatedType = validateResourceType(resourceType);
  const dirPath = path.join(process.cwd(), 'public', 'images', validatedType);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Get resource type from the request, default to "general" if not provided
  const resourceType = ((formData.get('resourceType') as string) || '').trim() || 'general';

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
    // Ensure the directory exists
    const dirPath = ensureDirectory(resourceType);

    // Create a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}`;
    
    // Set the file path
    const filePath = path.join(dirPath, filename);
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Write the file to the public directory
    await writeFile(filePath, buffer);
    
    // Return the path that will be accessible from the frontend
    const imageUrl = `/images/${resourceType}/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl 
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}