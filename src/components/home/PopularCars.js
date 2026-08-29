import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Users, Settings, ArrowRight, Car as CarIcon } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getPopularCars() {
  try {
    const cars = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        isPopular: true,
      },
      include: {
        brand: true,
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    console.log('Popular cars found:', cars.length);
    return cars;
  } catch (error) {
    console.error('Error fetching popular cars:', error);
    return [];
  }
}

function formatPrice(price) {
  if (!price) return 'Price not available';
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default async function PopularCars() {
  const cars = await getPopularCars();

  if (cars.length === 0) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Popular New Cars
            </h2>
            <p className="text-chacha-muted">No popular cars yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Popular New Cars
            </h2>
            <p className="text-chacha-muted mt-2">
              Most searched cars in Pakistan
            </p>
          </div>
          <Link
            href="/new-cars"
            className="text-chacha-yellow hover:text-yellow-400 font-medium inline-flex items-center gap-1"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/new-cars/${car.brand.slug}/${car.slug}`}
              className="card-dark hover:border-chacha-yellow transition-all duration-300 group overflow-hidden block hover:shadow-2xl hover:shadow-chacha-yellow/10 hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] bg-chacha-black overflow-hidden">
                {car.image ? (
                  <Image
                    src={car.image}
                    alt={`${car.brand.name} ${car.name} - ${car.bodyType}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CarIcon size={48} className="text-chacha-muted group-hover:text-chacha-yellow transition-colors" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <span className="inline-block bg-chacha-yellow/10 text-chacha-yellow text-xs px-2 py-1 rounded mb-2">
                  {car.bodyType}
                </span>

                <h3 className="text-white font-semibold text-lg group-hover:text-chacha-yellow transition-colors">
                  {car.name}
                </h3>
                <p className="text-chacha-muted text-sm mb-3">{car.brand.name}</p>

                <div className="text-chacha-yellow font-bold text-xl mb-3">
                  {formatPrice(car.price)}
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-chacha-muted border-t border-chacha-border pt-3">
                  {car.fuelType && (
                    <div className="flex items-center gap-1">
                      <Fuel size={14} />
                      <span className="text-xs">{car.fuelType}</span>
                    </div>
                  )}
                  {car.seats && (
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span className="text-xs">{car.seats} Seats</span>
                    </div>
                  )}
                  {car.transmission && (
                    <div className="flex items-center gap-1">
                      <Settings size={14} />
                      <span className="text-xs">{car.transmission}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}