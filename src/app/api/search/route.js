import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ vehicles: [] });
    }

    // Natural language understanding
    const queryLower = query.toLowerCase();
    
    // Extract keywords
    const keywords = {
      budget: null,
      bodyType: null,
      fuelType: null,
      transmission: null,
      brand: null,
    };

    // Detect budget
    if (queryLower.includes('under 20') || queryLower.includes('sasta') || queryLower.includes('cheap')) {
      keywords.budget = { max: 2000000 };
    } else if (queryLower.includes('under 30') || queryLower.includes('20-30')) {
      keywords.budget = { max: 3000000 };
    } else if (queryLower.includes('under 50') || queryLower.includes('50 lakh')) {
      keywords.budget = { max: 5000000 };
    } else if (queryLower.includes('under 70') || queryLower.includes('70 lakh')) {
      keywords.budget = { max: 7000000 };
    }

    // Detect body type
    if (queryLower.includes('suv')) keywords.bodyType = 'SUV';
    else if (queryLower.includes('sedan')) keywords.bodyType = 'Sedan';
    else if (queryLower.includes('hatchback') || queryLower.includes('small')) keywords.bodyType = 'Hatchback';
    else if (queryLower.includes('crossover')) keywords.bodyType = 'Crossover';

    // Detect fuel type
    if (queryLower.includes('hybrid')) keywords.fuelType = 'Hybrid';
    else if (queryLower.includes('electric')) keywords.fuelType = 'Electric';
    else if (queryLower.includes('petrol')) keywords.fuelType = 'Petrol';

    // Detect transmission
    if (queryLower.includes('automatic') || queryLower.includes('auto')) keywords.transmission = 'Automatic';
    else if (queryLower.includes('manual')) keywords.transmission = 'Manual';

    // Detect brand
    const brands = ['toyota', 'honda', 'suzuki', 'kia', 'hyundai'];
    for (const brand of brands) {
      if (queryLower.includes(brand)) {
        keywords.brand = brand;
        break;
      }
    }

    // Build where clause
    const where = { isAvailable: true };
    
    if (keywords.brand) {
      where.brand = { name: { contains: keywords.brand, mode: 'insensitive' } };
    }
    if (keywords.bodyType) {
      where.bodyType = keywords.bodyType;
    }
    if (keywords.fuelType) {
      where.fuelType = keywords.fuelType;
    }
    if (keywords.transmission) {
      where.transmission = keywords.transmission;
    }
    if (keywords.budget) {
      where.price = { lte: keywords.budget.max };
    }

    // If no specific filters, do text search
    if (Object.keys(where).length <= 1) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { name: { contains: query, mode: 'insensitive' } } },
        { bodyType: { contains: query, mode: 'insensitive' } },
      ];
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: { brand: true },
      take: 10,
    });

    // Generate smart response
    let message = '';
    if (vehicles.length > 0) {
      message = `Found ${vehicles.length} cars matching your search`;
    } else {
      message = 'No cars found. Try different search terms.';
    }

    return NextResponse.json({ vehicles, message, keywords });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Search failed', error: error.message },
      { status: 500 }
    );
  }
}