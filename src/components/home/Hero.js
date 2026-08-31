'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fadeInUp, fadeIn, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';

const budgetOptions = [
  { label: 'Under 20 Lakh', value: 'under-20', href: '/best-cars/under-20-lakh' },
  { label: '20-30 Lakh', value: '20-30', href: '/best-cars/under-30-lakh' },
  { label: '30-40 Lakh', value: '30-40', href: '/best-cars/under-40-lakh' },
  { label: '40-50 Lakh', value: '40-50', href: '/best-cars/under-50-lakh' },
  { label: '50-70 Lakh', value: '50-70', href: '/best-cars/under-70-lakh' },
  { label: '70 Lakh+', value: '70-plus', href: '/best-cars/70-lakh-plus' },
];

export default function Hero() {
  const router = useRouter();
  const [budget, setBudget] = useState('');

  const handleBudgetClick = (option) => {
    setBudget(option.value);
    router.push(option.href);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-chacha-yellow/5 to-transparent" />
      
      <motion.div 
        className="absolute top-20 -right-20 w-96 h-96 bg-chacha-yellow/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container-custom relative py-12 md:py-20 lg:py-28">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-6" variants={staggerContainer}>
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-chacha-yellow/10 border border-chacha-yellow/20 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-chacha-yellow animate-pulse" />
              <span className="text-chacha-yellow text-sm font-medium">
                Pakistan's Trusted Car Advisor
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Find the Right Car for{' '}
              <span className="text-chacha-yellow">Your Budget</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-chacha-muted max-w-lg"
            >
              Compare new cars in Pakistan, explore prices and specifications, 
              and let Chacha help you find the car that fits your needs.
            </motion.p>

            {/* Budget Selector */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <label className="text-white font-semibold block">
                What's your budget?
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleBudgetClick(option)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      budget === option.value
                        ? 'bg-chacha-yellow text-chacha-black border-chacha-yellow shadow-lg shadow-chacha-yellow/30 scale-105'
                        : 'border-chacha-border text-gray-300 hover:border-chacha-yellow hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/find-my-car"
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Find My Car
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/new-cars"
                className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
              >
                Explore New Cars
              </Link>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-chacha-muted italic">
              "Budget Batao. Gaari Chacha Dhoondhega."
            </motion.p>
          </motion.div>

          {/* Right Content - Logo */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative w-[420px] h-[420px] xl:w-[500px] xl:h-[500px]"
              animate={{ rotate: [0, 2, 0, -2, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Image
                src="/images/logo/vehiclechacha-logo.png"
                alt="VehicleChacha Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Mobile Logo */}
          <motion.div className="lg:hidden flex items-center justify-center" variants={fadeIn}>
            <Image
              src="/images/logo/vehiclechacha-logo.png"
              alt="VehicleChacha Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}