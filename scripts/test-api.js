// Test the vehicle creation logic directly
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testVehicleCreation() {
  try {
    console.log('Testing vehicle creation...');
    
    // Find or create brand
    let brand = await prisma.brand.findFirst({
      where: { name: 'Toyota' },
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          name: 'Toyota',
          slug: 'toyota',
        },
      });
      console.log('Created brand:', brand);
    } else {
      console.log('Found existing brand:', brand);
    }

    // Create vehicle
    const vehicle = await prisma.vehicle.create({
      data: {
        brandId: brand.id,
        name: 'Corolla Test',
        slug: 'corolla-test',
        bodyType: 'Sedan',
        price: 7500000,
        engine: '1.8L',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        fuelEconomy: '12-14',
        seats: 5,
        description: 'Test vehicle',
        features: JSON.stringify(['Air Conditioning', 'Power Windows']),
        pros: JSON.stringify(['Reliable', 'Good resale']),
        cons: JSON.stringify(['Expensive']),
      },
      include: { brand: true },
    });

    console.log('✅ Vehicle created successfully!');
    console.log('Vehicle:', vehicle);

    // Clean up - delete test vehicle
    await prisma.vehicle.delete({
      where: { id: vehicle.id },
    });
    console.log('✅ Test vehicle deleted');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error meta:', error.meta);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testVehicleCreation();