import { NextResponse } from 'next/server';

export const revalidate = 21600; // Cache for 6 hours

export async function GET() {
  try {
    const response = await fetch('https://fuel.trackmate.page/api/prices', {
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch fuel prices');
    }

    const data = await response.json();

    // Extract the essential prices we want to display
    const prices = data.prices || [];

    // Find petrol price (from pso or pakwheels)
    const petrol = prices.find(p => p.product === 'petrol' && p.source === 'pso')
      || prices.find(p => p.product === 'petrol');

    // Find diesel (HSD) price
    const diesel = prices.find(p => p.product === 'hsd' && p.source === 'pso')
      || prices.find(p => p.product === 'hsd');

    // Find high-octane (octane_plus)
    const octane = prices.find(p => p.product === 'octane_plus' && p.city === null)
      || prices.find(p => p.product === 'octane_plus');

    // Find kerosene
    const kerosene = prices.find(p => p.product === 'kerosene');

    // Find LPG
    const lpg = prices.find(p => p.product === 'lpg' && p.unit === 'kg')
      || prices.find(p => p.product === 'lpg');

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
      scraped_at: prices[0]?.scraped_at || null,
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Fuel prices error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fuel prices' },
      { status: 500 }
    );
  }
}