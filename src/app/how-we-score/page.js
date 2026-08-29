import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Target, 
  Fuel, 
  Users, 
  Shield, 
  Wrench, 
  TrendingUp, 
  Sparkles, 
  Gauge,
  CheckCircle,
  BarChart3
} from 'lucide-react';

export const metadata = {
  title: 'How We Score - Chacha Match™ Methodology | VehicleChacha',
  description: 'Learn how VehicleChacha calculates Chacha Match™ scores. Transparent, data-driven car recommendations for Pakistan.',
};

const scoringCriteria = [
  {
    icon: Target,
    title: 'Budget Fit',
    weight: '25%',
    description: 'How well the car fits within your budget range. We consider the price relative to your maximum and minimum budget.',
    details: [
      'Price within your budget range',
      'Value for money consideration',
      'Price-to-features ratio',
    ],
  },
  {
    icon: Fuel,
    title: 'Fuel Economy',
    weight: '15%',
    description: 'Real-world fuel efficiency based on manufacturer data and user reports.',
    details: [
      'City and highway mileage',
      'Fuel type consideration',
      'Cost per kilometer',
    ],
  },
  {
    icon: Users,
    title: 'Family Suitability',
    weight: '15%',
    description: 'How well the car accommodates your family size and lifestyle needs.',
    details: [
      'Seating capacity',
      'Cargo space',
      'Comfort features',
    ],
  },
  {
    icon: Shield,
    title: 'Safety',
    weight: '15%',
    description: 'Safety features and structural integrity of the vehicle.',
    details: [
      'Airbags and ABS',
      'Electronic stability control',
      'Build quality',
    ],
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    weight: '10%',
    description: 'Expected maintenance costs and reliability based on brand reputation.',
    details: [
      'Parts availability',
      'Service network',
      'Brand reliability',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Resale Value',
    weight: '10%',
    description: 'Expected resale value after 3-5 years based on market trends.',
    details: [
      'Brand reputation',
      'Market demand',
      'Depreciation rate',
    ],
  },
  {
    icon: Sparkles,
    title: 'Features',
    weight: '5%',
    description: 'Available features that enhance comfort, convenience, and technology.',
    details: [
      'Infotainment system',
      'Comfort features',
      'Advanced technology',
    ],
  },
  {
    icon: Gauge,
    title: 'Performance',
    weight: '5%',
    description: 'Engine performance, handling, and overall driving experience.',
    details: [
      'Horsepower and torque',
      'Driving dynamics',
      'Engine refinement',
    ],
  },
];

export default function HowWeScorePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-4 py-2 mb-6">
              <BarChart3 className="text-chacha-yellow" size={16} />
              <span className="text-chacha-yellow text-sm font-medium">Transparent Methodology</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How We <span className="text-chacha-yellow">Score</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-3xl mx-auto">
              Our Chacha Match™ scoring system uses transparent, data-driven criteria 
              to help you find the right car. No hidden algorithms, no bias—just 
              honest evaluation.
            </p>
          </div>

          {/* Scoring Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {scoringCriteria.map((criterion) => (
              <div key={criterion.title} className="card-dark p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-chacha-yellow/10 rounded-lg flex items-center justify-center">
                    <criterion.icon className="text-chacha-yellow" size={24} />
                  </div>
                  <span className="bg-chacha-yellow text-chacha-black font-bold px-3 py-1 rounded-full text-sm">
                    {criterion.weight}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {criterion.title}
                </h3>
                <p className="text-chacha-muted text-sm mb-3">
                  {criterion.description}
                </p>
                <ul className="space-y-1">
                  {criterion.details.map((detail) => (
                    <li key={detail} className="text-chacha-muted text-xs flex items-center gap-2">
                      <CheckCircle className="text-chacha-yellow" size={12} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="card-dark p-8 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              How Chacha Match™ Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chacha-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📊
                </div>
                <h3 className="text-white font-semibold mb-2">1. Data Collection</h3>
                <p className="text-chacha-muted text-sm">
                  We gather real specifications, prices, and features from official manufacturer sources.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chacha-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🧮
                </div>
                <h3 className="text-white font-semibold mb-2">2. Weighted Scoring</h3>
                <p className="text-chacha-muted text-sm">
                  Each criterion is scored from 0-100 and weighted according to its importance.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-chacha-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🎯
                </div>
                <h3 className="text-white font-semibold mb-2">3. Personal Matching</h3>
                <p className="text-chacha-muted text-sm">
                  Your preferences adjust the scoring to find cars that match your specific needs.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="card-dark p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-1">Is the scoring system biased?</h3>
                <p className="text-chacha-muted text-sm">
                  No. Our scoring is based on factual data and transparent criteria. We don't accept 
                  payments for higher scores. Every car is evaluated using the same methodology.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">How often is the data updated?</h3>
                <p className="text-chacha-muted text-sm">
                  We update prices and specifications regularly, especially when manufacturers announce 
                  changes. Each vehicle page shows its last updated date.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Can I trust the Chacha Match™ score?</h3>
                <p className="text-chacha-muted text-sm">
                  Chacha Match™ is a helpful guide, not a substitute for test driving. We recommend 
                  using our scores to shortlist cars, then visiting dealerships for hands-on evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}