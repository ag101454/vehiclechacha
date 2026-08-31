import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Car Prices in Pakistan - Updated Price List | VehicleChacha',
  description: 'Check latest car prices in Pakistan. Updated price list for Toyota, Honda, Suzuki, Kia, Hyundai and more.',
};

async function getAllVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isAvailable: true },
      include: { brand: true },
      orderBy: [
        { brand: { name: 'asc' } },
        { price: 'asc' },
      ],
    });

    const grouped = {};
    vehicles.forEach(vehicle => {
      const brandName = vehicle.brand.name;
      if (!grouped[brandName]) {
        grouped[brandName] = [];
      }
      grouped[brandName].push(vehicle);
    });

    return grouped;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return {};
  }
}

function formatPrice(price) {
  if (!price) return 'N/A';
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default async function CarPricesPage() {
  const groupedVehicles = await getAllVehicles();
  const brands = Object.keys(groupedVehicles);

  return (
    <>
      <Navbar />
      {/* Added pt-20 md:pt-24 for spacing */}
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Prices in <span className="text-chacha-yellow">Pakistan</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Latest prices for all new cars in Pakistan. Updated regularly to 
              reflect current market prices.
            </p>
          </div>

          {brands.length === 0 ? (
            <div className="card-dark p-16 text-center">
              <h2 className="text-white text-2xl font-bold mb-2">No Cars Available</h2>
              <p className="text-chacha-muted">Check back soon for updated prices.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {brands.map(brandName => (
                <div key={brandName} className="card-dark p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-chacha-yellow">{brandName}</span>
                    <span className="text-chacha-muted text-sm font-normal">
                      ({groupedVehicles[brandName].length} cars)
                    </span>
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-chacha-border">
                          <th className="text-left p-3 text-chacha-muted font-medium">Model</th>
                          <th className="text-left p-3 text-chacha-muted font-medium">Body Type</th>
                          <th className="text-left p-3 text-chacha-muted font-medium">Engine</th>
                          <th className="text-left p-3 text-chacha-muted font-medium">Transmission</th>
                          <th className="text-right p-3 text-chacha-muted font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedVehicles[brandName].map(vehicle => (
                          <tr key={vehicle.id} className="border-b border-chacha-border last:border-0 hover:bg-chacha-black/50 transition-colors">
                            <td className="p-3">
                              <Link
                                href={`/new-cars/${vehicle.brand.slug}/${vehicle.slug}`}
                                className="text-white font-medium hover:text-chacha-yellow transition-colors"
                              >
                                {vehicle.name}
                              </Link>
                            </td>
                            <td className="p-3 text-chacha-muted">{vehicle.bodyType}</td>
                            <td className="p-3 text-chacha-muted">{vehicle.engine || 'N/A'}</td>
                            <td className="p-3 text-chacha-muted">{vehicle.transmission || 'N/A'}</td>
                            <td className="p-3 text-right">
                              <div className="text-chacha-yellow font-semibold">
                                {formatPrice(vehicle.price)}
                              </div>
                              {vehicle.oldPrice && vehicle.oldPrice !== vehicle.price && (
                                <div className="text-chacha-muted text-xs line-through">
                                  {formatPrice(vehicle.oldPrice)}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}