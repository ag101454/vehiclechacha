import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  Car, 
  Fuel, 
  Settings, 
  Shield, 
  Wallet,
  Users,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'Car Buying Guides Pakistan | VehicleChacha',
  description: 'Expert guides to help you choose the right car in Pakistan. Learn about car types, fuel types, and more.',
};

const guides = [
  {
    title: 'How to Choose a Car in Pakistan',
    slug: 'how-to-choose-a-car-in-pakistan',
    description: 'A comprehensive guide to finding the right car for your budget and lifestyle.',
    icon: Car,
    readTime: '8 min read',
    category: 'Buying Guide',
  },
  {
    title: 'Sedan vs SUV: Which is Right for You?',
    slug: 'sedan-vs-suv',
    description: 'Compare the pros and cons of sedans and SUVs for Pakistani roads.',
    icon: Car,
    readTime: '6 min read',
    category: 'Comparison',
  },
  {
    title: 'Petrol vs Hybrid: What Should You Buy?',
    slug: 'petrol-vs-hybrid',
    description: 'Understanding the cost benefits of hybrid cars in Pakistan.',
    icon: Fuel,
    readTime: '7 min read',
    category: 'Fuel Guide',
  },
  {
    title: 'Manual vs Automatic Transmission',
    slug: 'manual-vs-automatic',
    description: 'Which transmission type is better for your driving needs?',
    icon: Settings,
    readTime: '5 min read',
    category: 'Driving Guide',
  },
  {
    title: 'Car Ownership Costs in Pakistan',
    slug: 'car-ownership-costs',
    description: 'Understanding the real cost of owning a car beyond the purchase price.',
    icon: Wallet,
    readTime: '9 min read',
    category: 'Financial Guide',
  },
  {
    title: 'Best Family Cars in Pakistan',
    slug: 'best-family-cars',
    description: 'Top picks for families considering space, safety, and comfort.',
    icon: Users,
    readTime: '7 min read',
    category: 'Family Guide',
  },
];

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Car Buying <span className="text-chacha-yellow">Guides</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-2xl">
              Expert advice from Chacha to help you make informed decisions about 
              buying and owning a car in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card-dark p-6 hover:border-chacha-yellow transition-all duration-300 group hover:shadow-2xl hover:shadow-chacha-yellow/10 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-chacha-yellow/10 rounded-lg flex items-center justify-center mb-4">
                  <guide.icon className="text-chacha-yellow" size={28} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-chacha-yellow text-xs">{guide.category}</span>
                  <span className="text-chacha-muted text-xs">•</span>
                  <span className="text-chacha-muted text-xs">{guide.readTime}</span>
                </div>
                <h2 className="text-white font-bold text-xl mb-2 group-hover:text-chacha-yellow transition-colors">
                  {guide.title}
                </h2>
                <p className="text-chacha-muted text-sm mb-4">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1 text-chacha-yellow text-sm font-medium">
                  Read Guide
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}