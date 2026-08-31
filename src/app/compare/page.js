import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareSelector from '@/components/comparison/CompareSelector';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Compare Cars in Pakistan | VehicleChacha',
  description: 'Compare new cars in Pakistan side by side. Compare prices, specifications, and features.',
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
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export default async function ComparePage() {
  const vehicles = await getVehicles();

  return (
    <>
      <Navbar />
      {/* Added pt-20 md:pt-24 for spacing */}
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Compare <span className="text-chacha-yellow">Cars</span>
            </h1>
            <p className="text-chacha-muted text-lg">
              Select two or more cars to compare specifications, features, and prices
            </p>
          </div>
          <CompareSelector vehicles={vehicles} />
        </div>
      </main>
      <Footer />
    </>
  );
}