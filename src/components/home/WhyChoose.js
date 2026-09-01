import Link from 'next/link';
import { Target, Scale, Shield, Heart, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Budget-Based Recommendations',
    description: 'Tell Chacha your budget and get personalized car recommendations tailored to your wallet.',
    stat: '93% Match Accuracy',
    color: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
    borderColor: 'hover:border-yellow-500/50',
  },
  {
    icon: Scale,
    title: 'Fair Comparisons',
    description: 'Compare cars side by side with transparent pricing, specs, and real-world insights.',
    stat: 'Side-by-Side Analysis',
    color: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    icon: Shield,
    title: 'Transparent Scoring',
    description: 'Our Chacha Match™ score shows exactly why a car is right for you—no hidden criteria.',
    stat: '8 Scoring Factors',
    color: 'bg-green-500/10',
    iconColor: 'text-green-500',
    borderColor: 'hover:border-green-500/50',
  },
  {
    icon: Heart,
    title: 'Real-World Advice',
    description: 'Practical guidance on fuel economy, maintenance costs, resale value, and family needs.',
    stat: 'Pakistan-Focused',
    color: 'bg-red-500/10',
    iconColor: 'text-red-500',
    borderColor: 'hover:border-red-500/50',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-chacha-yellow" />
            <span className="text-chacha-yellow text-sm font-semibold tracking-wider uppercase">
              Why Choose Us
            </span>
            <div className="w-8 h-0.5 bg-chacha-yellow" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why VehicleChacha?
          </h2>
          <p className="text-chacha-muted mt-3 text-lg max-w-2xl mx-auto">
            Your trusted Pakistani car advisor, helping you make informed decisions
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-dark p-6 border ${feature.borderColor} transition-all duration-300 group hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1.5`}
            >
              {/* Number */}
              <div className="text-4xl font-bold text-chacha-muted mb-4 group-hover:text-chacha-yellow/30 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={feature.iconColor} size={26} />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-chacha-yellow transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-chacha-muted text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stat */}
              <div className="flex items-center gap-2 text-xs">
                <div className="w-1.5 h-1.5 bg-chacha-yellow rounded-full" />
                <span className="text-chacha-yellow font-medium">{feature.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 card-dark p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 via-transparent to-chacha-yellow/10" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Find Your Perfect Car?
            </h3>
            <p className="text-chacha-muted mb-6">
              Let Chacha guide you to the right choice
            </p>
            <Link
              href="/find-my-car"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
            >
              Start Find My Car
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}