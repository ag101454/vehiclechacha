import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import PopularCars from '@/components/home/PopularCars';
import BudgetSection from '@/components/home/BudgetSection';
import BrandShowcase from '@/components/home/BrandShowcase';
import WhyChoose from '@/components/home/WhyChoose';
import Link from 'next/link';
import { ArrowRight, Car, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'VehicleChacha - New Cars in Pakistan | Compare Prices & Find Your Car',
  description: 'Find the right car for your budget. Compare new cars in Pakistan, check prices and specifications. Budget Batao, Gaari Chacha Dhoondhega.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PopularCars />
        <BudgetSection />
        <BrandShowcase />
        <WhyChoose />
        
        {/* SEO Content Section */}
        <section className="py-20 bg-chacha-card/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at center, #FFC400 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          
          <div className="container-custom relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-0.5 bg-chacha-yellow" />
                  <span className="text-chacha-yellow text-sm font-semibold tracking-wider uppercase">
                    About VehicleChacha
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Find New Cars in Pakistan
                </h2>
                
                <p className="text-chacha-muted text-lg leading-relaxed mb-4">
                  VehicleChacha helps Pakistani car buyers find the right new car based on their 
                  budget, family size, driving habits, and preferences. We compare prices, 
                  specifications, and features across all major brands.
                </p>
                
                <p className="text-chacha-muted text-lg leading-relaxed mb-8">
                  Our unique <span className="text-chacha-yellow font-semibold">Chacha Match™</span> scoring 
                  system evaluates cars based on real-world factors—not just specifications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'Budget-based recommendations',
                    'Real-time price updates',
                    'Side-by-side comparisons',
                    'Transparent scoring system',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <CheckCircle className="text-chacha-yellow shrink-0" size={18} />
                      <span className="text-white text-sm">{point}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/find-my-car"
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
                >
                  <Sparkles size={20} />
                  Find My Car Now
                  <ArrowRight size={20} />
                </Link>
              </div>

              {/* Right Content - Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card-dark p-6 text-center hover:border-chacha-yellow transition-all duration-300 group">
                  <Car className="text-chacha-yellow mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">0+</div>
                  <div className="text-chacha-muted text-sm">Cars Listed</div>
                </div>
                <div className="card-dark p-6 text-center hover:border-chacha-yellow transition-all duration-300 group">
                  <TrendingUp className="text-chacha-yellow mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">8</div>
                  <div className="text-chacha-muted text-sm">Scoring Factors</div>
                </div>
                <div className="card-dark p-6 text-center hover:border-chacha-yellow transition-all duration-300 group">
                  <Sparkles className="text-chacha-yellow mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-chacha-muted text-sm">Transparent</div>
                </div>
                <div className="card-dark p-6 text-center hover:border-chacha-yellow transition-all duration-300 group">
                  <CheckCircle className="text-chacha-yellow mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-chacha-muted text-sm">Always Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}