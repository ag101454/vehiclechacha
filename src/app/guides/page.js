import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Car, Fuel, Settings, Shield, Wallet, Users, ArrowRight, FileText, Clock } from 'lucide-react';
import { prisma } from '@/lib/db';
import AdsterraBanner from '@/components/ads/AdsterraBanner';

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
          {/* ===== PAGE HEADER ===== */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Buying <span className="text-chacha-yellow">Guides</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Expert advice from Chacha to help you make informed decisions.
            </p>
          </div>

          {/* ===== AD #1: TOP BANNER (728x90 Desktop / 320x50 Mobile) ===== */}
          <div className="my-6">
            <div className="hidden md:flex justify-center">
              <AdsterraBanner 
                adKey="5c9f59c6eac5e2c5c4ccbe2174a355fb" 
                width={728} 
                height={90} 
              />
            </div>
            <div className="flex md:hidden justify-center">
              <AdsterraBanner 
                adKey="4ed29ca6cde7744d7a2a216fd40822ed" 
                width={320} 
                height={50} 
              />
            </div>
          </div>

          {guides.length === 0 ? (
            <div className="card-dark p-12 text-center">
              <FileText className="mx-auto text-chacha-muted mb-3" size={48} />
              <h3 className="text-white font-semibold text-lg mb-1">No Guides Yet</h3>
              <p className="text-chacha-muted text-sm">Chacha is working on writing guides. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* ===== GUIDES GRID ===== */}
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

              {/* ===== AD #2: BOTTOM BANNER (300x250 In-Content) ===== */}
              <div className="mt-10 flex justify-center">
                <AdsterraBanner 
                  adKey="cfe66b1f02490f8cc5d105764bf19fbf" 
                  width={300} 
                  height={250} 
                />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}