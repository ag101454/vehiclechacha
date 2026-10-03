import { NextResponse } from 'next/server';

// ===== HOURLY REFRESH =====
export const revalidate = 3600; // Cache for 1 hour (3600 seconds)

export async function GET() {
  try {
    const response = await fetch('https://fuel.trackmate.page/api/prices', {
      // Revalidate every 1 hour
      next: { revalidate: 3600 },
      // Timeout protection
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const prices = data.prices || [];

    // ===== EXTRACT FUEL PRICES =====

    // Petrol (prefer PSO, fallback to any source)
    const petrol = prices.find(p => p.product === 'petrol' && p.source === 'pso')
      || prices.find(p => p.product === 'petrol');

    // Diesel / HSD
    const diesel = prices.find(p => p.product === 'hsd' && p.source === 'pso')
      || prices.find(p => p.product === 'hsd');

    // High Octane (HOBC) - prefer PSO without city
    const octane = prices.find(p => p.product === 'octane_plus' && p.city === null)
      || prices.find(p => p.product === 'octane_plus');

    // Kerosene
    const kerosene = prices.find(p => p.product === 'kerosene');

    // LPG
    const lpg = prices.find(p => p.product === 'lpg' && p.unit === 'kg')
      || prices.find(p => p.product === 'lpg');

    // Light Speed Diesel
    const lsd = prices.find(p => p.product === 'lsd');

    const result = {
      petrol: petrol ? {
        price: petrol.price_pkr,
        unit: petrol.unit,
        effective_date: petrol.effective_date,
        source: petrol.source,
      } : null,
      diesel: diesel ? {
        price: diesel.price_pkr,
        unit: diesel.unit,
        effective_date: diesel.effective_date,
        source: diesel.source,
      } : null,
      octane: octane ? {
        price: octane.price_pkr,
        unit: octane.unit,
        effective_date: octane.effective_date,
        source: octane.source,
      } : null,
      kerosene: kerosene ? {
        price: kerosene.price_pkr,
        unit: kerosene.unit,
        effective_date: kerosene.effective_date,
        source: kerosene.source,
      } : null,
      lpg: lpg ? {
        price: lpg.price_pkr,
        unit: lpg.unit,
        effective_date: lpg.effective_date,
        source: lpg.source,
      } : null,
      lsd: lsd ? {
        price: lsd.price_pkr,
        unit: lsd.unit,
        effective_date: lsd.effective_date,
        source: lsd.source,
      } : null,
      scraped_at: prices[0]?.scraped_at || null,
      cached_at: new Date().toISOString(),
      cache_duration: '1 hour',
    };

    return NextResponse.json(result, {
      headers: {
        // Cache for 1 hour on CDN
        // Serve stale for up to 2 hours while revalidating
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });

  } catch (error) {
    console.error('Fuel prices error:', error.message);

    // Try to return cached fallback if available
    return NextResponse.json(
      {
        error: 'Failed to fetch fuel prices',
        message: error.message,
        cached_at: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}