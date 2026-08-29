'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-chacha-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div
          className="text-8xl mb-8"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          🔧
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Chacha ko thori technical problem aa gayi.
        </h1>
        <p className="text-chacha-muted mb-8">
          Something went wrong. Please try again or go back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          <Link
            href="/"
            className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}