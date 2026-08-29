'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Car } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-chacha-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated Car Emoji */}
        <motion.div
          className="text-8xl mb-8"
          animate={{ 
            x: [0, 20, 0, -20, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🚗💨
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl font-bold text-chacha-yellow mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Oho! Gaari wrong turn le gayi.
          </h1>
          <p className="text-chacha-muted mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Chacha suggests you head back to the main road.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              href="/find-my-car"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3"
            >
              <Car size={20} />
              Find My Car
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-chacha-border">
            <p className="text-chacha-muted text-sm mb-4">Or explore:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/new-cars"
                className="text-chacha-yellow hover:text-yellow-400 text-sm transition-colors"
              >
                New Cars
              </Link>
              <span className="text-chacha-muted">•</span>
              <Link
                href="/car-prices"
                className="text-chacha-yellow hover:text-yellow-400 text-sm transition-colors"
              >
                Car Prices
              </Link>
              <span className="text-chacha-muted">•</span>
              <Link
                href="/compare"
                className="text-chacha-yellow hover:text-yellow-400 text-sm transition-colors"
              >
                Compare
              </Link>
              <span className="text-chacha-muted">•</span>
              <Link
                href="/guides"
                className="text-chacha-yellow hover:text-yellow-400 text-sm transition-colors"
              >
                Guides
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}