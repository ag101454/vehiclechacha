import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareSelector from '@/components/comparison/CompareSelector';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArrowRight, Scale, Car } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Compare Cars in Pakistan - Side by Side Comparison | VehicleChacha',
  description: 'Compare new cars in Pakistan side by side. Compare prices, specs, features, fuel economy, and reviews of Toyota, Honda, Suzuki, Kia, Hyundai and more.',
};

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { brand: true },
      orderBy: { brand: { name: 'asc' } },
    });
    return vehicles;
  } catch (error) {
    return [];
  }
}

async function getPopularComparisons() {
  try {
    const cars = await prisma.vehicle.findMany({
      where: { isAvailable: true, isPopular: true },
      include: { brand: true },
      take: 4,
    });
    return cars;
  } catch {
    return [];
  }
}

export default async function ComparePage() {
  const vehicles = await getVehicles();
  const popularCars = await getPopularComparisons();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare <span className="text-chacha-yellow">Cars</span> in Pakistan
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl mx-auto">
              Select two or more cars to compare prices, specifications, features, 
              fuel economy, and user reviews side by side.
            </p>
          </div>

          <CompareSelector vehicles={vehicles} />

          {/* Popular Comparisons Links */}
          {popularCars.length >= 2 && (
            <div className="mt-10">
              <h2 className="text-white font-bold text-xl mb-4">Popular Comparisons</h2>
              <div className="flex flex-wrap gap-3">
                {popularCars.slice(0, 3).map((car1, i) => (
                  popularCars.slice(i + 1, i + 2).map((car2) => (
                    <Link
                      key={`${car1.id}-${car2.id}`}
                      href={`/compare/${car1.slug}-vs-${car2.slug}`}
                      className="card-dark px-5 py-3 hover:border-chacha-yellow transition-all group flex items-center gap-2"
                    >
                      <Scale size={16} className="text-chacha-yellow" />
                      <span className="text-white group-hover:text-chacha-yellow transition-colors">
                        {car1.brand.name} {car1.name} vs {car2.brand.name} {car2.name}
                      </span>
                      <ArrowRight size={14} className="text-chacha-muted" />
                    </Link>
                  ))
                ))}
              </div>
            </div>
          )}

          {/* SEO Content */}
          <div className="card-dark p-6 mt-10">
            <h2 className="text-white font-bold text-xl mb-3">How to Compare Cars</h2>
            <div className="text-chacha-muted text-sm space-y-2">
              <p>
                Comparing cars in Pakistan involves checking multiple factors including 
                price, fuel economy, features, safety ratings, and resale value. Our 
                comparison tool helps you evaluate these factors side by side.
              </p>
              <p>
                Start by selecting cars from the list above. You can compare up to 3 cars 
                at a time. Focus on your priorities - whether it's budget, fuel efficiency, 
                or family space.
              </p>
              <p>
                Don't forget to check user reviews and ratings. Real owner experiences 
                provide valuable insights that specifications alone can't tell you.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}