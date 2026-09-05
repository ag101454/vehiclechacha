import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Calendar, FileText, Clock, Tag, Share2, 
  Bookmark, MessageCircle, Eye, ChevronRight, Sparkles,
  User, ThumbsUp, Star, TrendingUp, Flame, Award
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
        {/* HERO BANNER */}
        <div className="relative overflow-hidden border-b border-chacha-border/30">
          <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 via-transparent to-chacha-yellow/10" />
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-chacha-yellow/40" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-chacha-yellow/40" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-chacha-yellow/40" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-chacha-yellow/40" />
          
          <div className="container-custom max-w-4xl py-12 relative z-10">
            <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
              <Link href="/" className="hover:text-chacha-yellow transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/guides" className="hover:text-chacha-yellow transition-colors">Guides</Link>
              <ChevronRight size={14} />
              <span className="text-white truncate max-w-[200px]">{guide.title}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-chacha-yellow/10 text-chacha-yellow border border-chacha-yellow/30">
                {guide.category || 'Guide'}
              </span>
              <span className="text-chacha-muted text-xs flex items-center gap-1">
                <Clock size={12} />
                {readingTime}
              </span>
              <span className="text-chacha-muted text-xs flex items-center gap-1">
                <Eye size={12} />
                Free Guide
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {guide.title}
            </h1>

            <div className="flex items-center gap-4 text-chacha-muted text-sm flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-6 h-6 bg-chacha-yellow rounded-full flex items-center justify-center text-xs">
                  🧔🏽
                </div>
                <span className="text-chacha-yellow font-medium">Chacha</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(guide.createdAt).toLocaleDateString('en-PK', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT WITH SIDE RAILS */}
        <div className="container-custom max-w-6xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT SIDEBAR - Quick Stats & Navigation */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                {/* Quick Stats Card */}
                <div className="card-dark p-4 border border-chacha-yellow/20">
                  <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp size={14} className="text-chacha-yellow" />
                    Quick Info
                  </h4>
                  <div className="space-y-2 text-xs text-chacha-muted">
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span className="text-chacha-yellow">{guide.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reading Time</span>
                      <span className="text-chacha-yellow">{readingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Author</span>
                      <span className="text-chacha-yellow">Chacha</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-green-500">FREE</span>
                    </div>
                  </div>
                </div>

                {/* Popular Cars Card */}
                {popularCars.length > 0 && (
                  <div className="card-dark p-4 border border-chacha-yellow/20">
                    <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Star size={14} className="text-chacha-yellow" />
                      Popular Cars
                    </h4>
                    <div className="space-y-3">
                      {popularCars.map((car) => (
                        <Link
                          key={car.id}
                          href={`/new-cars/${car.brand.slug}/${car.slug}`}
                          className="flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 bg-chacha-yellow/10 rounded-lg flex items-center justify-center shrink-0">
                            <FileText size={14} className="text-chacha-yellow" />
                          </div>
                          <div>
                            <div className="text-white text-xs font-medium group-hover:text-chacha-yellow transition-colors truncate">
                              {car.brand.name} {car.name}
                            </div>
                            <div className="text-chacha-muted text-[10px]">
                              Rs. {(car.price / 100000).toFixed(1)} Lakh
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Card */}
                <div className="card-dark p-4 bg-gradient-to-br from-chacha-yellow/10 to-transparent border border-chacha-yellow/30">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🧔🏽</div>
                    <h4 className="text-white font-bold text-sm mb-2">Need Personal Help?</h4>
                    <p className="text-chacha-muted text-xs mb-3">Chacha Ka Mashwara - FREE!</p>
                    <Link
                      href="/chacha-ka-mashwara"
                      className="inline-flex items-center justify-center gap-1 bg-chacha-yellow text-chacha-black text-xs font-bold px-4 py-2 rounded-full hover:bg-yellow-400 transition-colors w-full"
                    >
                      Get Free Advice
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-6">
              {/* Excerpt */}
              {guide.excerpt && (
                <div className="card-dark p-6 mb-6 border-l-4 border-chacha-yellow relative overflow-hidden">
                  <Sparkles className="absolute top-3 right-3 text-chacha-yellow/30" size={24} />
                  <p className="text-chacha-muted italic text-lg leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
              )}

              {/* Main Content */}
              <div className="card-dark p-6 md:p-8 mb-6">
                <div 
                  className="guide-content prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: guide.content || '<p>No content available yet.</p>' }}
                />
              </div>

              {/* Author Box */}
              <div className="card-dark p-6 mb-6 flex items-center gap-4 border border-chacha-yellow/20">
                <div className="w-14 h-14 bg-chacha-yellow rounded-full flex items-center justify-center text-2xl shrink-0">
                  🧔🏽
                </div>
                <div>
                  <div className="text-white font-bold">Written by Chacha</div>
                  <p className="text-chacha-muted text-xs">
                    Pakistan&apos;s trusted car advisor since 2026
                  </p>
                </div>
              </div>

              {/* Share Section */}
              <div className="card-dark p-4 flex items-center justify-center gap-3 border border-chacha-yellow/20">
                <span className="text-chacha-muted text-xs">Share this guide:</span>
                <button className="p-2 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors">
                  <ThumbsUp size={14} />
                </button>
                <button className="p-2 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
            </div>

            {/* RIGHT SIDEBAR - More Guides & CTA */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                {/* More Guides */}
                {otherGuides.length > 0 && (
                  <div className="card-dark p-4 border border-chacha-yellow/20">
                    <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Flame size={14} className="text-orange-500" />
                      More Guides
                    </h4>
                    <div className="space-y-3">
                      {otherGuides.map((other) => (
                        <Link
                          key={other.id}
                          href={`/guides/${other.slug}`}
                          className="block group"
                        >
                          <div className="text-white text-xs font-medium group-hover:text-chacha-yellow transition-colors line-clamp-2">
                            {other.title}
                          </div>
                          <div className="text-chacha-muted text-[10px] mt-1">
                            {other.category} • {getReadingTime(other.content)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Group Chat CTA */}
                <div className="card-dark p-4 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30">
                  <div className="text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="text-white font-bold text-sm mb-2">Join the Discussion</h4>
                    <p className="text-chacha-muted text-xs mb-3">Ask questions in group chat</p>
                    <Link
                      href="/group-chat"
                      className="inline-flex items-center justify-center gap-1 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-600 transition-colors w-full"
                    >
                      <MessageCircle size={12} />
                      Join Chat
                    </Link>
                  </div>
                </div>

                {/* Award Badge */}
                <div className="card-dark p-4 text-center border border-chacha-yellow/30">
                  <Award className="mx-auto text-chacha-yellow mb-2" size={24} />
                  <div className="text-white font-bold text-xs">Trusted Guide</div>
                  <div className="text-chacha-muted text-[10px] mt-1">Verified by VehicleChacha</div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="container-custom max-w-4xl mt-10">
          <div className="card-dark p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Find Your Perfect Car?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/find-my-car" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 font-bold">
                  <Sparkles size={18} />
                  Find My Car
                </Link>
                <Link href="/group-chat" className="inline-flex items-center justify-center gap-2 px-8 py-3 font-bold rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                  <MessageCircle size={18} />
                  Join Group Chat
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