const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Starting vehicle creation test...');
    
    // Create brand
    const brand = await prisma.brand.create({
      data: {
        name: 'TestBrand' + Date.now(),
        slug: 'test-brand-' + Date.now(),
      },
    });
    console.log('✅ Brand created:', brand);
    
    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        brandId: brand.id,
        name: 'Test Car',
        slug: 'test-car',
        bodyType: 'Sedan',
        price: 5000000,
        engine: '1.5L',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        fuelEconomy: '12-14',
        seats: 5,
        description: 'Test description',
        features: '[]',
        pros: '[]',
        cons: '[]',
      },
    });
    console.log('✅ Vehicle created:', vehicle);
    
    // Clean up
    await prisma.vehicle.delete({ where: { id: vehicle.id } });
    await prisma.brand.delete({ where: { id: brand.id } });
    console.log('✅ Test completed and cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error meta:', JSON.stringify(error.meta, null, 2));
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
