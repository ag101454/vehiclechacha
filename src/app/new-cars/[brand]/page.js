import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import Link from 'next/link';
import Image from 'next/image';
import { Car as CarIcon, ArrowRight, Star } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
    try {
      const brand = await prisma.brand.findUnique({
        where: { slug: params.brand },
      });
      
      if (!brand) {
        return { title: 'Brand Not Found | VehicleChacha' };
      }
  
      const brandDescriptions = {
        'toyota': 'Reliable and high resale value cars',
        'honda': 'Performance and comfort focused cars',
        'suzuki': 'Affordable and fuel-efficient cars',
        'kia': 'Modern and feature-packed cars',
        'hyundai': 'Innovative and stylish cars',
        'mg': 'British heritage modern cars',
        'changan': 'Value-packed Chinese cars',
        'deepal': 'Electric and future-ready cars',
        'jaecoo': 'Luxury Chinese SUVs with premium features',
      };
      return {
        title: `${brand.name} Cars in Pakistan - Prices & Specs | VehicleChacha`,
        description: `Browse all ${brand.name} cars in Pakistan. ${brandDescriptions[brand.slug] || 'Compare prices, specifications, features, and reviews.'}`,
      };
    } catch {
      return { title: 'Brand | VehicleChacha' };
    }
  }

async function getBrandWithAllVehicles(slug) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        vehicles: {
          where: { isAvailable: true },
          include: { brand: true },
          orderBy: [
            { averageRating: 'desc' },
            { totalReviews: 'desc' },
            { price: 'asc' },
          ],
          // NO take/limit - gets ALL vehicles
        },
      },
    });
    return brand;
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null;
  }
}

const brandLogos = {
    'toyota': '/images/brands/toyota.png',
    'honda': '/images/brands/honda.png',
    'suzuki': '/images/brands/suzuki.png',
    'kia': '/images/brands/kia.png',
    'hyundai': '/images/brands/hyundai.png',
    'mg': '/images/brands/mg.png',
    'changan': '/images/brands/changan.png',
    'deepal': '/images/brands/deepal.png',  // ADD
    'jaecoo': '/images/brands/jaecoo.png',  // ADD
  };

export default async function BrandPage({ params }) {
  const brand = await getBrandWithAllVehicles(params.brand);

  if (!brand) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Brand Not Found</h1>
            <Link href="/new-cars" className="btn-primary">Browse All Cars</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const brandLogo = brandLogos[brand.slug] || null;

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
            <span className="text-white">{brand.name}</span>
          </nav>

          {/* Brand Header */}
          <div className="card-dark p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 to-transparent" />
            <div className="relative z-10">
              {/* Logo */}
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-3">
                {brandLogo ? (
                  <Image
                    src={brandLogo}
                    alt={`${brand.name} Logo`}
                    width={70}
                    height={70}
                    className="object-contain"
                    priority
                  />
                ) : (
                  <span className="text-4xl font-bold text-chacha-black">
                    {brand.name.charAt(0)}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {brand.name} <span className="text-chacha-yellow">Cars</span>
              </h1>
              {brand.description && (
                <p className="text-chacha-muted text-lg max-w-2xl mx-auto mb-3">
                  {brand.description}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-chacha-yellow font-semibold">
                  {brand.vehicles.length} {brand.vehicles.length === 1 ? 'Car' : 'Cars'} Available
                </span>
                {brand.country && (
                  <span className="text-chacha-muted">| {brand.country}</span>
                )}
              </div>
            </div>
          </div>

          {/* ALL Vehicles Grid - No limit */}
          {brand.vehicles.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
              <h2 className="text-white text-2xl font-bold mb-2">No Cars Available</h2>
              <p className="text-chacha-muted mb-6">
                {brand.name} cars will be added soon!
              </p>
              <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
                Browse All Cars <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-chacha-muted text-sm">
                  Showing all <span className="text-chacha-yellow font-semibold">{brand.vehicles.length}</span> {brand.name} cars
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {brand.vehicles.map((vehicle) => (
                  <CarCard
                    key={vehicle.id}
                    car={{
                      id: vehicle.id,
                      name: vehicle.name,
                      brand: brand.name,
                      brandSlug: brand.slug,
                      slug: vehicle.slug,
                      price: vehicle.price,
                      bodyType: vehicle.bodyType,
                      fuelType: vehicle.fuelType,
                      transmission: vehicle.transmission,
                      seats: vehicle.seats,
                      image: vehicle.image,
                      isPopular: vehicle.isPopular,
                      averageRating: vehicle.averageRating || 0,
                      totalReviews: vehicle.totalReviews || 0,
                    }}
                  />
                ))}
              </div>
            </>
          )}

            <div className="card-dark p-6 mt-10">
            <h2 className="text-white font-bold text-xl mb-3">About {brand.name} Cars</h2>
            <p className="text-chacha-muted text-sm leading-relaxed">
                {brand.name} is one of Pakistan's most popular car brands. 
                {brand.vehicles.length} {brand.name} {brand.vehicles.length === 1 ? 'car is' : 'cars are'} currently available 
                on VehicleChacha. Browse through {brand.name} cars, compare prices, 
                read user reviews, and find the perfect {brand.name} for your budget.
            </p>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}