import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import { prisma } from '@/lib/db';
import { Car as CarIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const budgetLabel = params.budget.replace(/-/g, ' ');
  return {
    title: `Best Cars ${budgetLabel} in Pakistan | VehicleChacha`,
    description: `Compare the best cars ${budgetLabel} in Pakistan. Prices, specifications, features, and Chacha's recommendations.`,
  };
}

const budgetRanges = {
  'under-20-lakh': { min: 0, max: 2000000, label: 'Under 20 Lakh' },
  'under-30-lakh': { min: 0, max: 3000000, label: 'Under 30 Lakh' },
  'under-40-lakh': { min: 0, max: 4000000, label: 'Under 40 Lakh' },
  'under-50-lakh': { min: 0, max: 5000000, label: 'Under 50 Lakh' },
  'under-60-lakh': { min: 0, max: 6000000, label: 'Under 60 Lakh' },
  'under-70-lakh': { min: 0, max: 7000000, label: 'Under 70 Lakh' },
  '70-lakh-plus': { min: 7000000, max: 50000000, label: '70 Lakh+' },
};

async function getBudgetCars(minPrice, maxPrice) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
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
    }));
  } catch (error) {
    console.error('Error fetching budget cars:', error);
    return [];
  }
}

export default async function BudgetPage({ params }) {
  const budgetRange = budgetRanges[params.budget];
  
  if (!budgetRange) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Budget Not Found</h1>
            <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
              Browse All Cars
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cars = await getBudgetCars(budgetRange.min, budgetRange.max);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-4 py-2 mb-4">
              <span className="text-chacha-yellow text-sm font-medium">Budget Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Best Cars <span className="text-chacha-yellow">{budgetRange.label}</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Compare the best new cars {budgetRange.label.toLowerCase()} in Pakistan. 
              Chacha has evaluated prices, features, fuel economy, and resale value 
              to help you make the right choice.
            </p>
          </div>

          {/* Cars Grid */}
          {cars.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
              <h2 className="text-white text-2xl font-bold mb-2">
                No Cars in This Range Yet
              </h2>
              <p className="text-chacha-muted mb-6">
                Chacha is working on adding more cars. Check back soon!
              </p>
              <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
                Browse All Cars
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* SEO Content */}
              <div className="card-dark p-8 mt-12">
                <h2 className="text-2xl font-bold text-white mb-4">
                  How to Choose a Car {budgetRange.label}
                </h2>
                <div className="space-y-4 text-chacha-muted leading-relaxed">
                  <p>
                    When shopping for a car {budgetRange.label.toLowerCase()}, consider 
                    your monthly fuel costs, maintenance expenses, and insurance. A car 
                    that fits your budget initially might cost more in the long run if 
                    it has poor fuel economy or expensive parts.
                  </p>
                  <p>
                    Chacha recommends focusing on reliable brands with good resale value 
                    in this price range. Toyota, Honda, and Suzuki typically offer the 
                    best combination of reliability and resale value in Pakistan.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}