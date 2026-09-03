import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { MessageCircle, Users, ArrowRight, Car } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vehicle Group Chat - Join Car Discussion | VehicleChacha',
  description: 'Join group chats for different car brands in Pakistan. Discuss cars, ask questions, and get advice from Chacha.',
};

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

async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        vehicles: { where: { isAvailable: true } },
        _count: { select: { vehicles: true } },
      },
      orderBy: { name: 'asc' },
    });
    return brands.filter(b => b.vehicles.length > 0);
  } catch {
    return [];
  }
}

export default async function GroupChatPage() {
  const brands = await getBrands();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2 mb-3">
              <MessageCircle size={16} className="text-green-500" />
              <span className="text-green-500 font-bold text-sm">LIVE DISCUSSION</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vehicle <span className="text-chacha-yellow">Group Chat</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl mx-auto">
              Select a brand to join group discussions about specific cars. 
              Ask questions, share experiences, and get advice from Chacha!
            </p>
          </div>

          {/* Brand Grid */}
          {brands.length === 0 ? (
            <div className="card-dark p-12 text-center">
              <Car className="mx-auto text-chacha-muted mb-3" size={48} />
              <h3 className="text-white font-semibold text-lg mb-1">No Brands Available</h3>
              <p className="text-chacha-muted text-sm">Add vehicles first to start group chats</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/group-chat/${brand.slug}`}
                  className="card-dark p-6 hover:border-green-500 transition-all group text-center relative overflow-hidden"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Brand Logo */}
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-3">
                      {brandLogos[brand.slug] ? (
                        <Image
                          src={brandLogos[brand.slug]}
                          alt={`${brand.name} Logo`}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-chacha-black">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Chat Icon Overlay */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle size={14} className="text-white" />
                    </div>

                    <h2 className="text-white font-bold text-xl mb-1 group-hover:text-green-500 transition-colors">
                      {brand.name}
                    </h2>
                    <p className="text-chacha-muted text-sm mb-3">
                      {brand.vehicles.length} {brand.vehicles.length === 1 ? 'car' : 'cars'} available
                    </p>
                    <span className="inline-flex items-center gap-1 text-green-500 text-sm font-medium">
                      Select Cars
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className="card-dark p-6 mt-10">
            <h2 className="text-white font-bold text-lg mb-3">How Group Chat Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-chacha-muted">
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">1.</span>
                Select your car brand from above
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">2.</span>
                Choose your specific car model
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 font-bold">3.</span>
                Join the chat and start discussing!
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}