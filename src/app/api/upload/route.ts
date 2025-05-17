import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToS3 } from '@/utils/s3';

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

  try {
    // Create a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${validatedType}/${timestamp}-${originalName}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to S3
    const image_url = await uploadFileToS3(buffer, filename, file.type);
    
    // Return the direct S3 URL that can be stored in the Instrumen table
    return NextResponse.json({ 
      success: true,
      imageUrl: image_url
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}