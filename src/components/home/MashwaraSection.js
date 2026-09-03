'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Gift,
  ArrowRight,
  Sparkles,
  Crown,
  Zap,
  Star
} from 'lucide-react';

const WHATSAPP_NUMBER = '923407146871';

export default function MashwaraSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-chacha-yellow/10 via-transparent to-chacha-yellow/10" />
      
      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-chacha-yellow rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-dark p-8 md:p-12 relative overflow-hidden border-2 border-chacha-yellow/30 hover:border-chacha-yellow/60 transition-all duration-300"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,196,0,0.1) 0%, transparent 60%)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-chacha-yellow" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-chacha-yellow" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-chacha-yellow" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-chacha-yellow" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4"
              >
                <Gift size={16} className="text-green-500" />
                <span className="text-green-500 font-bold text-sm tracking-wide">
                  FREE FOR 2 MONTHS
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Chacha Ka{' '}
                <motion.span
                  className="text-chacha-yellow inline-block"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Mashwara
                </motion.span>
              </h2>

              <p className="text-chacha-muted text-lg mb-6">
                Personal car advice directly from Chacha on WhatsApp.
                Get the perfect car recommendation for your budget and needs.
              </p>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: MessageCircle, text: 'Direct WhatsApp Consultation', color: 'text-green-500' },
                  { icon: Gift, text: '100% FREE - No Payment Required', color: 'text-green-500' },
                  { icon: Star, text: 'Personalized Car Recommendation', color: 'text-yellow-400' },
                  { icon: Zap, text: 'Quick Response Within 24 Hours', color: 'text-blue-500' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${feature.color} bg-white/5`}>
                      <feature.icon size={18} />
                    </div>
                    <span className="text-white">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/chacha-ka-mashwara"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full shadow-lg shadow-chacha-yellow/30 hover:shadow-chacha-yellow/50 hover:scale-105 transition-all"
                >
                  <Sparkles size={20} />
                  Get Free Mashwara
                  <ArrowRight size={20} />
                </Link>
                
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Assalam-o-Alaikum Chacha! Mujhe car mashwara chahiye.')}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all shadow-lg shadow-green-500/30"
                >
                  <MessageCircle size={20} />
                  WhatsApp Direct
                </a>
              </div>
            </div>

            {/* Right Content - Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              {/* VehicleChacha Logo */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Image
                  src="/images/logo/vehiclechacha-logo.png"
                  alt="VehicleChacha - Chacha Ka Mashwara"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(255,196,0,0.6)]"
                  priority
                />
                
                {/* Pulsing Ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-chacha-yellow"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                
                {/* Second Ring */}
                <motion.div
                  className="absolute -inset-8 rounded-full border border-chacha-yellow/30"
                  animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
              </motion.div>

              {/* FREE Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg shadow-green-500/30"
              >
                <Gift size={24} />
                100% FREE
              </motion.div>

              <div className="mt-3 text-green-500 text-sm font-medium">
                Limited Time Offer - Free for First 2 Months!
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}