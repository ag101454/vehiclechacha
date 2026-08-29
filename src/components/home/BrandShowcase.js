'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Award, TrendingUp } from 'lucide-react';

const brands = [
  {
    name: 'Toyota',
    slug: 'toyota',
    logo: '/images/brands/toyota.png',
    fallback: 'T',
    color: '#EB0A1E',
    description: 'Pakistan\'s most trusted brand with legendary reliability and unmatched resale value.',
    carsCount: '2+ Models',
    rating: '95% Resale',
    bgGradient: 'from-red-500/20 to-red-500/5',
    borderHover: 'hover:border-red-500/50',
  },
  {
    name: 'Honda',
    slug: 'honda',
    logo: '/images/brands/honda.png',
    fallback: 'H',
    color: '#CC0000',
    description: 'Premium performance and comfort with exceptional build quality.',
    carsCount: '2+ Models',
    rating: '88% Resale',
    bgGradient: 'from-red-600/20 to-red-600/5',
    borderHover: 'hover:border-red-600/50',
  },
  {
    name: 'Suzuki',
    slug: 'suzuki',
    logo: '/images/brands/suzuki.png',
    fallback: 'S',
    color: '#0066B3',
    description: 'Affordable, fuel-efficient cars perfect for Pakistani families.',
    carsCount: '2+ Models',
    rating: '85% Resale',
    bgGradient: 'from-blue-500/20 to-blue-500/5',
    borderHover: 'hover:border-blue-500/50',
  },
  {
    name: 'Kia',
    slug: 'kia',
    logo: '/images/brands/kia.png',
    fallback: 'KIA',
    color: '#BB162B',
    description: 'Modern design and feature-packed vehicles with global standards.',
    carsCount: '1+ Models',
    rating: '75% Resale',
    bgGradient: 'from-red-700/20 to-red-700/5',
    borderHover: 'hover:border-red-700/50',
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    logo: '/images/brands/hyundai.png',
    fallback: 'H',
    color: '#002C5F',
    description: 'Innovative technology and stylish designs for modern buyers.',
    carsCount: '1+ Models',
    rating: '72% Resale',
    bgGradient: 'from-blue-700/20 to-blue-700/5',
    borderHover: 'hover:border-blue-700/50',
  },
  {
    name: 'MG',
    slug: 'mg',
    logo: '/images/brands/mg.png',
    fallback: 'MG',
    color: '#840000',
    description: 'British heritage with modern technology and bold styling.',
    carsCount: 'Coming Soon',
    rating: 'New Entry',
    bgGradient: 'from-red-800/20 to-red-800/5',
    borderHover: 'hover:border-red-800/50',
  },
  {
    name: 'Changan',
    slug: 'changan',
    logo: '/images/brands/changan.png',
    fallback: 'CH',
    color: '#00A0E9',
    description: 'Chinese excellence with value-packed features and design.',
    carsCount: 'Coming Soon',
    rating: 'New Entry',
    bgGradient: 'from-cyan-500/20 to-cyan-500/5',
    borderHover: 'hover:border-cyan-500/50',
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chacha-yellow/3 to-transparent" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-chacha-yellow/3 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-6 py-2 mb-4"
          >
            <Award className="text-chacha-yellow" size={18} />
            <span className="text-chacha-yellow text-sm font-semibold tracking-wider">
              PREMIUM BRAND PARTNERS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Pakistan's Most{' '}
            <span className="text-chacha-yellow relative inline-block">
              Trusted Brands
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-chacha-yellow rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-chacha-muted text-xl max-w-3xl mx-auto"
          >
            Comprehensive coverage and expert analysis of every major automotive brand in Pakistan
          </motion.p>
        </div>

        {/* Brand Cards Grid - 2 columns for larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/new-cars/${brand.slug}`}
                className={`card-dark p-8 border-2 ${brand.borderHover} transition-all duration-500 group hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-2 block relative overflow-hidden min-h-[280px] flex flex-col justify-between`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${brand.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${brand.color}20, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Logo Container */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 shrink-0"
                      whileHover={{ scale: 1.1, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        width={70}
                        height={70}
                        className="object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span 
                        className="hidden text-3xl font-bold"
                        style={{ color: brand.color }}
                      >
                        {brand.fallback}
                      </span>
                    </motion.div>

                    {/* Brand Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-chacha-yellow transition-colors">
                        {brand.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-chacha-yellow fill-chacha-yellow" />
                        <span className="text-chacha-yellow text-sm font-medium">
                          {brand.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-chacha-muted leading-relaxed mb-6">
                    {brand.description}
                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 bg-chacha-black/50 backdrop-blur rounded-full px-4 py-1.5">
                      <TrendingUp size={14} className="text-chacha-yellow" />
                      <span className="text-white text-sm font-medium">
                        {brand.carsCount}
                      </span>
                    </span>
                    
                    <span className="inline-flex items-center gap-2 text-chacha-yellow font-medium text-sm group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Award, title: 'Verified Data', desc: 'All specs verified from official sources' },
            { icon: TrendingUp, title: 'Regular Updates', desc: 'Prices updated as market changes' },
            { icon: Star, title: 'Expert Analysis', desc: 'Chacha\'s unbiased recommendations' },
          ].map((item) => (
            <div key={item.title} className="card-dark p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-chacha-yellow/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="text-chacha-yellow" size={28} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                <p className="text-chacha-muted text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}