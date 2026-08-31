import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import NewCarsFilters from '@/components/cars/NewCarsFilters';
import { prisma } from '@/lib/db';
import { Car as CarIcon, Star } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'New Cars in Pakistan - Prices & Specifications | VehicleChacha',
  description: 'Browse all new cars in Pakistan. Compare prices, specifications, and features.',
};

async function getVehicles(searchParams) {
  try {
    const where = { isAvailable: true };
    
    if (searchParams?.bodyType) {
      where.bodyType = searchParams.bodyType;
    }
    if (searchParams?.minPrice || searchParams?.maxPrice) {
      where.price = {};
      if (searchParams.minPrice) where.price.gte = parseFloat(searchParams.minPrice);
      if (searchParams.maxPrice) where.price.lte = parseFloat(searchParams.maxPrice);
    }
    if (searchParams?.fuelType) {
      where.fuelType = searchParams.fuelType;
    }
    if (searchParams?.transmission) {
      where.transmission = searchParams.transmission;
    }
    if (searchParams?.minRating) {
      where.averageRating = { gte: parseFloat(searchParams.minRating) };
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      include: { brand: true },
      orderBy: { price: 'asc' },
    });

    return vehicles.map(v => ({
      id: v.id,
      name: v.name,
      brand: v.brand.name,
      brandSlug: v.brand.slug,
      price: v.price,
      bodyType: v.bodyType,
      fuelType: v.fuelType,
      transmission: v.transmission,
      seats: v.seats,
      image: v.image,
      isPopular: v.isPopular,
      slug: v.slug,
      averageRating: v.averageRating || 0,
      totalReviews: v.totalReviews || 0,
    }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export default async function NewCarsPage({ searchParams }) {
  const cars = await getVehicles(searchParams);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              New Cars in <span className="text-chacha-yellow">Pakistan</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Explore all new cars available in Pakistan. Compare prices, 
              specifications, and features to find the perfect car for you.
            </p>
          </div>

          <NewCarsFilters />

          {cars.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
              <h2 className="text-white text-2xl font-bold mb-2">
                No Cars Found
              </h2>
              <p className="text-chacha-muted mb-6">
                Try adjusting your filters or check back soon.
              </p>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-chacha-muted text-sm">
                  Showing <span className="text-chacha-yellow font-semibold">{cars.length}</span> cars
                  {searchParams?.minRating && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      with <Star size={14} className="fill-chacha-yellow text-chacha-yellow" />
                      <span className="text-chacha-yellow">{searchParams.minRating}+ rating</span>
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}