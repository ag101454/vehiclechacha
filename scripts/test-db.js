const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL || 'file:./dev.db');
    
    // Try to create a test brand
    console.log('Creating test brand...');
    const brand = await prisma.brand.create({
      data: {
        name: 'Test Brand ' + Date.now(),
        slug: 'test-brand-' + Date.now(),
      },
    });
    
    console.log('✅ Database connected successfully!');
    console.log('Created brand:', brand);
    
    // Delete test brand
    await prisma.brand.delete({
      where: { id: brand.id },
    });
    
    console.log('✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();