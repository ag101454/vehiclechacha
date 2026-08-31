import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Fuel, 
  Users, 
  Settings, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Car as CarIcon,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { prisma } from '@/lib/db';
import CarGallery from '@/components/cars/CarGallery';
import ReviewSection from '@/components/reviews/ReviewSection';

export async function generateMetadata({ params }) {
  const { brand, model } = params;
  
  return {
    title: `${model} Price in Pakistan | Specs & Features | VehicleChacha`,
    description: `Check ${model} price in Pakistan, specifications, features, and Chacha's recommendation.`,
  };
}

async function getVehicle(brandSlug, modelSlug) {
    try {
      const vehicle = await prisma.vehicle.findFirst({
        where: {
          slug: modelSlug,
          brand: {
            slug: brandSlug,
          },
        },
        include: {
          brand: true,
        },
      });
  
      if (!vehicle) return null;
  
      // Parse images array
      let imagesArray = [];
      try {
        imagesArray = JSON.parse(vehicle.images || '[]');
      } catch {
        imagesArray = vehicle.image ? [vehicle.image] : [];
      }
  
      return {
        ...vehicle,
        images: imagesArray,
        features: JSON.parse(vehicle.features || '[]'),
        pros: JSON.parse(vehicle.pros || '[]'),
        cons: JSON.parse(vehicle.cons || '[]'),
      };
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      return null;
    }
  }

async function getSimilarVehicles(currentVehicle) {
  try {
    const similar = await prisma.vehicle.findMany({
      where: {
        id: { not: currentVehicle.id },
        bodyType: currentVehicle.bodyType,
        isAvailable: true,
      },
      include: {
        brand: true,
      },
      take: 3,
    });

    return similar;
  } catch (error) {
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

export default async function CarDetailPage({ params }) {
  const { brand, model } = params;
  
  const vehicle = await getVehicle(brand, model);
  
  if (!vehicle) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-20">
          <div className="container-custom text-center">
            <div className="text-6xl mb-4">���</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Car Not Found
            </h1>
            <p className="text-chacha-muted mb-8">
              Oho! Gaari wrong turn le gayi. This car doesn't exist or has been removed.
            </p>
            <Link href="/new-cars" className="btn-primary inline-flex items-center gap-2">
              Browse All Cars
              <ArrowRight size={20} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const similarVehicles = await getSimilarVehicles(vehicle);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
            <Link href="/" className="hover:text-chacha-yellow transition-colors">Home</Link>
            <span>/</span>
            <Link href="/new-cars" className="hover:text-chacha-yellow transition-colors">New Cars</Link>
            <span>/</span>
            <Link href={`/new-cars/${brand}`} className="hover:text-chacha-yellow transition-colors">
              {vehicle.brand.name}
            </Link>
            <span>/</span>
            <span className="text-white">{vehicle.name}</span>
          </nav>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <div>
              <CarGallery 
                images={vehicle.images} 
                carName={`${vehicle.brand.name} ${vehicle.name}`} 
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-chacha-yellow/10 text-chacha-yellow text-xs px-3 py-1 rounded-full">
                    {vehicle.bodyType}
                  </span>
                  {vehicle.isPopular && (
                    <span className="bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {vehicle.brand.name} {vehicle.name}
                </h1>
                <p className="text-chacha-muted mt-2">
                  Last updated: {new Date(vehicle.updatedAt).toLocaleDateString('en-PK', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="card-dark p-6">
                <div className="text-chacha-muted text-sm mb-1">Starting Price</div>
                <div className="text-3xl font-bold text-chacha-yellow">
                  {formatPrice(vehicle.price)}
                </div>
                {vehicle.oldPrice && (
                  <div className="text-chacha-muted text-sm line-through mt-1">
                    {formatPrice(vehicle.oldPrice)}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {vehicle.engine && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Engine</div>
                    <div className="text-white font-semibold">{vehicle.engine}</div>
                  </div>
                )}
                {vehicle.transmission && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Transmission</div>
                    <div className="text-white font-semibold">{vehicle.transmission}</div>
                  </div>
                )}
                {vehicle.fuelType && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Fuel Type</div>
                    <div className="text-white font-semibold">{vehicle.fuelType}</div>
                  </div>
                )}
                {vehicle.fuelEconomy && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Fuel Economy</div>
                    <div className="text-white font-semibold">{vehicle.fuelEconomy} km/l</div>
                  </div>
                )}
                {vehicle.seats && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Seating</div>
                    <div className="text-white font-semibold">{vehicle.seats} Seats</div>
                  </div>
                )}
                {vehicle.horsepower && (
                  <div className="card-dark p-4">
                    <div className="text-chacha-muted text-xs mb-1">Horsepower</div>
                    <div className="text-white font-semibold">{vehicle.horsepower} HP</div>
                  </div>
                )}
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

          {/* Features */}
          {vehicle.features.length > 0 && (
            <div className="card-dark p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-chacha-muted">
                    <CheckCircle className="text-green-500 shrink-0" size={18} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          {(vehicle.pros.length > 0 || vehicle.cons.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {vehicle.pros.length > 0 && (
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ThumbsUp className="text-green-500" size={24} />
                    Pros
                  </h2>
                  <ul className="space-y-2">
                    {vehicle.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-chacha-muted">
                        <CheckCircle className="text-green-500 shrink-0 mt-1" size={16} />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {vehicle.cons.length > 0 && (
                <div className="card-dark p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ThumbsDown className="text-red-500" size={24} />
                    Cons
                  </h2>
                  <ul className="space-y-2">
                    {vehicle.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-chacha-muted">
                        <XCircle className="text-red-500 shrink-0 mt-1" size={16} />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Similar Cars */}
          {similarVehicles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Similar Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarVehicles.map((car) => (
                  <Link
                    key={car.id}
                    href={`/new-cars/${car.brand.slug}/${car.slug}`}
                    className="card-dark p-4 hover:border-chacha-yellow transition-colors"
                  >
                    <h3 className="text-white font-semibold mb-1">{car.name}</h3>
                    <p className="text-chacha-muted text-sm mb-2">{car.brand.name}</p>
                    <div className="text-chacha-yellow font-semibold">{formatPrice(car.price)}</div>
                  </Link>
                ))}
              </div>
              <ReviewSection vehicleId={vehicle.id} vehicleName={`${vehicle.brand.name} ${vehicle.name}`} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
