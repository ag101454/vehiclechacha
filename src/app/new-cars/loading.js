'use client';

import { motion } from 'framer-motion';

export default function NewCarsLoading() {
  return (
    <div className="min-h-screen bg-chacha-black py-12">
      <div className="container-custom">
        <div className="mb-12">
          <div className="h-10 bg-chacha-card rounded-lg w-64 mb-4 animate-pulse" />
          <div className="h-4 bg-chacha-card rounded w-96 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="card-dark overflow-hidden">
              <div className="aspect-[16/10] bg-chacha-card animate-pulse" />
              <div className="p-4">
                <div className="h-4 bg-chacha-card rounded w-20 mb-3 animate-pulse" />
                <div className="h-5 bg-chacha-card rounded w-32 mb-2 animate-pulse" />
                <div className="h-4 bg-chacha-card rounded w-24 mb-3 animate-pulse" />
                <div className="h-6 bg-chacha-card rounded w-28 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}