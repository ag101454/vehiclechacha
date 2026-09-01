const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanupBrands() {
  try {
    console.log('=== CLEANING UP BRANDS ===');
    
    // Get all brands
    const brands = await prisma.brand.findMany({ include: { vehicles: true } });
    console.log('Current brands:');
    brands.forEach(b => console.log(' -', JSON.stringify(b.name), '(slug:', b.slug + ')', '-', b.vehicles.length, 'vehicles'));
    
    // Find and merge duplicates
    const brandGroups = {};
    brands.forEach(b => {
      const normalizedName = b.name.trim().toLowerCase();
      if (brandGroups[normalizedName] === undefined) {
        brandGroups[normalizedName] = [];
      }
      brandGroups[normalizedName].push(b);
    });
    
    for (const [name, brandList] of Object.entries(brandGroups)) {
      if (brandList.length > 1) {
        console.log('Merging', brandList.length, 'duplicates for:', name);
        const primary = brandList[0];
        for (let i = 1; i < brandList.length; i++) {
          const duplicate = brandList[i];
          await prisma.vehicle.updateMany({
            where: { brandId: duplicate.id },
            data: { brandId: primary.id },
          });
          await prisma.brand.delete({ where: { id: duplicate.id } });
          console.log('  Merged:', JSON.stringify(duplicate.name), 'into', JSON.stringify(primary.name));
        }
      }
    }
    
    // Delete empty brands
    const allBrands = await prisma.brand.findMany({ include: { vehicles: true } });
    for (const brand of allBrands) {
      if (brand.vehicles.length === 0) {
        await prisma.brand.delete({ where: { id: brand.id } });
        console.log('  Deleted empty brand:', JSON.stringify(brand.name));
      }
    }
    
    // Show final state
    const finalBrands = await prisma.brand.findMany({ include: { vehicles: true } });
    console.log('');
    console.log('=== FINAL BRANDS ===');
    finalBrands.forEach(b => {
      console.log(JSON.stringify(b.name), '(slug:', b.slug + ')', '-', b.vehicles.length, 'vehicles');
      b.vehicles.forEach(v => console.log('   -', v.name));
    });
    
    console.log('');
    console.log('✅ Cleanup completed!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupBrands();
