'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-4 border-chacha-card border-t-chacha-yellow rounded-full animate-spin`} />
      {text && (
        <p className="text-chacha-muted text-sm">{text}</p>
      )}
    </div>
  );
}