'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function WelcomeAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShow(false);
      onComplete?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 2500),
      setTimeout(() => setPhase(2), 4500),
      setTimeout(() => setPhase(3), 6500),
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
        onComplete?.();
      }, 9000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.08,
          filter: 'brightness(3)',
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* ===== LAYER 1: VIGNETTE ===== */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        {/* ===== LAYER 2: GOLDEN GLOW ===== */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,196,0,0.12) 0%, transparent 40%)',
          }}
          animate={{
            opacity: [0, 1, 0.6, 0],
            scale: [0.6, 1.3, 1.8, 2.5],
          }}
          transition={{ duration: 9, times: [0, 0.3, 0.6, 1], ease: 'easeInOut' }}
        />

        {/* ===== LAYER 3: FLOATING GOLD DUST ===== */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2.5 + 0.5,
              height: Math.random() * 2.5 + 0.5,
              backgroundColor: '#FFC400',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px rgba(255,196,0,0.8)',
            }}
            animate={{
              y: [0, -Math.random() * 400 - 100],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* ===== LAYER 4: LIGHT SWEEP ===== */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, transparent 40%, rgba(255,196,0,0.08) 50%, transparent 60%)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2.5,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* ===== LAYER 5: CORNER ACCENTS ===== */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16"
          style={{ borderTop: '1px solid rgba(255,196,0,0.4)', borderLeft: '1px solid rgba(255,196,0,0.4)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute top-10 right-10 w-16 h-16"
          style={{ borderTop: '1px solid rgba(255,196,0,0.4)', borderRight: '1px solid rgba(255,196,0,0.4)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16"
          style={{ borderBottom: '1px solid rgba(255,196,0,0.4)', borderLeft: '1px solid rgba(255,196,0,0.4)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16"
          style={{ borderBottom: '1px solid rgba(255,196,0,0.4)', borderRight: '1px solid rgba(255,196,0,0.4)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
        />

        {/* ===== CENTER CONTENT ===== */}
        <div className="relative h-full flex items-center justify-center">
          
          {/* PHASE 0: Pure Black */}
          {phase === 0 && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
          )}

          {/* PHASE 0-1: Logo Emerges */}
          {(phase === 0 || phase === 1) && (
            <div className="text-center">
              <motion.div
                className="relative w-60 h-60 md:w-80 md:h-80 mx-auto mb-12"
                initial={{ opacity: 0, scale: 0.2, filter: 'blur(30px)' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: 'blur(0px)',
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src="/images/logo/vehiclechacha-logo.png"
                  alt="VehicleChacha"
                  fill
                  className="object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 50px rgba(255,196,0,0.6))',
                  }}
                  priority
                />

                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(255,196,0,0.3)' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Second Ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full"
                  style={{ border: '1px solid rgba(255,196,0,0.15)' }}
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.5, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* Subtle Text Below Logo */}
              <motion.p
                className="text-white/30 text-xs uppercase tracking-[0.5em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                Est. 2026
              </motion.p>
            </div>
          )}

          {/* PHASE 2: Brand Name */}
          {phase === 2 && (
            <motion.div className="text-center px-4">
              <motion.h1
                className="text-7xl md:text-9xl font-black text-white tracking-tighter"
                initial={{ opacity: 0, y: 80, letterSpacing: '0.3em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                VEHICLE<span className="text-chacha-yellow">CHACHA</span>
              </motion.h1>
              
              {/* Golden Divider */}
              <motion.div
                className="flex items-center justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent to-chacha-yellow/50"
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
                <motion.div
                  className="w-2 h-2 bg-chacha-yellow rotate-45"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                />
                <motion.div
                  className="h-px bg-gradient-to-l from-transparent to-chacha-yellow/50"
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* PHASE 3: Tagline */}
          {phase === 3 && (
            <motion.div className="text-center px-4">
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Find the Right Car for{' '}
                <span className="text-chacha-yellow">Your Budget</span>
              </motion.h2>

              <motion.div
                className="mt-6 text-chacha-muted text-lg md:text-xl uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Pakistan's Trusted Car Advisor
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* ===== BOTTOM PROGRESS ===== */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-chacha-yellow to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 8, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 20px rgba(255,196,0,0.5)' }}
          />
        </motion.div>

        {/* Skip Button */}
        <motion.button
          className="absolute top-8 right-8 text-white/30 hover:text-white/70 transition-all text-xs uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          onClick={() => {
            setShow(false);
            sessionStorage.setItem('hasSeenIntro', 'true');
            onComplete?.();
          }}
        >
          Skip
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}