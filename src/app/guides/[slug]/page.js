import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, FileText, Clock, Eye, ChevronRight, Sparkles,
  User, Star, TrendingUp, Flame, Award, MessageCircle, 
  ThumbsUp, Share2, ArrowUp, Zap, Crown, Target
} from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug },
    });
    return {
      title: guide ? `${guide.title} | VehicleChacha Guide` : 'Guide Not Found',
      description: guide?.excerpt || 'Car buying guide from VehicleChacha',
      openGraph: {
        title: guide?.title,
        description: guide?.excerpt,
        type: 'article',
      },
    };
  } catch {
    return { title: 'Guide | VehicleChacha' };
  }
}

async function getGuide(slug) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { slug },
    });
    return guide;
  } catch (error) {
    return null;
  }
}

async function getOtherGuides(currentGuideId) {
  try {
    const guides = await prisma.guide.findMany({
      where: { id: { not: currentGuideId } },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    return guides;
  } catch {
    return [];
  }
}

async function getPopularCars() {
  try {
    const cars = await prisma.vehicle.findMany({
      where: { isAvailable: true, isPopular: true },
      include: { brand: true },
      take: 3,
    });
    return cars;
  } catch {
    return [];
  }
}

function getReadingTime(content) {
  if (!content) return '5 min read';
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export default async function GuideDetailPage({ params }) {
  let guide = null;
  
  try {
    guide = await getGuide(params.slug);
  } catch (error) {
    console.error('Error:', error);
  }

  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-12">
          <div className="container-custom text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-3xl font-bold text-white mb-4">Guide Not Found</h1>
            <Link href="/guides" className="btn-primary">Browse All Guides</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherGuides = await getOtherGuides(guide.id);
  const popularCars = await getPopularCars();
  const readingTime = getReadingTime(guide.content);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-28 pb-12">
        {/* HERO BANNER - FULL WIDTH */}
        <div className="relative overflow-hidden border-b border-chacha-border/30">
          <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/15 via-chacha-yellow/5 to-chacha-yellow/15" />
          
          {/* Floating Decorative Elements */}
          <div
            className="absolute top-10 left-10 text-4xl opacity-20"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🚗
          </div>
          <div
            className="absolute bottom-10 right-10 text-4xl opacity-20"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            🏎️
          </div>
          <div
            className="absolute top-1/2 right-20 text-3xl opacity-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ⭐
          </div>

          <div className="container-custom max-w-5xl py-14 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
              <Link href="/" className="hover:text-chacha-yellow transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/guides" className="hover:text-chacha-yellow transition-colors">Guides</Link>
              <ChevronRight size={14} />
              <span className="text-white">{guide.title.substring(0, 50)}...</span>
            </nav>

            {/* Badges */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-chacha-yellow text-chacha-black shadow-lg shadow-chacha-yellow/30">
                {guide.category || 'Guide'}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs bg-green-500/10 text-green-500 border border-green-500/30 font-medium">
                FREE GUIDE
              </span>
              <span className="text-chacha-muted text-xs flex items-center gap-1">
                <Clock size={14} />
                {readingTime}
              </span>
            </div>

            {/* Title - LARGE */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.1]">
              {guide.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-5 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-chacha-yellow rounded-full flex items-center justify-center text-xl shadow-lg shadow-chacha-yellow/30">
                  🧔🏽
                </div>
                <div>
                  <div className="text-chacha-yellow font-bold">Chacha</div>
                  <div className="text-chacha-muted text-xs">Car Advisor</div>
                </div>
              </div>
              <div className="w-px h-8 bg-chacha-border" />
              <span className="text-chacha-muted flex items-center gap-1">
                <Calendar size={14} />
                {new Date(guide.createdAt).toLocaleDateString('en-PK', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
              <div className="w-px h-8 bg-chacha-border" />
              <span className="text-chacha-muted flex items-center gap-1">
                <Eye size={14} />
                {readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - LARGER AREA */}
        <div className="container-custom max-w-4xl py-12">
          {/* Excerpt Highlight */}
          {guide.excerpt && (
            <div className="card-dark p-8 mb-8 border-l-4 border-chacha-yellow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-chacha-yellow/5 rounded-full blur-2xl" />
              <Sparkles className="absolute top-4 right-4 text-chacha-yellow/40" size={28} />
              <p className="text-chacha-muted italic text-xl leading-relaxed relative z-10">
                {guide.excerpt}
              </p>
            </div>
          )}

          {/* Main Content - BIGGER FONT */}
          <div className="card-dark p-8 md:p-12 mb-10">
            <div 
              className="guide-content guide-content-large prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: guide.content || '<p>No content available yet.</p>' }}
            />
          </div>

          {/* Author Box */}
          <div className="card-dark p-8 mb-8 flex items-center gap-6 border border-chacha-yellow/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-chacha-yellow to-transparent" />
            <div className="w-20 h-20 bg-chacha-yellow rounded-full flex items-center justify-center text-4xl shrink-0 shadow-xl shadow-chacha-yellow/30">
              🧔🏽
            </div>
            <div>
              <div className="text-white font-bold text-xl">Written by Chacha</div>
              <p className="text-chacha-muted text-sm mt-1">
                Pakistan&apos;s trusted car advisor. Helping you make the right car decision.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/30 hover:bg-blue-500/20 transition-colors font-medium">
              <ThumbsUp size={18} />
              Helpful
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20 transition-colors font-medium">
              <Share2 size={18} />
              Share
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-chacha-yellow/10 text-chacha-yellow border border-chacha-yellow/30 hover:bg-chacha-yellow/20 transition-colors font-medium">
              <Bookmark size={18} />
              Save
            </button>
          </div>

          {/* Other Guides - FULL WIDTH CARDS */}
          {otherGuides.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Flame size={24} className="text-orange-500" />
                <h3 className="text-white font-bold text-2xl">More Guides</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherGuides.map((other) => (
                  <Link
                    key={other.id}
                    href={`/guides/${other.slug}`}
                    className="card-dark p-6 hover:border-chacha-yellow transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-chacha-yellow/5 rounded-full blur-xl group-hover:bg-chacha-yellow/10 transition-colors" />
                    <div className="w-12 h-12 bg-chacha-yellow/10 rounded-xl flex items-center justify-center mb-4">
                      <FileText size={22} className="text-chacha-yellow" />
                    </div>
                    <span className="text-chacha-yellow text-xs font-bold">{other.category}</span>
                    <div className="text-white font-bold mt-2 group-hover:text-chacha-yellow transition-colors line-clamp-2">
                      {other.title}
                    </div>
                    <div className="text-chacha-muted text-xs mt-3 flex items-center gap-1">
                      <Clock size={12} />
                      {getReadingTime(other.content)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Popular Cars Strip */}
          {popularCars.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Star size={24} className="text-chacha-yellow" />
                <h3 className="text-white font-bold text-2xl">Popular Cars Mentioned</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularCars.map((car) => (
                  <Link
                    key={car.id}
                    href={`/new-cars/${car.brand.slug}/${car.slug}`}
                    className="card-dark p-4 flex items-center gap-3 hover:border-chacha-yellow transition-all group"
                  >
                    <div className="w-12 h-12 bg-chacha-yellow/10 rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-xl">🚗</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm group-hover:text-chacha-yellow transition-colors">
                        {car.brand.name} {car.name}
                      </div>
                      <div className="text-chacha-muted text-xs">
                        Rs. {(car.price / 100000).toFixed(1)} Lakh
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className="card-dark p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 via-transparent to-green-500/10" />
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-chacha-yellow" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🧔🏽</div>
              <h3 className="text-3xl font-black text-white mb-3">
                Ready to Find Your{' '}
                <span className="text-chacha-yellow">Perfect Car?</span>
              </h3>
              <p className="text-chacha-muted mb-8 max-w-md mx-auto">
                Let Chacha guide you to the right decision with personalized recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/find-my-car" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full shadow-lg shadow-chacha-yellow/30 hover:shadow-chacha-yellow/50 hover:scale-105 transition-all">
                  <Sparkles size={20} />
                  Find My Car
                </Link>
                <Link href="/chacha-ka-mashwara" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all shadow-lg shadow-green-500/30">
                  <Crown size={20} />
                  Free Mashwara
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}