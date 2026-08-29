import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { 
  Target, 
  Heart, 
  Shield, 
  Users, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const metadata = {
  title: 'About VehicleChacha - Pakistan\'s Trusted Car Advisor',
  description: 'Learn about VehicleChacha - helping Pakistani car buyers find the right car based on budget, needs, and preferences.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-chacha-yellow">VehicleChacha</span>
            </h1>
            <p className="text-chacha-muted text-lg max-w-3xl mx-auto">
              Your trusted Pakistani car advisor. We help you find the right car 
              based on your budget, needs, and lifestyle.
            </p>
          </div>

          {/* Mission */}
          <div className="card-dark p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-chacha-muted leading-relaxed mb-4">
                  Buying a car in Pakistan can be overwhelming. With so many options, 
                  varying prices, and conflicting advice, it's hard to know where to start.
                </p>
                <p className="text-chacha-muted leading-relaxed">
                  VehicleChacha simplifies this process. We combine real-world data, 
                  transparent scoring, and practical advice to help you make an informed 
                  decision. Think of us as your knowledgeable Chacha who knows cars and 
                  wants to help you make the right choice.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Target, text: 'Budget-based recommendations tailored to you' },
                  { icon: Shield, text: 'Transparent scoring with no hidden bias' },
                  { icon: Heart, text: 'Honest advice focused on your needs' },
                  { icon: Users, text: 'Built for Pakistani car buyers' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-chacha-black rounded-lg p-4">
                    <div className="w-10 h-10 bg-chacha-yellow/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="text-chacha-yellow" size={20} />
                    </div>
                    <span className="text-white">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How We Help */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              How We Help You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-dark p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Compare Cars
                </h3>
                <p className="text-chacha-muted text-sm">
                  Side-by-side comparison of prices, specifications, and features 
                  across all major brands.
                </p>
              </div>
              <div className="card-dark p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Personalized Recommendations
                </h3>
                <p className="text-chacha-muted text-sm">
                  Tell Chacha your budget and needs, get car recommendations 
                  tailored specifically for you.
                </p>
              </div>
              <div className="card-dark p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Transparent Scoring
                </h3>
                <p className="text-chacha-muted text-sm">
                  Our Chacha Match™ score shows exactly why a car is right for 
                  you with no hidden criteria.
                </p>
              </div>
            </div>
          </div>

          {/* Our Principles */}
          <div className="card-dark p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Our Editorial Principles
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Honesty First',
                  text: 'We never accept payment for higher scores or recommendations. Every car is evaluated using the same transparent methodology.',
                },
                {
                  title: 'Data-Driven',
                  text: 'Our recommendations are based on factual data—prices, specifications, and real-world factors—not opinions or marketing.',
                },
                {
                  title: 'Pakistani Focus',
                  text: 'We understand Pakistani roads, fuel prices, and market conditions. Our advice is tailored specifically for Pakistani buyers.',
                },
                {
                  title: 'Continuous Improvement',
                  text: 'We regularly update our data and refine our scoring methodology to provide the most accurate recommendations.',
                },
              ].map((principle, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-chacha-yellow shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{principle.title}</h3>
                    <p className="text-chacha-muted text-sm">{principle.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Find Your Car?
            </h2>
            <Link
              href="/find-my-car"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3"
            >
              Start Find My Car
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}