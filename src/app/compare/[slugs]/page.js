import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ComparisonTable from '@/components/comparison/ComparisonTable';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const slugs = params.slugs.split('-vs-');
  const names = slugs.map(s => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  
  return {
    title: `${names.join(' vs ')} - Comparison | VehicleChacha`,
    description: `Compare ${names.join(' vs ')} - prices, specifications, features, and more.`,
  };
}

async function getComparisonVehicles(slugs) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        slug: { in: slugs },
      },
      include: { brand: true },
    });

    // Sort vehicles according to slug order
    const vehicleMap = {};
    vehicles.forEach(v => {
      vehicleMap[v.slug] = v;
    });

    return slugs.map(slug => vehicleMap[slug]).filter(Boolean);
  } catch (error) {
    console.error('Error fetching comparison vehicles:', error);
    return [];
  }
}

export default async function ComparisonPage({ params }) {
  const slugs = params.slugs.split('-vs-');
  
  if (slugs.length < 2) {
    notFound();
  }

  const vehicles = await getComparisonVehicles(slugs);

  if (vehicles.length < 2) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {vehicles.map(v => `${v.brand.name} ${v.name}`).join(' vs ')}
            </h1>
            <p className="text-chacha-muted text-lg">
              Detailed comparison of specifications, features, and prices
            </p>
          </div>
          <ComparisonTable vehicles={vehicles} />
        </div>
      </main>
      <Footer />
    </>
  );
}