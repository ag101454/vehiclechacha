import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import PopularCars from '@/components/home/PopularCars';
import BudgetSection from '@/components/home/BudgetSection';
import BrandShowcase from '@/components/home/BrandShowcase';
import WhyChoose from '@/components/home/WhyChoose';
import GroupChatSection from '@/components/home/GroupChatSection';
import MashwaraSection from '@/components/home/MashwaraSection';
import StatsBar from '@/components/home/StatsBar';
import ScrollSection from '@/components/shared/ScrollSection';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle, Crown, Search, Zap } from 'lucide-react';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'VehicleChacha - New Cars in Pakistan | Compare Prices & Find Your Car',
  description: 'Find the right car for your budget. Compare new cars in Pakistan, check prices, read reviews, and join group chats.',
};

export default async function HomePage() {
  let carCount = 0;
  let reviewCount = 0;
  try {
    carCount = await prisma.vehicle.count({ where: { isAvailable: true } });
    reviewCount = await prisma.review.count();
  } catch (error) {
    console.error('Error fetching stats:', error);
  }

  return (
    <>
      <Navbar />
      <main className="bg-chacha-black">
        {/* Hero - Always visible, no animation */}
        <Hero />

        {/* Quick Search - Fade up */}
        <ScrollSection direction="up">
          <section className="relative z-20 -mt-8">
            <div className="container-custom">
              <div className="card-dark p-4 shadow-2xl shadow-black/50 border border-chacha-border/50 rounded-2xl">
                <form className="flex flex-col md:flex-row gap-3" action="/new-cars" method="GET">
                  <div className="flex-1 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-chacha-muted" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search by brand, model, or body type..."
                      className="w-full bg-chacha-black border border-chacha-border rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-chacha-muted focus:border-chacha-yellow focus:outline-none"
                    />
                  </div>
                  <Link href="/group-chat" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                    <MessageCircle size={18} />
                    Group Chat
                  </Link>
                  <Link href="/find-my-car" className="inline-flex items-center justify-center gap-2 bg-chacha-yellow text-chacha-black px-6 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-colors">
                    <Zap size={18} />
                    Find My Car
                  </Link>
                </form>
              </div>
            </div>
          </section>
        </ScrollSection>

        {/* Stats - Fade up with delay */}
        <ScrollSection direction="up" delay={0.1}>
          <section className="py-10">
            <div className="container-custom">
              <StatsBar carCount={carCount} reviewCount={reviewCount} />
            </div>
          </section>
        </ScrollSection>

        {/* Group Chat - Fade from left */}
        <ScrollSection direction="left">
          <GroupChatSection />
        </ScrollSection>

        {/* Popular Cars - Fade up */}
        <ScrollSection direction="up">
          <PopularCars />
        </ScrollSection>

        {/* Budget - Fade from right */}
        <ScrollSection direction="right">
          <BudgetSection />
        </ScrollSection>

        {/* Brands - Fade up */}
        <ScrollSection direction="up">
          <BrandShowcase />
        </ScrollSection>

        {/* Mashwara - Fade up with delay */}
        <ScrollSection direction="up" delay={0.1}>
          <MashwaraSection />
        </ScrollSection>

        {/* Why Choose - Fade up */}
        <ScrollSection direction="up">
          <WhyChoose />
        </ScrollSection>

        {/* Final CTA - Fade up */}
        <ScrollSection direction="up">
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 via-transparent to-chacha-yellow/10" />
            <div className="container-custom text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-6 py-2 mb-4">
                <Crown size={18} className="text-chacha-yellow" />
                <span className="text-chacha-yellow font-bold text-sm">READY TO START?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Let Chacha Find Your{' '}
                <span className="text-chacha-yellow">Perfect Car</span>
              </h2>
              <p className="text-chacha-muted text-lg mb-8 max-w-2xl mx-auto">
                Answer 7 simple questions and get personalized recommendations 
                based on your budget and lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/find-my-car" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full shadow-lg shadow-chacha-yellow/30 hover:shadow-chacha-yellow/50 hover:scale-105 transition-all">
                  <Sparkles size={20} />
                  Find My Car Now
                  <ArrowRight size={20} />
                </Link>
                <Link href="/group-chat" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all shadow-lg shadow-green-500/30">
                  <MessageCircle size={20} />
                  Join Group Chat
                </Link>
              </div>
            </div>
          </section>
        </ScrollSection>
      </main>
      <Footer />
    </>
  );
}