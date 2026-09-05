import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Calendar, FileText, Clock, Tag, Share2, 
  Bookmark, MessageCircle, Eye, ChevronRight, Sparkles,
  User, ThumbsUp
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
    console.error('Error fetching guide:', error);
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

function getReadingTime(content) {
  if (!content) return '5 min read';
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function getCategoryColor(category) {
  const colors = {
    'Buying Guide': 'bg-chacha-yellow/10 text-chacha-yellow border-chacha-yellow/30',
    'Comparison': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    'Fuel Guide': 'bg-green-500/10 text-green-500 border-green-500/30',
    'Driving Guide': 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    'Financial Guide': 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    'Family Guide': 'bg-pink-500/10 text-pink-500 border-pink-500/30',
    'Maintenance': 'bg-red-500/10 text-red-500 border-red-500/30',
  };
  return colors[category] || 'bg-chacha-yellow/10 text-chacha-yellow border-chacha-yellow/30';
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
            <p className="text-chacha-muted mb-8">This guide doesn&apos;t exist or has been removed.</p>
            <Link href="/guides" className="btn-primary inline-flex items-center gap-2">
              Browse All Guides
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherGuides = await getOtherGuides(guide.id);
  const readingTime = getReadingTime(guide.content);
  const categoryColor = getCategoryColor(guide.category);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-28 pb-12">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-chacha-yellow/10 via-transparent to-chacha-yellow/10 border-b border-chacha-border/30">
          <div className="container-custom max-w-4xl py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-chacha-muted mb-6">
              <Link href="/" className="hover:text-chacha-yellow transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/guides" className="hover:text-chacha-yellow transition-colors">Guides</Link>
              <ChevronRight size={14} />
              <span className="text-white truncate max-w-[200px]">{guide.title}</span>
            </nav>

            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColor}`}>
                {guide.category || 'Guide'}
              </span>
              <span className="text-chacha-muted text-xs flex items-center gap-1">
                <Clock size={12} />
                {readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {guide.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-chacha-muted text-sm flex-wrap">
              <span className="flex items-center gap-1">
                <User size={14} className="text-chacha-yellow" />
                <span className="text-chacha-yellow font-medium">Chacha</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(guide.createdAt).toLocaleDateString('en-PK', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                Reading time: {readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="container-custom max-w-4xl py-10">
          {/* Excerpt Highlight */}
          {guide.excerpt && (
            <div className="card-dark p-6 mb-8 border-l-4 border-chacha-yellow relative overflow-hidden">
              <Sparkles className="absolute top-3 right-3 text-chacha-yellow/30" size={24} />
              <p className="text-chacha-muted italic text-lg leading-relaxed">
                {guide.excerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="card-dark p-8 md:p-10 mb-10">
            <div 
              className="guide-content prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: guide.content || '<p>No content available yet.</p>' }}
            />
          </div>

          {/* Author Box */}
          <div className="card-dark p-6 mb-10 flex items-center gap-4">
            <div className="w-16 h-16 bg-chacha-yellow rounded-full flex items-center justify-center text-3xl shrink-0">
              🧔🏽
            </div>
            <div>
              <div className="text-white font-bold text-lg">Written by Chacha</div>
              <p className="text-chacha-muted text-sm">
                Pakistan&apos;s trusted car advisor. Helping you make the right car decision since 2026.
              </p>
            </div>
          </div>

          {/* Other Guides */}
          {otherGuides.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-0.5 bg-chacha-yellow" />
                <h3 className="text-white font-bold text-xl">More Guides</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherGuides.map((other) => (
                  <Link
                    key={other.id}
                    href={`/guides/${other.slug}`}
                    className="card-dark p-5 hover:border-chacha-yellow transition-all group"
                  >
                    <div className="w-10 h-10 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mb-3">
                      <FileText size={20} className="text-chacha-yellow" />
                    </div>
                    <span className="text-chacha-yellow text-xs">{other.category}</span>
                    <div className="text-white font-semibold text-sm mt-1 group-hover:text-chacha-yellow transition-colors line-clamp-2">
                      {other.title}
                    </div>
                    <div className="text-chacha-muted text-xs mt-2">
                      {getReadingTime(other.content)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="card-dark p-8 mt-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Find Your Perfect Car?
              </h3>
              <p className="text-chacha-muted mb-6">
                Let Chacha help you make the right decision
              </p>
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