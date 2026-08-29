import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getRecommendations } from '@/lib/recommendation/engine';

export async function POST(request) {
  try {
    const userPreferences = await request.json();
    console.log('User preferences received:', userPreferences);

    // Fetch ALL available vehicles from database
    const vehicles = await prisma.vehicle.findMany({
      where: { 
        isAvailable: true 
      },
      include: { 
        brand: true 
      },
    });

    console.log(`Found ${vehicles.length} vehicles in database`);

    if (vehicles.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'No cars available in database yet' 
        },
        { status: 200 }
      );
    }

    // Parse features for each vehicle
    let filteredVehicles = vehicles.map(v => ({
      ...v,
      features: JSON.parse(v.features || '[]'),
      pros: JSON.parse(v.pros || '[]'),
      cons: JSON.parse(v.cons || '[]'),
      images: JSON.parse(v.images || '[]'),
    }));

    // Filter by body type
    if (userPreferences.bodyType && userPreferences.bodyType !== 'no-preference') {
      filteredVehicles = filteredVehicles.filter(v => 
        v.bodyType?.toLowerCase() === userPreferences.bodyType.toLowerCase()
      );
      console.log(`After body type filter: ${filteredVehicles.length} vehicles`);
    }

    // Filter by fuel type
    if (userPreferences.fuel && userPreferences.fuel !== 'no-preference') {
      filteredVehicles = filteredVehicles.filter(v => 
        v.fuelType?.toLowerCase() === userPreferences.fuel.toLowerCase()
      );
      console.log(`After fuel filter: ${filteredVehicles.length} vehicles`);
    }

    // Filter by transmission
    if (userPreferences.transmission && userPreferences.transmission !== 'no-preference') {
      filteredVehicles = filteredVehicles.filter(v => 
        v.transmission?.toLowerCase() === userPreferences.transmission.toLowerCase()
      );
      console.log(`After transmission filter: ${filteredVehicles.length} vehicles`);
    }

    // Filter by budget
    if (userPreferences.budget) {
      const { min, max } = userPreferences.budget;
      filteredVehicles = filteredVehicles.filter(v => 
        v.price >= min && v.price <= max
      );
      console.log(`After budget filter (${min}-${max}): ${filteredVehicles.length} vehicles`);
    }

    // If too few vehicles after filtering, relax filters
    if (filteredVehicles.length < 2) {
      console.log('Too few vehicles after filtering, relaxing filters...');
      filteredVehicles = vehicles.map(v => ({
        ...v,
        features: JSON.parse(v.features || '[]'),
        pros: JSON.parse(v.pros || '[]'),
        cons: JSON.parse(v.cons || '[]'),
        images: JSON.parse(v.images || '[]'),
      }));
    }

    // Get recommendations using the scoring engine
    const recommendations = getRecommendations(filteredVehicles, userPreferences);

    console.log('Recommendations generated:', {
      bestOverall: recommendations.bestOverall?.name,
      bestOverallScore: recommendations.bestOverall?.chachaMatch,
      bestAlternative: recommendations.bestAlternative?.name,
      bestValue: recommendations.bestValue?.name,
      totalRecommendations: recommendations.allRecommendations?.length,
    });

    return NextResponse.json({
      success: true,
      recommendations,
      totalCarsAnalyzed: filteredVehicles.length,
    });

  } catch (error) {
    console.error('Recommendation error:', error.message);
    console.error('Full error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to generate recommendations: ' + error.message 
      },
      { status: 500 }
    );
  }
}