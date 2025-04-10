import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid instrument ID' }, { status: 400 });
    }
    
    const instrument = await prisma.instrumen.findUnique({
      where: { instrumen_id: id },
      include: {
        rentals: true,
      },
    });
    
    if (!instrument) {
      return NextResponse.json({ error: 'Instrument not found' }, { status: 404 });
    }
    
    return NextResponse.json(instrument);
  } catch (error) {
    console.error('Error fetching instrument:', error);
    return NextResponse.json(
      { error: 'Failed to fetch instrument data' },
      { status: 500 }
    );
  }
}