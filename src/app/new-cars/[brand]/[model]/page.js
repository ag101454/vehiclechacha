import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Fuel, Users, Settings, CheckCircle, XCircle,
  ArrowRight, Car as CarIcon, ThumbsUp, ThumbsDown, Star,
  Shield, Sparkles
} from 'lucide-react';
import { prisma } from '@/lib/db';
import CarGallery from '@/components/cars/CarGallery';
import ReviewSection from '@/components/reviews/ReviewSection';
import FeatureDisplay from '@/components/cars/FeatureDisplay';
import VehicleSchema from '@/components/seo/VehicleSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  return {
    title: `${params.model} Price in Pakistan | Specs & Features | VehicleChacha`,
    description: `Check ${params.model} price, specifications, features, reviews, and ratings.`,
  };
}

async function getVehicle(brandSlug, modelSlug) {
  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        slug: modelSlug,
        brand: { slug: brandSlug },
      },
      include: {
        brand: true,
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!vehicle) return null;

    let imagesArray = [];
    try { imagesArray = JSON.parse(vehicle.images || '[]'); } catch { imagesArray = vehicle.image ? [vehicle.image] : []; }
    if (imagesArray.length === 0 && vehicle.image) imagesArray = [vehicle.image];

    let featuresArray = [];
    try { featuresArray = JSON.parse(vehicle.features || '[]'); } catch { featuresArray = []; }

    let prosArray = [];
    try { prosArray = JSON.parse(vehicle.pros || '[]'); } catch { prosArray = []; }

    let consArray = [];
    try { consArray = JSON.parse(vehicle.cons || '[]'); } catch { consArray = []; }

    return {
      ...vehicle,
      images: imagesArray,
      features: featuresArray,
      pros: prosArray,
      cons: consArray,
      averageRating: vehicle.averageRating || 0,
      totalReviews: vehicle.totalReviews || 0,
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function formatPrice(price) {
  if (!price) return 'Price not available';
  if (price >= 10000000) return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default async function CarDetailPage({ params }) {
  const vehicle = await getVehicle(params.brand, params.model);

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Car Not Found</h1>
            <Link href="/new-cars" className="btn-primary">Browse All Cars</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <VehicleSchema vehicle={vehicle} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'New Cars', url: '/new-cars' },
        { name: vehicle.brand.name, url: `/new-cars/${vehicle.brand.slug}` },
        { name: vehicle.name, url: `/new-cars/${vehicle.brand.slug}/${vehicle.slug}` },
      ]} />

      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
            <Link href="/" className="hover:text-chacha-yellow">Home</Link>
            <span>/</span>
            <Link href="/new-cars" className="hover:text-chacha-yellow">New Cars</Link>
            <span>/</span>
            <Link href={`/new-cars/${vehicle.brand.slug}`} className="hover:text-chacha-yellow">
              {vehicle.brand.name}
            </Link>
            <span>/</span>
            <span className="text-white">{vehicle.name}</span>
          </nav>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CarGallery images={vehicle.images} carName={`${vehicle.brand.name} ${vehicle.name}`} />

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-chacha-yellow/10 text-chacha-yellow text-xs px-3 py-1 rounded-full">{vehicle.bodyType}</span>
                  {vehicle.isPopular && <span className="bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full">Popular</span>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {vehicle.brand.name} {vehicle.name}
                </h1>
                
                {/* Rating Display */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.round(vehicle.averageRating) ? 'fill-chacha-yellow text-chacha-yellow' : 'text-chacha-border'} />
                    ))}
                  </div>
                  <span className="text-chacha-yellow font-bold">{vehicle.averageRating.toFixed(1)}</span>
                  <span className="text-chacha-muted text-sm">({vehicle.totalReviews} reviews)</span>
                </div>
              </div>

              <div className="card-dark p-6">
                <div className="text-chacha-muted text-sm mb-1">Starting Price</div>
                <div className="text-3xl font-bold text-chacha-yellow">{formatPrice(vehicle.price)}</div>
                {vehicle.oldPrice && vehicle.oldPrice !== vehicle.price && (
                  <div className="text-chacha-muted text-sm line-through mt-1">{formatPrice(vehicle.oldPrice)}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {vehicle.engine && <div className="card-dark p-4"><div className="text-chacha-muted text-xs">Engine</div><div className="text-white font-semibold">{vehicle.engine}</div></div>}
                {vehicle.transmission && <div className="card-dark p-4"><div className="text-chacha-muted text-xs">Transmission</div><div className="text-white font-semibold">{vehicle.transmission}</div></div>}
                {vehicle.fuelType && <div className="card-dark p-4"><div className="text-chacha-muted text-xs">Fuel</div><div className="text-white font-semibold">{vehicle.fuelType}</div></div>}
                {vehicle.seats && <div className="card-dark p-4"><div className="text-chacha-muted text-xs">Seats</div><div className="text-white font-semibold">{vehicle.seats}</div></div>}
              </div>
            </div>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="card-dark p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-chacha-muted leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {/* Features Section */}
          {vehicle.features.length > 0 && (
            <div className="card-dark p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-chacha-yellow" size={24} />
                Key Features
                <span className="text-chacha-yellow text-sm font-normal">
                  ({vehicle.features.length})
                </span>
              </h2>
              <FeatureDisplay features={vehicle.features} />
            </div>
          )}

          {/* Pros and Cons */}
          {(vehicle.pros.length > 0 || vehicle.cons.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {vehicle.pros.length > 0 && (
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ThumbsUp className="text-green-500" size={24} /> Pros</h2>
                  <ul className="space-y-2">
                    {vehicle.pros.map((pro, i) => (
                      <li key={i} className="text-chacha-muted flex items-start gap-2"><CheckCircle className="text-green-500 mt-1" size={16} /> {pro}</li>
                    ))}
                  </ul>
                </div>
              )}
              {vehicle.cons.length > 0 && (
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ThumbsDown className="text-red-500" size={24} /> Cons</h2>
                  <ul className="space-y-2">
                    {vehicle.cons.map((con, i) => (
                      <li key={i} className="text-chacha-muted flex items-start gap-2"><XCircle className="text-red-500 mt-1" size={16} /> {con}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Specifications */}
          {(vehicle.length || vehicle.width || vehicle.height || vehicle.groundClearance || 
            vehicle.bootSpace || vehicle.fuelTankCapacity || vehicle.kerbWeight || vehicle.wheelbase) && (
            <div className="card-dark p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="text-chacha-yellow" size={24} />
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vehicle.length && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Length</div><div className="text-white font-semibold text-sm">{vehicle.length}</div></div>}
                {vehicle.width && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Width</div><div className="text-white font-semibold text-sm">{vehicle.width}</div></div>}
                {vehicle.height && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Height</div><div className="text-white font-semibold text-sm">{vehicle.height}</div></div>}
                {vehicle.wheelbase && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Wheelbase</div><div className="text-white font-semibold text-sm">{vehicle.wheelbase}</div></div>}
                {vehicle.groundClearance && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Ground Clearance</div><div className="text-white font-semibold text-sm">{vehicle.groundClearance}</div></div>}
                {vehicle.bootSpace && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Boot Space</div><div className="text-white font-semibold text-sm">{vehicle.bootSpace}</div></div>}
                {vehicle.fuelTankCapacity && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Fuel Tank</div><div className="text-white font-semibold text-sm">{vehicle.fuelTankCapacity}</div></div>}
                {vehicle.kerbWeight && <div className="bg-chacha-black rounded-lg p-3"><div className="text-chacha-muted text-xs">Kerb Weight</div><div className="text-white font-semibold text-sm">{vehicle.kerbWeight}</div></div>}
              </div>
            </div>
          )}

          {/* REVIEWS SECTION */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              User Reviews
            </h2>
            <ReviewSection vehicleId={vehicle.id} vehicleName={`${vehicle.brand.name} ${vehicle.name}`} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}