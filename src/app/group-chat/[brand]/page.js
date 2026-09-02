import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { MessageCircle, Users, ArrowRight, Car, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getBrandCars(slug) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        vehicles: {
          where: { isAvailable: true },
          include: { brand: true },
          orderBy: { name: 'asc' },
        },
      },
    });
    return brand;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.brand} Group Chats - Select Your Car | VehicleChacha`,
    description: `Join ${params.brand} group chats. Select your car and start discussing with other owners.`,
  };
}

export default async function BrandChatPage({ params }) {
  const brand = await getBrandCars(params.brand);

  if (!brand || brand.vehicles.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Cars Available</h1>
            <Link href="/group-chat" className="btn-primary">Back to Brands</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
            <Link href="/" className="hover:text-chacha-yellow">Home</Link>
            <span>/</span>
            <Link href="/group-chat" className="hover:text-green-500">Group Chat</Link>
            <span>/</span>
            <span className="text-white">{brand.name}</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              {brand.name} <span className="text-green-500">Group Chats</span>
            </h1>
            <p className="text-chacha-muted text-lg">
              Select your car to join its group chat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brand.vehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/group-chat/${brand.slug}/${vehicle.slug}`}
                className="card-dark overflow-hidden hover:border-green-500 transition-all group"
              >
                <div className="relative aspect-video bg-chacha-black">
                  {vehicle.image ? (
                    <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car size={40} className="text-chacha-muted" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Users size={10} />
                    Active Chat
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-white font-bold text-lg group-hover:text-green-500 transition-colors">
                    {vehicle.name}
                  </h2>
                  <p className="text-chacha-muted text-sm mb-2">{vehicle.bodyType}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-chacha-yellow text-chacha-yellow" />
                      <span className="text-chacha-yellow text-sm">{vehicle.averageRating.toFixed(1)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-green-500 text-sm font-medium">
                      Join Chat
                      <MessageCircle size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}