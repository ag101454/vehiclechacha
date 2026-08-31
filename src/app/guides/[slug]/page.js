import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, FileText, Tag } from 'lucide-react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const guide = await prisma.guide.findUnique({
      where: { slug: params.slug },
    });
    return {
      title: guide ? `${guide.title} | VehicleChacha` : 'Guide Not Found',
      description: guide?.excerpt || 'Car buying guide from VehicleChacha',
    };
  } catch {
    return {
      title: 'Guide | VehicleChacha',
    };
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
      where: {
        id: { not: currentGuideId },
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    return guides;
  } catch {
    return [];
  }
}

export default async function GuideDetailPage({ params }) {
  const guide = await getGuide(params.slug);

  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container-custom text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-3xl font-bold text-white mb-4">Guide Not Found</h1>
            <p className="text-chacha-muted mb-8">
              This guide doesn't exist or has been removed.
            </p>
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24 pb-12">
        <div className="container-custom max-w-4xl">
          {/* Back Link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-chacha-muted hover:text-chacha-yellow transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Guides
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-chacha-yellow/10 text-chacha-yellow text-xs px-3 py-1 rounded-full">
                {guide.category || 'Guide'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {guide.title}
            </h1>
            <div className="flex items-center gap-4 text-chacha-muted text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(guide.createdAt).toLocaleDateString('en-PK', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          {guide.excerpt && (
            <div className="card-dark p-5 mb-6 border-l-4 border-chacha-yellow">
              <p className="text-chacha-muted italic">{guide.excerpt}</p>
            </div>
          )}

          {/* Content */}
          <div className="card-dark p-6 md:p-8 mb-8">
            <div className="text-chacha-muted leading-relaxed whitespace-pre-wrap">
              {guide.content}
            </div>
          </div>

          {/* Other Guides */}
          {otherGuides.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Other Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherGuides.map((other) => (
                  <Link
                    key={other.id}
                    href={`/guides/${other.slug}`}
                    className="card-dark p-4 hover:border-chacha-yellow transition-all group"
                  >
                    <FileText className="text-chacha-yellow mb-2" size={20} />
                    <div className="text-white font-semibold text-sm group-hover:text-chacha-yellow transition-colors">
                      {other.title}
                    </div>
                    <div className="text-chacha-muted text-xs mt-1">{other.category}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="card-dark p-6 mt-8 text-center">
            <h3 className="text-white font-bold text-lg mb-2">
              Ready to Find Your Car?
            </h3>
            <Link href="/find-my-car" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5">
              Start Find My Car
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}