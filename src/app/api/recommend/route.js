import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getRecommendations } from '@/lib/recommendation/engine';

export async function POST(request) {
  try {
    const userPreferences = await request.json();
    console.log('User preferences:', JSON.stringify(userPreferences, null, 2));

    // Fetch ALL vehicles
    const vehicles = await prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { brand: true },
    });

    if (vehicles.length === 0) {
      return NextResponse.json({ success: false, message: 'No cars available' });
    }

    // Parse features for each vehicle
    let filteredVehicles = vehicles.map(v => ({
      ...v,
      features: JSON.parse(v.features || '[]'),
      pros: JSON.parse(v.pros || '[]'),
      cons: JSON.parse(v.cons || '[]'),
      images: JSON.parse(v.images || '[]'),
    }));

    console.log('Total vehicles before filter:', filteredVehicles.length);

    // Apply filters based on user preferences
    if (userPreferences.bodyType && userPreferences.bodyType !== 'no-preference') {
      const before = filteredVehicles.length;
      filteredVehicles = filteredVehicles.filter(v => 
        v.bodyType?.toLowerCase() === userPreferences.bodyType.toLowerCase()
      );
      console.log(`Body type filter (${userPreferences.bodyType}): ${before} → ${filteredVehicles.length}`);
    }

    if (userPreferences.fuel && userPreferences.fuel !== 'no-preference') {
      const before = filteredVehicles.length;
      filteredVehicles = filteredVehicles.filter(v => 
        v.fuelType?.toLowerCase() === userPreferences.fuel.toLowerCase()
      );
      console.log(`Fuel filter (${userPreferences.fuel}): ${before} → ${filteredVehicles.length}`);
    }

    if (userPreferences.transmission && userPreferences.transmission !== 'no-preference') {
      const before = filteredVehicles.length;
      filteredVehicles = filteredVehicles.filter(v => 
        v.transmission?.toLowerCase() === userPreferences.transmission.toLowerCase()
      );
      console.log(`Transmission filter (${userPreferences.transmission}): ${before} → ${filteredVehicles.length}`);
    }

    if (userPreferences.budget) {
      const { min, max } = userPreferences.budget;
      const before = filteredVehicles.length;
      filteredVehicles = filteredVehicles.filter(v => 
        v.price >= min && v.price <= max
      );
      console.log(`Budget filter (${min}-${max}): ${before} → ${filteredVehicles.length}`);
    }

    // If too few results, relax body type first
    if (filteredVehicles.length < 2 && userPreferences.bodyType && userPreferences.bodyType !== 'no-preference') {
      console.log('Relaxing body type filter...');
      filteredVehicles = vehicles.map(v => ({
        ...v,
        features: JSON.parse(v.features || '[]'),
        pros: JSON.parse(v.pros || '[]'),
        cons: JSON.parse(v.cons || '[]'),
        images: JSON.parse(v.images || '[]'),
      }));
      
      // Re-apply other filters except body type
      if (userPreferences.fuel && userPreferences.fuel !== 'no-preference') {
        filteredVehicles = filteredVehicles.filter(v => 
          v.fuelType?.toLowerCase() === userPreferences.fuel.toLowerCase()
        );
      }
      if (userPreferences.budget) {
        filteredVehicles = filteredVehicles.filter(v => 
          v.price >= userPreferences.budget.min && v.price <= userPreferences.budget.max
        );
      }
      console.log('After relaxing body type:', filteredVehicles.length);
    }

    // If still too few, relax budget
    if (filteredVehicles.length < 2 && userPreferences.budget) {
      console.log('Relaxing budget filter...');
      filteredVehicles = vehicles.map(v => ({
        ...v,
        features: JSON.parse(v.features || '[]'),
        pros: JSON.parse(v.pros || '[]'),
        cons: JSON.parse(v.cons || '[]'),
        images: JSON.parse(v.images || '[]'),
      }));
      console.log('After relaxing all filters:', filteredVehicles.length);
    }

    // Get recommendations
    const recommendations = getRecommendations(filteredVehicles, userPreferences);

    console.log('Top recommendations:', {
      best: recommendations.bestOverall?.name,
      score: recommendations.bestOverall?.chachaMatch,
      alt: recommendations.bestAlternative?.name,
      altScore: recommendations.bestAlternative?.chachaMatch,
    });

    return NextResponse.json({
      success: true,
      recommendations,
      totalCarsAnalyzed: filteredVehicles.length,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}