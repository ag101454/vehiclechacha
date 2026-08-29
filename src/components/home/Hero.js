'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { 
  fadeInUp, 
  fadeIn, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer,
  scaleUp 
} from '@/lib/animations';

export default function Hero() {
  const [budget, setBudget] = useState('');

  const budgetOptions = [
    { label: 'Under 20 Lakh', value: 'under-20' },
    { label: '20-30 Lakh', value: '20-30' },
    { label: '30-40 Lakh', value: '30-40' },
    { label: '40-50 Lakh', value: '40-50' },
    { label: '50-70 Lakh', value: '50-70' },
    { label: '70 Lakh+', value: '70-plus' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-chacha-yellow/5 to-transparent" />
      
      {/* Animated glowing orbs */}
      <motion.div 
        className="absolute top-20 -right-20 w-96 h-96 bg-chacha-yellow/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 -left-20 w-72 h-72 bg-chacha-yellow/3 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(#FFC400 1px, transparent 1px), linear-gradient(90deg, #FFC400 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      <div className="container-custom relative py-12 md:py-20 lg:py-28">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
          >
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
              <motion.span 
                className="text-chacha-yellow inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Your Budget
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-chacha-muted max-w-lg"
            >
              Compare new cars in Pakistan, explore prices and specifications, 
              and let Chacha help you find the car that fits your needs.
            </motion.p>

            {/* Budget Selector */}
            <motion.div 
              variants={fadeInUp}
              className="space-y-3"
            >
              <label className="text-white font-semibold block">
                What's your budget?
              </label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setBudget(option.value)}
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
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={budget ? `/find-my-car?budget=${budget}` : '/find-my-car'}
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 relative overflow-hidden group"
                >
                  <span className="relative z-10">Find My Car</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div 
                    className="absolute inset-0 bg-yellow-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/new-cars"
                  className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                >
                  Explore New Cars
                </Link>
              </motion.div>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-chacha-muted italic"
            >
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
              animate={{ 
                rotate: [0, 2, 0, -2, 0],
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/logo/vehiclechacha-logo.png"
                alt="VehicleChacha Logo - Pakistani Car Advisor"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Decorative rings */}
              <motion.div 
                className="absolute -inset-4 border-2 border-chacha-yellow/20 rounded-full"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div 
                className="absolute -inset-8 border border-chacha-yellow/10 rounded-full"
                animate={{ 
                  rotate: -360,
                }}
                transition={{ 
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>

          {/* Mobile Logo */}
          <motion.div 
            className="lg:hidden flex items-center justify-center"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative w-48 h-48 md:w-64 md:h-64"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/logo/vehiclechacha-logo.png"
                alt="VehicleChacha Logo - Pakistani Car Advisor"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-chacha-muted rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-chacha-yellow rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}