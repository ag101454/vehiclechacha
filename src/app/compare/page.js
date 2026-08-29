import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareSelector from '@/components/comparison/CompareSelector';
import { prisma } from '@/lib/db';

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
      <main className="min-h-screen py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
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