const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Testing Prisma connection to Supabase...');
    
    // Query instruments
    const instruments = await prisma.instrumen.findMany({
      take: 5,
      select: {
        instrumen_id: true,
        nama_instrumen: true,
        merk_instrumen: true,
        tipe_instrumen: true,
        status: true
      }
    });
    
    console.log('✅ Successfully connected to Supabase database');
    console.log('📊 Found', instruments.length, 'instruments:');
    console.table(instruments);
    
    return { success: true, data: instruments };
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return { success: false, error: error.message };
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Run the main function
main()
  .then(result => {
    if (!result.success) {
      process.exit(1);
    }
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });