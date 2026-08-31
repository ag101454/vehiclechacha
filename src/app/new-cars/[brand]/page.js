import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/cars/CarCard';
import Link from 'next/link';
import Image from 'next/image';
import { Car as CarIcon, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug: params.brand },
    });
    return {
      title: brand ? `${brand.name} Cars in Pakistan - Prices & Specs | VehicleChacha` : 'Brand Not Found',
      description: brand ? `Browse all ${brand.name} cars in Pakistan.` : '',
    };
  } catch {
    return { title: 'Brand | VehicleChacha' };
  }
}

async function getBrandWithVehicles(slug) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        vehicles: {
          where: { isAvailable: true },
          include: { brand: true },
          orderBy: { price: 'asc' },
        },
      },
    });
    return brand;
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null;
  }
}

async function getOtherBrands(currentBrandSlug) {
  try {
    const brands = await prisma.brand.findMany({
      where: { slug: { not: currentBrandSlug } },
      include: {
        _count: { select: { vehicles: true } },
      },
      take: 5,
    });
    return brands;
  } catch {
    return [];
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
};

export default async function BrandPage({ params }) {
  const brand = await getBrandWithVehicles(params.brand);

  if (!brand) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h1 className="text-3xl font-bold text-white mb-4">Brand Not Found</h1>
            <Link href="/new-cars" className="btn-primary">Browse All Cars</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherBrands = await getOtherBrands(brand.slug);
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
              {/* Brand Logo */}
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
                  {brand.vehicles.length} Cars Available
                </span>
                {brand.country && (
                  <span className="text-chacha-muted">| {brand.country}</span>
                )}
              </div>
            </div>
          </div>

          {/* Vehicles Grid */}
          {brand.vehicles.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <CarIcon className="mx-auto text-chacha-muted mb-4" size={64} />
              <h2 className="text-white text-2xl font-bold mb-2">No Cars Available</h2>
              <p className="text-chacha-muted mb-6">{brand.name} cars will be added soon!</p>
              <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
                Browse All Cars <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
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
          )}

          {/* Other Brands */}
          {otherBrands.length > 0 && (
            <div className="mt-12">
              <h3 className="text-white font-bold text-lg mb-4">Other Brands</h3>
              <div className="flex flex-wrap gap-3">
                {otherBrands.map((other) => (
                  <Link
                    key={other.id}
                    href={`/new-cars/${other.slug}`}
                    className="card-dark px-5 py-3 hover:border-chacha-yellow transition-all group flex items-center gap-2"
                  >
                    {brandLogos[other.slug] ? (
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                        <Image
                          src={brandLogos[other.slug]}
                          alt={other.name}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-chacha-yellow/10 rounded-lg flex items-center justify-center">
                        <span className="text-chacha-yellow font-bold text-sm">{other.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-white font-semibold group-hover:text-chacha-yellow transition-colors">
                      {other.name}
                    </span>
                    <span className="text-chacha-muted text-xs">({other._count?.vehicles || 0})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}