import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Users, Settings, ArrowRight, Car as CarIcon } from 'lucide-react';
import { prisma } from '@/lib/db';

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
    return null;
  }

  return (
    <section className="py-16">
      <div className="container-custom">
      <div className="mb-12">
  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-0.5 bg-chacha-yellow" />
    <span className="text-chacha-yellow text-sm font-semibold tracking-wider uppercase">
      Top Picks
    </span>
  </div>
  <div className="flex items-end justify-between">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Popular New Cars
      </h2>
      <p className="text-chacha-muted mt-2 text-lg">
        Most searched cars in Pakistan
      </p>
    </div>
    <Link
      href="/new-cars"
      className="hidden md:inline-flex items-center gap-2 text-chacha-yellow hover:text-yellow-400 font-medium transition-colors group"
    >
      View All Cars
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
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