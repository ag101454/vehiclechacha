const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restoreData() {
  try {
    console.log('=== RESTORING DATA TO NEON DATABASE ===');

    // Create Brands
    const brands = [
      { name: 'Toyota', slug: 'toyota', country: 'Japan', description: 'Reliability & Resale King' },
      { name: 'Honda', slug: 'honda', country: 'Japan', description: 'Performance & Comfort' },
      { name: 'Suzuki', slug: 'suzuki', country: 'Japan', description: 'Affordable & Efficient' },
      { name: 'Hyundai', slug: 'hyundai', country: 'South Korea', description: 'Innovation & Style' },
      { name: 'Kia', slug: 'kia', country: 'South Korea', description: 'Modern & Feature-Packed' },
      { name: 'Changan', slug: 'changan', country: 'China', description: 'Value-packed Chinese cars' },
    ];

    const brandMap = {};
    
    for (const brand of brands) {
      const existing = await prisma.brand.findUnique({ where: { slug: brand.slug } });
      if (existing) {
        brandMap[brand.slug] = existing;
        console.log('⏭️ Brand exists:', brand.name);
      } else {
        const created = await prisma.brand.create({ data: brand });
        brandMap[brand.slug] = created;
        console.log('✅ Created brand:', brand.name);
      }
    }

    // Create Vehicles
    const vehicles = [
      {
        brandSlug: 'toyota',
        name: 'Corolla Altis Grande 1.8 CVT-i (Grande X)',
        bodyType: 'Sedan',
        price: 7500000,
        oldPrice: 7200000,
        engine: '1.8L 4-Cylinder',
        transmission: 'Automatic (CVT-i)',
        fuelType: 'Petrol',
        fuelEconomy: '12-14',
        seats: 5,
        description: 'The Toyota Corolla is Pakistan\'s most popular sedan, known for reliability, comfort, and excellent resale value. The Grande X variant offers premium features including leather seats, sunroof, and advanced safety.',
        isPopular: true,
        horsepower: 138,
        torque: '173 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Power Steering', 'Airbags', 'ABS', 'EBD', 'Bluetooth', 'USB', 'Keyless Entry', 'Push Start', 'Cruise Control', 'Climate Control', 'Leather Seats', 'Sunroof']),
        pros: JSON.stringify(['Excellent resale value', 'Reliable and low maintenance', 'Comfortable for families', 'Good safety features', 'Premium features']),
        cons: JSON.stringify(['Higher price than competitors', 'Fuel economy could be better']),
      },
      {
        brandSlug: 'hyundai',
        name: 'Elantra (Hybrid)',
        bodyType: 'Sedan',
        price: 7000000,
        oldPrice: 6800000,
        engine: '1.6L Hybrid',
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        fuelEconomy: '18-20',
        seats: 5,
        description: 'Hyundai Elantra Hybrid combines modern design with excellent fuel economy. Perfect for those who want style and efficiency.',
        isPopular: true,
        horsepower: 139,
        torque: '264 Nm',
        features: JSON.stringify(['Climate Control', 'Airbags', 'ABS', 'EBD', 'Bluetooth', 'Android Auto', 'Apple CarPlay', 'Keyless Entry', 'Push Start', 'Wireless Charger']),
        pros: JSON.stringify(['Excellent fuel economy', 'Modern design', 'Good features', 'Comfortable ride']),
        cons: JSON.stringify(['Less brand recognition', 'Lower resale value']),
      },
      {
        brandSlug: 'suzuki',
        name: 'Alto VXL AGS',
        bodyType: 'Hatchback',
        price: 2500000,
        oldPrice: 2400000,
        engine: '0.66L 3-Cylinder',
        transmission: 'Automatic (AGS)',
        fuelType: 'Petrol',
        fuelEconomy: '18-20',
        seats: 4,
        description: 'Suzuki Alto is Pakistan\'s most affordable car with excellent fuel economy. Perfect for city driving.',
        isPopular: true,
        horsepower: 39,
        torque: '56 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Power Steering', 'Airbags']),
        pros: JSON.stringify(['Very affordable', 'Excellent fuel economy', 'Easy to park', 'Low maintenance']),
        cons: JSON.stringify(['Basic features', 'Less powerful', 'Small interior']),
      },
      {
        brandSlug: 'suzuki',
        name: 'Cultus VXL',
        bodyType: 'Hatchback',
        price: 3800000,
        oldPrice: 3600000,
        engine: '1.0L 3-Cylinder',
        transmission: 'Manual',
        fuelType: 'Petrol',
        fuelEconomy: '18-20',
        seats: 5,
        description: 'Suzuki Cultus is a stylish and fuel-efficient hatchback perfect for Pakistani families.',
        isPopular: true,
        horsepower: 67,
        torque: '90 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Power Steering', 'Airbags', 'Bluetooth']),
        pros: JSON.stringify(['Good fuel economy', 'Affordable', 'Reliable', 'Good resale']),
        cons: JSON.stringify(['Basic features', 'Small boot space']),
      },
      {
        brandSlug: 'suzuki',
        name: 'Swift GLX CVT',
        bodyType: 'Hatchback',
        price: 4500000,
        oldPrice: 4300000,
        engine: '1.2L 4-Cylinder',
        transmission: 'Automatic (CVT)',
        fuelType: 'Petrol',
        fuelEconomy: '15-18',
        seats: 5,
        description: 'Suzuki Swift is a sporty hatchback with excellent handling and fuel economy.',
        isPopular: true,
        horsepower: 82,
        torque: '113 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Power Steering', 'Airbags', 'ABS', 'Bluetooth', 'Cruise Control']),
        pros: JSON.stringify(['Excellent fuel economy', 'Sporty handling', 'Modern design', 'Good features']),
        cons: JSON.stringify(['Less spacious', 'Firm ride']),
      },
      {
        brandSlug: 'honda',
        name: 'Honda City 1.2 CVT',
        bodyType: 'Sedan',
        price: 6500000,
        oldPrice: 6200000,
        engine: '1.2L 4-Cylinder',
        transmission: 'Automatic (CVT)',
        fuelType: 'Petrol',
        fuelEconomy: '13-15',
        seats: 5,
        description: 'Honda City offers premium comfort, modern features, and excellent fuel economy.',
        isPopular: true,
        horsepower: 118,
        torque: '145 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Airbags', 'ABS', 'EBD', 'Bluetooth', 'Android Auto', 'Apple CarPlay', 'Keyless Entry']),
        pros: JSON.stringify(['Better fuel economy', 'Modern features', 'Comfortable ride', 'Spacious interior']),
        cons: JSON.stringify(['Lower resale than Corolla', 'Less powerful engine']),
      },
      {
        brandSlug: 'honda',
        name: 'Civic Oriel',
        bodyType: 'Sedan',
        price: 9500000,
        oldPrice: 9200000,
        engine: '1.5L Turbo',
        transmission: 'Automatic (CVT)',
        fuelType: 'Petrol',
        fuelEconomy: '11-13',
        seats: 5,
        description: 'Honda Civic is a premium sedan with sporty performance and modern technology.',
        isPopular: true,
        horsepower: 174,
        torque: '220 Nm',
        features: JSON.stringify(['Leather Seats', 'Sunroof', 'Climate Control', 'Airbags', 'ABS', 'EBD', 'Android Auto', 'Apple CarPlay', 'Push Start', 'Cruise Control']),
        pros: JSON.stringify(['Powerful engine', 'Premium features', 'Sporty design', 'Advanced technology']),
        cons: JSON.stringify(['Expensive', 'Higher maintenance']),
      },
      {
        brandSlug: 'toyota',
        name: 'Yaris 1.3 GLI CVT SE',
        bodyType: 'Sedan',
        price: 5500000,
        oldPrice: 5300000,
        engine: '1.3L 4-Cylinder',
        transmission: 'Automatic (CVT)',
        fuelType: 'Petrol',
        fuelEconomy: '13-15',
        seats: 5,
        description: 'Toyota Yaris is a compact sedan with Toyota reliability and good fuel economy.',
        isPopular: false,
        horsepower: 106,
        torque: '138 Nm',
        features: JSON.stringify(['Air Conditioning', 'Power Windows', 'Airbags', 'ABS', 'EBD', 'Bluetooth']),
        pros: JSON.stringify(['Toyota reliability', 'Good fuel economy', 'Affordable']),
        cons: JSON.stringify(['Basic features', 'Smaller than Corolla']),
      },
      {
        brandSlug: 'changan',
        name: 'Alsvin 1.5 DCT Lumiere',
        bodyType: 'Sedan',
        price: 4500000,
        oldPrice: 4300000,
        engine: '1.5L 4-Cylinder',
        transmission: 'Automatic (DCT)',
        fuelType: 'Petrol',
        fuelEconomy: '13-15',
        seats: 5,
        description: 'Changan Alsvin offers value-packed features and modern design at an affordable price.',
        isPopular: false,
        horsepower: 105,
        torque: '145 Nm',
        features: JSON.stringify(['Climate Control', 'Airbags', 'ABS', 'EBD', 'Bluetooth', 'Android Auto', 'Apple CarPlay', 'Sunroof']),
        pros: JSON.stringify(['Value for money', 'Modern features', 'Good design']),
        cons: JSON.stringify(['New brand', 'Lower resale']),
      },
    ];

    for (const vehicleData of vehicles) {
      const brand = brandMap[vehicleData.brandSlug];
      if (!brand) continue;
      
      const slug = vehicleData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      
      const existing = await prisma.vehicle.findFirst({
        where: { brandId: brand.id, name: vehicleData.name },
      });
      
      if (existing) {
        console.log('⏭️ Vehicle exists:', vehicleData.name);
      } else {
        const { brandSlug, ...data } = vehicleData;
        await prisma.vehicle.create({
          data: {
            ...data,
            brandId: brand.id,
            slug,
            averageRating: 0,
            totalReviews: 0,
          },
        });
        console.log('✅ Created vehicle:', vehicleData.name);
      }
    }

    console.log('');
    console.log('=== RESTORATION COMPLETE ===');
    
    // Verify
    const totalVehicles = await prisma.vehicle.count();
    const totalBrands = await prisma.brand.count();
    console.log('Total brands:', totalBrands);
    console.log('Total vehicles:', totalVehicles);
    
    await prisma.$disconnect();

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

restoreData();
