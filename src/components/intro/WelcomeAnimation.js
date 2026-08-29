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
      setTimeout(() => setPhase(1), 2500),  // Phase 1: Logo reveal complete
      setTimeout(() => setPhase(2), 4500),  // Phase 2: Text reveal
      setTimeout(() => setPhase(3), 6500),  // Phase 3: Final impact
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
        onComplete?.();
      }, 7500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-chacha-black overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        {/* ===== BACKGROUND EFFECTS ===== */}
        
        {/* Radial Spotlight */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,196,0,0.15) 0%, rgba(255,196,0,0.05) 30%, transparent 70%)',
          }}
          animate={{
            scale: [0.8, 1.2, 1.5, 2],
            opacity: [0, 1, 0.6, 0],
          }}
          transition={{
            duration: 7,
            times: [0, 0.4, 0.7, 1],
            ease: "easeInOut",
          }}
        />

        {/* Particle Effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-chacha-yellow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Animated Road */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2"
          style={{
            background: 'repeating-linear-gradient(to bottom, #FFC400 0px, #FFC400 40px, transparent 40px, transparent 80px)',
          }}
          initial={{ height: '0%', opacity: 0 }}
          animate={{ 
            height: ['0%', '30%', '50%', '0%'],
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: 7,
            times: [0, 0.4, 0.7, 1],
            ease: "easeInOut",
          }}
        />

        {/* Side road lines */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-40"
          style={{
            borderLeft: '2px solid rgba(255,196,0,0.3)',
            borderRight: '2px solid rgba(255,196,0,0.3)',
          }}
          initial={{ height: '0%', opacity: 0 }}
          animate={{ 
            height: ['0%', '35%', '55%', '0%'],
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{
            duration: 7,
            times: [0, 0.4, 0.7, 1],
            ease: "easeInOut",
          }}
        />

        {/* ===== CENTER CONTENT ===== */}
        <div className="relative h-full flex items-center justify-center">
          
          {/* PHASE 0: Initial Black Screen */}
          {phase === 0 && (
            <motion.div
              className="absolute inset-0 bg-chacha-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          )}

          {/* PHASE 0-1: Logo Explosion */}
          {(phase === 0 || phase === 1) && (
            <motion.div className="text-center relative">
              {/* Shockwave rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-chacha-yellow/50"
                  initial={{ width: 100, height: 100, opacity: 1 }}
                  animate={{ 
                    width: 500 + i * 200,
                    height: 500 + i * 200,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Logo with dramatic entrance */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <Image
                  src="/images/logo/vehiclechacha-logo.png"
                  alt="VehicleChacha Logo"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Rotating glow ring */}
                <motion.div
                  className="absolute -inset-6 border-2 border-chacha-yellow/40 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    borderTopColor: '#FFC400',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}
                />
                
                {/* Counter-rotating ring */}
                <motion.div
                  className="absolute -inset-10 border border-chacha-yellow/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    borderTopColor: 'transparent',
                    borderBottomColor: '#FFC400',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                  }}
                />
              </motion.div>

              {/* Brand name with letter animation */}
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-4"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ 
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {"Vehicle".split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {"Chacha".split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-chacha-yellow"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-lg md:text-2xl text-chacha-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                Budget Batao. Gaari Chacha Dhoondhega.
              </motion.p>
            </motion.div>
          )}

          {/* PHASE 2: Impact Statement */}
          {phase === 2 && (
            <motion.div
              className="text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                Find the Right Car for{' '}
                <motion.span
                  className="text-chacha-yellow inline-block"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    textShadow: [
                      '0 0 20px rgba(255,196,0,0.5)',
                      '0 0 40px rgba(255,196,0,0.8)',
                      '0 0 20px rgba(255,196,0,0.5)',
                    ],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Your Budget
                </motion.span>
              </motion.h2>
              
              <motion.div
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['Compare Cars', 'Check Prices', 'Get Recommendations'].map((text, index) => (
                  <motion.span
                    key={text}
                    className="bg-chacha-yellow/10 border border-chacha-yellow/20 text-chacha-yellow px-6 py-3 rounded-full text-sm md:text-base font-medium"
                    initial={{ opacity: 0, y: 30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* PHASE 3: Final Impact */}
          {phase === 3 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-7xl md:text-8xl mb-6"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
              >
                🚗💨
              </motion.div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-chacha-yellow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Let's Go!
              </motion.h2>
            </motion.div>
          )}
        </div>

        {/* ===== BOTTOM PROGRESS BAR ===== */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-1.5 bg-gradient-to-r from-chacha-yellow via-yellow-400 to-chacha-yellow"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 7, ease: "easeInOut" }}
            style={{
              boxShadow: '0 0 20px rgba(255,196,0,0.5)',
            }}
          />
        </motion.div>

        {/* ===== SKIP BUTTON ===== */}
        <motion.button
          className="absolute top-6 right-6 text-chacha-muted hover:text-chacha-yellow transition-colors text-sm z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => {
            setShow(false);
            sessionStorage.setItem('hasSeenIntro', 'true');
            onComplete?.();
          }}
        >
          Skip Intro →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}