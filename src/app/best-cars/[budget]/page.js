import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import Link from 'next/link';
import { Car as CarIcon, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const budgetRanges = {
  'under-20-lakh': { min: 0, max: 2000000, label: 'Under 20 Lakh', emoji: '💰' },
  'under-30-lakh': { min: 0, max: 3000000, label: 'Under 30 Lakh', emoji: '💵' },
  'under-40-lakh': { min: 0, max: 4000000, label: 'Under 40 Lakh', emoji: '💎' },
  'under-50-lakh': { min: 0, max: 5000000, label: 'Under 50 Lakh', emoji: '🚗' },
  'under-60-lakh': { min: 0, max: 6000000, label: 'Under 60 Lakh', emoji: '🏎️' },
  'under-70-lakh': { min: 0, max: 7000000, label: 'Under 70 Lakh', emoji: '🌟' },
  '70-lakh-plus': { min: 7000000, max: 100000000, label: '70 Lakh+', emoji: '👑' },
};

export async function generateMetadata({ params }) {
  const budget = budgetRanges[params.budget];
  return {
    title: budget ? `Best Cars ${budget.label} in Pakistan | VehicleChacha` : 'Budget | VehicleChacha',
    description: budget ? `Compare the best cars ${budget.label} in Pakistan.` : '',
  };
}

async function getBudgetCars(minPrice, maxPrice) {
  try {
    const cars = await prisma.vehicle.findMany({
      where: {
        isAvailable: true,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      include: {
        brand: true,
      },
      orderBy: [
        { averageRating: 'desc' },
        { price: 'asc' },
      ],
    });

    return cars.map(v => ({
      id: v.id,
      name: v.name,
      brand: v.brand.name,
      brandSlug: v.brand.slug,
      slug: v.slug,
      price: v.price,
      bodyType: v.bodyType,
      fuelType: v.fuelType,
      transmission: v.transmission,
      seats: v.seats,
      image: v.image,
      isPopular: v.isPopular,
      averageRating: v.averageRating || 0,
      totalReviews: v.totalReviews || 0,
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
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Budget Not Found</h1>
            <Link href="/new-cars" className="btn-primary">Browse All Cars</Link>
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
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
            <Link href="/" className="hover:text-chacha-yellow">Home</Link>
            <span>/</span>
            <Link href="/new-cars" className="hover:text-chacha-yellow">New Cars</Link>
            <span>/</span>
            <span className="text-white">{budgetRange.label}</span>
          </nav>

          {/* Header */}
          <div className="card-dark p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 to-transparent" />
            <div className="relative z-10">
              <div className="text-5xl mb-3">{budgetRange.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Best Cars <span className="text-chacha-yellow">{budgetRange.label}</span>
              </h1>
              <p className="text-chacha-muted text-lg max-w-2xl mx-auto">
                {cars.length} cars found in this budget range
              </p>
            </div>
          </div>

          {/* Cars Grid */}
          {cars.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
              <h2 className="text-white text-2xl font-bold mb-2">No Cars in This Range</h2>
              <p className="text-chacha-muted mb-6">
                Chacha is working on adding cars in this budget.
              </p>
              <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
                Browse All Cars <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          {/* Other Budget Ranges */}
          <div className="mt-12">
            <h3 className="text-white font-bold text-lg mb-4">Other Budget Ranges</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(budgetRanges)
                .filter(([slug]) => slug !== params.budget)
                .map(([slug, range]) => (
                  <Link
                    key={slug}
                    href={`/best-cars/${slug}`}
                    className="card-dark px-5 py-3 hover:border-chacha-yellow transition-all group"
                  >
                    <span className="text-white font-semibold group-hover:text-chacha-yellow transition-colors">
                      {range.emoji} {range.label}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}