'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-chacha-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="text-6xl mb-6"
          animate={{ 
            x: [0, 40, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚗
        </motion.div>

        <motion.p
          className="text-chacha-yellow font-semibold text-lg"
          animate={{ 
            opacity: [1, 0.5, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          VehcileChacha is loading...
        </motion.p>

        <div className="w-48 h-1.5 bg-chacha-card rounded-full overflow-hidden mt-4 mx-auto">
          <motion.div
            className="h-full bg-chacha-yellow"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
}