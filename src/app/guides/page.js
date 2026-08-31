import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Car, Fuel, Settings, Shield, Wallet, Users, ArrowRight, FileText, Clock } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Car Buying Guides Pakistan | VehicleChacha',
  description: 'Expert guides to help you choose the right car in Pakistan.',
};

async function getGuides() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return guides;
  } catch (error) {
    console.error('Error fetching guides:', error);
    return [];
  }
}

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Buying <span className="text-chacha-yellow">Guides</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Expert advice from Chacha to help you make informed decisions.
            </p>
          </div>

          {guides.length === 0 ? (
            <div className="card-dark p-12 text-center">
              <FileText className="mx-auto text-chacha-muted mb-3" size={48} />
              <h3 className="text-white font-semibold text-lg mb-1">No Guides Yet</h3>
              <p className="text-chacha-muted text-sm">Chacha is working on writing guides. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="card-dark p-6 hover:border-chacha-yellow transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="text-chacha-yellow" size={28} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-chacha-yellow text-xs">{guide.category}</span>
                  </div>
                  <h2 className="text-white font-bold text-xl mb-2 group-hover:text-chacha-yellow transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-chacha-muted text-sm mb-4">{guide.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-chacha-yellow text-sm font-medium">
                    Read Guide
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}