import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Users, Settings, ArrowRight, Car as CarIcon, Star, Flame, Award, Crown, TrendingUp } from 'lucide-react';
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
        reviews: {
          where: { isApproved: true },
        },
      },
      take: 5,
      orderBy: [
        { averageRating: 'desc' },
        { totalReviews: 'desc' },
      ],
    });

    return cars.map(car => {
      let avgRating = car.averageRating || 0;
      let totalReviews = car.totalReviews || 0;
      
      if (car.reviews.length > 0 && avgRating === 0) {
        avgRating = car.reviews.reduce((sum, r) => sum + r.rating, 0) / car.reviews.length;
        totalReviews = car.reviews.length;
      }

      return {
        ...car,
        averageRating: avgRating,
        totalReviews: totalReviews,
        isBestRated: avgRating >= 4.0 && totalReviews >= 1,
        isHotSelling: avgRating >= 3.5 && totalReviews >= 1,
      };
    });
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

function renderStars(rating, size = 14) {
  return [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={size}
      className={i < Math.round(rating) ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'}
    />
  ));
}

export default async function PopularCars() {
  const cars = await getPopularCars();

  if (cars.length === 0) {
    return null;
  }

  // First car is the HERO (highest rated)
  const heroCar = cars[0];
  const remainingCars = cars.slice(1, 4);

  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-chacha-yellow" />
              <span className="text-chacha-yellow text-sm font-semibold tracking-wider uppercase">
                Top Picks
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Popular New Cars
            </h2>
          </div>
          <Link href="/new-cars" className="text-chacha-yellow hover:text-yellow-400 font-medium inline-flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* HERO CARD - Biggest, First */}
          <Link
            href={`/new-cars/${heroCar.brand.slug}/${heroCar.slug}`}
            className="lg:col-span-2 relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 card-dark border-2 border-chacha-yellow shadow-2xl shadow-chacha-yellow/20"
          >
            {/* HOT SELLING Ribbon */}
            {heroCar.isBestRated && (
              <div className="bg-gradient-to-r from-chacha-yellow to-yellow-400 text-chacha-black text-sm font-bold px-4 py-2 text-center flex items-center justify-center gap-2 z-20">
                <Crown size={18} className="fill-chacha-black" />
                BEST RATED - HOT SELLING
              </div>
            )}

            {/* Hero Image */}
            <div className="relative aspect-[16/9] bg-chacha-black overflow-hidden">
              {heroCar.image ? (
                <Image
                  src={heroCar.image}
                  alt={`${heroCar.brand.name} ${heroCar.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CarIcon size={80} className="text-chacha-muted" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-chacha-black/90 via-transparent to-transparent" />

              {/* Rating Badge */}
              {heroCar.averageRating > 0 && (
                <div className="absolute top-3 right-3 bg-chacha-yellow rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <Star size={16} className="fill-chacha-black text-chacha-black" />
                  <span className="text-chacha-black font-bold text-sm">{heroCar.averageRating.toFixed(1)}</span>
                </div>
              )}

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-chacha-yellow text-chacha-black text-xs px-2 py-1 rounded font-semibold">
                    {heroCar.bodyType}
                  </span>
                  <span className="bg-chacha-yellow/20 text-chacha-yellow text-xs px-2 py-1 rounded">
                    {heroCar.brand.name}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {heroCar.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(heroCar.averageRating, 16)}
                  </div>
                  <span className="text-chacha-yellow font-bold">{heroCar.averageRating.toFixed(1)}</span>
                  <span className="text-chacha-muted text-sm">({heroCar.totalReviews} reviews)</span>
                </div>
                <div className="text-chacha-yellow font-bold text-2xl">{formatPrice(heroCar.price)}</div>
              </div>
            </div>

            {/* Hero Specs */}
            <div className="p-5 grid grid-cols-3 gap-4 bg-chacha-card">
              {heroCar.fuelType && (
                <div className="flex items-center gap-2 text-chacha-muted">
                  <Fuel size={18} className="text-chacha-yellow" />
                  <div>
                    <div className="text-xs text-chacha-muted">Fuel</div>
                    <div className="text-white text-sm font-medium">{heroCar.fuelType}</div>
                  </div>
                </div>
              )}
              {heroCar.transmission && (
                <div className="flex items-center gap-2 text-chacha-muted">
                  <Settings size={18} className="text-chacha-yellow" />
                  <div>
                    <div className="text-xs text-chacha-muted">Gear</div>
                    <div className="text-white text-sm font-medium">{heroCar.transmission}</div>
                  </div>
                </div>
              )}
              {heroCar.seats && (
                <div className="flex items-center gap-2 text-chacha-muted">
                  <Users size={18} className="text-chacha-yellow" />
                  <div>
                    <div className="text-xs text-chacha-muted">Seats</div>
                    <div className="text-white text-sm font-medium">{heroCar.seats}</div>
                  </div>
                </div>
              )}
            </div>
          </Link>

          {/* Side Cards - Smaller */}
          <div className="space-y-6">
            {remainingCars.map((car) => (
              <Link
                key={car.id}
                href={`/new-cars/${car.brand.slug}/${car.slug}`}
                className={`block overflow-hidden transition-all duration-300 group hover:-translate-y-1 ${
                  car.isBestRated
                    ? 'card-dark border border-chacha-yellow/50 hover:border-chacha-yellow'
                    : car.isHotSelling
                    ? 'card-dark border border-orange-500/40 hover:border-orange-500'
                    : 'card-dark hover:border-chacha-yellow/50'
                }`}
              >
                <div className="flex gap-3 p-3">
                  {/* Small Image */}
                  <div className="relative w-28 h-24 rounded-lg overflow-hidden shrink-0 bg-chacha-black">
                    {car.image ? (
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon size={28} className="text-chacha-muted" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-chacha-yellow text-xs font-semibold">{car.brand.name}</span>
                      {car.isBestRated && (
                        <Flame size={12} className="text-chacha-yellow fill-chacha-yellow" />
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-sm truncate group-hover:text-chacha-yellow transition-colors">
                      {car.name}
                    </h4>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-1 mb-1">
                      {renderStars(car.averageRating, 10)}
                      <span className="text-chacha-yellow text-xs font-semibold">
                        {car.averageRating > 0 ? car.averageRating.toFixed(1) : '-'}
                      </span>
                    </div>
                    
                    <div className="text-chacha-yellow font-bold text-sm">
                      {formatPrice(car.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}