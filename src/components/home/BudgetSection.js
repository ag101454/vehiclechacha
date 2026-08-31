import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp } from 'lucide-react';

const budgetRanges = [
  { 
    label: 'Under 20 Lakh', 
    href: '/best-cars/under-20-lakh', 
    range: '0 - 2,000,000',
    description: 'Entry level & budget friendly',
    accent: 'border-l-green-400',
  },
  { 
    label: 'Under 30 Lakh', 
    href: '/best-cars/under-30-lakh', 
    range: '0 - 3,000,000',
    description: 'Affordable family cars',
    accent: 'border-l-blue-400',
  },
  { 
    label: 'Under 40 Lakh', 
    href: '/best-cars/under-40-lakh', 
    range: '0 - 4,000,000',
    description: 'Mid-range options',
    accent: 'border-l-purple-400',
  },
  { 
    label: 'Under 50 Lakh', 
    href: '/best-cars/under-50-lakh', 
    range: '0 - 5,000,000',
    description: 'Premium compact segment',
    accent: 'border-l-orange-400',
  },
  { 
    label: 'Under 60 Lakh', 
    href: '/best-cars/under-60-lakh', 
    range: '0 - 6,000,000',
    description: 'Executive sedans',
    accent: 'border-l-pink-400',
  },
  { 
    label: 'Under 70 Lakh', 
    href: '/best-cars/under-70-lakh', 
    range: '0 - 7,000,000',
    description: 'SUV & crossover segment',
    accent: 'border-l-red-400',
  },
  { 
    label: '70 Lakh+', 
    href: '/best-cars/70-lakh-plus', 
    range: '7,000,000+',
    description: 'Luxury & high-end',
    accent: 'border-l-chacha-yellow',
  },
];

export default function BudgetSection() {
  return (
    <section className="py-20 bg-chacha-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#FFC400 1px, transparent 1px), linear-gradient(90deg, #FFC400 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-chacha-yellow" />
            <span className="text-chacha-yellow text-sm font-semibold tracking-wider uppercase">
              Browse by Price
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Cars by Budget
              </h2>
              <p className="text-chacha-muted mt-2 text-lg">
                Find the right car within your price range
              </p>
            </div>
            <Link 
              href="/car-prices" 
              className="hidden md:inline-flex items-center gap-2 text-chacha-yellow hover:text-yellow-400 font-medium transition-colors group"
            >
              View All Prices
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgetRanges.map((budget) => (
            <Link
              key={budget.href}
              href={budget.href}
              className={`card-dark p-6 border-l-4 ${budget.accent} hover:border-chacha-yellow hover:shadow-2xl hover:shadow-chacha-yellow/10 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-chacha-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-chacha-yellow/10 rounded-lg flex items-center justify-center">
                    <Wallet className="text-chacha-yellow" size={20} />
                  </div>
                  <span className="text-chacha-muted text-xs font-mono">
                    {budget.range}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-chacha-yellow transition-colors">
                  {budget.label}
                </h3>
                <p className="text-chacha-muted text-sm mb-4">
                  {budget.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-chacha-yellow text-sm font-medium">
                    Explore Cars
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <TrendingUp size={16} className="text-chacha-muted group-hover:text-chacha-yellow transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-10 text-center">
          <p className="text-chacha-muted text-sm">
            Prices are indicative and may vary by variant and dealership.
          </p>
        </div>
      </div>
    </section>
  );
}