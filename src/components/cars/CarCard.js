'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Users, Settings, Car as CarIcon } from 'lucide-react';

export function formatPrice(price) {
  if (!price) return "Price not available";
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  }
  return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
}

export default function CarCard({ car }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const carUrl = `/new-cars/${car.brandSlug || car.brand?.toLowerCase()}/${car.slug || car.name?.toLowerCase().replace(/ /g, '-')}`;

  return (
    <Link
      href={carUrl}
      className="card-dark hover:border-chacha-yellow transition-all duration-300 group overflow-hidden block hover:shadow-2xl hover:shadow-chacha-yellow/10 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-chacha-black overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-chacha-card animate-pulse" />
        )}
        
        {car.image && !imageError ? (
          <Image
            src={car.image}
            alt={`${car.brand} ${car.name} ${car.bodyType || ''}`}
            fill
            className={`object-cover group-hover:scale-110 transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <CarIcon size={48} className="text-chacha-muted group-hover:text-chacha-yellow transition-colors" />
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-2">
          {car.bodyType && (
            <span className="inline-block bg-chacha-yellow/10 text-chacha-yellow text-xs px-2 py-1 rounded">
              {car.bodyType}
            </span>
          )}
          {car.isPopular && (
            <span className="inline-block bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded">
              Popular
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-white font-semibold text-lg group-hover:text-chacha-yellow transition-colors">
          {car.name}
        </h3>
        <p className="text-chacha-muted text-sm mb-3">{car.brand}</p>

        {/* Price */}
        <div className="text-chacha-yellow font-bold text-xl mb-3">
          {formatPrice(car.price)}
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 text-sm text-chacha-muted border-t border-chacha-border pt-3">
          {car.fuelType && (
            <div className="flex items-center gap-1">
              <Fuel size={14} />
              <span className="text-xs">{car.fuelType}</span>
            </div>
          )}
          {car.seats && (
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span className="text-xs">{car.seats} Seats</span>
            </div>
          )}
          {car.transmission && (
            <div className="flex items-center gap-1">
              <Settings size={14} />
              <span className="text-xs">{car.transmission}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}